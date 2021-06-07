# Autosuggest

```live(preview)
<style>
section {
  height: 380px;
  padding: 0 3px;
}
ef-text-field, ef-autosuggest {
  width: 300px;
}
</style>
<section>
  <ef-text-field id="input" placeholder="Type 'e'"></ef-text-field>
  <ef-autosuggest attach="#input"></ef-autosuggest>
</section>
<script>
  var data = [{ label: 'Cornelius Martin' },
              { label: 'Memphis Hoover' },
              { label: 'Angela Lloyd' },
              { label: 'Emilee Gay' },
              { label: 'Selah Richardson' },
              { label: 'Christina Erickson' },
              { label: 'Elaina Welch' },
              { label: 'Houston Tran' },
              { label: 'Richard Peterson' },
              { label: 'Andrew Lin' },
              { label: 'Isabell Kaiser' },
              { label: 'Brent Glass' },
              { label: 'Martha Jones' },
              { label: 'Anton Mcclain' },
              { label: 'Jamir Martin' },
              { label: 'Kassandra Manning' },
              { label: 'Madisyn Mccormick' },
              { label: 'Anabel Savage' },
              { label: 'Tyler Phillips' },
              { label: 'Ronan Deleon' }];
  var autoSuggest = document.querySelector('ef-autosuggest');
  autoSuggest.addEventListener('suggestions-fetch-requested', function (event) {
    var query = event.detail.query;
    var re = new RegExp(autoSuggest.constructor.EscapeRegExp(query), 'i');
    autoSuggest.suggestions = query ? data.filter(function (item) {
      return re.test(item.label);
    }) : [];
  });
</script>
```

Autosuggest shows suggestions based on a user query. It can be used by attaching to text form control, such as Text Field, Multi Input, etc. Autosuggest supports various use cases such as custom rendering, pagination, asynchronous data request and others.

### Basic usage
[Using autosuggestion](#using-autosuggestion)
[Grouping results](#grouping-results)
[Pagination](#pagination)
[Asynchronous autosuggestion](#asynchronous-autosuggestion)
[Header and footer](#header-and-footer)
[Trigger request on focus](#trigger-request-on-focus)
[Popup position](#popup-position)

### Advanced usage
[Using custom input](#use-custom-input)
[Integrate with custom suggestion data](#integrate-with-custom-suggestion-data)
[Custom renderer](#custom-renderer)
[Complex query](#complex-query)
[HTML renderer](#html-renderer)

### Appendix
[Helper methods](#helper-methods)
[Glossary](#glossary)

---

## Using auto suggestion
To start, attach `ef-autosuggest` to an input control such as `ef-text-field` by using the `attach` attribute which accepts CSS selectors.

>To attach autosuggest to other input controls, see [Use custom input](#use-custom-input).

```html
<ef-text-field id="input" placeholder="Type 'e'"></ef-text-field>
<ef-autosuggest attach="#input"></ef-autosuggest>
```

Implement `suggestions-fetch-requested` event listener to construct suggestion data from user query. The event will be triggered when the value of attached control has changed or keyboard navigation is performed.

In the listener function, assign suggestion data to `suggestions` property to be displayed in popup.

```javascript
// sample dataset to perform search and process output to show on autosuggest
var data = [{ label: 'Cornelius Martin' },
            { label: 'Memphis Hoover' },
            { label: 'Angela Lloyd' },
            { label: 'Emilee Gay' },
            { label: 'Selah Richardson' }];

var autoSuggest = document.querySelector('ef-autosuggest');
autoSuggest.addEventListener('suggestions-fetch-requested', function (event) {
  // value from attached input control
  var query = event.detail.query;
  
  // handle the number of min characters and populate suggestions
  if (query && query.length >= 1) {
    autoSuggest.suggestions = data.filter(function (item) {
      return item.label.indexOf(query) !== -1;
    });
  }
  else {
    autoSuggest.suggestions = [];
  }
});
```

Autosuggest natively processes data using the **Item** data model i.e. an array of objects containing `type`, `label`, `value`, `title` and `icon`. For data not applying the Item model, see [Custom suggestion data](#custom-suggestion-data).

Autosuggest uses the item `label` property to display item labels in the popup and highlighting matched text.

Autosuggest popup is visible only when there is at least one suggestion.

>See [Custom renderer](#custom-renderer) if you need to fully control how data should be displayed on UI.

```live
<style>
section {
  height: 380px;
  padding: 0 3px;
}
ef-text-field {
  width: 300px;
}
</style>
<section>
  <ef-text-field id="input" placeholder="Type 'e'"></ef-text-field>
  <ef-autosuggest attach="#input"></ef-autosuggest>
</section>
<script>
  var data = [{ label: 'Cornelius Martin' },
              { label: 'Memphis Hoover' },
              { label: 'Angela Lloyd' },
              { label: 'Emilee Gay' },
              { label: 'Selah Richardson' },
              { label: 'Christina Erickson' },
              { label: 'Elaina Welch' },
              { label: 'Houston Tran' },
              { label: 'Richard Peterson' },
              { label: 'Andrew Lin' },
              { label: 'Isabell Kaiser' },
              { label: 'Brent Glass' },
              { label: 'Martha Jones' },
              { label: 'Anton Mcclain' },
              { label: 'Jamir Martin' },
              { label: 'Kassandra Manning' },
              { label: 'Madisyn Mccormick' },
              { label: 'Anabel Savage' },
              { label: 'Tyler Phillips' },
              { label: 'Ronan Deleon' }];
  var autoSuggest = document.querySelector('ef-autosuggest');
  autoSuggest.addEventListener('suggestions-fetch-requested', function (event) {
    var query = event.detail.query;
    autoSuggest.suggestions = query ? data.filter(function (item) {
      return item.label.indexOf(query) !== -1;
    }) : [];
  });
</script>
```

### Grouping results

Autosuggest understands the Item object model, allowing the display of non-selectable headers and dividers.  To show `header` or `divider`, specify the types in suggestion items.

```javascript
var suggestions = [{ label: 'Management', type: 'header' },
                   { label: 'Angela Lloyd', value: 'angela.lloyd' },
                   { label: 'Emilee Gay', value: 'emilee.gay' }];
```

```live
<style>
section {
  height: 380px;
  padding: 0 3px;
}
ef-text-field {
  width: 300px;
}
</style>
<section>
  <ef-text-field id="input" placeholder="Type 'e'"></ef-text-field>
  <ef-autosuggest attach="#input"></ef-autosuggest>
</section>
<script>
  var data = [{ label: 'Cornelius Martin', group: 'Core Team' },
              { label: 'Memphis Hoover', group: 'Contractors' },
              { label: 'Angela Lloyd', group: 'Management' },
              { label: 'Emilee Gay', group: 'Management' },
              { label: 'Selah Richardson', group: 'Core Team' },
              { label: 'Christina Erickson', group: 'Application Team' },
              { label: 'Elaina Welch', group: 'Application Team' },
              { label: 'Houston Tran', group: 'Contractors' },
              { label: 'Richard Peterson', group: 'Core Team' },
              { label: 'Andrew Lin', group: 'Management' },
              { label: 'Isabell Kaiser', group: 'Core Team' },
              { label: 'Brent Glass', group: 'Management' },
              { label: 'Martha Jones', group: 'Application Team' },
              { label: 'Anton Mcclain', group: 'Contractors' },
              { label: 'Jamir Martin', group: 'Core Team' },
              { label: 'Kassandra Manning', group: 'Core Team' },
              { label: 'Madisyn Mccormick', group: 'Management' },
              { label: 'Anabel Savage', group: 'Core Team' },
              { label: 'Tyler Phillips', group: 'Contractors' },
              { label: 'Ronan Deleon', group: 'Management' }];
  var autoSuggest = document.querySelector('ef-autosuggest');
  
  var groupData = function (data) {
    var groups = {};
    
    data.forEach(function(item) {
      groups[item.group] = groups[item.group] || [];
      groups[item.group].push(item);
    });
    
    var items = [];
    Object.keys(groups).forEach(function(group) {
      items.push({
        type: 'header',
        label: group
      });
    
      items = items.concat(groups[group]);
    });
    
    return items;
  };
  
  autoSuggest.addEventListener('suggestions-fetch-requested', function (event) {
    var query = event.detail.query;
    autoSuggest.suggestions = query ? groupData(data.filter(function (item) {
      return item.label.indexOf(query) !== -1;
    })) : [];
  });
</script>
```

```javascript
var data = [{ label: 'Cornelius Martin', group: 'Core Team' },
            { label: 'Memphis Hoover', group: 'Contractors' },
            { label: 'Angela Lloyd', group: 'Management' },
            { label: 'Emilee Gay', group: 'Management' },
            { label: 'Selah Richardson', group: 'Core Team' },
            { label: 'Christina Erickson', group: 'Application Team' },
            { label: 'Elaina Welch', group: 'Application Team' },
            { label: 'Houston Tran', group: 'Contractors' },
            { label: 'Richard Peterson', group: 'Core Team' },
            { label: 'Andrew Lin', group: 'Management' },
            { label: 'Isabell Kaiser', group: 'Core Team' },
            { label: 'Brent Glass', group: 'Management' },
            { label: 'Martha Jones', group: 'Application Team' },
            { label: 'Anton Mcclain', group: 'Contractors' },
            { label: 'Jamir Martin', group: 'Core Team' },
            { label: 'Kassandra Manning', group: 'Core Team' },
            { label: 'Madisyn Mccormick', group: 'Management' },
            { label: 'Anabel Savage', group: 'Core Team' },
            { label: 'Tyler Phillips', group: 'Contractors' },
            { label: 'Ronan Deleon', group: 'Management' }];
var autoSuggest = document.querySelector('ef-autosuggest');

var groupData = function (data) {
  var groups = {};
  
  data.forEach(function(item) {
    groups[item.group] = groups[item.group] || [];
    groups[item.group].push(item);
  });
  
  var items = [];
  Object.keys(groups).forEach(function(group) {
    items.push({
      type: 'header',
      label: group
    });
  
    items = items.concat(groups[group]);
  });
  
  return items;
};

autoSuggest.addEventListener('suggestions-fetch-requested', function (event) {
  var query = event.detail.query;
  autoSuggest.suggestions = query ? groupData(data.filter(function (item) {
    return item.label.indexOf(query) !== -1;
  })) : [];
});
```

### Pagination
When there are many `suggestions` items, it is recommended to use pagination. The implementation of this is down to the app developer. A typical approach could be to show best matches or recent items.

To implement pagination in autosuggest, set `moreResults` property to be `true` when there are more results to show. This property will display a **Get more results** button at the bottom of the autosuggest UI. Set it to `false` when it's showing the last page. 

Clicking the **Get more results** button will trigger an `suggestions-fetch-requested` event with event parameter `event.detail.reason` set to `more-results`.

This example implements pagination and limits the result to show five suggestions per page.

```live
<style>
section {
  height: 380px;
  padding: 0 3px;
}
ef-text-field {
  width: 300px;
}
</style>
<section>
  <ef-text-field id="input" placeholder="Type 'e'"></ef-text-field>
  <ef-autosuggest attach="#input"></ef-autosuggest>
</section>
<script>
  var data = [{ label: 'Cornelius Martin' },
              { label: 'Memphis Hoover' },
              { label: 'Angela Lloyd' },
              { label: 'Emilee Gay' },
              { label: 'Selah Richardson' },
              { label: 'Christina Erickson' },
              { label: 'Elaina Welch' },
              { label: 'Houston Tran' },
              { label: 'Richard Peterson' },
              { label: 'Andrew Lin' },
              { label: 'Isabell Kaiser' },
              { label: 'Brent Glass' },
              { label: 'Martha Jones' },
              { label: 'Anton Mcclain' },
              { label: 'Jamir Martin' },
              { label: 'Kassandra Manning' },
              { label: 'Madisyn Mccormick' },
              { label: 'Anabel Savage' },
              { label: 'Tyler Phillips' },
              { label: 'Ronan Deleon' }];
  
  var currentPage;
  var suggestions;
  var pageSize = 5;
  var autoSuggest = document.querySelector('ef-autosuggest');
  
  autoSuggest.addEventListener('suggestions-fetch-requested', function (event) {
    var query = event.detail.query;
    var reason = event.detail.reason;
    
    if (reason === 'more-results') {
        currentPage += 1;
    }
    else {
        currentPage = 1;
        suggestions = [];
    }
    
    var filteredData = query
      ? data.filter(function (item) {
          return item.label.indexOf(query) !== -1;
        })
      : [];
    
    var page = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    
    autoSuggest.moreResults = filteredData.length > currentPage * pageSize;
    autoSuggest.suggestions = suggestions = suggestions.concat(page);
  });
</script>
```

```javascript
autoSuggest.addEventListener('suggestions-fetch-requested', function (event) {
  // ...
  var reason = event.detail.reason;
  
  // if this is from 'Get more results', do pagination logic
  if (reason === 'more-results') {
    // apply pagination logic
  }
  // ...
});
```

```javascript
var currentPage;
var suggestions;
var pageSize = 5;
var autoSuggest = document.querySelector('ef-autosuggest');

autoSuggest.addEventListener('suggestions-fetch-requested', function (event) {
  var query = event.detail.query;
  var reason = event.detail.reason;
  
  if (reason === 'more-results') {
    currentPage += 1;
  }
  else {
    currentPage = 1;
    suggestions = [];
  }
  
  var filteredData = query ? data.filter(function (item) {
        return item.label.indexOf(query) !== -1;
      }) : [];
  
  var page = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  
  autoSuggest.moreResults = filteredData.length > currentPage * pageSize;
  autoSuggest.suggestions = suggestions = suggestions.concat(page);
});
```

### Asynchronous autosuggestion
Most data is filtered on the server and the result sent asynchronously to the client. To implement this in autosuggest, the request and response can be managed using `suggestions-fetch-requested`.

Optionally, the `debounce-rate` attribute can reduce the number of server calls, and the `loading` property can show an animation while waiting for data from the server.

```html
<ef-autosuggest debounce-rate="500"></ef-autosuggest>
```

```javascript
// ...
autoSuggest.addEventListener('suggestions-fetch-requested', function (event) {
  var query = event.detail.query;
  xhttp.onreadystatechange = function() {
    // make sure that the data we set is for the last query
    if (query === autoSuggest.query) {
      autoSuggest.suggestions = suggestions;

      // do not forget to remove the loading mask on response
      autoSuggest.loading = false;
    }
  };
  // waiting for data, show the loading mask
  autoSuggest.loading = true;
  xhttp.send();
  // ...
});
```

```live
<style>
section {
  height: 380px;
  padding: 0 3px;
}
ef-text-field {
  width: 300px;
}
</style>
<section>
  <ef-text-field id="input" placeholder="Type 'e'"></ef-text-field>
  <ef-autosuggest attach="#input" debounceRate="500"></ef-autosuggest>
</section>
<script>
  var data = [{ label: 'Cornelius Martin' },
              { label: 'Memphis Hoover' },
              { label: 'Angela Lloyd' },
              { label: 'Emilee Gay' },
              { label: 'Selah Richardson' },
              { label: 'Christina Erickson' },
              { label: 'Elaina Welch' },
              { label: 'Houston Tran' },
              { label: 'Richard Peterson' },
              { label: 'Andrew Lin' },
              { label: 'Isabell Kaiser' },
              { label: 'Brent Glass' },
              { label: 'Martha Jones' },
              { label: 'Anton Mcclain' },
              { label: 'Jamir Martin' },
              { label: 'Kassandra Manning' },
              { label: 'Madisyn Mccormick' },
              { label: 'Anabel Savage' },
              { label: 'Tyler Phillips' },
              { label: 'Ronan Deleon' }];
  var autoSuggest = document.querySelector('ef-autosuggest');

  autoSuggest.addEventListener('suggestions-fetch-requested', function (event) {
    var query = event.detail.query;
    
    // Show loading mask
    autoSuggest.loading = true;

    window.setTimeout(function () {
      // Make sure that the data we are setting is for current query
      if (query === autoSuggest.query) {
        autoSuggest.suggestions = query ? data.filter(function (item) {
          return item.label.indexOf(query) !== -1;
        }) : [];
        autoSuggest.loading = false;
      }
    }, 500);
  });
</script>
```

### Header and footer
Header and/or footer can be added to autosuggest by using slots.

```html
<ef-autosuggest>
  <ef-header slot="header">Company Employees</ef-header>
  <div slot="footer">Did we miss someone?</div>
</ef-autosuggest>
```

```live
<style>
#wrapper {
  height: 490px;
  padding: 0 10px;
  background-color: #f3f3f6;
}
ef-text-field {
  width: 300px;
}
.footer {
  padding: 5px 10px;
  font-size: 80%;
  font-style: italic;
  text-align: right;
}
</style>
<div id="wrapper">
  <ef-text-field id="input" placeholder="Type 'e'"></ef-text-field>
  <ef-autosuggest attach="#input">
    <ef-header slot="header">Company Employees</ef-header>
    <div slot="footer" class="footer">Did we miss someone?</div>
  </ef-autosuggest>
</div>
<script>
  var data = [{ label: 'Cornelius Martin' },
              { label: 'Memphis Hoover' },
              { label: 'Angela Lloyd' },
              { label: 'Emilee Gay' },
              { label: 'Selah Richardson' },
              { label: 'Christina Erickson' },
              { label: 'Elaina Welch' },
              { label: 'Houston Tran' },
              { label: 'Richard Peterson' },
              { label: 'Andrew Lin' },
              { label: 'Isabell Kaiser' },
              { label: 'Brent Glass' },
              { label: 'Martha Jones' },
              { label: 'Anton Mcclain' },
              { label: 'Jamir Martin' },
              { label: 'Kassandra Manning' },
              { label: 'Madisyn Mccormick' },
              { label: 'Anabel Savage' },
              { label: 'Tyler Phillips' },
              { label: 'Ronan Deleon' }];
  var autoSuggest = document.querySelector('ef-autosuggest');
  autoSuggest.addEventListener('suggestions-fetch-requested', function (event) {
    var query = event.detail.query;
    autoSuggest.suggestions = query ? data.filter(function (item) {
      return item.label.indexOf(query) !== -1;
    }) : [];
  });
</script>
```

### Trigger request on focus
Use the `request-on-focus` attribute to request suggestions when the input is focused.

```html
<ef-autosuggest request-on-focus></ef-autosuggest>
```

```live
<style>
section {
  height: 380px;
  padding: 0 3px;
}
ef-text-field {
  width: 300px;
}
</style>
<section>
  <ef-text-field id="input" placeholder="Click here..."></ef-text-field>
  <ef-autosuggest attach="#input" request-on-focus></ef-autosuggest>
</section>
<script>
  var data = [{ label: 'Cornelius Martin' },
              { label: 'Memphis Hoover' },
              { label: 'Angela Lloyd' },
              { label: 'Emilee Gay' },
              { label: 'Selah Richardson' },
              { label: 'Christina Erickson' },
              { label: 'Elaina Welch' },
              { label: 'Houston Tran' },
              { label: 'Richard Peterson' },
              { label: 'Andrew Lin' },
              { label: 'Isabell Kaiser' },
              { label: 'Brent Glass' },
              { label: 'Martha Jones' },
              { label: 'Anton Mcclain' },
              { label: 'Jamir Martin' },
              { label: 'Kassandra Manning' },
              { label: 'Madisyn Mccormick' },
              { label: 'Anabel Savage' },
              { label: 'Tyler Phillips' },
              { label: 'Ronan Deleon' }];
  var autoSuggest = document.querySelector('ef-autosuggest');
  autoSuggest.addEventListener('suggestions-fetch-requested', function (event) {
    var query = event.detail.query;
    autoSuggest.suggestions = query ? data.filter(function (item) {
      return item.label.indexOf(query) !== -1;
    }) : data;
  });
</script>
```

### Popup position
By default autosuggest popup is positioned below the attached element. You can change it by setting `positionTarget` property. Call `refit()` if `positionTarget` has been called after `ef-autosuggest` has been instantiated.

For further position customization, `ef-autosuggest` supports attributes and properties of `ef-overlay`.

```javascript
autoSuggest.positionTarget = document.getElementById('custom-popup-position');
```

```live
<style>
section {
  height: 380px;
  padding: 0 3px;
}
ef-text-field {
  width: 300px;
}
#custom-popup-position {
  width: 300px;
  height: 10px;
  background-color: #5ca5d8;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
<section>
  <ef-text-field id="input" placeholder="Type 'e'"></ef-text-field>
  <ef-autosuggest attach="#input"></ef-autosuggest>
  <div id="custom-popup-position"></div>
</section>
<script>
  var data = [{ label: 'Cornelius Martin' },
              { label: 'Memphis Hoover' },
              { label: 'Angela Lloyd' },
              { label: 'Emilee Gay' },
              { label: 'Selah Richardson' },
              { label: 'Christina Erickson' },
              { label: 'Elaina Welch' },
              { label: 'Houston Tran' },
              { label: 'Richard Peterson' },
              { label: 'Andrew Lin' },
              { label: 'Isabell Kaiser' },
              { label: 'Brent Glass' },
              { label: 'Martha Jones' },
              { label: 'Anton Mcclain' },
              { label: 'Jamir Martin' },
              { label: 'Kassandra Manning' },
              { label: 'Madisyn Mccormick' },
              { label: 'Anabel Savage' },
              { label: 'Tyler Phillips' },
              { label: 'Ronan Deleon' }];
  var autoSuggest = document.querySelector('ef-autosuggest');
  autoSuggest.positionTarget = document.getElementById('custom-popup-position');
  autoSuggest.addEventListener('suggestions-fetch-requested', function (event) {
    var query = event.detail.query;
    autoSuggest.suggestions = query ? data.filter(function (item) {
      return item.label.indexOf(query) !== -1;
    }) : [];
  });
</script>
```

---

## Advanced usage
You can customize many aspects of autosuggest to provide a truly unique solution.

### Custom renderer
Use `renderer` property to assign function to override default rendering. The function will be called when each suggestion item is being rendered and must return an HTML element.

``` javascript
autoSuggest.renderer = function (suggestion, parameters) {
  var query = parameters.query;
  var el = document.createElement('div');
  
  // Can implement text highlight based on query here. See `Helper methods section`
  el.innerText = suggestion.label;
  return el;
}
```

If autosuggest is customized and doesn't use `ef-item` or a descendant, a `highlightable` method may be needed to control item highlight and selection, and `item-highlight` event to set/remove highlight CSS.

>Suggestions are always rendered in LightDOM, so normal CSS styling rules are applied.

``` javascript
autoSuggest.highlightable = function (suggestion, el) {
  return suggestion.type !== 'header' && suggestion.type !== 'divider';
}

autoSuggest.addEventListener('item-highlight', function (event) {
  event.preventDefault();
  var target = event.detail.target;
  var oldTarget = event.detail.oldTarget;
  
  if (target) {
    target.classList.toggle('selected', true);
  }
  
  if (oldTarget) {
    oldTarget.classList.toggle('selected', false);
  }
});
```

```live
<style>
section {
  height: 380px;
  padding: 0 3px;
}
ef-text-field {
  width: 300px;
}
.user-card {
  display: flex;
  padding: 10px;
  cursor: pointer;
  align-items: center;
}
.user-card:not(:last-child) {
  border-bottom: 1px solid rgba(238, 118, 0, .6);
}
.user-card__initials {
  border-radius: 100%;
  margin: 0;
  height: 40px;
  text-align: center;
  line-height: 40px;
  width: 40px;
  margin-right: 10px;
  border: 1px solid rgba(238, 118, 0, .6);
}
.user-card__group {
  margin-top: 3px;
  opacity: 0.7;
  font-size: 70%;
}
.user-card.selected {
  background-color: rgba(238, 118, 0, .05);
}
.user-card .text-highlighted {
  background-color: rgba(238, 118, 0, .6);
}
</style>
<section>
  <ef-text-field id="input" placeholder="Type 'e'"></ef-text-field>
  <ef-autosuggest attach="#input"></ef-autosuggest>
</section>
<script>
  var data = [{ label: 'Cornelius Martin', group: 'Core Team' },
              { label: 'Memphis Hoover', group: 'Contractors' },
              { label: 'Angela Lloyd', group: 'Management' },
              { label: 'Emilee Gay', group: 'Management' },
              { label: 'Selah Richardson', group: 'Core Team' },
              { label: 'Christina Erickson', group: 'Application Team' },
              { label: 'Elaina Welch', group: 'Application Team' },
              { label: 'Houston Tran', group: 'Contractors' },
              { label: 'Richard Peterson', group: 'Core Team' },
              { label: 'Andrew Lin', group: 'Management' },
              { label: 'Isabell Kaiser', group: 'Core Team' },
              { label: 'Brent Glass', group: 'Management' },
              { label: 'Martha Jones', group: 'Application Team' },
              { label: 'Anton Mcclain', group: 'Contractors' },
              { label: 'Jamir Martin', group: 'Core Team' },
              { label: 'Kassandra Manning', group: 'Core Team' },
              { label: 'Madisyn Mccormick', group: 'Management' },
              { label: 'Anabel Savage', group: 'Core Team' },
              { label: 'Tyler Phillips', group: 'Contractors' },
              { label: 'Ronan Deleon', group: 'Management' }];
  var autoSuggest = document.querySelector('ef-autosuggest');
  
  var getInitials = function (label = '') {
    var split = label.split(' ');
    
    if (split.length) {
      var initials = split[0][0].toUpperCase();
      if (split[1]) {
        initials += split[split.length - 1][0].toUpperCase();
      }
      
      return initials;
    }
    
    return '';
  };
  
  autoSuggest.highlightable = function () {
    // all items are highlightable and selectable
    return true;
  };
  
  autoSuggest.addEventListener('item-highlight', function (event) {
    event.preventDefault();
    var target = event.detail.target;
    var oldTarget = event.detail.oldTarget;
    
    if (target) {
      target.classList.toggle('selected', true);
    }
    
    if (oldTarget) {
      oldTarget.classList.toggle('selected', false);
    }
  });
  
  autoSuggest.renderer = function (suggestion, parameters) {
    var query = parameters.query;
    var el = document.createElement('div');
    el.classList.add('user-card');
    
    var innerHTML = '';
    
    innerHTML += '<div class="user-card__initials">' + getInitials(suggestion.label) + '</div>';
    innerHTML += '<div class="user-card__container">';
    innerHTML += '<div class="user-card__label">' + autoSuggest.constructor.QueryWordSelect(suggestion.label, query, '<span class="text-highlighted">$1</span>') + '</div>';
    innerHTML += '<div class="user-card__group">Group: ' + suggestion.group + '</div>';
    innerHTML += '</div>';
    
    el.innerHTML = innerHTML;

    return el;
  };
  
  autoSuggest.addEventListener('suggestions-fetch-requested', function (event) {
    var query = event.detail.query;
    autoSuggest.suggestions = query ? data.filter(function (item) {
      return item.label.indexOf(query) !== -1;
    }) : [];
  });
</script>
```

### Integrate with custom suggestion data
While autosuggest natively understands Item object model, it is data agnostic. It can render suggestions with your data object schema. For example, if your suggestion data uses `value` instead of `label`, you can do mapping in the `renderer` function and implement `item-select` events and a `highlightable` method.

```javascript
autoSuggest.renderer = function (suggestion, parameters) {
  var mappedData = {};
  
  mappedData.label = suggestion.value;
  mappedData.disabled = suggestion.readonly;
  
  // you can map suggestion to ef-item
  return autoSuggest.constructor.ItemRenderer(mappedData, parameters);
}

autoSuggest.addEventListener('item-select', function (event) {
  event.preventDefault();
  var suggestion = event.detail.suggestion;
  var query = event.detail.query;
  
  // map the value back to input
  input.value = suggestion ? suggestion.value : query;
});

autoSuggest.highlightable = function (suggestion) {
  return suggestion.readonly !== true;
}
```

```live
<style>
section {
  height: 380px;
  padding: 0 3px;
}
ef-text-field {
  width: 300px;
}
</style>
<section>
  <ef-text-field id="input" placeholder="Type 'e'"></ef-text-field>
  <ef-autosuggest attach="#input"></ef-autosuggest>
</section>
<script>
  var data = [{ value: 'Cornelius Martin', readonly: true },
              { value: 'Memphis Hoover' },
              { value: 'Angela Lloyd' },
              { value: 'Emilee Gay', readonly: true },
              { value: 'Selah Richardson' },
              { value: 'Christina Erickson' },
              { value: 'Elaina Welch', readonly: true },
              { value: 'Houston Tran' },
              { value: 'Richard Peterson' },
              { value: 'Andrew Lin', readonly: true },
              { value: 'Isabell Kaiser' },
              { value: 'Brent Glass' },
              { value: 'Martha Jones', readonly: true },
              { value: 'Anton Mcclain' },
              { value: 'Jamir Martin' },
              { value: 'Kassandra Manning', readonly: true },
              { value: 'Madisyn Mccormick' },
              { value: 'Anabel Savage' },
              { value: 'Tyler Phillips', readonly: true },
              { value: 'Ronan Deleon' }];
  var autoSuggest = document.querySelector('ef-autosuggest');
  var input = document.getElementById('input');
  
  autoSuggest.highlightable = function (suggestion) {
    return suggestion.readonly !== true;
  };
  
  autoSuggest.addEventListener('item-select', function (event) {
    event.preventDefault();
    var suggestion = event.detail.suggestion;
    var query = event.detail.query;
  
    // Map the value back to input
    input.value = suggestion ? suggestion.value : query;
  });
  
  autoSuggest.renderer = function (suggestion, parameters) {
    var mappedData = {};
    mappedData.label = suggestion.value;
    mappedData.disabled = suggestion.readonly;
  
    // you can map suggestion to ef-item
    return autoSuggest.constructor.ItemRenderer(mappedData, parameters);
  };
  
  autoSuggest.addEventListener('suggestions-fetch-requested', function (event) {
    var query = event.detail.query;
    autoSuggest.suggestions = query ? data.filter(function (item) {
      return item.value.indexOf(query) !== -1;
    }) : [];
  });
</script>
```

### Use custom input
Autosuggest can be attached to any input component. In fact, it can be attached to any HTML element as long as a constructing query object procedure is provided.

For example, to use Multi Input instead of a standard Input: add event listeners to Multi Input in `add-attach-target-events` and use `remove-attach-target-events` event to remove the listeners.

```javascript
autoSuggest.addEventListener('add-attach-target-events', function (ev) {
  ev.preventDefault();
  
  // Add event listeners to the input
  // pipeline that run on input value change
  multiInput.addEventListener('value-changed', autoSuggest.onInputValueChange);
  // pipeline that run on key down
  multiInput.addEventListener('keydown', autoSuggest.onInputKeyDown);
  // pipeline that run on input focus
  multiInput.addEventListener('focus', autoSuggest.onInputFocus);
  // pipeline that run on input blur
  multiInput.addEventListener('blur', autoSuggest.onInputBlur);
});

autoSuggest.addEventListener('remove-attach-target-events', function (ev) {
  ev.preventDefault();
  
  // Remove event listeners on destroy
  multiInput.removeEventListener('value-changed', autoSuggest.onInputValueChange);
  multiInput.removeEventListener('keydown', autoSuggest.onInputKeyDown);
  multiInput.removeEventListener('focus', autoSuggest.onInputFocus);
  multiInput.removeEventListener('blur', autoSuggest.onInputBlur);
});
```

Define the query using the `suggestions-query` event, and the suggestion selection using the `item-select`event.

```javascript
autoSuggest.addEventListener('suggestions-query', function (ev) {
  ev.preventDefault();

  // The query is populated from `value`
  autoSuggest.query = multiInput.value;
});

autoSuggest.addEventListener('item-select', function (ev) {
  ev.preventDefault();
  
  var suggestion = ev.detail.suggestion;
  var method = ev.detail.method;
  
  switch (method) {
    // ...
  }
});
```

```live
<style>
section {
  height: 380px;
  padding: 0 3px;
}
</style>
<section>
  <ef-multi-input id="multi-input" placeholder="Type 'e'"></ef-multi-input>
  <ef-autosuggest attach="#multi-input"></ef-autosuggest>
</section>
<script>
  var data = [{ label: 'Cornelius Martin' },
              { label: 'Memphis Hoover' },
              { label: 'Angela Lloyd' },
              { label: 'Emilee Gay' },
              { label: 'Selah Richardson' },
              { label: 'Christina Erickson' },
              { label: 'Elaina Welch' },
              { label: 'Houston Tran' },
              { label: 'Richard Peterson' },
              { label: 'Andrew Lin' },
              { label: 'Isabell Kaiser' },
              { label: 'Brent Glass' },
              { label: 'Martha Jones' },
              { label: 'Anton Mcclain' },
              { label: 'Jamir Martin' },
              { label: 'Kassandra Manning' },
              { label: 'Madisyn Mccormick' },
              { label: 'Anabel Savage' },
              { label: 'Tyler Phillips' },
              { label: 'Ronan Deleon' }];
  var autoSuggest = document.querySelector('ef-autosuggest');
  var multiInput = document.getElementById('multi-input');
  
  multiInput.addEventListener('item-added', function (event) {
    event.preventDefault();

    multiInput.value = '';
  });

  autoSuggest.addEventListener('add-attach-target-events', function (ev) {
    ev.preventDefault();

    // add event listeners to the input. You do not have to implement all
    // pipeline that run on input value change
    multiInput.addEventListener('value-changed', autoSuggest.onInputValueChange);
    // pipeline that run on key down
    multiInput.addEventListener('keydown', autoSuggest.onInputKeyDown);
    // pipeline that run on input focus
    multiInput.addEventListener('focus', autoSuggest.onInputFocus);
    // pipeline that run on input blur
    multiInput.addEventListener('blur', autoSuggest.onInputBlur);
  });
  
  autoSuggest.addEventListener('remove-attach-target-events', function (ev) {
    ev.preventDefault();
    
    // do not forget to remove event listeners on destroy
    multiInput.removeEventListener('value-changed', autoSuggest.onInputValueChange);
    multiInput.removeEventListener('keydown', autoSuggest.onInputKeyDown);
    multiInput.removeEventListener('focus', autoSuggest.onInputFocus);
    multiInput.removeEventListener('blur', autoSuggest.onInputBlur);
  });
  
  autoSuggest.addEventListener('suggestions-query', function (ev) {
    ev.preventDefault();
  
    // If Enter is pressed, add the value stright away
    if (ev.detail.reason === 'enter-pressed' && multiInput.value) {
      multiInput.add({
        value: multiInput.value,
        label: multiInput.value
      });
    }
  
    // Otherwise call for suggestions
    autoSuggest.query = multiInput.value;
  });
  
  autoSuggest.addEventListener('item-select', function (ev) {
    ev.preventDefault();
    
    var suggestion = ev.detail.suggestion;
    var method = ev.detail.method;
    var query = ev.detail.query;
  
    switch (method) {
      case 'click':
      case 'enter':
        multiInput.add({
          value: suggestion.label,
          label: suggestion.label
        });

        multiInput.value = '';
        break;
      case 'navigation':
        multiInput.value = suggestion.label;
        break;
      case 'clear':
        multiInput.value = '';
        break;
      case 'reset':
        multiInput.value = query;
        break;
      default:
        // no default
    }
  });
  
  autoSuggest.addEventListener('suggestions-fetch-requested', function (event) {
    var query = event.detail.query;
    autoSuggest.suggestions = query ? data.filter(function (item) {
      return item.label.indexOf(query) !== -1;
    }) : [];
  });
</script>
```

### Complex query
In addition to string-based queries, autosuggest `query` also supports objects, meaning far more complex and powerful queries can be made. The following example uses a `query` object based on two input fields.

```live
<style>
section {
  height: 380px;
  padding: 0 3px;
}
.container {
  display: flex;
  flex-direction: column;
}
ef-text-field, ef-select {
  width: 300px;
}
</style>
<section>
  <div class="container">
    <ef-select id="group">
      <ef-item selected>Core Team</ef-item>
      <ef-item>Management</ef-item>
      <ef-item>Application Team</ef-item>
      <ef-item>Contractors</ef-item>
    </ef-select>
    <ef-text-field id="input" placeholder="Type 'e'"></ef-text-field>
  </div>
  <ef-autosuggest attach="#input"></ef-autosuggest>
</section>
<script>
  var data = [{ label: 'Cornelius Martin', group: 'Core Team' },
              { label: 'Memphis Hoover', group: 'Contractors' },
              { label: 'Angela Lloyd', group: 'Management' },
              { label: 'Emilee Gay', group: 'Management' },
              { label: 'Selah Richardson', group: 'Core Team' },
              { label: 'Christina Erickson', group: 'Application Team' },
              { label: 'Elaina Welch', group: 'Application Team' },
              { label: 'Houston Tran', group: 'Contractors' },
              { label: 'Richard Peterson', group: 'Core Team' },
              { label: 'Andrew Lin', group: 'Management' },
              { label: 'Isabell Kaiser', group: 'Core Team' },
              { label: 'Brent Glass', group: 'Management' },
              { label: 'Martha Jones', group: 'Application Team' },
              { label: 'Anton Mcclain', group: 'Contractors' },
              { label: 'Jamir Martin', group: 'Core Team' },
              { label: 'Kassandra Manning', group: 'Core Team' },
              { label: 'Madisyn Mccormick', group: 'Management' },
              { label: 'Anabel Savage', group: 'Core Team' },
              { label: 'Tyler Phillips', group: 'Contractors' },
              { label: 'Ronan Deleon', group: 'Management' }];
  var autoSuggest = document.querySelector('ef-autosuggest');
  var groupEl = document.getElementById('group');
  var inputEl = document.getElementById('input');
  
  autoSuggest.addEventListener('remove-attach-target-events', function () {
    // Group change should instantiate inputValueChange as well
    groupEl.addEventListener('value-changed', autoSuggest.onInputValueChange);
  });
  
  autoSuggest.renderer = function (suggestion, query) {
    // Ensure that text highlight continues to work. Default render expects String
    var value = query.value;
    return autoSuggest.constructor.ItemRenderer(suggestion, value);
  };
  
  autoSuggest.addEventListener('item-select', function (ev) {
    var method = ev.detail.method;
    var query = ev.detail.query;
  
    // override reset method
    if (method === 'reset') {
      inputEl.value = query.value;
      ev.preventDefault();
    }
  });
  
  autoSuggest.addEventListener('suggestions-query', function (ev) {
    ev.preventDefault();
    
    // construct complex query
    autoSuggest.query = {
      group: groupEl.value,
      value: inputEl.value
    };
  });
  
  autoSuggest.addEventListener('suggestions-fetch-requested', function (event) {
    var query = event.detail.query;
    
    // get group and value from the query
    var group = query.group;
    var value = query.value;
    
    autoSuggest.suggestions = value && group ? data.filter(function (item) {
      return item.group === group && item.label.indexOf(value) !== -1;
    }) : [];
  });
</script>
```

### HTML Renderer
In modern frameworks, it may be more practical to render suggestions directly to `ef-autosuggest`, rather than using the `renderer` function. You can achieve more consistent code and better performance, thanks to Virtual DOM.

Set `html-renderer` attribute if you intend to populate suggestions directly.

Consider the following example in Vue.js.

``` vue
<script>
  export default {
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    data: function () {
      return {
        query: '',
        suggestions: []
      };
    }
    methods: {
      highlightText: function(label) {
        return this.$refs.suggest.constructor.QueryWordSelect(label, this.query);
      },
      getSuggestions: function({ detail: { query } }) {
        this.query = query;
        
        if (!query) {
          this.suggestions = this.data;
        }
        
        const re = new RegExp(autoSuggest.constructor.EscapeRegExp(query), 'i');
        this.suggestions = this.data.filter(({ label }) => re.test(label));
      },
      clearSuggestions: function() {
        this.suggestions = [];
      },
      selectSuggestion: function(ev) {
        const { detail: { method, suggestion } } = ev;
        if (method === 'click' || method === 'enter') {
          const { value, type } = suggestion;
          this.$emit('suggestion-selected', { value, type });
        }
      },
      mounted: function() {
        this.$refs.suggest.attach = this.$refs.input;
      }
    }
  };
</script>
<template>
  <div>
    <ef-text-field ref="input"></ef-text-field>
    <ef-autosuggest
      ref="suggest" 
      html-renderer
      :suggestions.prop="this.suggestions"
      @item-select="selectSuggestion"
      @suggestions-clear-requested.prevent="clearSuggestions"
      @suggestions-fetch-requested="getSuggestions">
      <ef-item
        v-for="(suggestion) in this.suggestions"
        :key="suggestion.id"
        v-html="highlightText(suggestion.label)"></ef-item>
    </ef-autosuggest>
  </div>
</template>
```

> Suggestions must be passed to `ef-autosuggest`. `ef-autosuggest.suggestions` must match the rendered element exactly, i.e. `ef-autosuggest.suggestions[0]` is identical to the first rendered element.

## Helper methods
Autosuggest provides some static helper methods.
You can use them through class name, `Autosuggest.<HELPER_METHOD_NAME>()` or property of the constructor: `this.constructor.<HELPER_METHOD_NAME>()`.

<hr>

### EscapeRegExp (text)
Remove forbidden characters from given string

**<small>Parameters:</small>**

| Name   | Type   | Description       |
| ------ | ------ | ----------------- |
| `text` | string | String to process |

**<small>Return:</small>** `String`
String with forbidden characters removed
<hr>

### QueryWordSelect (text, query, pattern (optional))
Replace all matched query words with an HTML string

**<small>Parameters:</small>**

| Name                                | Type   | Description                                                                                          |
| ----------------------------------- | ------ | ---------------------------------------------------------------------------------------------------- |
| `text`                              | string | String to process                                                                                    |
| `query`                             | string | Word to match in the given string                                                                    |
| `pattern` <small>(Optional)</small> | string | HTML string to use instead of default one. Default is `<span class="highlighted">$1</span>` |

**<small>Return:</small>** `String`
String with matching text processed by `pattern`
<hr>

### ItemRenderer (suggestion, query)
Construct `ef-item` element from suggestion object using one-to-one mapping.

**<small>Parameters:</small>**

| Name         | Type   | Description            |
| ------------ | ------ | ---------------------- |
| `suggestion` | object | Suggestion item object |
| `query`      | string | Query word             |

**<small>Return:</small>** `ef-item`
Item element
<hr>


## Glossary
**Query**

Object used to perform suggestions searching, and typically used to highlight the matched text on the suggestion item. In most scenarios, a query is text entered in an input box but query can be an object to support more complex searching, see [Complex Query](#complex-query).

**Value**

Object that is displayed in the input box. In most cases, the value is the input text.

**Reason**

Additional information when autosuggest is going to fetch the data. It indicates why autosuggest wants to update the suggestions list. `reason` can be used to control behavior of autosuggestion, such as implementing paging.
 
| Reason               | Description                                                                                                                             |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| value-changed        | Input value has changed.                                                                                                                |
| input-focus          | `request-on-focus` is set and the input has received focus.                                                                             |
| suggestions-revealed | Autosuggest popup is hidden and users pressed <kbd>Up</kbd> or <kbd>Down</kbd> key to open suggestions.                                 |
| enter-pressed        | Autosuggest is hidden and user pressed <kbd>Enter</kbd> key to open suggestions                                                         |
| escape-pressed       | Autosuggest is hidden, the input has value and users pressed <kbd>Escape</kbd>. Can be used when suggestions are shown for empty value. |
| more-results         | `more-results` is set and users clicked on **Get More Results**.                                                                            |

**Method**

Additional information when the user selects suggestion item. `method` says how the suggestion has been selected. The developer can control the reaction on different selection methods.

| Method     | Description                                                           | Default Action                                                            |
| :--------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| click      | The user clicked on suggestion.                                       | Update input value from clicked suggestion and close auto suggest.        |
| enter      | The user pressed <kbd>Enter</kbd>.                                    | Update input value from selected/first suggestion and close auto suggest. |
| navigation | The user pressed <kbd>Up</kbd> or <kbd>Down</kbd>.                    | Update input value.                                                       |
| reset      | The user pressed <kbd>Escape</kbd>.                                   | Reset input value if set using **navigation** and close auto suggest.       |
| clear      | The user pressed <kbd>Escape</kbd> when auto suggest popup is closed. | Clear the input value.                                                    |

## Slots
Slot is a placeholder inside a component that you can fill with your own content. This component provides slot as following.

**header**
Header slot.

**footer**
Footer slot.
