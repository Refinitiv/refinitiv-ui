#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import { Build } from './paths.js';

// Input JSON files use to extract
const entries = ['../node_modules/@refinitiv-ui/elements/lib/tree/managers/tree-manager.json'];
// Output headers uses for title and file name.
const outputHeaders = ['Tree manager'];

/*
 * Return generated header with markdown syntax.
 * @returns {string}
 */
const generateHeader = (text, level = 1) => {
  let sharps = ''
  for (let i = 0; i < level; i++) {
    sharps += '#'
  }
  return `${sharps} ${text}\n\n`
}
const generateDescription = (description) => {
  return `${description}\n\n`
}
const generateParameter = (parameters) => {
  let result = `${generateHeader('Arguments', 4)}\n\n| Name | Type | Description |\n| --- | --- | --- |\n`;
  if (parameters.length > 0) {
    for (const param of parameters) {
      result += `| ${param.name || ''} | ${param.type || ''} | ${param.description.replace("\n", " ").replaceAll("\r"," ") || ''} |\n`;
    }
  }
  result += '\n\n';
  return result;
}
const generateReturn = (returns) => {
  const description = returns.description;
  let result = '';
  const head = `${generateHeader('Returns', 4)}\n\n| Type${description ? ' |  Description' : ''} |\n| ---${description ? ' | ---' : ''} |\n`;
  result += head;
  result += `| ${returns?.type || ''} | ${description ? description.replace("\n", " ").replaceAll("\r"," ") + ' | ' : ''} |\n`;
  result += '\n\n';
  return result;
}
const generateConstructor = (IDs, dataClass) => {
  let result = ''
  const data = dataClass.children.find(item => item.id === IDs[0])
  if (!data) return result
  result += generateHeader('Constructor', 2)
  if (data?.signatures[0].parameters?.length > 0) {
    const params = data?.signatures[0].parameters.map(item => {
      return {
        name: item?.name,
        type: item?.type?.name,
        description: item?.comment?.summary[0]?.text || '',
      }
    });
    result += generateParameter(params);
  }
  return result;
}
const generateAccessor = (IDs, dataClass, mappedSignatures) => {
  let result = ''
  if (IDs?.length < 0) return result
  result += generateHeader('Accessors', 2)
  for (const id of IDs) {
    const data = dataClass.children.find(item => item.id === id)
    if (!data || !data.flags?.isPublic) continue
    const getSignature = data.getSignature
    result += generateHeader(getSignature?.name, 3);
    result += generateDescription(getSignature?.comment?.summary[0]?.text);
    if (getSignature?.parameters) {
      const parameters = getSignature?.parameters?.map(item => {
        return {
          name: item?.name,
          type: item?.type?.name,
          description: item?.comment?.summary[0]?.text || '',
        }
      });
      result += generateParameter(parameters);
    }

    const summaries = getSignature?.comment?.summary;
    let returnDescription = ''
    if (summaries?.length > 0) {
      for (const summary of summaries) {
        returnDescription += summary.text
      }
    }
    result += generateReturn({
      type: mappedSignatures.find(item => (item.id - 1) === id)?.returnType,
      description: returnDescription
    });
  }
  return result;
}
const generateMethod = (IDs, dataClass, mappedSignatures) => {
  let result = ''
  if (IDs?.length < 0) return result
  result += generateHeader('Methods', 2)
  for (const id of IDs) {
    const data = dataClass.children.find(item => item.id === id)
    if (!data || !data.flags?.isPublic) continue
    for (const signature of data.signatures) {
      result += generateHeader(signature?.name, 3);
      result += generateDescription(signature?.comment?.summary[0]?.text);
      if (signature?.parameters) {
        const parameters = signature?.parameters?.map(item => {
          return {
            name: item?.name,
            type: item?.type?.name,
            description: item?.comment?.summary[0]?.text || '',
          }
        });
        result += generateParameter(parameters);
      }

      const blockTags = signature?.comment?.blockTags;
      const contents = (blockTags && blockTags[0]?.content) ? blockTags[0]?.content : ''
      let returnDescription = ''
      if (contents?.length > 0) {
        for (const content of contents) {
          returnDescription += content.text
        }
      }
      result += generateReturn({
        type: mappedSignatures.find(item => (item.id - 1) === id)?.returnType,
        description: returnDescription
      });
    }
  }
  return result;
}
/**
 * Generate document based on class 
 * @returns {string} 
 */
const generateClassDocument = (data, isTitle) => {
  let result = '';
  const dataClassesIDs = data?.groups.find(item => item?.title === 'Classes')?.children

  if (dataClassesIDs?.length < 0) {
    console.log(chalk.yellow(`\nCan't find Class.\n`));
    return result;
  }

  const mappedSignatures = data?.mappedSignatures

  for (const classID of dataClassesIDs) {
    const dataClass = data.children.find(item => item?.id === classID)
    if (!dataClass) continue
    if (!isTitle) result += `# ${dataClass.name}\n\n`

    const dataConstructorIDs = dataClass.groups.find(item => item?.title === 'Constructors')?.children
    const dataMethodIDs = dataClass.groups.find(item => item?.title === 'Accessors')?.children
    const dataFunctionIDs = dataClass.groups.find(item => item?.title === 'Methods')?.children

    result += generateConstructor(dataConstructorIDs, dataClass, mappedSignatures)
    result += generateAccessor(dataMethodIDs, dataClass, mappedSignatures)
    result += generateMethod(dataFunctionIDs, dataClass, mappedSignatures)
  }

  return result;
}

/**
 * Return trimmed string to use for file name
 * @returns {string} 
 */
const trimFilename = (header, fileType = '') => {
  return header.trim().toLowerCase().replaceAll(' ', '-') + fileType;
}

/**
 * Generate content to md file from JSON 
 * @returns {void}
 */
const generateMD = async () => {
  const entries = [];
  generateDocList.forEach(item => {
    entries.push(item.entries.replaceAll('src', 'lib'))
  })

  for (const i in entries) {
    let entryPoint = entries[i];
    const isJSON = entryPoint.lastIndexOf('.json');
    // if entry isn't json, then turn it to json 
    if (isJSON < 0) {
      const dot = entryPoint.lastIndexOf('.');
      entryPoint = (dot >= 0) ? `${entryPoint.slice(0, dot)}.json` : `${entryPoint}.json`
    }
    const inputFile = path.resolve(entryPoint)

    const name = entries[i].slice(entries[i].lastIndexOf('/') + 1, entries[i].indexOf('.ts'))
    const outputFile = path.resolve(Build.PAGES_FOLDER, `utils/${trimFilename(name, '.md')}`);
    const isFileExist = fs.existsSync(outputFile);


    let content = ``;
    const data = JSON.parse(fs.readFileSync(inputFile, {
      encoding: 'utf8'
    }))

    content += generateClassDocument(data, isFileExist)

    if (isFileExist) {
      fs.appendFileSync(outputFile, content, 'utf-8');
    } else {
      content = `<!-- \ntitle: ${name}\nlocation: ./custom-components/utils/${trimFilename(name)}\ntype: page\nlayout: default\n-->\n\n` + content
      fs.writeFileSync(outputFile, content, 'utf-8');
    }
  }
};

generateMD();