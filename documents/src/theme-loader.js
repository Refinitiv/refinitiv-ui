const themeVariant = document.documentElement.getAttribute('prefers-color-scheme');

const ElementsPackage = '/@refinitiv-ui/elements';
const HaloThemePackage = '/@refinitiv-ui/halo-theme';

const ThemePackage = {
  halo: {
    native: {
      light: () => `${HaloThemePackage}/light/imports/native-elements.js`,
      dark: () => `${HaloThemePackage}/dark/imports/native-elements.js`
    },
    element: {
      index: (name) => `${ElementsPackage}/${name}/index.js`,
      light: (name) => `${ElementsPackage}/${name}/themes/halo/light/index.js`,
      dark: (name) => `${ElementsPackage}/${name}/themes/halo/dark/index.js`
    }
  }
};

/**
 * Apply generic style overrides
 * @returns {void}
 */
const applyThemeWrapper = () => {
  const sheet = document.createElement('style');
  sheet.innerHTML = `
    :root {
      height: auto;
      min-height: 80px;
    }
  `;

  document.head.appendChild(sheet);
};

/**
 * Load Halo Light theme
 * @param elements The list of element themes to load
 * @returns {Promise<void>}
 */
const haloLight = async (...elements) => {
  await Promise.all([
    import(ThemePackage.halo.native.light()),
    ...elements.map(element => {
      import(ThemePackage.halo.element.light(element))
    })
  ]);
};

/**
 * Load Halo Dark theme
 * @param elements The list of element themes to load
 * @returns {Promise<void>}
 */
const haloDark = async (...elements) => {
  await Promise.all([
    import(ThemePackage.halo.native.dark()),
    ...elements.map(element => {
      import(ThemePackage.halo.element.dark(element))
    })
  ]);
};

/**
 * Load Halo theme. The variant is based on Documentation
 * @param elements The list of element themes to load
 * @returns {Promise<void>}
 */
const halo = async (...elements) => {
  if (themeVariant === 'light') {
    await haloLight(...elements);
  }
  else {
    await haloDark(...elements);
  }
};



applyThemeWrapper();

export {
  themeVariant,
  halo,
  haloDark,
  haloLight
};
