const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
import { expect } from 'chai';
import { describe } from 'mocha';

const DEFAULT_LANG = 'en';
const DEFAULT_LANG_DIR = 'lib/locale';
const Supported = fs.readdirSync(DEFAULT_LANG_DIR);

const missing = [];
const unexpected = [];
const missingTrans = [];
const additional = [];

const buildIncorrectItems = (data, sectionHeader) => {
  const padding = 6;
  const langs = new Map();
  data.forEach((item) => {
    if (!langs.has(item.lang)) {
      langs.set(item.lang, []);
    }
    const itemName = '-' + item.item;
    langs.get(item.lang).push({ item: chalk.red(itemName.padStart(itemName.length + 6)) });
  });
  const output = { title: '', list: [] };
  langs.forEach((item, key) => {
    const keyUpper = key.toUpperCase();
    output.list.push({ title: chalk.red.bold(keyUpper.padStart(keyUpper.length + padding)), list: item });
  });
  output.title = '\n' + chalk.red.bold(sectionHeader.padStart(sectionHeader.length + padding));
  return output;
};

const outputItems = (title, list) => {
  console.log(title); // eslint-disable-line
  list.forEach((lang) => {
    console.log('\n' + lang.title); // eslint-disable-line
    lang.list.forEach((item) => {
      console.log(item.item); // eslint-disable-line
    });
  });
};

const getDirList = (dir) => {
  let dirList;
  try {
    dirList = fs.readdirSync(dir);
  }
  catch (err) {
    console.error(err); // eslint-disable-line
  }

  return dirList.filter(file => path.extname(path.resolve(dir, file)) === '.js');
};

const assembleImports = () => {
  const langImportMap = new Map();
  try {
    // load all the components per lang
    for (const lang of Supported) {
      langImportMap.set(lang, new Map());
      let langMap = langImportMap.get(lang);
      let componentsList = getDirList(`./${DEFAULT_LANG_DIR}/${lang}`);
      if(componentsList) {
        for (const component of componentsList) {
          let imported = require(`../${DEFAULT_LANG_DIR}/${lang}/${component}`);
          langMap.set(component, imported.default);
        }
      }
    }
  }
  catch (err) {
    console.error(err); // eslint-disable-line
  }
  return langImportMap;
};

// iterate lang from supported and load all components
// placing them into the correct place in lang Map
let assembledImports;
const nonDefaultLangs = [];
Supported.forEach((lang) => {
  if (lang !== DEFAULT_LANG) {
    nonDefaultLangs.push(lang);
  }
});

describe('Langs', () => {
  before((done) => {
    assembledImports = assembleImports();
    done();
  });
  after(() => {
    if (missing.length || missingTrans.length || additional.length || unexpected.length) {
      const detailsTitle = 'Test failure details';
      console.log(`\n${chalk.red.bold(detailsTitle.padStart(detailsTitle.length + 6))}`); // eslint-disable-line
      if (missing.length) {
        const missingOutput = buildIncorrectItems(missing, 'Missing files details:');
        outputItems(missingOutput.title, missingOutput.list);
      }
      if (unexpected.length) {
        const unexpectedOutput = buildIncorrectItems(unexpected, 'Unexpected files details:');
        outputItems(unexpectedOutput.title, unexpectedOutput.list);
      }
      if (missingTrans.length) {
        const missingTransOutput = buildIncorrectItems(missingTrans, 'Missing translations details:');
        outputItems(missingTransOutput.title, missingTransOutput.list);
      }

      if (additional.length) {
        const additionalOutput = buildIncorrectItems(additional, 'Unexpected translations details:');
        outputItems(additionalOutput.title, additionalOutput.list);
      }
    }
  });
  describe('Default lang is supported', () => {
    it(`${DEFAULT_LANG} exists`, () => {
      expect(Supported.indexOf(DEFAULT_LANG) !== -1).to.equal(true, `${DEFAULT_LANG} does not exist`);
    });
  });

  describe(`Supported langs match ${DEFAULT_LANG} imports`, () => {
    it('Has no missing files', () => {
      nonDefaultLangs.forEach((lang) => {
        assembledImports.get(DEFAULT_LANG).forEach((imported, key) => {
          if(!assembledImports.get(lang).has(key)) {
            missing.push({ lang: lang, item: key });
          }
        });
      });
      expect(missing.length).to.equal(0, 'Missing imports');
    });
    it(`Langs have no imports not found in ${DEFAULT_LANG}`, () => {
      nonDefaultLangs.forEach((lang) => {
        assembledImports.get(lang).forEach((imported, key) => {
          if(!assembledImports.get(DEFAULT_LANG).has(key)) {
            unexpected.push({ lang: lang, item: key });
          }
        });
      });
      expect(unexpected.length).to.equal(0);
    });
    it(`Each lang component and shared have ${DEFAULT_LANG} component and shared keys`, () => {
      nonDefaultLangs.forEach((lang) => {
        assembledImports.get(DEFAULT_LANG).forEach((imported, importedKey) => {
          if(assembledImports.get(lang).has(importedKey)) {
            for (const key in imported) {
              if(!assembledImports.get(lang).get(importedKey).hasOwnProperty(key)) {
                missingTrans.push({ lang: lang, item: `${importedKey} :: ${key}` });
              }
            }
          }
        });
        expect(missingTrans.length).to.equal(0);

      });
    });

    it('Each lang component and shared have no extra component or shared keys', () => {
      nonDefaultLangs.forEach((lang) => {
        assembledImports.get(lang).forEach((imported, importedKey) => {
          if(assembledImports.get(DEFAULT_LANG).has(importedKey)) {
            for (const key in imported) {
              if(!assembledImports.get(DEFAULT_LANG).get(importedKey).hasOwnProperty(key)) {
                additional.push({ lang: lang, item: `${importedKey} :: ${key}` });
              }
            }
          }
        });
      });
      expect(additional.length).to.equal(0);
    });
  });
});
