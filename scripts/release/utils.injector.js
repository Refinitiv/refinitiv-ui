#!/usr/bin/env node
import chalk from 'chalk';
import json2md from 'json2md';
import fs from 'node:fs';
import path from 'node:path';

import { Build } from '../../documents/scripts/paths.js';
import { ELEMENT_DIST, ELEMENT_SOURCE, generateDocList, sanitize } from './util.js';

/**
 * Return full text comment from Signature Typedoc structure.
 * @param signature type from typedoc
 * @returns {string} text comment
 */
const getComment = (signature) => {
  if (signature?.comment?.summary?.length < 0) '';
  return signature?.comment?.summary.map((item) => item.text).join('');
};

/**
 * Return full Return text from Signature Typedoc structure.
 * @param signature type from typedoc
 * @returns {string} Return comment
 */
const getReturnComment = (signature) => {
  const blockTags = signature?.comment?.blockTags;
  const contents = blockTags?.find((item) => item.tag === '@returns')?.content || [];
  return contents.map((item) => item.text).join('');
};

/**
 * Generate and return Parameter table in structure of json2md.
 * @param params array parameters of { name, type, description }
 * @returns {array} json2md array
 */
const generateParameter = (params) => {
  const result = [];
  result.push({ h4: 'Arguments' });

  const table = {
    table: {
      headers: ['Name', 'Type', 'Description'],
      rows: []
    }
  };
  if (params.length > 0) {
    for (const { name, type, description } of params) {
      table.table.rows.push([name || '', type || '', sanitize(description) || '']);
    }
  }
  result.push(table);
  return result;
};

/**
 * Generate and return Return table in structure of json2md.
 * @param obj object which has properties type and description
 * @returns {array} json2md array
 */
const generateReturn = ({ type, description }) => {
  const result = [];
  result.push({ h4: 'Returns' });
  const table = {
    table: {
      headers: ['Type'],
      rows: [[type]]
    }
  };
  if (description) {
    table.table.headers.push('Description');
    table.table.rows[0].push(sanitize(description));
  }
  result.push(table);
  return result;
};

/**
 * Generate and return Constructor content in structure of json2md.
 * @param IDs array of id that id is type which matched by typedoc
 * @param dataClass Class that used to convert to md
 * @returns {array} json2md array
 */
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
        description: getComment(item)
      };
    });
    result.push(...generateParameter(params));
  }
  return result;
};

/**
 * Generate and return Constructor content in structure of json2md.
 * @param IDs array of id that id is type which matched by typedoc
 * @param dataClass Class that used to convert to md
 * @returns {array} json2md array
 */
const generateAccessor = (IDs, dataClass, mappedSignatures) => {
  const result = [];
  if (IDs?.length < 0) return result;
  result.push({ h2: 'Accessors' });
  for (const id of IDs) {
    const data = dataClass.children.find((item) => item.id === id);
    if (!data || !data.flags?.isPublic) continue;
    const { getSignature } = data;
    result.push({ h3: getSignature?.name });
    result.push({ p: sanitize(getComment(getSignature)) });
    result.push(
      ...generateReturn({
        type: mappedSignatures.find((item) => item.id - 1 === id)?.returnType,
        description: getReturnComment(getSignature)
      })
    );
  }
  return result;
};

/**
 * Generate and return Method content in structure of json2md.
 * @param IDs array of id that id is type which matched by typedoc
 * @param dataClass Class that used to convert to md
 * @param mappedSignatures Custom signature from class-api-analyzer
 * @returns {array} json2md array
 */
const generateMethod = (IDs, dataClass, mappedSignatures) => {
  const result = [];
  if (IDs?.length < 0) return result;
  result.push({ h2: 'Methods' });
  for (const id of IDs) {
    const data = dataClass.children.find((item) => item.id === id);
    if (!data || !data.flags?.isPublic) continue;

    for (const signature of data.signatures) {
      result.push({ h3: signature?.name });
      result.push({ p: sanitize(getComment(signature)) });
      if (signature?.parameters) {
        const parameters = signature?.parameters?.map((item) => {
          return {
            name: item?.name,
            type: item?.type?.name,
            description: getComment(item)
          };
        });
        result.push(...generateParameter(parameters));
      }
      result.push(
        ...generateReturn({
          type: mappedSignatures.find((item) => item.id - 1 === id)?.returnType,
          description: getReturnComment(signature)
        })
      );
    }
  }
  return result;
};

/**
 * Generate and return Class content in structure of json2md.
 * @param data json
 * @param title title for header level 1.
 * @returns {array} json2md array
 */
const generateClassDocument = (data, title) => {
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
    result.push({ h1: title || dataClass.name });

    const dataConstructorIDs = dataClass.groups.find((item) => item?.title === 'Constructors')?.children;
    const dataMethodIDs = dataClass.groups.find((item) => item?.title === 'Accessors')?.children;
    const dataFunctionIDs = dataClass.groups.find((item) => item?.title === 'Methods')?.children;

    result.push(...generateConstructor(dataConstructorIDs, dataClass));
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
 * Generate md file from JSON
 * @returns {void}
 */
const generateMD = async () => {
  for (const { entry, title } of generateDocList) {
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

    markdown = json2md([...generateClassDocument(json, title)]);

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
