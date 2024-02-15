#!/usr/bin/env node
import chalk from 'chalk';
import json2md from 'json2md';
import fs from 'node:fs';
import path from 'node:path';

import { Build } from '../../documents/scripts/paths.js';
import { error, errorHandler, success } from '../helpers/index.js';
import { ELEMENT_DIST, ELEMENT_SOURCE, generateDocList } from './util.js';

/*
 * Return remove and replace unwanted text for json2md.
 */
const json2mdTrim = (text) => {
  return text?.replace('\n', ' ').replaceAll('\r', ' ').replaceAll('`', "'");
};

/**
 * Return full text comment from Signature Typedoc structure.
 * @param signature typedoc's Signature
 * @returns {string} text comment
 */
const getComment = (signature) => {
  if (signature?.comment?.summary && signature.comment.summary.length <= 0) return '';
  return signature.comment.summary.map((item) => item.text).join('');
};

/**
 * Return full Return text from Signature Typedoc structure.
 * @param signature typedoc's Signature
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
      table.table.rows.push([name || '', type || '', json2mdTrim(description) || '']);
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
    table.table.rows[0].push(json2mdTrim(description));
  }
  result.push(table);
  return result;
};

/**
 * Generate and return Constructor content in structure of json2md.
 * @param constructorIDs array of id that id is type which matched by typedoc
 * @param dataClass Class that used to convert to md
 * @returns {array} json2md array
 */
const generateConstructor = (constructorIDs, dataClass) => {
  const result = [];
  const data = dataClass.children.find((item) => item.id === constructorIDs[0]);
  if (data?.signatures[0].parameters?.length > 0) {
    result.push({ h2: 'Constructor' });
    const params = data.signatures[0].parameters.map((item) => {
      return {
        name: item.name,
        type: item.type.name,
        description: getComment(item)
      };
    });
    result.push(...generateParameter(params));
  }
  return result;
};

/**
 * Generate and return Constructor content in structure of json2md.
 * @param accessorIDs array of id that id is type which matched by typedoc
 * @param dataClass Class that used to convert to md
 * @returns {array} json2md array
 */
const generateAccessor = (accessorIDs, dataClass, mappedSignatures) => {
  const result = [];
  if (accessorIDs.length <= 0) return result;
  result.push({ h2: 'Accessors' });
  for (const id of accessorIDs) {
    const data = dataClass.children.find((item) => item.id === id);
    if (!data?.flags?.isPublic) continue;
    const { getSignature } = data;
    result.push({ h3: getSignature.name });
    result.push({ p: json2mdTrim(getComment(getSignature)) });
    result.push(
      ...generateReturn({
        // Typedoc generates 2 id for type. First is declaration for wrapper and Second is signature for info.
        // The signature contains inside the declaration.
        type: mappedSignatures.find((item) => item.id - 1 === id).returnType,
        description: getReturnComment(getSignature)
      })
    );
  }
  return result;
};

/**
 * Generate and return Method content in structure of json2md.
 * @param methodIDs array of id that id is type which matched by typedoc
 * @param dataClass Class that used to convert to md
 * @param mappedSignatures Custom signature from class-api-analyzer
 * @returns {array} json2md array
 */
const generateMethod = (methodIDs, dataClass, mappedSignatures) => {
  const result = [];
  if (methodIDs.length <= 0) return result;
  result.push({ h2: 'Methods' });
  for (const id of methodIDs) {
    const data = dataClass.children.find((item) => item.id === id);
    if (!data?.flags?.isPublic) continue;

    for (const signature of data.signatures) {
      result.push({ h3: signature.name });
      result.push({ p: json2mdTrim(getComment(signature)) });
      if (signature.parameters) {
        const parameters = signature.parameters?.map((item) => {
          return {
            name: item.name,
            type: item.type.name,
            description: getComment(item)
          };
        });
        result.push(...generateParameter(parameters));
      }
      result.push(
        ...generateReturn({
          // Typedoc generates 2 id for type. First is declaration for wrapper and Second is signature for info.
          // The signature contains inside the declaration.
          type: mappedSignatures.find((item) => item.id - 1 === id).returnType,
          description: getReturnComment(signature)
        })
      );
    }
  }
  return result;
};

/**
 * Generate and return Class content in structure of json2md.
 * @param json json
 * @param title title for header level 1.
 * @returns {array} json2md array
 */
const generateClassDocument = (json, title) => {
  const result = [];
  const dataClassesIDs = json.groups.find((item) => item?.title === 'Classes')?.children;

  if (dataClassesIDs?.length <= 0) {
    error("Can't find Class.");
    return result;
  }

  const mappedSignatures = json.mappedSignatures;

  for (const classID of dataClassesIDs) {
    const dataClass = json.children.find((item) => item.id === classID);
    if (!dataClass) continue;
    result.push({ h1: title || dataClass.name });

    const dataConstructorIDs = dataClass.groups.find((item) => item.title === 'Constructors')?.children;
    const dataMethodIDs = dataClass.groups.find((item) => item.title === 'Accessors')?.children;
    const dataFunctionIDs = dataClass.groups.find((item) => item.title === 'Methods')?.children;

    dataConstructorIDs && result.push(...generateConstructor(dataConstructorIDs, dataClass));
    dataMethodIDs && result.push(...generateAccessor(dataMethodIDs, dataClass, mappedSignatures));
    dataMethodIDs && result.push(...generateMethod(dataFunctionIDs, dataClass, mappedSignatures));
  }

  return result;
};

/**
 * Return trimmed string to use for file name
 * @returns {string}
 */
const toKebabCase = (header) => {
  return header.trim().toLowerCase().replaceAll(' ', '-');
};

/**
 * Generate md file from JSON
 * @returns {void}
 */
const generateMD = async () => {
  for (const { entry, title, output } of generateDocList) {
    // entry is input ts file path
    const entryPoint = entry.replaceAll(ELEMENT_SOURCE, ELEMENT_DIST);
    const { dir, name } = path.parse(entryPoint);
    const inputFile = path.join(dir, name + '.json'); // convert .ts to .json
    if (!fs.existsSync(inputFile)) continue;

    const outputFile = path.resolve(Build.PAGES_FOLDER, output);

    try {
      let markdown = '';
      const json = JSON.parse(
        fs.readFileSync(inputFile, {
          encoding: 'utf8'
        })
      );

      markdown = json2md([...generateClassDocument(json, title)]);

      if (fs.existsSync(outputFile)) {
        fs.appendFileSync(outputFile, markdown, 'utf-8');
      } else {
        markdown =
          `<!-- \ntitle: ${name}\nlocation: ./custom-components/utils/${toKebabCase(
            name
          )}\ntype: page\nlayout: default\n-->\n\n` + markdown;
        fs.writeFileSync(outputFile, markdown, 'utf-8');
      }
      success(`Finish convert to md file: ${output}`);
    } catch (error) {
      errorHandler(`Unable to convert ${output} to md file. Error: ${error}`);
    }
  }
};

generateMD();
