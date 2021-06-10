const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const fg = require('fast-glob');
const wca = require('web-component-analyzer');

const { ELEMENT_DIST } = require('./util');

const getDeclarationMethods = (meta) => {
  if (!meta || !meta.results || !meta.results.length) {
    return [];
  }
  const [result] = meta.results;
  if (!result.componentDefinitions || !result.componentDefinitions.length) {
    return [];
  }

  const [componentDefinition] = result.componentDefinitions;
  const declaration = componentDefinition.declaration();
  const declarationMethods = declaration.methods;
  return declarationMethods;
};

const generateParamByInfo = (info, result) => {
  if (info) {
    result.description = info.node.comment;
    if (
      info &&
      info.node &&
      info.node.typeExpression &&
      info.node.typeExpression.type &&
      info.node.typeExpression.type.typeName
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
    detail &&
    detail.valueDeclaration &&
    detail.valueDeclaration.type &&
    detail.valueDeclaration.type.typeName
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
    params,
  };
};

const declarationMethodFilter = (method) => method !== null;

const getMethods = (data, meta) => {
  /**
   * it will work if they fix the methods field of data
   */
  // const dataMethods = data.methods || [];
  // const methods = dataMethods.map(dataMethod => ({
  //   name: dataMethod.name,
  //   description: dataMethod.description,
  //   params: dataMethod.arguments || dataMethod.arguments.map(argument => ({
  //     name: argument.name,
  //     description: argument.description,
  //     type: argument.type,
  //   }))
  // }));

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
const OUTPUT_FILENAME = 'custom-elements.json';

/**
 * Analyzes element's public API from TypeScript, output a JSON file
 * @returns {void}
 */
const handler = async () => {
  // Looking for `index.ts` 1 level under `src/`
  const entries = await fg([`./src/*/${INPUT_FILENAME}`], { unique: true });

  if (entries.length === 0) return;

  for (const entrypoint of entries) {
    const outDir = entrypoint.replace(ELEMENT_SRC, ELEMENT_DIST).replace(INPUT_FILENAME, '');
    const outFile = path.join(outDir, OUTPUT_FILENAME);

    const entrypointFile = fs.readFileSync(entrypoint, { encoding: 'utf8' });
    const meta = wca.analyzeText(entrypointFile);
    const rawJson = wca.transformAnalyzerResult(
      'json',
      meta.results,
      meta.program
    );

    const jsonObj = JSON.parse(rawJson);
    const methods = getMethods(jsonObj, meta);

    // Extract method details from meta data and added to jsonObj
    if (jsonObj.tags && jsonObj.tags.length > 0 && methods.length > 0) {
      jsonObj.tags[0].methods = methods;
    }

    const json = JSON.stringify(jsonObj, null, 2);

    // Only write file if there is any API
    if (jsonObj.tags.length) {
      fs.writeFileSync(outFile, json, 'utf8');
    }
  }

  console.log(chalk.green(`\nFinish analyzing element\'s public API.\n`))
};

try {
  console.log(`\nAnalyzing element\'s API...\n`);
  handler();
} catch (error) {
  console.error(chalk.red(`Element Analyzer Error: ${error}`))
}
