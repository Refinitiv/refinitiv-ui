#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { Source, Build } from './paths.js';

// TODO
const testFileName = 'test.md';
const input = {
  'input': [{
    'title': 'first',
    'description': 'Get the first active cell.',
    'parameters': [{
      'name': 'grid',
      'type': 'NavigationGrid',
      'description': 'The navigation grid'
    }],
    'returns': {
      'type': 'CellIndex &#124; null',
      'description': 'The first active cell index'
    }
  }, {
    'title': 'left',
    'description': 'Navigate _left_ from the cell. If there is no active cell on the _left_, then iterate over preceding rows to find one.',
    'parameters': [{
      'name': 'grid',
      'type': 'NavigationGrid',
      'description': 'The navigation grid'
    },{
      'name': 'cell',
      'type': 'CellIndex',
      'description': 'The cell index'
    }],
    'returns': {
      'type': 'CellIndex &#124; null',
      'description': 'The previous active cell index'
    }
  }]
}

/**
 * Generate content to md file from JSON 
 * @returns {void}
 */
export const generateMD = async () => {
  const outputPath = path.resolve(Build.PAGES_FOLDER, `utils/${testFileName}`);
  let outcome = '';
  
  console.log(`generate ${testFileName}`);
  const generateTitle = (title) => {
    return `### ${title}\n\n`
  }
  const generateDescription = (description) => {
    return `${description}\n\n`
  }
  const generateParameter = (parameters) => {
    let result = '';
    const head = '#### Arguments\n\n| Name | Type | Description |\n| --- | --- | --- |\n';
    result+=head;
    if (parameters.length > 0) {
      for (const arg of parameters) {
        result+=`| ${arg.name || ''} | ${arg.type || ''} | ${arg.description || ''} |\n`;
      }
    }
    result+='\n\n';
    return result;
  }
  const generateReturn = (returns) => {
    let result = '';
    const head = '#### Returns\n\n| Type | Description |\n| --- | --- |\n';
    result+=head;
    result+=`| ${returns.type || ''} | ${returns.description || ''} |\n`;
    result+='\n\n';
    return result;
  }
  for (const item of input.input) {
    outcome+=generateTitle(item?.title);
    outcome+=generateDescription(item?.description);
    outcome+=generateParameter(item?.parameters);
    outcome+=generateReturn(item?.returns);
  }
  
  fs.appendFileSync(outputPath, outcome, 'utf-8');
};