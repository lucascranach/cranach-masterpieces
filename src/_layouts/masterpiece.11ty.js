const documentHeader = require('./components/head.11ty');
const { toolbar, themeSelector } = require('./components/tools.11ty');
const { cleanContent, cleanGptContent, cleanProvenance, cleanAltText } = require('../_helper/text-cleaner');
const { getLayoutType, getRatioClass } = require('../_helper/layout');

// eslint-disable-next-line func-names
exports.render = function (pageData) {
  const data = pageData;
  const { content } = data;
  const documentHead = documentHeader.getHeader(this, content);

  const imgSrc = content.media.images[0].sizes.medium.src;
  const ratio = content.media.images[0].sizes.small.dimensions.width / content.media.images[0].sizes.small.dimensions.height;
  const ratioClass = getRatioClass(ratio);
  const layoutType = getLayoutType(ratio);

  const provinienz = !content.provenance ? ''
    : `<div class="provenance">
        <h3>Provenienz</h3>
        <ul>${cleanProvenance(content.provenance)}</ul>
      </div>`; 

  return `<!doctype html> 
  <html lang="de">
    ${documentHead}

    <body class="single-masterpiece" data-layout="${layoutType}" data-ratio="${ratioClass}">

      <nav class="navigation">
        <a class="back-button" href="/#${content.id}" data-js-back><span class="icon">arrow_back</span></a>
        ${toolbar}
      </nav>

      <header class="title">
        <h1>Cranach Meisterwerke</h1>
      </header>

      <div class="text-content">
        <h2>${content.title}</h2>
        <p>${cleanGptContent(content.gptDescription)}</p>

        ${provinienz}

        <ul class="specs">
          <li>${cleanContent(content.medium)}</li>
          <li>${content.artist}, ${content.date}</li>
          <li>${cleanContent(content.dimensions)}</li>
          <li>${content.repository}</li>
        </ul>
      </div>
      
      <figure class="visual-content">
        <img src="${imgSrc}" alt="${cleanAltText(content.title)}" loading="lazy">
      </figure>
      
      ${themeSelector}
      
    </body>
  </html>`;
};
