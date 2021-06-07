# Appstate Bar

```live(preview)
<style>
  #wrapper {
    padding: 1px;
  }
  ef-appstate-bar {
    margin-bottom: 10px;
  }
  [slot="right"] {
    display: flex;
    align-items: center;
  }
  [slot="right"] ef-icon {
    padding-right: 3px;
  }
</style>

<div id="wrapper">
  <ef-appstate-bar heading="Preview">This is a preview version.
    <a alt href="#">What's changing?</a>
  </ef-appstate-bar>
  <ef-appstate-bar heading="IN DEVELOPMENT" state="info">Internal use only.
    <a alt href="#" slot="right">
      <ef-icon icon="present"></ef-icon>Send us feedback</a>
  </ef-appstate-bar>
  <ef-appstate-bar heading="New" state="highlight">Welcome to new version.
    <a alt href="#">What's new?</a>
    <a alt href="#" slot="right">
      <ef-icon icon="help"></ef-icon>Help</a>
  </ef-appstate-bar>
</div>
```

`ef-appstate-bar` is used to display a status or information at the top of an application. It comes with some pre-defined colors which are defined in theme.

### Basic usage

Styles of the App State Bar can be set by using `state` attribute/property. Bar's heading can be set by using `heading` attribute/property.

```live
<style>
  #wrapper {
    padding: 1px;
  }

  ef-appstate-bar {
    margin-bottom: 10px;
  }
</style>
<div id="wrapper">
  <ef-appstate-bar heading="Heading">
    Here is your content message.
  </ef-appstate-bar>

  <ef-appstate-bar heading="Info" state="info">
    Set attribute as state = "info"
  </ef-appstate-bar>

  <ef-appstate-bar heading="Highlight" state="highlight">
    Set attribute as state = "highlight"
  </ef-appstate-bar>
</div>
```

```html
<ef-appstate-bar heading="Heading">
  Here is your content message.
</ef-appstate-bar>

<ef-appstate-bar heading="Info" state="info">
  Set attribute as state = "info".
</ef-appstate-bar>

<ef-appstate-bar heading="Highlight" state="highlight">
  Set attribute as state = "highlight".
</ef-appstate-bar>
```

### Right slot

The App State Bar provides a slot to display content at the right of bar. You can have any contents e.g. normal text, links, or icons in the slot.

```live
<style>
  #wrapper {
    padding: 1px;
  }
  [slot="right"] {
    display: flex;
    align-items: center;
  }
  [slot="right"] ef-icon {
    padding-right: 3px;
  }
</style>
<div id="wrapper">
  <ef-appstate-bar heading="Sample" state="highlight">
    see on the right of bar
    <a alt href="#" slot="right">
      <ef-icon icon="like-empty"></ef-icon>This is the Right slot</a>
  </ef-appstate-bar>
</div>
```

```css
  <style>
    #wrapper {
      padding: 1px;
    }
    [slot="right"] {
      display: flex;
      align-items: center;
    }
    [slot="right"] ef-icon {
      padding-right: 3px;
    }
  </style>
```
```html
  <ef-appstate-bar heading="Sample" state="highlight">
    See on the right of bar.
    <a alt href="#" slot="right">
      <ef-icon icon="like-empty"></ef-icon>This is the Right slot</a>
  </ef-appstate-bar>
```
