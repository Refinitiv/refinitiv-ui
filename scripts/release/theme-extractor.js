#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const fg = require('fast-glob');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { log, errorHandler, success, ROOT } = require('../helpers/index.js');
const {
  ELEMENT_SOURCE,
  ELEMENT_DIST,
  getElementList,
  getElementTagName,
  normalizePathSeparators
} = require('./util.js');

// Element package scope
const PACKAGE_NAME = '@refinitiv-ui/elements';

// Where to look for theme files
const THEME_SOURCE = normalizePathSeparators(`${ROOT}/node_modules/${PACKAGE_NAME.split('/')[0]}/`);

// Post-fix of theme name
const THEME_POSTFIX = '-theme';

// Where all the themes are, relative to each element's outDir
const THEMES_DIRECTORY = 'themes';

const options = yargs(hideBin(process.argv))
  .command('$0 [src]', 'Specify the source of the script', (yargs) => {
    return yargs.positional('src', {
      describe: 'Source of the script',
      type: 'string',
      default: ''
    });
  })
  .option('themes', {
    alias: 't',
    describe: 'Themes separated by commas',
    type: 'string',
    default: 'halo,solar'
  }).argv;

// Extract the src and themes argument
const { themes, src } = options;
const THEMES = themes?.split(',');

/**
 * Create a dependency map for all elements
 * @returns {Promise<[{ dir: string, elements: string[], dependencies: string[] }]>} DependencyMap
 */
const createDependencyMap = async () => {
  const dependencyPaths = await getElementList(path.join(process.cwd(), src, ELEMENT_SOURCE));

  const elements = dependencyPaths.reduce((entries, path) => {
    const elementTagName = getElementTagName(path);
    const currentDir = path.split(`${ELEMENT_SOURCE}/`)[1].split('/')[0];

    // Check if element is from one of the existing directory
    // If yes add it to the existing object
    const elementIndex = entries.findIndex(({ dir }) => dir === currentDir);
    if (elementIndex !== -1) {
      entries[elementIndex] = {
        ...entries[elementIndex],
        elements: entries[elementIndex].elements.concat(elementTagName)
      };
    } else {
      entries.push({
        dir: currentDir,
        elements: [elementTagName],
        dependencies: []
      });
    }
    return entries;
  }, []);

  // Mapping dependencies into dependency map
  let map = [];
  for (let i = 0; i < elements.length; i++) {
    let dependencies = [];
    const group = elements[i];

    for (let j = 0; j < group.elements.length; j++) {
      // Assuming all themes have the same set of dependency
      const themeRepositoryName = THEMES[0] + THEME_POSTFIX;
      const themesFound = await fg(
        normalizePathSeparators(`${path.join(THEME_SOURCE, themeRepositoryName)}/**/${group.elements[j]}.js`)
      );

      for (const theme of themesFound) {
        dependencies = dependencies.concat(
          extractThemeDependency(theme)
            // It must not include internal element, entrypoint is a single file
            // It will be define later
            .filter((dep) => !group.elements.includes(dep))
        );
      }
    }

    map[i] = {
      ...group,
      // Filter out any duplicate dependencies
      dependencies: dependencies.filter((dep, index) => dependencies.indexOf(dep) === index)
    };
  }
  return map;
};

/**
 * Extract theme dependency from theme file path
 * @param {string} themePath path to the target theme
 * @returns {string[]} array of theme dependencies
 */
const extractThemeDependency = (themePath) => {
  if (!themePath) {
    return [];
  }

  const themeContent = fs.readFileSync(themePath).toString();
  const importRegex = /^import .*/gm;
  const matchedImports = themeContent
    .match(importRegex)
    .filter((matched) => !matched.includes('native-elements'));

  if (!matchedImports) {
    return [];
  }

  return matchedImports.map((matched) => matched.replace("import './", '').replace(".js';", ''));
};

/**
 * Look for theme paths using elements name
 * @param {string[]} elements array of element names
 * @returns {string[]} array of themes path
 */
const getThemes = async (elements) => {
  let themes = [];
  for (const theme of THEMES) {
    const themeRepositoryName = theme + THEME_POSTFIX;
    themes = themes.concat(
      await fg(
        normalizePathSeparators(`${path.join(THEME_SOURCE, themeRepositoryName)}/**/${elements[0]}.js`)
      )
    );
  }

  return themes;
};

/**
 * Extracts themes to each individual element
 * Element should be shipped with its theme and its dependency's theme
 *
 * @example
 * import '@refinitiv-ui/elements/button';
 * import '@refinitiv-ui/elements/button/themes/halo/dark';
 *
 * This -> import '@refinitiv-ui/elements/button/themes/halo/dark';
 * Should contain
 *
 *      import '@refinitiv-ui/elements/icon/themes/halo/dark';
 *      import '@refinitiv-ui/elements/tooltip/themes/halo/dark';
 *
 * which are dependencies of button along with button's theme.
 *
 * @returns {void}
 */
const handler = async () => {
  const dependencyMap = await createDependencyMap();

  // DEBUG: This will log the dependency tree of all elements
  // console.log(dependencyMap);

  for (const { dir, elements, dependencies } of dependencyMap) {
    const themes = await getThemes(elements);

    for (const variant of themes) {
      /**
       * Strip prefix of theme source path and rename to index.js
       * @example 'node_modules/@refinitiv-ui/halo-theme/dark/ef-icon.js' -> 'halo/dark/indexjs'
       */
      const variantPath = variant
        .split(THEME_SOURCE)[1]
        .replace(THEME_POSTFIX, '')
        .replace(path.basename(variant, '.js'), 'index');

      /**
       * Themes entrypoint
       * @example lib/appstate-bar/themes/halo/light/index.js
       */
      let entrypoint = normalizePathSeparators(path.join(ELEMENT_DIST, dir, THEMES_DIRECTORY, variantPath));

      if (src) {
        entrypoint = normalizePathSeparators(path.join(src, entrypoint));
      }

      // Prepare folders structure
      fs.mkdirSync(path.dirname(entrypoint), {
        recursive: true
      });

      // Clean up file
      if (fs.existsSync(entrypoint)) {
        fs.unlinkSync(entrypoint);
      }

      // Appending dependencies to each entrypoint
      for (const dependency of dependencies) {
        // Strip element prefix
        const dep = dependency.replace(`${dependency.split('-')[0]}-`, '');
        const variant = path.dirname(variantPath);
        const dependencyImport = `import '${normalizePathSeparators(
          path.join(PACKAGE_NAME, dep, THEMES_DIRECTORY, variant)
        )}';\n`;

        // Clean up file
        if (fs.existsSync(entrypoint)) {
          if (fs.readFileSync(entrypoint).toString().includes(dependencyImport)) {
            continue;
          }
        }

        fs.appendFileSync(entrypoint, dependencyImport);
      }

      // Appending theme definition to each entrpoint
      for (const element of elements) {
        const possibleThemeEntrypoint = path.join(path.dirname(variant), `${element}.js`);

        if (!fs.existsSync(possibleThemeEntrypoint)) {
          continue;
        }

        // Reads theme entrypoint content
        const sourceContent = fs.readFileSync(possibleThemeEntrypoint).toString();
        const componentThemeDefinition = sourceContent.substring(
          sourceContent.indexOf("dispatchEvent(new CustomEvent('ef.customStyles.define'")
        );

        // Skip if the file already contain the same component definition
        if (fs.existsSync(entrypoint)) {
          if (
            !componentThemeDefinition ||
            fs.readFileSync(entrypoint).toString().includes(componentThemeDefinition)
          ) {
            continue;
          }
        }

        fs.appendFileSync(entrypoint, `${componentThemeDefinition}`);
      }
    }
  }

  success(`Finish extracting themes of ${dependencyMap.length} elements.`);
};

try {
  log('Extracting themes...');
  handler();
} catch (error) {
  errorHandler(`Theme Extractor Error: ${error}`);
}
