const fs = require('fs');
const fg = require('fast-glob');
const fse = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { Source, Build } = require('./paths');

const PACKAGE_ROOT = 'node_modules/@refinitiv-ui/elements/lib';
const ELEMENT_API_FILENAME = 'custom-elements.md';
const API_REFERENCE_TITLES = ['## Properties', '## Methods', '## Events', '## Slots'];
const FOOTER_TITLE = '::footer::';

const handler = async () => {

  console.log(chalk.grey(`\nCloning src folder\n`));
  fse.copySync(Source.root, Build.root);

  console.log(chalk.grey(`\nWriting Element APIs\n`));
  const entries = await fg([`${PACKAGE_ROOT}/*/${ELEMENT_API_FILENAME}`], { unique: true });

  for (const entrypoint of entries) {
    const elementNameRegEx = new RegExp(`^.*\\/lib\\/([\\w-]+)`);
    const element = entrypoint.match(elementNameRegEx)[1];
    const apiStyleSheetLink = `<link rel="stylesheet" href="../resources/styles/table-api.css">`;

    const elementPage = path.join(Source.ELEMENT_PAGES_FOLDER, `${element}.md`);

    if(fs.existsSync(elementPage)) {
      const elementContent = fs.readFileSync(elementPage).toString();
      const apiContent = fs.readFileSync(entrypoint).toString();
      const footerTitleIndex = elementContent.indexOf(FOOTER_TITLE);

      let content = '';

      if(footerTitleIndex !== -1) {
        content += elementContent.substr(0, footerTitleIndex);
      }
      else {
        content += elementContent;
      }
      
      content += apiStyleSheetLink;

      const apiReferenceIndices = API_REFERENCE_TITLES.map(title => apiContent.indexOf(title));
      const hasApi = apiReferenceIndices.some(index => index !== -1);

      if(hasApi) {
        content += '\n\n---\n' + '\n## API Reference\n';
      }

      for(let i=0; i<apiReferenceIndices.length; i++) {
        const titleIndex = apiReferenceIndices[i];
        if(titleIndex !== -1) {
          let nextIndex = i+1;
          let nextTitleIndex = apiReferenceIndices[nextIndex];
          while(nextTitleIndex === -1 && nextIndex < apiReferenceIndices.length) {
            nextIndex++;
            nextTitleIndex = apiReferenceIndices[nextIndex];
          }
          const lastIndex = nextTitleIndex && nextTitleIndex !== -1 ? nextTitleIndex - titleIndex : apiContent.length;
          content += '\n#' + apiContent.substr(titleIndex, lastIndex) + '\n';
        }
      }

      if(footerTitleIndex !== -1) {
        content += '\n' + FOOTER_TITLE;
      }

      const outputDir = path.join(Build.ELEMENT_PAGES_FOLDER, `${element}.md`);
      if(fs.existsSync(outputDir)) {
        fs.writeFileSync(outputDir, content);
      }
    }
  }
  console.log(chalk.green(`Done\n`));
}

handler();
