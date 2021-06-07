# Panel

```live(preview)
<ef-panel spacing>
  <h3>Section</h3>
  <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.</p>
</ef-panel>
```

`ef-panel` is a container for components. It provides a standard background color and padding, depending on theme.

### Creating a panel
`ef-panel` can be used as a generic container for housing any components.

```html
<ef-panel>
  <h3>Section</h3>
  <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.</p>
</ef-panel>
```

### Add spacing
Default padding is managed by theme and can be set to `ef-panel` by using attribute `spacing`.

```live
<ef-panel spacing>
  <h3>Section</h3>
  <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.</p>
</ef-panel>
```

```html
<ef-panel spacing>
  <h3>Section</h3>
  <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.</p>
</ef-panel>
```

### Customizing panel style
`ef-panel` can be styled similarly as `div`. For example, background color and other styles can be changed by using CSS class.

```live
<style>
  .primary-section {
    padding: 14px 20px;
    background-color: #001eff;
    color: #ffffff;
  }
</style>

<ef-panel class="primary-section">
  <h3># New Normal</h3>
  <p>New Normal is a term in business and economics that refers to financial conditions following the financial crisis of 2007-2008, the aftermath of the 2008–2012 global recession, and the COVID-19 pandemic. <a style="color:white; text-decoration:underline;" href="https://en.wikipedia.org/wiki/New_Normal_(business)">Wikipedia</a></p>
</ef-panel>
```

```css
<style>
  .primary-section {
    padding: 14px 20px;
    background-color: #001eff;
    color: #ffffff;
  }
</style>
```
```html
<ef-panel class="primary-section">
  <h3># New Normal</h3>
  <p>New Normal is a term in business and economics that refers to financial conditions following the financial crisis of 2007-2008, the aftermath of the 2008–2012 global recession, and the COVID-19 pandemic. <a style="color:white; text-decoration:underline;" href="https://en.wikipedia.org/wiki/New_Normal_(business)">Wikipedia</a></p>
</ef-panel>
```

