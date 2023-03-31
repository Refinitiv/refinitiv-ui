const THEME_PREFIX = 'prefers-color-scheme';
const DENSITY_PREFIX = 'prefers-density';

// Create the Theme selector and label
const toolbar = document.createElement('div');
toolbar.style = 'display:flex; justify-content: flex-end; align-items: center; position: fixed; right: 20px;';

const themeSelectorLabel = document.createElement('label');
themeSelectorLabel.innerText = 'Theme:';
const themeSelector = document.createElement('select');
themeSelector.id = 'theme-selector';
themeSelector.innerHTML = `
  <option value="auto" selected>Auto</option>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
`;
themeSelectorLabel.setAttribute('for', 'theme-selector');

// Create the Density selector and label
const densitySelectorLabel = document.createElement('label');
densitySelectorLabel.innerText = 'Density:';
const densitySelector = document.createElement('select');
densitySelector.id = 'density-selector';
densitySelector.innerHTML = `
  <option value="auto">Auto</option>
  <option value="default">Default</option>
  <option value="comfort">Comfort</option>
  <option value="dense">Dense</option>
  <option value="mobile">Mobile</option>
`;
densitySelectorLabel.setAttribute('for', 'density-selector');
toolbar.append(densitySelectorLabel, densitySelector, themeSelectorLabel, themeSelector);
// Prepend the selectors and labels to the body
document.body.prepend(toolbar);

// Add event listeners to update theme and density attributes on change
themeSelector.addEventListener('change', (event) => {
  if (event.target.value === 'auto') {
    document.documentElement.removeAttribute(THEME_PREFIX);
    return;
  }
  document.documentElement.setAttribute(THEME_PREFIX, event.target.value);
});

densitySelector.addEventListener('change', (event) => {
  if (event.target.value === 'auto') {
    document.documentElement.removeAttribute(DENSITY_PREFIX);
    return;
  }
  document.documentElement.setAttribute(DENSITY_PREFIX, event.target.value);
});

// Add CSS styling for the selectors and labels
const selectStyles = `
  margin-right: 10px;
`;

const labelStyles = `
  margin-bottom: 0px;
  margin-right: 5px;
`;

themeSelector.style.cssText = selectStyles;
densitySelector.style.cssText = selectStyles;
themeSelectorLabel.style.cssText = labelStyles;
densitySelectorLabel.style.cssText = labelStyles;
