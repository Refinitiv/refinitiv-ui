# Label

```live(preview)
<style>
  @keyframes resize {
    from {
      width: 95%;
    }
    to {
      width: 60%;
    }
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    border: 1px solid #9ea8f4;
    width: 100%;
    animation: resize ease-in-out 3s alternate infinite;
    height: 250px;
  }
  ef-label#animation {
    padding: 0px 20px;
    margin: 10px 0px;
  }
  hr {
    background: #9ea8f4;
    margin: 0px;
    width: 100%;
    height: 1px;
  }
</style>
<div class="wrapper">
  <ef-label truncate id="animation">
    Universal basic income (UBI) is a government program in which every adult citizen receives a set amount of money on a regular basis. The goals of a basic income system are to alleviate poverty and replace other need-based social programs that potentially require greater bureaucratic involvement.
  </ef-label>
  <hr>
  <ef-label truncate="center" id="animation">
    Universal basic income (UBI) is a government program in which every adult citizen receives a set amount of money on a regular basis. The goals of a basic income system are to alleviate poverty and replace other need-based social programs that potentially require greater bureaucratic involvement.
  </ef-label>
  <hr>
  <ef-label max-line="2" id="animation">
    Universal basic income (UBI) is a government program in which every adult citizen receives a set amount of money on a regular basis. The goals of a basic income system are to alleviate poverty and replace other need-based social programs that potentially require greater bureaucratic involvement.
  </ef-label>
  <hr>
  <ef-label  id="animation">
    Universal basic income (UBI) is a government program in which every adult citizen receives a set amount of money on a regular basis. The goals of a basic income system are to alleviate poverty and replace other need-based social programs that potentially require greater bureaucratic involvement.
  </ef-label>
</div>
```

Responsive text container that provides automatic ellipsis and middle truncation feature with tooltip if the text is unable to fit in its container.

## Basic Usage

Wraps text content with `ef-label` and it will wrap the text as multiple lines if it can't fit content to container.

```live
<style>
  ef-label {
    margin: 10px 0 20px 0;
  }
</style>
<ef-label style="width:400px">
  Universal basic income (UBI) is a government program in which every adult citizen receives a set amount of money on a regular basis. The goals of a basic income system are to alleviate poverty and replace other need-based social programs that potentially require greater bureaucratic involvement.
</ef-label>
```

```html
<ef-label style="width:400px">
  Universal basic income (UBI) is a government program in which every adult citizen receives a set amount of money on a regular basis. The goals of a basic income system are to alleviate poverty and replace other need-based social programs that potentially require greater bureaucratic involvement.
</ef-label>
```

Adds `truncate` attribute to display text in a single line and applies ellipsis if the content is too long. Tooltip is automatically provided to users when it has ellipsis.

> Note: `ef-label` requires size to determine when the content is exceeding its container and should be truncated.

```live
<style>
  .wrapper {
    margin: 10px 0 110px 0;
  }
</style>
<div style="display:flex;" class="wrapper">
  <ef-label style="flex: 1;" truncate>
  Universal basic income (UBI) is a government program in which every adult citizen receives a set amount of money on a regular basis. The goals of a basic income system are to alleviate poverty and replace other need-based social programs that potentially require greater bureaucratic involvement.
  </ef-label>
</div>
```

```html
<div style="display:flex;" class="wrapper">
  <ef-label style="flex: 1;" truncate>
  Universal basic income (UBI) is a government program in which every adult citizen receives a set amount of money on a regular basis. The goals of a basic income system are to alleviate poverty and replace other need-based social programs that potentially require greater bureaucratic involvement.
  </ef-label>
</div>
```

Uses `truncate = "center"` attribute to change from ellipsis to middle truncation.

```live
<style>
  ef-label {
    margin: 10px 0 110px 0;
  }
</style>
<ef-label style="width:400px" truncate="center">
    Universal basic income (UBI) is a government program in which every adult citizen receives a set amount of money on a regular basis. The goals of a basic income system are to alleviate poverty and replace other need-based social programs that potentially require greater bureaucratic involvement.
</ef-label>
```

```html
<ef-label style="width:400px" truncate="center">
    Universal basic income (UBI) is a government program in which every adult citizen receives a set amount of money on a regular basis. The goals of a basic income system are to alleviate poverty and replace other need-based social programs that potentially require greater bureaucratic involvement.
</ef-label>
```

## Max line

Uses `max-line` attribute to set maximum number of lines to display and shows ellipsis when it's not enough to display a whole text. This feature will be omitted if it's used with `truncate="center"` and it does not support on IE browser.

```live
<style>
  ef-label {
    margin: 10px 0 110px 0;
  }
</style>
<ef-label style="width:400px" max-line="2">
    Universal basic income (UBI) is a government program in which every adult citizen receives a set amount of money on a regular basis. The goals of a basic income system are to alleviate poverty and replace other need-based social programs that potentially require greater bureaucratic involvement.
</ef-label>
```

```html
<ef-label style="width:400px" max-line="2">
    Universal basic income (UBI) is a government program in which every adult citizen receives a set amount of money on a regular basis. The goals of a basic income system are to alleviate poverty and replace other need-based social programs that potentially require greater bureaucratic involvement.
</ef-label>
```

To truncate multiple lines on IE, you need to set the ::after selector to be an ellipsis. And set the height as lines-height multiply by the number of lines.

```html
<style>
  .max-line {
    display: inline-block;
    position: relative;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .max-line::after {
    content: '...';
    text-align: right;
    bottom: 0;
    right: 0;
    width: 25%;
    position: absolute;
    height: calc(1em * 1.2);
  }
  .max-line-2 {
    height: calc(1em * 1.2 * 2);
  }
</style>
<ef-label class="responsive max-line max-line-2">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lorem tellus, malesuada nec mauris eu, dapibus efficitur erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum est at malesuada ornare. Nunc facilisis quis tortor a vestibulum. Suspendisse in feugiat lectus, et ultrices dolor. Curabitur malesuada auctor risus, sed pulvinar est vestibulum sagittis. Pellentesque non rhoncus velit. Mauris fermentum lorem nulla, nec dictum nisi sagittis id. Pellentesque dapibus ex sit amet purus malesuada, sed fringilla magna suscipit. Donec sit amet nisl eu lectus pulvinar elementum suscipit rhoncus odio. Donec eros dolor, vestibulum eget sagittis quis, imperdiet a metus. Vestibulum vitae imperdiet libero.
</ef-label>
```
