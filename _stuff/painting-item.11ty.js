let langCode;
let config;

const metaDataHeader = require('./components/meta-data-head.11ty');
const improveCda = require('./components/improve-cda.11ty');
const pageDateSnippet = require('./components/page-date.11ty');
const copyrightSnippet = require('./components/copyright.11ty');
const citeCdaSnippet = require('./components/cite-cda.11ty');
const titleSnippet = require('./components/title.11ty');
const mediumSnippet = require('./components/medium.11ty');
const representantImageSnippet = require('./components/representant-image.11ty');
const attributionSnippet = require('./components/attribution.11ty');
const datingSnippet = require('./components/dating.11ty');
const signatureSnippet = require('./components/signature.11ty');
const inscriptionsAndLabelsSnippet = require('./components/inscriptions-and-labels.11ty');
const dimensionsSnippet = require('./components/dimensions.11ty');
const descriptionSnippet = require('./components/description.11ty');
const locationSnippet = require('./components/location.11ty');
const imageDescriptionSnippet = require('./components/image-description.11ty');
const exhibitonsSnippet = require('./components/exhibitons.11ty');
const identificationSnippet = require('./components/identification.11ty');
const provenanceSnippet = require('./components/provenance.11ty');
const sourcesSnippet = require('./components/sources.11ty');
const imageStripeSnippet = require('./components/image-stripe.11ty');
const documentStripeSnippet = require('./components/document-stripe.11ty');
const reportsSnippet = require('./components/reports.11ty');
const additionalTextInformationSnippet = require('./components/additional-text-information.11ty');
const referencesSnippet = require('./components/references.11ty');
const navigationSnippet = require('./components/navigation.11ty');

const ART_TECH_EXAMINATION = 'ArtTechExamination';
const CONDITION_REPORT = 'ConditionReport';
const CONSERVATION_REPORT = 'ConservationReport';
const RELATED_IN_CONTENT_TO = 'RELATED_IN_CONTENT_TO';
const SIMILAR_TO = 'SIMILAR_TO';
const BELONGS_TO = 'BELONGS_TO';
const GRAPHIC = 'GRAPHIC';
const PART_OF_WORK = 'PART_OF_WORK';

const getImageStack = ({ content }) => JSON.stringify(content.images);
const getimageBaseUrl = () => JSON.stringify(config.imageTiles);
const getClientTranslations = () => JSON.stringify(this.getClientTranslations());
const getLangCode = ({ content }) => content.metadata.langCode;
const getDocumentTitle = ({ content }) => content.metadata.title;

const getHeader = (data) => {
  const title = titleSnippet.getTitle(this, data, langCode);
  const subtitle = mediumSnippet.getMediumOfPainting(this, data, langCode);
  return `
  <header class="artefact-header">
    ${title}
    ${subtitle}
  </header>`;
};

// eslint-disable-next-line func-names
exports.render = function (pageData) {
  const data = pageData;
  langCode = getLangCode(data);
  config = this.getConfig();

  data.content.currentCollection = data.collections[data.collectionID];
  data.content.entityType = data.entityType;
  data.content.url = `${this.getBaseUrl()}${data.page.url}`;

  this.log(data);

  const { id } = data.content.metadata;
  const documentTitle = getDocumentTitle(data);
  const header = getHeader(data);
  const imageStack = getImageStack(data);
  const baseUrl = this.getBaseUrl();
  const imageBaseUrl = getimageBaseUrl(data);
  const translationsClient = getClientTranslations(data);

  const metaDataHead = metaDataHeader.getHeader(data);
  const image = representantImageSnippet.getRepresentant(this, data);
  const copy = descriptionSnippet.getCopyText(this, data);
  const dating = datingSnippet.getDating(this, data, langCode);
  const dimensions = dimensionsSnippet.getDimensions(this, data, langCode);
  const attribution = attributionSnippet.getAttribution(this, data, langCode);
  const location = locationSnippet.getLocation(this, data, langCode);
  const signature = signatureSnippet.getSignature(this, data, langCode);
  const inscriptionsAndLabels = inscriptionsAndLabelsSnippet.getInscriptionsAndLabels(this, data, langCode);
  const ids = identificationSnippet.getIds(this, data, langCode);
  const exhibitions = exhibitonsSnippet.getExhibitions(this, data, langCode);
  const provenance = provenanceSnippet.getProvenance(this, data, langCode);
  const sources = sourcesSnippet.getCombinedSources(this, data, langCode);
  const imageStripe = imageStripeSnippet.getImageStripe(this, data, langCode, config);
  const documentStripe = documentStripeSnippet.getDocumentStripe(this, data, langCode, config, true);
  const artTechExaminations = reportsSnippet.getReports(this, data, langCode, config, ART_TECH_EXAMINATION);
  const conditionReport = reportsSnippet.getReports(this, data, langCode, config, CONDITION_REPORT);
  const conservationReport = reportsSnippet.getReports(this, data, langCode, config, CONSERVATION_REPORT);
  const additionalTextInformation = additionalTextInformationSnippet.getAdditionalTextInformation(this, data, langCode);
  const relatedInContentTo = referencesSnippet.getReference(this, data, langCode, RELATED_IN_CONTENT_TO);
  const similarTo = referencesSnippet.getReference(this, data, langCode, SIMILAR_TO);
  const belongsTo = referencesSnippet.getReference(this, data, langCode, BELONGS_TO);
  const graphic = referencesSnippet.getReference(this, data, langCode, GRAPHIC);

  const partOfWork = referencesSnippet.getReference(this, data, langCode, PART_OF_WORK, true);
  const imageDescriptionObjectInfo = imageDescriptionSnippet.getImageDescriptionObjectInfo(data);
  const citeCda = citeCdaSnippet.getCiteCDA(this, data, langCode);
  const improveCdaSnippet = improveCda.getImproveCDA(this, data, config, langCode);
  const copyright = copyrightSnippet.getCopyright();
  const pageDate = pageDateSnippet.getPageDate(this, langCode);
  const navigation = navigationSnippet.getNavigation(this, langCode, id);
  const navigationObjects = JSON.stringify(this.getObjectsForNavigation(data.content.metadata.id));

  const cranachCollectBaseUrl = this.getCranachCollectBaseUrl();
  const cranachCollectScript = config.cranachCollect.script;

  return `<!doctype html> 
  <html lang="${langCode}">
    <head>
      <title>cda :: ${this.translate('paintings', langCode)} :: ${documentTitle}</title>
      ${metaDataHead}
      <link href="${this.url('/compiled-assets/main.css')}" rel="stylesheet">
      <link href="${this.url('/assets/images/favicon.svg')}" rel="icon" type="image/svg">
      <script>
        const objectData = {};
        objectData.langCode = "${langCode}";
        objectData.imageStack = ${imageStack};
        objectData.baseUrl = "${baseUrl}/${langCode}";
        objectData.imageBaseUrl = ${imageBaseUrl};
        objectData.env = "${this.getENV()}";
        objectData.translations = ${translationsClient};
        objectData.asseturl = "${this.url('/assets')}";
        objectData.inventoryNumber = "${id}";
        objectData.navigationObjects = '${navigationObjects}';
      </script>
    </head>
    <body>
      <div id="page">
        ${navigation}
          <section class="leporello-recog js-main-content">
          ${image}
          <div class="leporello-recog__text">
            <div class="grid-wrapper">

              <div class="base-content">
                ${header}
                <div class="copytext">
                  ${copy}
                </div>
              </div>

              <div class="main-column">
                <div class="block">
                  ${attribution}
                  ${dating}
                  ${dimensions}
                  ${signature}
                  ${inscriptionsAndLabels}
                </div>
                <div class="block">
                  ${location}
                </div>
                <div class="block">
                  ${ids}
                </div>
              </div>

              <div class="marginal-content">
                ${partOfWork}  
                ${provenance}
                ${exhibitions}
                ${sources}
                ${additionalTextInformation}
              </div>
            </div>
          </div>
        </section>

        <section class="leporello-explore">
          <div class="main-image-wrap">
            <figure class="main-image">
              <div class="image-viewer">
                <div id="viewer-content" class="image-viewer__content"></div>
              </div>
              <figcaption class="image-caption-wrap">
                ${imageDescriptionObjectInfo}
                <div id="image-caption" class="image-caption is-secondary has-seperator foldable-block"></div>
              </figcaption>
            </figure>
          </div>
          <div class="explore-content">
            ${imageStripe}
            ${documentStripe}
            ${artTechExaminations}
            ${conditionReport}
            ${conservationReport}
            ${relatedInContentTo}
            ${similarTo}
            ${belongsTo}
            ${graphic}
          </div>
        </section>
        <section class="final-words">
          <div class="foldable-block text-block">
            ${citeCda}
          </div>
          <div class="text-block">
            ${improveCdaSnippet}
          </div>
        </section>
          <footer class="main-footer">
          ${copyright}
        </footer>

      </div>
      <script src="https://cdn.jsdelivr.net/npm/openseadragon@3.1.0/build/openseadragon/openseadragon.min.js"></script>
      <script src="${this.url('/assets/scripts/main.js')}"></script>
      <script src="${cranachCollectBaseUrl}/${cranachCollectScript}"></script>
    </body>
  </html>`;
};
