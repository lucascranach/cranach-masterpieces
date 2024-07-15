const { readFileSync, writeFileSync } = require('fs');
const fetchAllGtpData = require('../helper/fetch-gpt-data');

const writeData = (data) => {
  const path = 'masterpieces.de.json';

  try {
    writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
    console.log('Data successfully saved to disk');
  } catch (error) {
    console.log('An error has occurred ', error);
  }
};

const json = readFileSync('cda-paintings-v2.de.json', 'utf8');
const data = JSON.parse(json);

const published = data.items.filter(painting => painting.metadata.isPublished===true);
const masterpieces = published.filter(painting => painting.isBestOf===true);
const masterpiecesBook = masterpieces.map(painting => {
    return {
        title: painting.metadata.title,
        date: painting.metadata.date,
        description: painting.description,
        dimensions: painting.dimensions,
        media: painting.images.overall,
        classification: painting.metadata.classification,
        repository: painting.repository,
        owner: painting.owner,
        artist: painting.involvedPersons[0].name,
        sortingNumber: painting.sortingNumber,
        id: painting.inventoryNumber,
        medium: painting.medium,
        references: painting.references,
        provenance: painting.provenance
    }
  
});



const demoData = masterpiecesBook.slice(0, 100);
const richMasterpiecesData = [];

fetchAllGtpData(demoData).then(data => {
  console.log("Fertig!")
}).catch(error => {
  console.error('Fehler beim Abrufen der Daten:', error);
});





//const richMasterpiecesData = {
//  "de": fetchAllGtpData(masterpiecesData.de),
//  "en": fetchAllGtpData(masterpiecesData.en)
//};



