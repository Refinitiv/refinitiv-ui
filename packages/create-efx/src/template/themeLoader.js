const url = new URL(window.location);
const theme = url.searchParams.get('theme') || 'halo-theme/light';

console.log('hello')

const themeLoader = document.createElement('script');
themeLoader.type = 'module';
themeLoader.src = `./themes/${theme}.js`;
document.head.appendChild(themeLoader);

const nativeStylesLoader = document.createElement('script');
nativeStylesLoader.type = 'module';
nativeStylesLoader.src = `./node_modules/@refinitiv-ui/${theme}/imports/native-elements`;
document.head.appendChild(nativeStylesLoader);

const style = document.createElement('style');
style.textContent = `
.theme-switcher {
    margin-top: 20px;
    left: 0;
    right: 0;
    position: absolute;
    text-align: center;
  }
  .theme-switcher a {
    padding: 20px;
  }
`;
document.head.append(style);

const themes = [
  {
    name: 'Halo Light',
    href: 'halo-theme/light'
  },
  {
    name: 'Halo Dark',
    href: 'halo-theme/dark'
  },
  {
    name: 'Solar Charcoal',
    href: 'solar-theme/charcoal'
  },
  {
    name: 'Solar Pearl',
    href: 'solar-theme/pearl'
  }
]

const themeSwitcher = document.createElement('div');
themeSwitcher.setAttribute('class', 'theme-switcher');

const createThemeButton = (href, name) => {
  const link = document.createElement('a');
  link.setAttribute('href', `?theme=${href}`);
  link.textContent = name;
  if (href === theme) {
    link.style.textDecoration = 'underline';
  }
  themeSwitcher.appendChild(link);
}

themes.forEach(theme => {
  createThemeButton(theme.href, theme.name);
});

document.body.prepend(themeSwitcher);
