const markdownIt = require('markdown-it');
const fs = require('fs');

const config = {
  "dist": "./docs",
  "compiledContent": "./compiled-content",
  "pathPrefix": {
    "development": "/",
    "production": "/",
  },
  
  "imageTiles": {
    "development": "https://lucascranach.org/data-proxy/image-tiles.php?obj=",
    "production": "https://lucascranach.org/imageserver-2022"
  },

}

const masterpiecesData = {
  "de": require("./src/_data/masterpieces.de.json"),
  "en": require("./src/_data/masterpieces.en.json")
};

const cranachDetailData = {
  "de": require("./src/_data/cranach-details.json"),
  "en": require("./src/_data/cranach-details.json")
};

const translations = require("./src/_data/translations.json");
const translationsClient = require("./src/_data/translations-client.json");

const markdownItRenderer = new markdownIt('commonmark', {
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
});

const simpleMarkdownItRenderer = new markdownIt('commonmark', {
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
}).disable([ 'list' ]);

const pathPrefix = config.pathPrefix[process.env.ELEVENTY_ENV];

const clearRequireCache = () => {
  
  Object.keys(require.cache).forEach(function (key) {
    if (require.cache[key].filename.match(/11ty\.js/)) {
      delete require.cache[key];
    }
  });  
}

const getMasterpiecesCollection = (lang) => {
  const masterpiecesDataForLang = masterpiecesData[lang].slice(0,100);

  let sortedMasterpiecesDataForLang = masterpiecesDataForLang.sort((a, b) => {
    if (a.searchSortingNumber < b.searchSortingNumber) return -1;
    if (a.searchSortingNumber > b.searchSortingNumber) return 1;
    return 0;
  });

  if (process.env.ELEVENTY_ENV === 'internal'
    || process.env.ELEVENTY_ENV === 'development') return sortedMasterpiecesDataForLang;

  return sortedMasterpiecesDataForLang;
}

const getCranachDetailsCollection = (lang) => {
  return cranachDetailData[lang].slice(0,100);
}

const markdownify = (str, mode = 'full') => {

  function replacePre(match, str) {
    const items = str.split("\n\n").map(line => {
      if (line) return `<li><p>${line}</p></li>`;
    });

    return `<ul class="is-block">${items.join("")}</ul>`;
  }

  const newStr = str.match(/\[(.*?)\]\((.*?)\)/) 
    ? str.replace(/\[(.*?)\]\((.*?)\)/g, '<a class="link-to-source" href="$2">[$1]</a>') 
    : str;
  let renderedText = mode === 'full' ? markdownItRenderer.render(newStr) : simpleMarkdownItRenderer.render(newStr);
  renderedText = renderedText.replace(/<pre><code>(.*?)<\/code><\/pre>/sg, replacePre);

  return `<div class="markdown-it">${renderedText}</div>`;
}

const slugify = (str) => {
  str = str.replace(/^\s+|\s+$/g, '').toLowerCase();
  const from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;",
    to = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }
  return str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
};


module.exports = function (eleventyConfig) {
  eleventyConfig.setWatchThrottleWaitTime(100);
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setWatchJavaScriptDependencies(true);
  eleventyConfig.setBrowserSyncConfig({
    snippet: true,
  });
  /* Compilation
    ########################################################################## */

  // Watch our js for changes
  eleventyConfig.addWatchTarget('./src/assets/scripts/main.js');
  // eleventyConfig.addWatchTarget('./src/_layouts/components/');

  // Copy _data
  eleventyConfig.addPassthroughCopy({ 'src/_data': 'assets/data' });
  eleventyConfig.addWatchTarget("./src/_data");

  // Watch our compiled assets for changes
  eleventyConfig.addPassthroughCopy('src/compiled-assets');
  eleventyConfig.addPassthroughCopy('./compiled-content');

  // Copy all fonts
  eleventyConfig.addPassthroughCopy({ 'src/assets/fonts': 'assets/fonts' });

  // Copy asset images
  eleventyConfig.addPassthroughCopy({ 'src/assets/images': 'assets/images' });


  // Copy Scripts
  eleventyConfig.addPassthroughCopy({ 'src/assets/scripts': 'assets/scripts' });
  eleventyConfig.addWatchTarget("./src/assets/scripts");

  /* Functions
  ########################################################################## */


  eleventyConfig.addJavaScriptFunction("translate", (term, lang, mode) => {
    if(mode === 'maybe') {
      return (translations[term]) ? translations[term][lang] : term;
    }
    if (!translations[term]) {
      console.log(`Translation for ${term} in lang ${lang} is missing.`);
      process.abort();
    }
    return translations[term][lang];
  });

  eleventyConfig.addJavaScriptFunction("getBaseUrl", () => {
    return config.cranachBaseUrl[process.env.ELEVENTY_ENV];
  });

  eleventyConfig.addJavaScriptFunction("getPathPrefix", () => {
    return pathPrefix
  });

  eleventyConfig.addJavaScriptFunction("getConfig", () => {
    return config;
  });

  eleventyConfig.addJavaScriptFunction("getTranslations", () => {
    return translations;
  });

  eleventyConfig.addJavaScriptFunction("getClientTranslations", () => {
    return translationsClient;
  });
  
  eleventyConfig.addJavaScriptFunction("getPainting", (inventoryNumber, langCode) => {
    const paintings = paintingsData[langCode].items;
    return paintings.find((painting) => painting.inventoryNumber === inventoryNumber);
  });



  /* Filter
  ########################################################################## */

  eleventyConfig.addFilter("markdownify", (str) => {
    str =  markdownify(str);
    return markRemarks(str);
  });

  eleventyConfig.addFilter("altText", (str) => {
    return str ? str.replace(/"/g, "\'") : 'no alt text';
  });

  eleventyConfig.addFilter("stripTags", (str) => {
    return str.replace(/<.*?>/g, "");
  });

  eleventyConfig.addFilter("slugify", (str) => {
    return slugify(str);
  });

  /* Collections
  ########################################################################## */

  eleventyConfig.addCollection("masterpiecesDE", () => {
    clearRequireCache();
    return getMasterpiecesCollection('de');
  });

  eleventyConfig.addCollection("cranachDetailsDE", () => {
    clearRequireCache();
    return getCranachDetailsCollection('de');
  });



  /* Shortcodes
  ########################################################################## */


  /* Environment
  ########################################################################## */

  if (process.env.ELEVENTY_ENV === 'external') {
    eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
      if (outputPath.endsWith('.html')) {
        return content;
        return minified = htmlmin.minify(content, {
          collapseInlineTagWhitespace: false,
          collapseWhitespace: true,
          removeComments: true,
          sortClassName: true,
          useShortDoctype: true,
        });
      }

      return content;
    });
  }

  if (process.env.ELEVENTY_ENV === 'external' || process.env.ELEVENTY_ENV === 'internal') {
    config.onlyDevObjects = false;
  }

  return {
    dir: {
      includes: '_components',
      input: 'src',
      layouts: '_layouts',
      output: config.dist,
    },
    pathPrefix,
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: [
      'md',
      'html',
      'njk',
      '11ty.js'
    ],
  };
};
