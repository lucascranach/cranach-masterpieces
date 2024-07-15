const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { OpenAI } = require('openai');


require('dotenv').config()

const cacheDir = process.env.CACHE_DIR || path.join(__dirname, '..', '.cache');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Funktion, um eine Verzögerung zu erzeugen
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const generatePrompt = (title, text, urlContent) => {
  return `Du bist ein Kunsthistoriker. Du willst die Werke Cranachs für Menschen zugänglich und interessant machen, die wenig Ahnung von der Kunst alter Meister haben. Du schreibst einen Erklärungstext zum dem Werk für eine Website. Der Text muss zwischen 200 und 700 Zeichen lang sein und sollte keine zu spezielle Fachsprache enthalten. Basis für deine Erklärungstext ist folgender Titel: "${title}" und Beschreibungstext: "${text}" und folgenden Text: "${urlContent}. Das Werk ist Teil einer Ausstellung, daher musst Du nicht werbend schreiben, sondern informativ und interessant. Auch ist die Nennung des Künstlers nicht notwendig, da es sich um eine Cranach-Ausstellung handelt. Erwähne auch nicht den Bezug zur Renaissance. Bitte verzichte auf Interpretation und Bewertungen. Bitte erläutere Fachbezeichnungen und Fachbegriffe. Nutze ausschließlich Wikipedia als Quelle. Zeige keine Quellenanganben und keine weiterführenden Links.`;
};

const fetchUrlContent = async (url) => {
  try {

    const cacheFile = path.join(cacheDir, encodeURIComponent(url) + '.json');

    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir);
    }

    if (fs.existsSync(cacheFile)) {
        const cachedData = fs.readFileSync(cacheFile, 'utf8');
        console.log("#");
        return JSON.parse(cachedData);
    }

    const response = await axios.get(url);
    const content = response.data;
    const $ = cheerio.load(content);

    // Den Textinhalt des div-Elements mit der ID 'wraptrefferproduktansicht' extrahieren
    let text = '';
    // only take the good stuff
    $('body').find('p, h1, h2, h3, h4, h5, h6, ul, li, dt, dd, th, td').each((i, elem) => {
      text += $(elem).text() + ' ';
    });

    const tokens = text.split(' ');
    fs.writeFileSync(cacheFile, JSON.stringify(tokens), 'utf8');
    return tokens.slice(0, Math.min(1000, tokens.length)).join(' ');

  } catch (error) {
    console.error('Error fetching URL content:', error.response ? error.response.data : error.message);
    return '';
  }
};

// Funktion, um eine Anfrage an OpenAI zu stellen
const fetchDataFromOpenAI = async (entry) => {

  const cacheFile = path.join(cacheDir, encodeURIComponent(entry.id) + '.json');

  if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir);
  }

  if (fs.existsSync(cacheFile)) {
      const cachedData = fs.readFileSync(cacheFile, 'utf8');
      console.log('Daten aus dem Cache geladen:', JSON.parse(cachedData));
      return JSON.parse(cachedData);
  }

  const url = `https://lucascranach.org/de/${entry.id}`;
  const urlContent = await fetchUrlContent(url);

  const prompt = generatePrompt(entry.title, entry.description, urlContent);

  try {
    const response = await openai.chat.completions
    .create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      max_tokens: 500,
    });

    console.log("Fetching data for:", entry.title);
    fs.writeFileSync(cacheFile, JSON.stringify(response.choices[0].message.content), 'utf8');
    return response.choices[0].message.content;

  } catch (error) {
    console.error('Fehler beim Abrufen der OpenAI API:', error);
    return null;
  }
};

// Hauptfunktion, um Anfragen in einem kontrollierten Tempo zu senden
const fetchAllGtpData = async (data) => {
  const delayMs = 60000 / 20; // Beispiel: 20 Anfragen pro Minute erlauben
  for (const entry of data) {
    const gptDesc = await fetchDataFromOpenAI(entry); // Angenommen, jedes JSON-Objekt hat ein "text"-Feld
    entry.gptDescription = gptDesc; // Ergänze das neue Feld
    
    // Verzögerung zwischen den Anfragen
    await delay(delayMs);
  }

  // Speichere das angereicherte JSON
  fs.writeFileSync('enriched_data.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('Angereichertes JSON gespeichert.');
};


module.exports = fetchAllGtpData;


