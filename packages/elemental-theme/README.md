# Elemental Theme

Base theme for all Element Framework elements. 

## Usage

Themes should be used at app level.

### Installation

Include a them by installing it via npm. This will automatically build you them output.

```shell
$ npm i --save @elf/elf-theme-elemental
```

Once installed, you should see sub-theme folders named `dark` and `light`.
Inside of these are the theme files for each supported element.

### Including a theme

In your app, import you element and then its theme.

```javascript
import '../@elf/coral-button/coral-button.js';
import '../@elf/elf-theme-elemental/[sub-theme]/coral-button.js';
```

Now you should be able to use your element.

```html
<coral-button>Hey!</coral-button>
```

## Extending (Create your own theme)

The easiest way to create you own theme is by extending *Elemental Theme*.

This gives you all of the styles for every element within the elemental theme, saving you a huge amount of styling time.

### How it works

Elemental Theme provides 4 levels of overrides. Depending on the complexity of the modifications

#### 1. Modification via custom CSS properties
This is the simplest form of modification. Mostly, it allows you to change colours and sizes of individual elements.

#### 2. Theme variable overrides
This allows you to change low level variables, which control shape, size, colour, spacing and shading across the whole of the theme.
This can give you a great starting point for your new theme.

#### 3. Element style overrides
If changing the variables didn't quite give you what you were after, you can modify the styles of an element further, just like you normally override a native HTML Element.

#### 4. Complete element style rewrites.
If for some reason you want to completely write the styles for an element, but use the rest of the elemental theme, you can.

### Where to start

The first starting point when creating a new theme is to install the ELemental Theme and Theme Compiler as a dependency.

```shell
$ npm i --save-dev @elf/elf-theme-elemental @refinitiv-ui/theme-compiler
```

Add a build task in you `package.json`

```json
...
  "scripts": {
    "build": "theme-compiler dist"
  }
...
```

Create an `index.less` file in the root of your project and inherite the Elemental Theme within it.

```less
@import 'npm:@elf/elf-theme-elemental/index';
```

Running your build task will now output your own theme which is based upon the Elemental Theme.

```shell
$ npm run build
```

This will output your theme to `./dist`

> *TODO*
> More documentation to follow...
