<!--
type: page
title: Compatibility
location: ./guides/compatibility
layout: default
-->
# Compatibility
Information below shows compatibility when using v7 with some popular frameworks and bundle tools. We recommend upgrading your framework and dependency to latest where possible.

## Frameworks
| Framework | Version        | Release Year | Support Node Version                   | TS Version           |             Compatibility             |
| --------- | -------------- | ------------ | -------------------------------------- | -------------------- | :-----------------------------------: |
| React     | 18             | 2022         | Not specified                          | Not specified        | ![](/resources/images/green-tick.png) |
|           | 17             | 2021         | Not specified                          | Not specified        | ![](/resources/images/green-tick.png) |
|           | 16             | 2018         | Not specified                          | Not specified        | ![](/resources/images/green-tick.png) |
|           | 15<sup>*</sup> | 2016         | `<=16`                                 | Not specified        | ![](/resources/images/amber-tick.png) |
| Angular   | 16             | 2023         | `^16.14.0` or `^18.10.0`               | `>= 4.9.3` < `5.2.0` | ![](/resources/images/green-tick.png) |
|           | 15             | 2022         | `^14.20.0` or `^16.13.0` or `^18.10.0` | `>= 4.8.2` < `5.0.0` | ![](/resources/images/green-tick.png) |
|           | 14             | 2022         | `^14.15.0` or `^16.10.0`               | `>= 4.6.2` < `4.9.0` | ![](/resources/images/green-tick.png) |
|           | 13             | 2022         | `^12.20.0` or `^14.15.0` or `^16.10.0` | `>= 4.4.3` < `4.7.0` | ![](/resources/images/green-tick.png) |
|           | 12<sup>*</sup> | 2021         | `^12.14.0` or `^14.15.0`               | `>= 4.2.3` < `4.4.0` | ![](/resources/images/amber-tick.png) |
| Vue       | 3              | 2021         | Not specified                          | Not specified        | ![](/resources/images/green-tick.png) |
|           | 2              | 2017         | Not specified                          | Not specified        | ![](/resources/images/green-tick.png) |

<br>
<small>* React 15 - Not working with @lit-lab/react due to no forwardRef API yet.</small><br>
<small>* Angular 12 - Required skipLibCheck: true due to formatjs TypeScript conflict.</small>


## Bundle Tools

| Name    | Version       | Release Date |             Compatibility             |
| ------- | ------------- | ------------ | :-----------------------------------: |
| Webpack | 5             | 2021         | ![](/resources/images/green-tick.png) |
|         | 4<sup>*</sup> | 2017         | ![](/resources/images/amber-tick.png) |
| Vite    | 4             | 2022         | ![](/resources/images/green-tick.png) |
|         | 3             | 2022         | ![](/resources/images/green-tick.png) |

<br>
<small>* Webpack 4 - Do not support package exports and required more configuration to use Babel. Extra configuration is required. See Bundling Configuration docs.</small>


## References
* [Angular versioning and releases](https://angular.io/guide/releases)
* [EOL and support information for Angular](https://endoflife.date/angular)
* [EOL and support information for React](https://endoflife.date/react)

::footer::
