
const cleanContent = (content) => {
  let cleanContent = removeUrls(content);
  cleanContent = removeMarkdownLinks(cleanContent);
  cleanContent = removeSource(cleanContent);
  cleanContent = removeLongCommentsInBrackets(cleanContent);
  cleanContent = breakMultipleDimensions(cleanContent);
  return cleanContent;
}

const cleanGptContent = (content) => {
  let cleanContent = content.replace(/Quelle: Wikipedia/g, '');
  cleanContent = cleanContent.replace(/\(\)/g, '');
  cleanContent = cleanContent.replace(/\[\]/g, '');
  cleanContent = cleanContent.replace(/\. \./g, '');
  cleanContent = cleanContent.replace(/"(.*?)"/g, '„$1”');
  cleanContent = cleanContent.replace(/Weitere Informationen.*?\/\./g, '');
  return cleanContent;
};

const cleanProvenance = (content) => {
  let cleanContent = content.replace(/\[.*?\]/g, '');
  cleanContent = cleanContent.replace(/\n\n/g, '\n');
  cleanContent = cleanContent.replace(/-(.*?)\n/g, '<li>$1</li>');
  cleanContent = cleanContent.replace(/\[http.*?\]/g, '');
  cleanContent = cleanContent.replace(/\(http.*?\)/g, '');
  cleanContent = cleanContent.replace(/<li> /g, '<li>');
  cleanContent = cleanContent.replace(/ <\/li>/g, '</li>');
  cleanContent = cleanContent.replace(/ $/g, '');
  cleanContent = cleanContent.replace(/ $/g, '');
  cleanContent = cleanContent.replace(/^ /g, '');
  cleanContent = cleanContent.replace(/ \: /g, ': ');
  cleanContent = cleanContent.replace(/\. \./g, '');
  cleanContent = cleanContent.replace(/\.\./g, '');
  cleanContent = cleanContent.replace(/\. $/g, '');
  cleanContent = cleanContent.replace(/\./g, '');
  cleanContent = cleanContent.replace(/\. /g, '');
  return cleanContent;
};

const cleanAltText = (content) => {
  return content.replace(/"/g, '\'');
}

const removeMarkdownLinks = (content) => {
  return content.replace(/\[.*?\]\(.*?\)/g, '');
};

const removeUrls = (content) => {
  return content.replace(/\[http.*?\]/g, '');
}

const removeSource = (content) => {
  return content.replace(/\[.*?,.*?\]/g, '');
};

const removeLongCommentsInBrackets = (content) => {
  return content.replace(/\(.*?,.*?\)/g, '');
};

const breakMultipleDimensions = (content) => {
  return content.replace(/( |\n)Maße.*/g, '');
};



module.exports = {
  cleanContent,
  cleanGptContent,
  cleanProvenance,
  cleanAltText
};