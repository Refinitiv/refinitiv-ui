#!/usr/bin/env node
import path from 'node:path';
import fs from 'node:fs';
import TypeDoc from 'typedoc';
import { generateDocList } from './paths.js';

/**
 * Analyzes class public API from TypeScript, output a JSON file
 * @returns {void}
 */
const handler = async () => {
  const { errorHandler, log, success } = await import('../../scripts/helpers/index.js');
  const { ELEMENT_DIST, ELEMENT_SOURCE } = await import('../../scripts/release/util.js');

  log('Analyzing class API...');

  try {
    const entries = [];
    const tsconfigs = [];
    generateDocList.forEach(item => {
      entries.push(item.entries)
      tsconfigs.push(item.tsconfig)
    })
    
    for (const i in entries) {
      const app = await TypeDoc.Application.bootstrapWithPlugins({
        entryPoints: entries[i],
        excludeProtected: true,
        excludePrivate: true,
        excludeTags: `@ignore`,
        plugin: ['typedoc-plugin-no-inherit'],
        tsconfig: tsconfigs[i]
      });

      const typeReplacements = new Map();
      const replaceTypesWithStrings = (context, reflection, node) => {
        const symbol = context.project.getSymbolFromReflection(reflection);
        if (!symbol) return;

        const type = context.checker.typeToString(context.checker.getTypeOfSymbol(symbol));
        typeReplacements.set(reflection, new TypeDoc.UnknownType(type));
      };

      const mappedSignatures = [];
      const replaceSignatureWithStrings = (context, reflection, node) => {
        mappedSignatures.push({
          id: reflection.id,
          name: reflection.name,
          returnType: reflection.type.toString()
        });
      };

      app.converter.on(TypeDoc.Converter.EVENT_CREATE_PARAMETER, replaceTypesWithStrings);
      app.converter.on(TypeDoc.Converter.EVENT_CREATE_SIGNATURE, replaceSignatureWithStrings);
      app.converter.on(TypeDoc.Converter.EVENT_RESOLVE_BEGIN, () => {
        for (const [param, type] of typeReplacements) {
          param.type = type;
        }
        typeReplacements.clear();
      });

      const project = await app.convert();

      if (project) {
        const fileInput = path.basename(entries[i]);
        const fileName = path.parse(entries[i]).name;
        const outputDir = `${entries[i]
          .replace(ELEMENT_SOURCE, ELEMENT_DIST)
          .replace(fileInput, '')}${fileName}.json`;

        // Generate JSON output
        await app.generateJson(project, outputDir);

        // replace mapped signatures
        const data = JSON.parse(fs.readFileSync(outputDir, { encoding: 'utf8' }));
        data.mappedSignatures = mappedSignatures;

        fs.writeFileSync(outputDir, JSON.stringify(data), 'utf8');
      }
      success(`Generated API JSON of ${entries[i]}`);
    }

    success('Finish analyzing class public API.');
  } catch (error) {
    errorHandler(`Class Analyzer Error: ${error}`);
  }
};

handler();
