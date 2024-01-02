#!/usr/bin/env node
const path = require('node:path');
const TypeDoc = require('typedoc');

/**
 * Analyzes class public API from TypeScript, output a JSON file
 * @returns {void}
 */
const handler = async () => {
  const { errorHandler, log, success } = await import('../helpers/index.js');
  const { ELEMENT_DIST, ELEMENT_SOURCE} = await import('./util.js');

  log("Analyzing class API...");

  try {
    const entries = ["src/collection/collection-composer.ts"]
    for (const entryPoint of entries) {
      const app = await TypeDoc.Application.bootstrapWithPlugins({
        entryPoints: [entryPoint],
        excludeProtected: true,
        excludePrivate: true,
        excludeTags: `@ignore`
      });
      const project = await app.convert();

      if (project) {
        const fileInput = path.basename(entryPoint);
        const fileName = path.parse(entryPoint).name;
        const outputDir = entryPoint.replace(ELEMENT_SOURCE, ELEMENT_DIST).replace(fileInput, '');
        // Generate JSON output
        await app.generateJson(project, outputDir + `${fileName}.json`);
      }
    }

    success("Finish analyzing class public API.");
  } catch (error) {
    errorHandler(`Class Analyzer Error: ${error}`);
  }
};

handler();
