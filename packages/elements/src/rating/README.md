# Rating
```live(preview)
<style>
  ef-rating {
    margin-right: 25px;
  }
</style>
<ef-rating value="2"></ef-rating>
<ef-rating value="4" interactive></ef-rating>
<ef-rating value="7.5" max="10"></ef-rating>
```

`ef-rating` is a star visualization component that is generally used for ranking.

### Basic usage
By default `ef-rating` is displayed with no stars selected. The user can provide `value` to highlight stars.

```live
<style>
  ef-rating {
    margin-right: 25px;
  }
</style>
<ef-rating></ef-rating>
<ef-rating value="2"></ef-rating>
<ef-rating value="3.5"></ef-rating>
```

```html
<ef-rating></ef-rating>
<ef-rating value="2"></ef-rating>
<ef-rating value="3.5"></ef-rating>
```

### Customize number of stars and size
The user can override the maximum number of stars by setting `max`.

```live
<ef-rating max="10"></ef-rating>
```

```html
<ef-rating max="10"></ef-rating>
```

The user can change the size of stars by using standard CSS style.
```live
<style>
#custom {
  font-size:30px;
}
</style>
<ef-rating id="custom" value="2.5"></ef-rating>
```

```css
#custom {
  font-size:30px;
}
```
```html
<ef-rating id="custom" value="2.5"></ef-rating>
```

### Interactive Rating
By default the user cannot change the value of `ef-rating`. Specifying `interactive` makes it possible to change the value.

```live
<ef-rating id="rateRestaurant" max="10" value="7" interactive></ef-rating>
<pre id="result"></pre>
<script>
    var customRating = document.getElementById('rateRestaurant');
    customRating.addEventListener('value-changed', function (e) {
      document.getElementById('result').textContent = 'You have selected: ' + e.detail.value;
    });
</script>
```

```html
<ef-rating max="10" value="7" interactive></ef-rating>
<pre id="result"></pre>
```
```js
let customRating = document.getElementById('rateRestaurant');
customRating.addEventListener('value-changed', (e) =>  {
  document.getElementById('result').textContent = 'You have selected: ' + e.detail.value;
});
```

### Clear rating by users interaction
Rating can be cleared after value has been set through user interaction.

```js
var el = document.querySelector('ef-rating');
var previousValue = el.value;

el.addEventListener('tap', function (e) {
  
  if ((el.value === previousValue)) {
    el.value = '0';
  }
  
  previousValue = el.value
});
```

### Dynamic Rating
In many scenarios `ef-rating` is dynamically generated based on the input data. This can be easily achieved using `ef-grid` with custom renderer.

```live
<ef-grid id="custom" height="208px"></ef-grid>
<script>
  var grid = document.getElementById('custom');
  grid.config = {
    columns: [
      {
        id: 'c1',
        title: 'Restaurant Name',
        field: 'restaurantName'
      },
      {
        id: 'c2',
        title: 'Rating',
        field: 'averageRating',
        formatter: {
          render: function () { },
          bind: function (rowIndex, columnIndex, value, cell, columnDef, dataRow, dataTable) {
            var rating = cell.getContent();
            if (!rating) {
              rating = document.createElement('ef-rating');
            }
            rating.value = value;
            cell.setContent(rating);
          }
        }
      }
    ],
    dataModel: {
      fields: ['restaurantName', 'averageRating'],
      format: 'rows',
      data: [
        {
          restaurantName: 'Fancy Burgers',
          averageRating: '4.8'
        },
        {
          restaurantName: 'Under The Bridge',
          averageRating: '0.5'
        },
        {
          restaurantName: 'Large Pizzas',
          averageRating: '4'
        },
        {
          restaurantName: 'Evening Dreams',
          averageRating: '3'
        },
        {
          restaurantName: 'Fish Paradise',
          averageRating: '3.2'
        }
      ]
    }
  };
</script>
```

```html
<ef-grid id="custom" height="208px"></ef-grid>
```

```js
let grid = document.getElementById('custom');
grid.config = {
  columns: [
    {
      id: 'c1',
      title: 'Restaurant Name',
      field: 'restaurantName'
    },
    {
      id: 'c2',
      title: 'Rating',
      field: 'averageRating',
      formatter: {
        render: function () { },
        bind: function (rowIndex, columnIndex, value, cell, columnDef, dataRow, dataTable) {
          var rating = cell.getContent();
          if (!rating) {
            rating = document.createElement('ef-rating');
          }
          rating.value = value;
          cell.setContent(rating);
        }
      }
    }
  ],
  dataModel: {
    fields: ['restaurantName', 'averageRating'],
    format: 'rows',
    data: [
      { restaurantName: 'Fancy Burgers', averageRating: '4.8' },
      { restaurantName: 'Under The Bridge', averageRating: '0.5' },
      { restaurantName: 'Large Pizzas', averageRating: '4' },
      { restaurantName: 'Evening Dreams', averageRating: '3' },
      { restaurantName: 'Fish Paradise', averageRating: '3.2' } ]
  }
};
```
