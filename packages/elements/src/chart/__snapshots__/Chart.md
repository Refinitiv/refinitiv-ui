# `chart/Chart`

## `Check chart types`

####   `DOM structure is correct`

```html
<ef-layout
  container=""
  flex=""
>
  <ef-header level="2">
  </ef-header>
  <ef-layout part="chart">
    <canvas id="canvas">
    </canvas>
  </ef-layout>
</ef-layout>

```

####   `DOM structure of chart with config is correct`

```html
<ef-layout
  container=""
  flex=""
>
  <ef-header level="2">
    Line Chart - Price of TRI.N in 2016
  </ef-header>
  <ef-layout part="chart">
    <canvas
      class="chartjs-render-monitor"
      id="canvas"
    >
    </canvas>
  </ef-layout>
</ef-layout>

```

