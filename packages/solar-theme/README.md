## Compile solar theme

* Setup **theme compiler**
```
$ clone git@git.sami.int.thomsonreuters.com:elf/theme-compiler.git
$ cd theme-compiler
$ yarn link
```

* Setup a base theme of solar theme which is **elf-theme-elemental**
```
$ clone git@git.sami.int.thomsonreuters.com:elf/elf-theme-elemental.git#
$ cd elf-theme-elemental
$ yarn link
```

* Compile solar theme
```
$ clone git@git.sami.int.thomsonreuters.com:elf/elf-theme-solar.git
$ cd elf-theme-solar
$ yarn link @elf/elf-theme-elemental
$ yarn run build
```
The compilation output will be in /pearl/ and /charcoal/ directory

## Use theme from local machine

To use this theme from your local machine, run a link command in the solar theme directory.
It may also be useful to run watch if you need to modify the theme together while developing your element.

```
$ yarn link
$ yarn run watch
```

In the element, link the **elf-theme-solar**

```
$ yarn link @elf/elf-theme-solar
```

