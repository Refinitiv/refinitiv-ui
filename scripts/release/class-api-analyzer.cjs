#!/usr/bin/env node
const path = require('node:path');
const TypeDoc = require('typedoc');

// List's used to extract
const entries = ['collection/collection-composer.ts'];

/**
 * Analyzes class public API from TypeScript, output a JSON file
 * @returns {void}
 */
const handler = async () => {
  const { errorHandler, log, success } = await import('../helpers/index.js');
  const { ELEMENT_DIST, ELEMENT_SOURCE } = await import('./util.js');

  log('Analyzing class API...');

  try {
    const replacements = new Map();
    for (let entryPoint of entries) {
      entryPoint = 'src/' + entryPoint;
      const app = await TypeDoc.Application.bootstrapWithPlugins({
        entryPoints: [entryPoint],
        excludeProtected: true,
        excludePrivate: true,
        excludeTags: `@ignore`
      });

      const replaceTypesWithStrings = (context, reflection, node) => {
        const symbol = context.project.getSymbolFromReflection(reflection);
        if (!symbol) return;

        const type = context.checker.typeToString(context.checker.getTypeOfSymbol(symbol));
        replacements.set(reflection, new TypeDoc.UnknownType(type));
      };

      app.converter.on(TypeDoc.Converter.EVENT_CREATE_PARAMETER, replaceTypesWithStrings);
      app.converter.on(TypeDoc.Converter.EVENT_RESOLVE_BEGIN, () => {
        for (const [param, type] of replacements) {
          param.type = type;
        }
        replacements.clear();
      });

      const project = await app.convert();

      if (project) {
        const fileInput = path.basename(entryPoint);
        const fileName = path.parse(entryPoint).name;
        const outputDir = entryPoint.replace(ELEMENT_SOURCE, ELEMENT_DIST).replace(fileInput, '');
        // Generate JSON output
        await app.generateJson(project, outputDir + `${fileName}.json`);
      }
      success(`Generated API JSON of ${entryPoint}`);
    }

    success('Finish analyzing class public API.');
  } catch (error) {
    errorHandler(`Class Analyzer Error: ${error}`);
  }
};

handler();
