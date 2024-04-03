#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import TypeDoc from 'typedoc';

import { error, errorHandler, log, success } from '../helpers/index.js';
import { ELEMENT_DIST, ELEMENT_SOURCE, generateDocList } from './util.js';

/**
 * Stamp isReadonly=true to accessor that has only getter at any classes
 * @param {object} data data json
 * @returns {void}
 */
const stampIsReadonly = (data) => {
  const classIDs = data.groups.find((item) => item.title === 'Classes')?.children;
  classIDs.forEach((classID) => {
    const { groups, children } = data.children.find((itemClass) => itemClass.id === classID);
    groups
      .find((item) => item.title === 'Accessors')
      .children.forEach((accessorID) => {
        const accessorItem = children.find((accessorItem) => accessorID === accessorItem.id);
        if (!accessorItem.setSignature) {
          accessorItem.flags.isReadonly = true;
          accessorItem.getSignature.flags.isReadonly = true;
        }
      });
  });
};

/**
 * Analyzes class public API from TypeScript, output a JSON file
 * @returns {void}
 */
const handler = async () => {
  log('Analyzing class API...');

  try {
    for (const { entry, tsconfig } of generateDocList) {
      const app = await TypeDoc.Application.bootstrapWithPlugins({
        entryPoints: entry,
        excludeProtected: true,
        excludePrivate: true,
        excludeTags: '@ignore',
        plugin: ['typedoc-plugin-no-inherit'],
        tsconfig: tsconfig
      });

      const typeReplacements = new Map();
      const replaceTypesWithStrings = (context, reflection, node) => {
        const symbol = context.project.getSymbolFromReflection(reflection);
        if (!symbol) {
          return;
        }

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
        const fileInput = path.basename(entry);
        const fileName = path.parse(entry).name;
        const outputDir = entry.replace(ELEMENT_SOURCE, ELEMENT_DIST).replace(fileInput, `${fileName}.json`);

        // Generate JSON output
        await app.generateJson(project, outputDir);

        // replace mapped signatures
        const data = JSON.parse(fs.readFileSync(outputDir, { encoding: 'utf8' }));
        data.mappedSignatures = mappedSignatures;
        stampIsReadonly(data);

        fs.writeFileSync(outputDir, JSON.stringify(data), 'utf8');

        success(`Generated API JSON of ${entry}`);
      } else {
        error(`Produced API JSON of ${entry} looks empty`);
      }
    }

    success('Finish analyzing class public API.');
  } catch (error) {
    errorHandler(`Class Analyzer Error: ${error}`);
  }
};

handler();
