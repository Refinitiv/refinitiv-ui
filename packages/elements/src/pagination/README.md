# Pagination

```live(preview)
<style>
#wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  margin-right: 100px;
}
</style>
<div id="wrapper">
  <ef-pagination page-size="5" total-items="32"></ef-pagination>
</div>
```

`ef-pagination` is used when content is divided into separate pages to display the page numbers and enable navigation between them. The component should be positioned at the bottom right of the content.

### Basic usage
Pagination component requires mandatory attributes, `page-size` and `total-items`. It will use them to calculate number of total pages.

By default, pagination will set initial page to first page but you can change it by using `page` attribute.

```live
<style>
#wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  margin-right: 100px;
}
</style>
<div id="wrapper">
  <ef-pagination page="3" page-size="5" total-items="32"></ef-pagination>
</div>
```

```html
<ef-pagination page="3" page-size="5" total-items="32"></ef-pagination>
```


### Disabled
To disable pagination, use `disabled` attribute.

```live
<style>
#wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  margin-right: 100px;
}
</style>
<div id="wrapper">
  <ef-pagination disabled page-size="5" total-items="32"></ef-pagination>
</div>
```

```html
<ef-pagination disabled page-size="5" total-items="32"></ef-pagination>
```

### Responsive width
Page description section will be hidden if width of component is less than breaking point, defined by theme. You can override this value by using CSS variable, `--responsive-width`.

For example, to hide page description when width is less than 400px;

```live
<style>
#wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  margin-right: 100px;
}
ef-pagination {
    width: 390px;
    ---responsive-width: 400;
}
</style>
<div id="wrapper">
  <ef-pagination page-size="5" total-items="32"></ef-pagination>
</div>
```

```css
  ef-pagination {
    ---responsive-width: 400;
  }
```

### Page changed
Pagination component will fire `page-changed` with value of new page in `e.detail.value`.

```live
<style>
#wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  margin-right: 100px;
}
#console {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<div id="wrapper">
  <ef-pagination id="pagination" page-size="5" total-items="32"></ef-pagination>
</div>
<div id="console">
  Page =&nbsp;<span id="text"></span>
</div>
<script>
  var pagination = document.getElementById('pagination');
  pagination.addEventListener('page-changed', function(e) {
    var text = document.getElementById('text');
    text.textContent = e.detail.value;
  });
</script>
```

```html
<ef-pagination id="pagination" page-size="5" total-items="32"></ef-pagination>
<script>
  var pagination = document.getElementById('pagination');
  pagination.addEventListener('page-changed', function (e) { console.log(e.detail.value) });
</script>
```
