# less-plugin-inline-svg

A Less plugin that allows to inline SVG file and customize its CSS styles

## Options
 - `options.encode` (`boolean`)

    default: `false` - Turn on SVG entities encoding for the SVG output.

 - `options.base64` (`boolean`)

    default: `false` - Turn on Base64 encoding for the SVG output.

## Usage and motivation

Let's imagine you would like to inline an SVG image file into your CSS code and use it as a background.
Additionally you would like to pass a custom SVG styling attributes that will change ex. the **filling color** of the image.

## Example
Sample SVG file:

```svg
<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <path d="m1024 397-354-51-159-321v808l317 166-60-352zm-513 357v-570l113 226 250 36-181 176 43 249z"/>
  <path d="m512 25-158 321-354 51 256 250-60 352 316-166z"/>
</svg>
```

For the less file:

```less
.foo-style {
    background-image: inline-svg('../images/my-image.svg', 'path:nth-child(1)', 'fill: red', 'path:nth-child(2)', 'fill: blue');
}
```

After compiling the produced output would look like this:

```css
.foo-style {
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="m1024 397-354-51-159-321v808l317 166-60-352zm-513 357v-570l113 226 250 36-181 176 43 249z" fill="red"/><path d="m512 25-158 321-354 51 256 250-60 352 316-166z" fill="blue"/></svg>');
}

```

## Helper syntax

```less
background-image: inline-svg('<<image path>>', 'CSS3 Selector 1', '<<custom styling attributes that will be passed to found SVG node 1>>', 'CSS3 Selector 2', 'Styles 2', ... );
```

## Interpolations

Thanks to the [Less build-in variables and string interpolations](http://lesscss.org/features/#variables-feature-variable-interpolation) you can pass the variable value to the helper:

```less
.foo-style {
    @color: 'red';

    background-image: inline-svg('../images/my-image.svg', 'path:nth-child(1)', 'fill: @{color}');
}
```


## SVG Encoding
Some browser might not like the raw SVG code inlined into the CSS files.
You can turn on the **encoding** option and encode the **SVG entities** (ex. `<`, `>`, `=`, `"` etc.) before outputting the code to CSS file.
The encoding function is using [`encodeURIComponent`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) JavaScript function and returns URI safe data.

Example:

```js
const inlineSvg = new LessPluginInlineSvg({
  encode: true
});
```

## Base64 Encoding
You can also turn on the **Base64** encoding by passing the `base64: true` option.
This will encode the SVG result and make it binary safe to inline in the CSS file.
Turning this option on, will increase the size of inline output for about 33%.

Example:

```js
const inlineSvg = new LessPluginInlineSvg({
  base64: true
});
```

## Contributors
The plugin was extended from [`less-plugin-inline-svg`](https://github.com/atlassian/less-plugin-inline-svg) to support Less ^3.8.0; CSS3 selectors and multiple select arguments. 
