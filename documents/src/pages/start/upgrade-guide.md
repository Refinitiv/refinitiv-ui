<!--
type: page
title: Element Framework 7 Upgrade Guide
location: ./start/upgrade-guide
layout: default
-->

# Element Framework 7 Upgrade Guide
This guide describes upgrading steps for Element Framework from EFv6 to EFv7. EFv7 has very few breaking changes from EFv6. Any projects using EFv6 without deprecation warnings, not using `ef-chart` or `ef-interactive-chart` should not require any changes to upgrade to EFv7.

## List of Removed APIs
Usage of these deprecated APIs generate warnings since version 6 release. Now, we have removed them.

__ef-interactive-chart__

* `legendstyle` attribute has been removed. Use `legend-style` instead.

__BasicElement base class__

* `cssVariable()` has been removed. Use `getComputedVariable()` instead.

__ef-icon__

* `src` property/attribute has been removed. Use `icon` instead. It accepts both icon name and svg URL.
* `preload()` has been removed. All icons are in one sprite file so all icons are loaded at once. Preloading is no longer required.

__ef-flag__

* `src` property/attribute has been removed. Use `flag` instead. It accepts both flag code and svg URL.

## Upgrading Steps
### Run npm command to install EFv7
There is no change to npm package structure or component name, you can simply upgrade to EFv7 by running npm command.
```bash
npm install @refinitiv-ui/elements@7
npm install @refinitiv-ui/halo-theme@7
```

### Migrate deprecated APIs
Review your code for any usages of the removed APIs. Migrate to their replacements as needed.

### Migrate ef-chart
If your application is using ef-chart, it has been upgraded to use Chart.js v4. Although there is no change in `ef-chart` API, there are a few breaking changes in Chart.js. See dedicated section below to migrate the chart.

Done! Build your project and test that everything is working.

## Migrating Chart (ef-chart)
Structure of configuration object was changed in Chart.js v3 and v4. We appreciate that this might require a few changes to some teams, and we are unable to provide a completed guide. You would have to go through comprehensive migration guides provided by Chart.js team in [v3 migration guide](https://www.chartjs.org/docs/latest/migration/v3-migration.html) and [v4 migration guide](https://www.chartjs.org/docs/latest/migration/v4-migration.html).

Example:
* `options.title.text` was changed to `options.plugins.title.text`
* `options.scales` is now an object containing keys as id-name of scales

__ef-chart version 6 configuration__

```javascript
const config = {
  options: {
    title : { text: "Chart Title" },
    scales: {
      yAxes: [{
        ticks: {
          min: 20,
          max: 100
        }
      }]
    }
  }
};
```

__ef-chart version 7 configuration__

```bash
const config = {
  options: {
    plugins: {
      plugin: {
        title: { text: "Chart Title" }
      }
    },
    scales: {
      y: {
        ticks: {
          min: 20,
          max: 100
        }
      }
    }
  }
};
```

### Using Chart.js Plugin with ef-chart

Most of Chart.js plugins continue to work with `ef-chart` but you might need to upgrade some plugins to newer version for Chart.js v4 compatibility. Visit [Chart.js awesome repository](https://github.com/chartjs/awesome#plugins) to discover plugins with compatibility information.

Additionally, there is a slight change to how to register the plugins globally. As Chart.js is no longer available in global scope under window object, Chart.js needs to be imported first.

__ef-chart version 6__
```bash
import zoomPlugin from 'chartjs-plugin-zoom';
window.Chart.plugins.register(zoomPlugin);
```

__ef-chart version 7__
```bash
import { Chart } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
Chart.register(zoomPlugin);
```

## Migrating Interactive Chart (ef-interactive-chart)
Chart library that used by `ef-interactive-chart`, [lightweight chart](https://www.tradingview.com/lightweight-charts/), has been upgraded from v3 to v4. As it's a major upgrade version, there are changes in configuration and some APIs of lightweight chart are deprecated. You can follow migration guides provided by lightweight chart team in [v4 migration guide](https://tradingview.github.io/lightweight-charts/docs/next/migrations/from-v3-to-v4).

Example:
* `scaleMargins` option has been removed from series options
* `backgroundColor` from layout options has been removed

__ef-interactive-chart v6 configuration__
```javascript
const config = {
  series: [{
    type : 'volume',
      layout: {
        backgroundColor: 'red'
      },
    seriesOptions: {
      scaleMargins: {
        top: 0.8,
          bottom: 0
      }
    }
 }]
};
```

__ef-interactive-chart v7 configuration__
```javascript
const config = {
  series: [{
    type : 'volume',
    layout: {
      background: {
        color: 'red'
      }
    }
  }]
};

chart.priceScale('').applyOptions({
  scaleMargins: {
    top: 0.8,
    bottom: 0
  }
});
```

## Guideline For EF Extension Team (EFX)
This section is for EFX component maintainers. It provides information about making EFX compatible with EFv7. Note that if your component does not use `ef-chart`, it's very likely that the component can support both EFv6 and EFv7 with the same code base.

### Handling Missing Icon Preloading

If you don't use icon `preload()`, you can skip this section.

EFv7 introduces icon sprite eliminating the need for icon `preload()` API. EFX components using the API can support both EFv6 and EFv7 by checking the availability of preload.

```javascript
const { preload } = await import('@refinitiv-ui/elements/icon');

if (preload) {
  // for EFv6 only, preload icons as needed
  preload('tick','flame', ...);
}
```

### Managing ef-chart

If you don't use `ef-chart`, you can skip this section.

Unfortunately, there are breaking changes between Chart.js v2 (used in EFv6) and Chart.js v4 (used in EFv7). If your EFX component accepts chart configuration from applications directly and passes it through without any manipulations, your EFX component can work with both EFv6 and EFv7. Applications can choose to pass the configuration that is compatible with EF version that they are using.

However, if your EFX component manages chart configuration internally, you can check the availability of `window.chart` to check if an application is currently using Chart.js v2 (EFv6) or Chart.js v4 (EFv7). This would allow you to construct chart configuration accordingly.

```javascript
if (window.chart) {
    // construct chart.js v2 config object
} else {
    // construct chart.js v4 config object
}
```

### Replacing removed APIs

Some deprecated APIs has been removed, you can find them in the [list of removed APIs](./start/upgrade-guide#list-of-removed-apis) section above. Fix your code, then your EFX components should work with both EFv6 and EFv7.

The final step is to update `peerDependencies` in package.json: set range of EF versions that is compatible with your component.

```json
"peerDependencies": {
  "@refinitiv-ui/core" : "^6.0.0 || ^7.0.0",
  "@refinitiv-ui/elements" : "^6.0.0 || ^7.0.0",
}
```
You can publish your component as pre-release versions for testing, or you can use [npm pack](https://docs.npmjs.com/cli/v7/commands/npm-pack) to package the component as .tgz file and use it locally. For instance:

```json
"dependencies": {
  "my-package": "file:/./my-package-1.3.3.tar.gz"
}
```

Once the package has been verified. Publish it and notify good news to development community.
