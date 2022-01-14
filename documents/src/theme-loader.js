const themeVariant = document.documentElement.getAttribute('prefers-color-scheme');

const HaloThemePackage = 'https://cdn.skypack.dev/@refinitiv-ui/halo-theme';
const SolarThemePackage = 'https://cdn.skypack.dev/@refinitiv-ui/solar-theme';
const CorePackage = 'https://cdn.skypack.dev/@refinitiv-ui/core?min';
const ElementsPackage = 'https://cdn.skypack.dev/@refinitiv-ui/elements';

const ThemePackage = {
  halo: {
    native: {
      light: () => `${HaloThemePackage}/light/imports/native-elements?min`,
      dark: () => `${HaloThemePackage}/dark/imports/native-elements?min`
    },
    element: {
      light: (name) => `${ElementsPackage}/${name}/themes/halo/light?min`,
      dark: (name) => `${ElementsPackage}/${name}/themes/halo/dark?min`
    }
  },
  solar: {
    native: {
      pearl: () => `${SolarThemePackage}/pearl/imports/native-elements?min`,
      charcoal: () => `${SolarThemePackage}/charcoal/imports/native-elements?min`
    },
    element: {
      pearl: (name) => `${ElementsPackage}/${name}/themes/solar/pearl?min`,
      charcoal: (name) => `${ElementsPackage}/${name}/themes/solar/charcoal?min`
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
  font-size: calc(.625em / 10);
}
`;

  document.head.appendChild(sheet);
};

/**
 * Load ELF core if themes are loaded prior to elements
 * or element import does not exist
 * @returns {Promise<void>}
 */
const loadCore = async () => {
  if (typeof window.elf === 'undefined') {
    await import(`${CorePackage}`);
  }
};

/**
 * Load Halo Light theme
 * @param elements The list of element themes to load
 * @returns {Promise<void>}
 */
const haloLight = async (...elements) => {
  await loadCore();
  await Promise.all([
    import(ThemePackage.halo.native.light()),
    ...elements.map(element => import(ThemePackage.halo.element.light(element)))
  ]);
};

/**
 * Load Halo Dark theme
 * @param elements The list of element themes to load
 * @returns {Promise<void>}
 */
const haloDark = async (...elements) => {
  await loadCore();
  await Promise.all([
    import(ThemePackage.halo.native.dark()),
    ...elements.map(element => import(ThemePackage.halo.element.dark(element)))
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


/**
 * Load Solar Pearl theme
 * @param elements The list of element themes to load
 * @returns {Promise<void>}
 */
const solarPearl = async (...elements) => {
  await loadCore();
  await Promise.all([
    import(ThemePackage.solar.native.pearl()),
    ...elements.map(element => import(ThemePackage.solar.element.pearl(element)))
  ]);
};

/**
 * Load Solar Charcoal theme
 * @param elements The list of element themes to load
 * @returns {Promise<void>}
 */
const solarCharcoal = async (...elements) => {
  await Promise.all([
    import(ThemePackage.solar.native.charcoal()),
    ...elements.map(element => import(ThemePackage.solar.element.charcoal(element)))
  ]);
  await loadCore();
};

/**
 * Load Solar theme. The variant is based on Documentation
 * @param elements The list of element themes to load
 * @returns {Promise<void>}
 */
const solar = async (...elements) => {
  if (themeVariant === 'light') {
    await solarPearl(...elements);
  }
  else {
    await solarCharcoal(...elements);
  }
};

applyThemeWrapper();

export {
  themeVariant,
  halo,
  haloDark,
  haloLight,
  solar,
  solarCharcoal,
  solarPearl
};
