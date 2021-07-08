# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [5.0.0-beta.3](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/compare/@refinitiv-ui/elements@5.0.0-beta.1...@refinitiv-ui/elements@5.0.0-beta.3) (2021-07-02)


### Bug Fixes

* **autosuggest:** remove HTMLElement from CustomEvent type ([5ff47e1](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/5ff47e18dd64d989b29e3a413963c940cb0415c1))
* **chart:** `@types/chart.js` should be a dependency ([c4168b3](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/c4168b3bec0a4289f74d57ca829b7ecffa507738))
* **chart:** export interface instead of type ([14fa287](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/14fa287fa7618ebbe9f818e6b29f9db97a1a84c9))
* **collapse:** do not `setAttribute` when panel is still null ([c25602e](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/c25602ea06cad4ae1ed0fec4c27f50c005731955))
* **combo-box:** provide default value to generic `ComboBoxData` type ([be111cd](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/be111cdab89911774f85861c99e751761d244ca7))
* **interactive-chart:** handle no data point on legend ([d4a7775](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/d4a7775b5fc56bfb3983644fb1b393763832ef19))
* **tree:** provide default type to `TreeData` generic ([5121abd](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/5121abd1334df0b2b4429b6a47db048b8ee3139d))


### Features

* **autosuggest:** introduce new types with class name as prefix ([81d21df](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/81d21df4201d355fa2ec5225396b53edbe11bc1a))
* **card:** shortened `CardConfiguration` to just `CardConfig` ([3472daf](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/3472dafaa325e4fa219d22884381bbd192a69fb1))
* **chart:** export chart configuration type ([b1f8ae5](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/b1f8ae5a4acefd26dd55b4b2e9e6a7fa0707ec52))
* **chart:** shortened `ChartConfiguration` to just `ChartConfig` ([7596ef8](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/7596ef8fa2be373d06ed8652620ab103725580c7))
* **collapse:** allow to cancel expanded-changed event ([d850374](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/d850374b9f0de0108ee37140ab237495d52ec730))
* **combo-box:** introduce `ComboBoxData` type to its `data` property ([686ad15](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/686ad15103c2cbbd62b1239d4a55f1e0b536b140))
* **combo-box:** introduce `ComboBoxRenderer` and `ComboBoxFilter` type exports ([eb42c4f](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/eb42c4fb5e984273afbe6a7cd822eba2340dc6d3))
* **header:** use string literal type for `level` ([a45206f](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/a45206fdfd633bcb245ca7b3685fbad74e1962b7))
* **heatmap:** introduce new types with class name as prefix ([53a12ae](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/53a12aedbc407b3f321a6eb8ae139e1c8626e304))
* **heatmap:** shortened from `HeatmapConfiguration` to `HeatmapConfig` ([1b3b1c0](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/1b3b1c0f1d82b0976f5fd59cafabbf1bb2f30741))
* **interactive-chart:** rename `ChartConfig` to `InteractiveChartConfig` and `SeriesInterface` to `InteractiveChartSeries` ([6b4cd72](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/6b4cd72184c11ce6ec64994f6ef07587e20745ac))
* **list:** introduce `ListData` and `ListRenderer` types ([7cb1ad8](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/7cb1ad8654c547f7bc9c66e383e8e86a9b5c71ff))
* **multi-input:** introduce `MultiInputData` and `MultiInputDataItem` type ([40dd01e](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/40dd01e03aa0da158c09c87ed4404682310bf8b3))
* **overlay:** introduce `OverlayPosition`, `OverlayPositionTarget` and `OverlayTransitionStyle` type ([11ac0bb](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/11ac0bbd308c78b70a64b464a2c4f4aa86233c77))
* **select:** introduce `SelectData` and `SelectDataItem` types ([fded4a2](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/fded4a2cdd6a4998c6ea74b9935c38d9995a8216))
* **sparkline:** use `@refinitiv-ui/browser-sparkline` ([8b1a898](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/8b1a898bafcc44593485df078fe37dab22bfbde2))
* **sparkline:** use color conversion from utils ([a694550](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/a694550204a61319299e3df996b02141aab699be))
* **tab:** add stricter type to `level` ([9b1d5c3](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/9b1d5c3c22c0813796480099f453d245eff8d0fc))
* **tab-bar:** add stricter type to `level` ([c5f01cb](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/c5f01cb59554025cd74a785784a4f063b1631944))
* **tooltip:** introduce `TooltipCondition`, `TooltipRenderer`, `TooltipPosition`, `TooltipTransitionStyle` ([ad9c8b1](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/ad9c8b1b2fa6524fe44c3a5873d9694f151b31ee))
* **tree:** change `TreeItemData` to `TreeDataItem` ([527cd50](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/527cd503295a6aaef6865caff8312a7a11df5508))
* **tree:** introduce `TreeData` type to tree's data property ([ec89a4b](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/ec89a4b1a1e65582de66fbd43e9c44a3c7491762))
* **tree:** introduce `TreeRenderer` and `TreeItemData` types ([6064375](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/60643752c4f7e81115666901e13cf0e57806fea3))
* **tree-select:** introduce `TreeSelectData` and  `TreeSelectFilter` types reexported from combobox ([825376a](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/825376a60634d2cca9df4f85e48dcd8a6b8aa50d))
* **tree-select:** introduce `TreeSelectDataItem` type ([ba9a8a0](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/ba9a8a0ecb24f93f740b07e09b76e97c9234f3d1))
* **tree-select:** introduce `TreeSelectRenderer` type ([c64ac43](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/c64ac430536456e9e8dfc3d505b75623ebe9da72))


### Reverts

* Revert "refactor(collapse): remove `no-animation` and header checking logic" ([1af5868](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/1af58681e8503369c9da6678581b852d3f814d52))





# [5.0.0-beta.2](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/compare/@refinitiv-ui/elements@5.0.0-beta.1...@refinitiv-ui/elements@5.0.0-beta.2) (2021-07-02)


### Bug Fixes

* **autosuggest:** remove HTMLElement from CustomEvent type ([5ff47e1](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/5ff47e18dd64d989b29e3a413963c940cb0415c1))
* **chart:** `@types/chart.js` should be a dependency ([c4168b3](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/c4168b3bec0a4289f74d57ca829b7ecffa507738))
* **chart:** export interface instead of type ([14fa287](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/14fa287fa7618ebbe9f818e6b29f9db97a1a84c9))
* **collapse:** do not `setAttribute` when panel is still null ([c25602e](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/c25602ea06cad4ae1ed0fec4c27f50c005731955))
* **combo-box:** provide default value to generic `ComboBoxData` type ([be111cd](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/be111cdab89911774f85861c99e751761d244ca7))
* **interactive-chart:** handle no data point on legend ([d4a7775](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/d4a7775b5fc56bfb3983644fb1b393763832ef19))
* **tree:** provide default type to `TreeData` generic ([5121abd](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/5121abd1334df0b2b4429b6a47db048b8ee3139d))


### Features

* **autosuggest:** introduce new types with class name as prefix ([81d21df](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/81d21df4201d355fa2ec5225396b53edbe11bc1a))
* **card:** shortened `CardConfiguration` to just `CardConfig` ([3472daf](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/3472dafaa325e4fa219d22884381bbd192a69fb1))
* **chart:** export chart configuration type ([b1f8ae5](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/b1f8ae5a4acefd26dd55b4b2e9e6a7fa0707ec52))
* **chart:** shortened `ChartConfiguration` to just `ChartConfig` ([7596ef8](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/7596ef8fa2be373d06ed8652620ab103725580c7))
* **collapse:** allow to cancel expanded-changed event ([d850374](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/d850374b9f0de0108ee37140ab237495d52ec730))
* **combo-box:** introduce `ComboBoxData` type to its `data` property ([686ad15](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/686ad15103c2cbbd62b1239d4a55f1e0b536b140))
* **combo-box:** introduce `ComboBoxRenderer` and `ComboBoxFilter` type exports ([eb42c4f](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/eb42c4fb5e984273afbe6a7cd822eba2340dc6d3))
* **header:** use string literal type for `level` ([a45206f](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/a45206fdfd633bcb245ca7b3685fbad74e1962b7))
* **heatmap:** introduce new types with class name as prefix ([53a12ae](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/53a12aedbc407b3f321a6eb8ae139e1c8626e304))
* **heatmap:** shortened from `HeatmapConfiguration` to `HeatmapConfig` ([1b3b1c0](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/1b3b1c0f1d82b0976f5fd59cafabbf1bb2f30741))
* **interactive-chart:** rename `ChartConfig` to `InteractiveChartConfig` and `SeriesInterface` to `InteractiveChartSeries` ([6b4cd72](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/6b4cd72184c11ce6ec64994f6ef07587e20745ac))
* **list:** introduce `ListData` and `ListRenderer` types ([7cb1ad8](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/7cb1ad8654c547f7bc9c66e383e8e86a9b5c71ff))
* **multi-input:** introduce `MultiInputData` and `MultiInputDataItem` type ([40dd01e](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/40dd01e03aa0da158c09c87ed4404682310bf8b3))
* **overlay:** introduce `OverlayPosition`, `OverlayPositionTarget` and `OverlayTransitionStyle` type ([11ac0bb](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/11ac0bbd308c78b70a64b464a2c4f4aa86233c77))
* **select:** introduce `SelectData` and `SelectDataItem` types ([fded4a2](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/fded4a2cdd6a4998c6ea74b9935c38d9995a8216))
* **sparkline:** use `@refinitiv-ui/browser-sparkline` ([8b1a898](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/8b1a898bafcc44593485df078fe37dab22bfbde2))
* **sparkline:** use color conversion from utils ([a694550](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/a694550204a61319299e3df996b02141aab699be))
* **tab:** add stricter type to `level` ([9b1d5c3](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/9b1d5c3c22c0813796480099f453d245eff8d0fc))
* **tab-bar:** add stricter type to `level` ([c5f01cb](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/c5f01cb59554025cd74a785784a4f063b1631944))
* **tooltip:** introduce `TooltipCondition`, `TooltipRenderer`, `TooltipPosition`, `TooltipTransitionStyle` ([ad9c8b1](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/ad9c8b1b2fa6524fe44c3a5873d9694f151b31ee))
* **tree:** change `TreeItemData` to `TreeDataItem` ([527cd50](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/527cd503295a6aaef6865caff8312a7a11df5508))
* **tree:** introduce `TreeData` type to tree's data property ([ec89a4b](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/ec89a4b1a1e65582de66fbd43e9c44a3c7491762))
* **tree:** introduce `TreeRenderer` and `TreeItemData` types ([6064375](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/60643752c4f7e81115666901e13cf0e57806fea3))
* **tree-select:** introduce `TreeSelectData` and  `TreeSelectFilter` types reexported from combobox ([825376a](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/825376a60634d2cca9df4f85e48dcd8a6b8aa50d))
* **tree-select:** introduce `TreeSelectDataItem` type ([ba9a8a0](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/ba9a8a0ecb24f93f740b07e09b76e97c9234f3d1))
* **tree-select:** introduce `TreeSelectRenderer` type ([c64ac43](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/c64ac430536456e9e8dfc3d505b75623ebe9da72))


### Reverts

* Revert "refactor(collapse): remove `no-animation` and header checking logic" ([1af5868](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/commits/1af58681e8503369c9da6678581b852d3f814d52))





# [5.0.0-beta.1](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/compare/@refinitiv-ui/elements@5.0.0-beta.0...@refinitiv-ui/elements@5.0.0-beta.1) (2021-06-22)

**Note:** Version bump only for package @refinitiv-ui/elements





# [5.0.0-beta.0](https://git.sami.int.thomsonreuters.com/elf/refinitiv-ui/compare/@refinitiv-ui/elements@5.0.0-alpha.15...@refinitiv-ui/elements@5.0.0-beta.0) (2021-06-22)

**Note:** Version bump only for package @refinitiv-ui/elements
