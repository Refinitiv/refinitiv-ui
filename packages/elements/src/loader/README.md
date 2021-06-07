# Loader

```live(preview)
<style>
  .container {
    height: 100px;
  }
</style>
<div class="container">
  <ef-loader></ef-loader>
</div>
```

`ef-loader` is an animated graphical component used to show that an app is performing an action in the background, such as downloading content.

### Basic usage

Add `ef-loader` into your document, and the animation will begin. When the loader is no longer needed, hide it with `display: none`.

> If the loader is only used once, it can be also be removed from the DOM

```live
<style>
  .item {
    position: relative;
    height: 50px;
  }
</style>
<div class="item"><ef-loader></ef-loader></div>
```

```html
<ef-loader></ef-loader>
```
