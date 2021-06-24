# `TornadoChart`

## `Snapshots`

####   `DOM structure is correct`

```html
<slot name="header">
</slot>
<div part="legend">
  <div part="legend-item">
    <div part="primary-symbol">
    </div>
    <div part="primary-label">
      7+ hours
    </div>
  </div>
  <div part="legend-item">
    <div part="secondary-symbol">
    </div>
    <div part="secondary-label">
      less than 7 hours
    </div>
  </div>
</div>
<slot>
</slot>
<slot name="footer">
</slot>

```

## `TornadoItem`

##   `Snapshots`

####     `DOM structure is correct`

```html
<ef-layout
  flex=""
  nowrap=""
  part="container"
  style="--flex:1 1 auto;"
>
  <ef-layout
    flex=""
    size="25%"
    style="--flex:0 0 25%;"
  >
    <div part="label">
      <slot>
      </slot>
    </div>
  </ef-layout>
  <ef-layout
    basis="40%"
    flex=""
    style="--flex:1 1 40%;"
  >
    <ef-progress-bar
      alignment="right"
      part="primary-bar"
    >
    </ef-progress-bar>
  </ef-layout>
  <div part="seperator">
  </div>
  <ef-layout
    basis="40%"
    flex=""
    style="--flex:1 1 40%;"
  >
    <ef-progress-bar
      alignment="left"
      part="secondary-bar"
    >
    </ef-progress-bar>
  </ef-layout>
</ef-layout>

```

####     `DOM structure with vertical property is correct`

```html
<ef-layout
  container=""
  flex=""
  nowrap=""
  part="container"
  style="--flex:1 1 auto;"
>
  <ef-layout
    flex=""
    style="--flex:1 1 auto;"
  >
    <div part="label">
      <slot>
      </slot>
    </div>
  </ef-layout>
  <ef-layout
    flex=""
    style="--flex:1 1 auto;"
  >
    <ef-progress-bar
      alignment="left"
      part="primary-bar"
    >
    </ef-progress-bar>
  </ef-layout>
  <div part="seperator">
  </div>
  <ef-layout
    flex=""
    style="--flex:1 1 auto;"
  >
    <ef-progress-bar
      alignment="left"
      part="secondary-bar"
    >
    </ef-progress-bar>
  </ef-layout>
</ef-layout>

```

####     `DOM structure with values and labels is correct`

```html
<ef-layout
  flex=""
  nowrap=""
  part="container"
  style="--flex:1 1 auto;"
>
  <ef-layout
    flex=""
    size="25%"
    style="--flex:0 0 25%;"
  >
    <div part="label">
      <slot>
      </slot>
    </div>
  </ef-layout>
  <ef-layout
    basis="40%"
    flex=""
    style="--flex:1 1 40%;"
  >
    <ef-progress-bar
      alignment="right"
      label="5%"
      part="primary-bar"
      value="5"
    >
    </ef-progress-bar>
  </ef-layout>
  <div part="seperator">
  </div>
  <ef-layout
    basis="40%"
    flex=""
    style="--flex:1 1 40%;"
  >
    <ef-progress-bar
      alignment="left"
      label="95%"
      part="secondary-bar"
      value="95"
    >
    </ef-progress-bar>
  </ef-layout>
</ef-layout>

```

####     `DOM structure with values, labels and highlighted state is correct`

```html
<ef-layout
  flex=""
  nowrap=""
  part="container"
  style="--flex:1 1 auto;"
>
  <ef-layout
    flex=""
    size="25%"
    style="--flex:0 0 25%;"
  >
    <div part="label">
      <slot>
      </slot>
    </div>
  </ef-layout>
  <ef-layout
    basis="40%"
    flex=""
    style="--flex:1 1 40%;"
  >
    <ef-progress-bar
      alignment="right"
      label="5%"
      part="primary-bar"
      value="5"
    >
    </ef-progress-bar>
  </ef-layout>
  <div part="seperator">
  </div>
  <ef-layout
    basis="40%"
    flex=""
    style="--flex:1 1 40%;"
  >
    <ef-progress-bar
      alignment="left"
      label="95%"
      part="secondary-bar"
      value="95"
    >
    </ef-progress-bar>
  </ef-layout>
</ef-layout>

```

