const themeVariant = document.documentElement.getAttribute(
  'prefers-color-scheme'
);

const ThemePackage = {
  halo: {
    light: () => `/resources/elements/light.js`,
    dark: () => `/resources/elements/dark.js`,
  },
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
 * Load Halo theme. The variant is based on Documentation
 * @param elements The list of element themes to load
 * @returns {Promise<void>}
 */
const halo = async () => {
  if (themeVariant === 'light') {
    await import(ThemePackage.halo.light());
  } else {
    await import(ThemePackage.halo.dark());
  }
};

applyThemeWrapper();

export { themeVariant, halo };
