# Flag

```live(preview)
<style>
  ef-flag {
    font-size: 4em;
  }
</style>
<ef-flag flag="us"></ef-flag>
<ef-flag flag="gb"></ef-flag>
<ef-flag flag="jp"></ef-flag>
<ef-flag flag="th"></ef-flag>
```

`ef-flag` provides a collection of country flags. The list of available flags and flags code are in [Flag Page](../styles/flags.html).

## Basic usage

You can set a flag's code to `flag` attribute to show the flag. Alternatively, instead of `flag` attribute, you can manually provide a url of svg flag using `src` attribute.


```live
<ef-flag flag="br"></ef-flag>
<ef-flag flag="ar"></ef-flag>
<ef-flag flag="co"></ef-flag>

<ef-flag src="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/flags/bo.svg"></ef-flag>
<ef-flag src="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/flags/pe.svg"></ef-flag>
<ef-flag src="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/flags/cl.svg"></ef-flag>
```

```html
<ef-flag flag="br"></ef-flag>
<ef-flag flag="ar"></ef-flag>
<ef-flag flag="co"></ef-flag>

<ef-flag src="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/flags/bo.svg"></ef-flag>
<ef-flag src="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/flags/pe.svg"></ef-flag>
<ef-flag src="https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/flags/cl.svg"></ef-flag>
```

## Changing size

Flags are displayed as 4:3 aspect ratio. Flag size can be set using `font-size`.

```live
<style>
.small {
  font-size: 1em;
}
.medium {
  font-size: 2em;
}
.large {
  font-size: 60px;
}
</style>
<ef-flag class="small" flag="gb"></ef-flag>
<ef-flag class="medium" flag="gb"></ef-flag>
<ef-flag class="large" flag="gb"></ef-flag>
```

```css
<style>
.small {
  font-size: 1em;
}
.medium {
  font-size: 2em;
}
.large {
  font-size: 60px;
}
</style>
```

```html
<ef-flag class="small" flag="gb"></ef-flag>
<ef-flag class="medium" flag="gb"></ef-flag>
<ef-flag class="large" flag="gb"></ef-flag>
```

## Preloading

`ef-flag` has the helper function to preload a set of flags. It could help to load flags faster if you have a known set of flags for use in the app. It accepts both flag name or svg location, either single flag or multiple.

Preload of flags will be deferred until the first `ef-flag` component created.

```js
import { preload } from "@refinitiv-ui/flag";

preload("us");
preload("au", "nz");
preload(
  "https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/flags/au.svg",
  "https://cdn.refinitiv.com/public/libs/elf/assets/elf-theme-halo/resources/flags/nz.svg",
);
```
