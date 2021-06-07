# Sparkline

```live(preview)
<style>
ef-sparkline {
  width: 250px;
  height: 100px;
}
</style>
<ef-sparkline reference-value="0" data="[-2, -3, 1, 1, 4, 6, -3, 1, 4, 6, 10, 9, 10, 9, 6, 4, 5, 0, 3, 2, 3, -1, -4, 2, 3, 4, 3, 6]"></ef-sparkline>
```
`ef-sparkline` is a small chart component for giving a quick representation of historical data without axes.

### Basic usage
To create sparkline, you can pass data as an array of number using `data` attribute or property. The styles of the sparkline is managed by theme but you can customize chart size using standard CSS.

```live
<style>
ef-sparkline {
  width: 200px;
  height: 100px;
}
</style>
<ef-sparkline data="[-2, -3, 1, 1, 4, 6, -3, 1, 4, 6, 10, 9, 10, 9, 6, 4, 5, 0, 3, 2, 3, -1, -4, 2, 3, 4, 3, 6]"></ef-sparkline>
```

```css
ef-sparkline {
  width: 200px;
  height: 100px;
}
```

```html
<ef-sparkline data="[-2, -3, 1, 1, 4, 6, -3, 1, 4, 6, 10, 9, 10, 9, 6, 4, 5, 0, 3, 2, 3, -1, -4, 2, 3, 4, 3, 6]"></ef-sparkline>
```

### Reference line
Sparkline supports adding a reference line. The area above or below the reference line will be filled with different colors. The reference value can be set using `reference-value` attribute or `referenceValue` property.

```live
<style>
ef-sparkline {
  width: 200px;
  height: 100px;
}
</style>
<ef-sparkline reference-value="0" data="[-2, -3, 1, 1, 4, 6, -3, 1, 4, 6, 10, 9, 10, 9, 6, 4, 5, 0, 3, 2, 3, -1, -4, 2, 3, 4, 3, 6]"></ef-sparkline>
```

```html
<ef-sparkline reference-value="0" data="[-2, -3, 1, 1, 4, 6, -3, 1, 4, 6, 10, 9, 10, 9, 6, 4, 5, 0, 3, 2, 3, -1, -4, 2, 3, 4, 3, 6]"></ef-sparkline>
```
### Display previous data
Sparkline can be set to display previous data where it'll show with inactive line color. It's common to use previous data for comparison with the current dataset.

When `previous-data` is provided, chart will use the value of last point in the dataset as a reference line. It's recommended to not set `reference-value` when previous data is used.

```live
<style>
ef-sparkline {
  width: 200px;
  height: 100px;
}
</style>
<ef-sparkline previous-data="[-3, -2, 1, 0, 4, 2, -2, 4, 4, 6, -1]" data="[-2, -3, 1, 1, 4, 6, -3, 1, 4, 6, 10, 9, 10, 9, 3, 4, 3, 6]"></ef-sparkline>
```

```html
<ef-sparkline previous-data="[-3, -2, 1, 0, 4, 2, -2, 4, 4, 6, -1]" data="[-2, -3, 1, 1, 4, 6, -3, 1, 4, 6, 10, 9, 10, 9, 3, 4, 3, 6]"></ef-sparkline>
```

### Customize colors and line width
Colors and line width of Sparkline are managed by theme but can be overridden by using CSS variables.

```live
<style>
  ef-sparkline[custom-line-color] {
    width: 200px;
    height: 100px;
    --line-color: #D94255;
    --line-width: 5px;
  }
</style>
<ef-sparkline custom-line-color data="[-2, -3, 1, 1, 4, 6, -3, 1, 4, 6, 10, 9, 10, 9, 6, 4, 5, 0, 3, 2, 3, -1, -4, 2, 3, 4, 3, 6]"></ef-sparkline>
```

```html
<style>
  ef-sparkline[custom-line-color] {
    --line-color: #D94255;
    --line-width: 5px;
  }
</style>
<ef-sparkline custom-line-color data="[-2, -3, 1, 1, 4, 6, -3, 1, 4, 6, 10, 9, 10, 9, 6, 4, 5, 0, 3, 2, 3, -1, -4, 2, 3, 4, 3, 6]"></ef-sparkline>
```

| CSS Variables Names    | Description                                                          |
| ---------------------- | -------------------------------------------------------------------- |
| --line-color           | Line color                                                           |
| --line-width           | Line width                                                           |
| --reference-line-color | Reference line color                                                 |
| --previous-line-color  | Previous data line color                                             |
| --upper-line-color     | Color of line that higher than the reference value                   |
| --lower-line-color     | Color of line that lower than the reference value                    |
| --fill-color-style     | Color style of higher and lower area. (e.g. gradient, solid or none) |
