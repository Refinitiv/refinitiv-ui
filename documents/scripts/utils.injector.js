#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { Build } from './paths.js';

// List's used to input to extract
const entries = ['collection/collection-composer.json'];
// List's used to output file
const outcomes = ['collection-composer.md'];
const PACKAGE_ROOT = '../node_modules/@refinitiv-ui/utils/lib/';

const generateHeading = () => {
  return `## API Reference\n\n`
}
const generateTitle = (title) => {
  return `### ${title}\n\n`
}
const generateDescription = (description) => {
  return `${description}\n\n`
}
const generateParameter = (parameters) => {
  let result = '';
  const head = '#### Arguments\n\n| Name | Type | Description |\n| --- | --- | --- |\n';
  result+=head;
  if (parameters.length > 0) {
    for (const arg of parameters) {
      result+=`| ${arg.name || ''} | ${arg.type || ''} | ${arg.description || ''} |\n`;
    }
  }
  result+='\n\n';
  return result;
}
const generateReturn = (returns) => {
  const description = returns.description;
  let result = '';
  const head = `#### Returns\n\n| Type${description ? ' |  Description' : ''} |\n| ---${description ? ' | ---' : ''} |\n`;
  result+=head;
  result+=`| ${returns.type || ''}${description ? description + ' | ' : ''} |\n`;
  result+='\n\n';
  return result;
}

/**
 * Generate content to md file from JSON 
 * @returns {void}
 */
const generateMD = async () => {

  for (const i in entries) {
    let entryPoint = entries[i];
    const isJSON = entryPoint.lastIndexOf('.json');
    // if entry isn't json, then turn it to json 
    if (isJSON < 0) {
      const dot = entryPoint.lastIndexOf('.');
      entryPoint = (dot >= 0) ? entryPoint.substr(0, dot) : `${entryPoint}.json`
    }
    const inputPath =  path.resolve(PACKAGE_ROOT, entryPoint)

    const outputPath = path.resolve(Build.PAGES_FOLDER, `utils/${outcomes[i]}`);

    if (!fs.existsSync(outputPath)) {
      console.log(chalk.red(`\nFile ${outputPath} doesn't exist.\n`));
      continue;
    }

    let content = '';
    content += generateHeading();

    const data = JSON.parse(fs.readFileSync(inputPath, { encoding: 'utf8' }))
    const sources = data.children[0].children;

    for (const source of sources) {
      if (!source.flags.isPublic) {
        continue;
      }

      const generateContent = (info) => {
        if (!info) {
          return '';
        }

        let result = '';
        result+=generateTitle(info?.name);
        result+=generateDescription(info?.comment?.summary[0]?.text);
        if (info?.parameters) {
          const parameters = info?.parameters?.map(item => {
            return {
              name: item?.name,
              type: item?.type?.name,
              description: item?.comment?.summary[0]?.text,
            }
          });
          result+=generateParameter(parameters);
        }
        const returnDescription = (info?.comment?.blockTags && info?.comment?.blockTags[0]?.result) ? info?.comment?.blockTags[0]?.result[0]?.text : ''
        result+=generateReturn({
          type: info?.type?.name,
          description: returnDescription
        });
        return result;
      }

      if (source?.signatures?.length > 1) {
        for (const signature of source?.signatures) {
          content += generateContent(signature)
        }
      } else {
        // handles source is method or function
        let info = source?.getSignature || (source?.signatures ? source?.signatures[0] : '');
        content += generateContent(info)
      }
      
    }

    fs.appendFileSync(outputPath, content, 'utf-8');
  }
};

generateMD();