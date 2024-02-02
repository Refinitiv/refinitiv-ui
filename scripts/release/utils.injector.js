#!/usr/bin/env node
import chalk from 'chalk';
import json2md from 'json2md';
import fs from 'node:fs';
import path from 'node:path';

import { Build } from '../../documents/scripts/paths.js';
import { ELEMENT_DIST, ELEMENT_SOURCE, generateDocList } from './util.js';

const sanitizeText = (text) => {
  return text?.replace('\n', ' ').replaceAll('\r', ' ').replaceAll('`', "'");
};
const generateParameter = (params) => {
  const result = [];
  result.push({ h4: 'Arguments' });

  const table = {
    table: {
      headers: ['Name', 'Type', 'Description'],
      rows: [[]]
    }
  };
  if (params.length > 0) {
    for (const { name, type, description } of params) {
      table.table.rows.push([name || '', type || '', sanitizeText(description) || '']);
    }
  }

  // add table
  result.push(table);

  return result;
};
const generateReturn = ({ type, description }) => {
  const result = [];
  result.push({ h4: 'Returns' });
  // add table
  const table = {
    table: {
      headers: ['Type'],
      rows: [[type]]
    }
  };
  if (description) {
    table.table.headers.push('Description');
    table.table.rows[0].push(sanitizeText(description));
  }
  result.push(table);
  return result;
};
const generateConstructor = (IDs, dataClass) => {
  const result = [];
  const data = dataClass.children.find((item) => item.id === IDs[0]);
  if (!data) return result;

  result.push({ h2: 'Constructor' });
  if (data?.signatures[0].parameters?.length > 0) {
    const params = data?.signatures[0].parameters.map((item) => {
      return {
        name: item?.name,
        type: item?.type?.name,
        description: item?.comment?.summary[0]?.text || ''
      };
    });
    result.push(...generateParameter(params));
  }
  return result;
};

const generateAccessor = (IDs, dataClass, mappedSignatures) => {
  const result = [];
  if (IDs?.length < 0) return result;
  result.push({ h2: 'Accessors' });
  for (const id of IDs) {
    const data = dataClass.children.find((item) => item.id === id);
    if (!data || !data.flags?.isPublic) continue;
    const getSignature = data.getSignature;
    result.push({ h3: getSignature?.name });
    result.push({ p: sanitizeText(getSignature?.comment?.summary[0]?.text) });
    if (getSignature?.parameters) {
      const params = getSignature?.parameters?.map((item) => {
        return {
          name: item?.name,
          type: item?.type?.name,
          description: item?.comment?.summary[0]?.text || ''
        };
      });
      result.push(...generateParameter(params));
    }

    const summaries = getSignature?.comment?.summary;
    let returnDescription = '';
    if (summaries?.length > 0) {
      for (const summary of summaries) {
        returnDescription += summary.text;
      }
    }
    result.push(
      ...generateReturn({
        type: mappedSignatures.find((item) => item.id - 1 === id)?.returnType,
        description: returnDescription
      })
    );
  }
  return result;
};

const generateMethod = (IDs, dataClass, mappedSignatures) => {
  const result = [];
  if (IDs?.length < 0) return result;
  result.push({ h2: 'Methods' });
  for (const id of IDs) {
    const data = dataClass.children.find((item) => item.id === id);
    if (!data || !data.flags?.isPublic) continue;
    for (const signature of data.signatures) {
      result.push({ h3: signature?.name });
      result.push({ p: sanitizeText(signature?.comment?.summary[0]?.text) });
      if (signature?.parameters) {
        const parameters = signature?.parameters?.map((item) => {
          return {
            name: item?.name,
            type: item?.type?.name,
            description: item?.comment?.summary[0]?.text || ''
          };
        });
        result.push(...generateParameter(parameters));
      }

      const blockTags = signature?.comment?.blockTags;
      const contents = blockTags && blockTags[0]?.content ? blockTags[0]?.content : '';
      let returnDescription = '';
      if (contents?.length > 0) {
        for (const content of contents) {
          returnDescription += content.text;
        }
      }
      result.push(
        ...generateReturn({
          type: mappedSignatures.find((item) => item.id - 1 === id)?.returnType,
          description: returnDescription
        })
      );
    }
  }
  return result;
};
/**
 * Generate document based on class
 * @returns {string}
 */
const generateClassDocument = (data, isTitle) => {
  const result = [];
  const dataClassesIDs = data?.groups.find((item) => item?.title === 'Classes')?.children;

  if (dataClassesIDs?.length < 0) {
    console.log(chalk.yellow(`\nCan't find Class.\n`));
    return result;
  }

  const mappedSignatures = data?.mappedSignatures;

  for (const classID of dataClassesIDs) {
    const dataClass = data.children.find((item) => item?.id === classID);
    if (!dataClass) continue;
    if (!isTitle) result.push({ h1: dataClass.name });

    const dataConstructorIDs = dataClass.groups.find((item) => item?.title === 'Constructors')?.children;
    const dataMethodIDs = dataClass.groups.find((item) => item?.title === 'Accessors')?.children;
    const dataFunctionIDs = dataClass.groups.find((item) => item?.title === 'Methods')?.children;

    result.push(...generateConstructor(dataConstructorIDs, dataClass, mappedSignatures));
    result.push(...generateAccessor(dataMethodIDs, dataClass, mappedSignatures));
    result.push(...generateMethod(dataFunctionIDs, dataClass, mappedSignatures));
  }

  return result;
};

/**
 * Return trimmed string to use for file name
 * @returns {string}
 */
const trimFilename = (header, fileType = '') => {
  return header.trim().toLowerCase().replaceAll(' ', '-') + fileType;
};

/**
 * Generate content to md file from JSON
 * @returns {void}
 */
const generateMD = async () => {
  for (const { entry } of generateDocList) {
    let entryPoint = entry.replaceAll(ELEMENT_SOURCE, ELEMENT_DIST);
    const isJSON = entryPoint.lastIndexOf('.json');
    // if entry isn't json, then turn it to json
    if (isJSON < 0) {
      const dot = entryPoint.lastIndexOf('.');
      entryPoint = dot >= 0 ? `${entryPoint.slice(0, dot)}.json` : `${entryPoint}.json`;
    }
    const inputFile = path.resolve(entryPoint);

    const name = entry.slice(entry.lastIndexOf('/') + 1, entry.indexOf('.ts'));
    const outputFile = path.resolve(Build.PAGES_FOLDER, `utils/${trimFilename(name, '.md')}`);
    const isFileExist = fs.existsSync(outputFile);

    let markdown = '';
    const json = JSON.parse(
      fs.readFileSync(inputFile, {
        encoding: 'utf8'
      })
    );

    markdown = json2md([...generateClassDocument(json, isFileExist)]);

    if (isFileExist) {
      fs.appendFileSync(outputFile, markdown, 'utf-8');
    } else {
      markdown =
        `<!-- \ntitle: ${name}\nlocation: ./custom-components/utils/${trimFilename(
          name
        )}\ntype: page\nlayout: default\n-->\n\n` + markdown;
      fs.writeFileSync(outputFile, markdown, 'utf-8');
    }
  }
};

generateMD();
