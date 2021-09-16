# `label/Legacy`

## `DOM structure is correct`

####   `Should default to use the truncate template`

```html
<div class="left legacy split">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum sapien justo, vel mattis quam rhoncus eu.
</div>
<div class="center split">
</div>
<div class="legacy right split">
  <span dir="ltr">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum sapien justo, vel mattis quam rhoncus eu.
  </span>
</div>
<span style="display: none !important;">
  <slot>
  </slot>
</span>

```

####   `Should switch to line clamp template if line-clamp is set`

```html
<span
  class="clamp legacy"
  style="white-space: nowrap; max-height: calc(1em * 1.2 * 1);"
>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum sapien justo, vel mattis quam rhoncus eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum sapien justo, vel mattis quam rhoncus eu.
</span>
<span style="display: none !important;">
  <slot>
  </slot>
</span>

```

