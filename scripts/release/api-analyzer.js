#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const fg = require('fast-glob');
const wca = require('web-component-analyzer');

const { log, errorHandler, success, error } = require('../helpers');
const { ELEMENT_DIST, ELEMENT_PREFIX, PACKAGE_ROOT } = require('./util');

console.log('PACKAGE_ROOT', PACKAGE_ROOT);

const getDeclarationMethods = (meta) => {
  if (!meta || !meta.results || !meta.results.length) {
    return [];
  }
  const [result] = meta.results;
  if (!result.componentDefinitions || !result.componentDefinitions.length) {
    return [];
  }

  const [componentDefinition] = result.componentDefinitions;
  const declaration = componentDefinition.declaration;
  const declarationMethods = declaration.methods;
  return declarationMethods;
};

const generateParamByInfo = (info, result) => {
  if (info) {
    result.description = info.node.comment;
    if (
      info
      && info.node
      && info.node.typeExpression
      && info.node.typeExpression.type
      && info.node.typeExpression.type.typeName
    ) {
      result.type = info.node.typeExpression.type.typeName.escapedText;
    }
  }
};

const generateInfo = (declarationMethod, name) => {
  if (!declarationMethod.jsDoc) {
    return null;
  }
  if (!declarationMethod.jsDoc.tags) {
    return null;
  }
  const info = declarationMethod.jsDoc.tags.find(
    (tag) => tag.node && tag.node.name && tag.node.name.escapedText === name
  );
  return info;
};

const generateParamByDetail = (detail, result) => {
  if (
    detail
    && detail.valueDeclaration
    && detail.valueDeclaration.type
    && detail.valueDeclaration.type.typeName
  ) {
    result.type = detail.valueDeclaration.type.typeName.escapedText;
  }
};

const getParsedLocalParam = (name, detail, declarationMethod) => {
  const param = { name };
  const info = generateInfo(declarationMethod, name);
  generateParamByInfo(info, param);
  generateParamByDetail(detail, param);
  return param;
};

const getParsedParams = (declarationMethod) => {
  const params = [];
  const locals = Array.from(declarationMethod.node.locals);
  for (const [name, detail] of locals) {
    if (detail.flags !== null && detail.flags <= 1) {
      const param = getParsedLocalParam(name, detail, declarationMethod);
      params.push(param);
    }
  }
  return params;
};

const getParsedVisibility = (declarationMethod) =>
  declarationMethod.visibility ? declarationMethod.visibility : 'public';

const getParsedName = (declarationMethod) =>
  declarationMethod.name ? declarationMethod.name : '';

const getParsedDescription = (declarationMethod) =>
  declarationMethod.jsDoc ? declarationMethod.jsDoc.description : '';

const isPublic = (name, visibility) =>
  visibility === 'public' && name.indexOf('_') !== 0;

const declarationMethodMapCallback = (declarationMethod) => {
  const name = getParsedName(declarationMethod);
  const description = getParsedDescription(declarationMethod);
  const visibility = getParsedVisibility(declarationMethod);
  const params = getParsedParams(declarationMethod);
  if (!isPublic(name, visibility)) {
    return null;
  }
  return {
    name,
    description,
    params
  };
};

const declarationMethodFilter = (method) => method !== null;

const getMethods = (data, meta) => {
  const declarationMethods = getDeclarationMethods(meta);
  const methods = declarationMethods
    .map(declarationMethodMapCallback)
    .filter(declarationMethodFilter);
  return methods;
};

// Element source path
const ELEMENT_SRC = 'src';

// Element entrpoiny to be analyzed
const INPUT_FILENAME = 'index.ts';

// The output filename
const OUTPUT_FILENAME = 'custom-elements';

// Validate if data from analyzer is match to element's tag name
const isValidAPI = (data, element) => {
  const jsonObj = JSON.parse(data);
  return (jsonObj.tags.length && jsonObj.tags[0].name === `${ELEMENT_PREFIX}-${element}`);
};

/**
 * Analyze API
 *
 * @param {string} file  file path
 * @param {string} element element name
 * @returns {(Object|boolean)} element api
 */
const analyze = (file, type) => {
  let output;
  const data = fs.readFileSync(file, { encoding: 'utf8' });
  const meta = wca.analyzeText(data);

  meta.results.forEach(result => {
    result.componentDefinitions.forEach(definition => {
      const { declaration } = definition;
      const propCollection = {};

      if(!declaration || declaration && !declaration.members) {
        error(`Element Analyzer Error: declaration property is missing.`);
        return;
      }

      // WORKAROUND: Modify meta data of properties/attributes to make it fit with api reference tables of "elf-docs"
      declaration.members.forEach(member => {
        let { propName, attrName, kind } = member;

        // Convert default value of properties to theirs actual type
        if(member.default === 'null') {
          member.default = null;
        }
        else if(member.default === '[]') {
          member.default = [];
        }
        else if(member.default === 'true' || member.default === 'false') {
          member.default = member.default === 'true';
        }
        else if(member.default === '{}') {
          member.default = {};
        }

        // Merge attributes that defined by JSDOC to properties table
        if(propName && !attrName) {
          propCollection[propName] = member;
        }
        if(kind === 'attribute' && !propName && attrName) {
          const attrCamelCase = attrName.replace(/-./g, attr => attr.length > 0 ? attr[1].toUpperCase() : '');
          if(propCollection[attrCamelCase]) {
            propCollection[attrCamelCase].attrName = attrName;
          }
        }
        // Remove readonly modifier of properties from meta data
        if(member.modifiers && member.modifiers.has('readonly')) {
          member.propName = member.propName + ' (readonly)';
          member.modifiers.delete('readonly');
        }
      })
    })
  });

  if(type === 'json') {
    const rawJson = wca.transformAnalyzerResult('json', meta.results, meta.program);
    const jsonObj = JSON.parse(rawJson);
    const methods = getMethods(jsonObj, meta);

    // Extract method details from meta data and added to jsonObj
    if (jsonObj.tags && jsonObj.tags.length > 0 && methods.length > 0) {
      jsonObj.tags[0].methods = methods;
    }

    output = JSON.stringify(jsonObj, null, 2);
  } else {
    output = wca.transformAnalyzerResult('markdown', meta.results, meta.program);
  }
  return output;
};

/**
 * Analyzes element's public API from TypeScript, output a JSON file
 * @returns {void}
 */
const handler = async () => {
  // Looking for `index.ts` in each element source folder
  const globUrl = `${PACKAGE_ROOT}/${ELEMENT_SRC}/*/${INPUT_FILENAME}`;
  // A glob pattern is always in POSIX format.
  const entries = await fg([globUrl.replace(/\\/g, '/')], { unique: true });

  if (entries.length === 0) {
    return;
  }
  for (const entrypoint of entries) {
    const elementNameRegEx = new RegExp(`^.*\\/${ELEMENT_SRC}\\/([\\w-]+)`);
    const element = entrypoint.match(elementNameRegEx)[1];
    const outDir = entrypoint.replace(ELEMENT_SRC, ELEMENT_DIST).replace(INPUT_FILENAME, '');
    const jsonFile = path.join(outDir, `${OUTPUT_FILENAME}.json`);
    const mdFile = path.join(outDir, `${OUTPUT_FILENAME}.md`);

    // Analyze API
    let elementAPI = analyze(entrypoint, 'json');
    let elementDoc = analyze(entrypoint, 'md');

    /**
     * If not found any API in default entrypoint,
     * try to look for <element name>.ts file in the sub directories
     */
    if (!isValidAPI(elementAPI, element)) {
      const altGlobUrl = `${PACKAGE_ROOT}/${ELEMENT_SRC}/**/${element}.ts`;
      // A glob pattern is always in POSIX format.
      const altEntrypoint = (await fg([altGlobUrl.replace(/\\/g, '/')], { unique: true }) || [])[0];
      if (altEntrypoint) {
        elementAPI = analyze(altEntrypoint, 'json');
        elementDoc = analyze(altEntrypoint, 'md');
      }
    }

    // Only write file if API is matched to element tag
    if (isValidAPI(elementAPI, element)) {
      success(`Generating API for ${element}`);

      // Create output directory path if not exist
      const dirname = path.dirname(jsonFile);
      if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
      }

      fs.writeFileSync(jsonFile, elementAPI, 'utf8');
      fs.writeFileSync(mdFile, elementDoc, 'utf8');
    } else {
      error(`Failed: Unable to generate API for ${element}`);
    }
  }

  success('Finish analyzing element\'s public API.');
};

try {
  log('Analyzing element\'s API...');
  handler();
} catch (error) {
  errorHandler(`Element Analyzer Error: ${error}`);
}
