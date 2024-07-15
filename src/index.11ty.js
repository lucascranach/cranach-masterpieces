const fs = require('fs');

const documentHeader = require('./_layouts/components/head.11ty');
const { cleanContent, cleanGptContent, cleanAltText } = require('./_helper/text-cleaner');
const { getLayoutType } = require('./_helper/layout');

const frontMatterData = {
    permalink: 'index.html'
};

const renderSingleMasterpiece = (item, cssClass) => {
  const imgSrc = item.media.images[0].sizes.medium.src;
  const ratio = item.media.images[0].sizes.small.dimensions.width / item.media.images[0].sizes.small.dimensions.height;
  const layoutType = cssClass === 'part-of-set' ? 'simple' : getLayoutType(ratio);

  const { gptDescription } = item;
  const url = `de/${item.id}/`;

  const textFadeClass = cssClass === 'part-of-set' ? '' : 'text-fade';
  const revealingImageClass = cssClass === 'part-of-set' ? '' : 'revealing-image';
  const contentFadeClass = cssClass === 'part-of-set' ? 'content-fade' : '';

  return `
    <article id="${item.id}" class="${cssClass} masterpiece ${contentFadeClass}" data-layout="${layoutType}" data-js-observe>
      <div class="text-content ${textFadeClass}">
        <h2>${item.title}</h2>
        <p>${cleanGptContent(gptDescription)}</p>

        <ul class="specs">
          <li>${cleanContent(item.medium)}</li>
          <li>${item.artist}, ${item.date}</li>
          <li>${cleanContent(item.dimensions)}</li>
          <li>${item.repository}</li>
        </ul>

        <a class="more" href="${url}"><span class="icon">more_horiz</span></a>
      </div>
      <figure class="visual-content">
        <img class="${revealingImageClass}" src="${imgSrc}" alt="${cleanAltText(item.title)}" loading="lazy">
      </figure>
    </article>
  `;
};

const renderDetail = (item) => {
  const { detail } = item;
  return `
    <div class="detail page"><p>${detail}</p></div>
  `;
};

class Overview {

    data() {
      return frontMatterData;
    }
  
    render(data) {

      const masterpieces = data.collections.masterpiecesDE;
      const used = [];

      const relatedMasterpiecesRaw = masterpieces.map(item => {

        if(used.includes(item.id)) return;

        const relatedWorks = item.references
          .filter(ref=> ref.kind === 'PART_OF_WORK')
          .filter(ref=> {
            return masterpieces.find(masterpiece => masterpiece.id === ref.inventoryNumber);
        });

        if(relatedWorks.length > 0) {
          const relatedWorksContent = relatedWorks.map(relatedWork => {
            const relatedMasterpiece = masterpieces.find(masterpiece => masterpiece.id === relatedWork.inventoryNumber);
            used.push(relatedMasterpiece.id);
            return relatedMasterpiece;
          });

          return {
            ...item,
            relatedWorks: relatedWorksContent
          };
        }

        return item;
      });

      const relatedMasterpieces = relatedMasterpiecesRaw.filter(item => item !== undefined);

      const cranachDetails = data.collections.cranachDetailsDE;
      const masterpiecesList = relatedMasterpieces.slice(0,100).map((item, index) => {

        if(item.relatedWorks) {
          const stripeData = [item, ...item.relatedWorks];
          const stripe = stripeData.map(item => {
            return renderSingleMasterpiece(item, "part-of-set");
          });
          return `
            <div class="set page" data-items="${stripeData.length}">
              <div class="pin-wrap-sticky">
              <div class="pin-wrap">
                ${stripe.join('')}
              </div>
              </div>
            </div>
          `;
        }else{

          const detail = (index % 3 === 0) ? renderDetail(cranachDetails.shift()) : '';
          const singleMasterpiece = renderSingleMasterpiece(item, "horizontal");

          return `${singleMasterpiece}${detail}`;
        }
        
      });

      
      const masterpiecesWall = data.collections.masterpiecesDE.map(item => {
        const imgSrc = item.media.images[0].sizes.small.src;
        return `
          <div class="image-wrap">
            <a href="#${item.id}">
              <img src="${imgSrc}" alt="${cleanAltText(item.title)}">
            </a>
          </div>
        `;
      });
      
      const documentHead = documentHeader.getHeader(this, data);
      //const pageHead = pageHeader.getPageHeader(this, data);
      //const pageFoot = pageFooter.getPageFooter(this, data);

      return `<!doctype html>
      <html lang="de">
        ${documentHead}

        <body data-js-content>
          <header class="cover" id="cover">
            <h1 class="title">100 Meisterwerke</h1>
            <p class="subtitle">Die wichtigsten Werke aus dem Cranach Digital Archive</p>
          </header>
          <section class="wall page" id="wall">
            ${masterpiecesWall.join('')}
          </section>
          <section class="masterpieces">
            ${masterpiecesList.join('')}
          </section>

          <div id="progress"></div>
          
        </body>
      </html>`;
    }
  }
  
module.exports = Overview;

