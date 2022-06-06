<!--
type: page
title: Autosuggest
location: ./elements/autosuggest
layout: default
-->

# Autosuggest

::
```javascript
::autosuggest::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/text-field?min';
halo('text-field');
const data = [
  { label: 'Cornelius Martin' },
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
  { label: 'Ronan Deleon' }
];
const autoSuggest = document.querySelector('ef-autosuggest');
autoSuggest.addEventListener('suggestions-fetch-requested', (event) => {
  let query = event.detail.query;
  let re = new RegExp(autoSuggest.constructor.EscapeRegExp(query), 'i');
  autoSuggest.suggestions = query ? data.filter((item) => re.test(item.label)) : [];
});
```
```css
section {
  height: 380px;
  padding: 0 3px;
}
ef-text-field, ef-autosuggest {
  width: 300px;
}
```
```html
<section>
  <ef-text-field id="input" placeholder="Type 'e'"></ef-text-field>
  <ef-autosuggest attach="#input"></ef-autosuggest>
</section>
```
::

Autosuggest shows suggested matches to a user query. It can be attached to a text form control, such as Text Field, Multi Input, etc. Autosuggest supports use cases such as custom rendering, pagination, asynchronous data request and others.

## Usage
To start, attach `ef-autosuggest` to an input control such as `ef-text-field` using the `attach` attribute, which accepts CSS selectors.

@> To attach autosuggest to other input controls, see [Use custom input](./elements/autosuggest#use-custom-input).

```html
<ef-text-field id="input" placeholder="Type 'e'"></ef-text-field>
<ef-autosuggest attach="#input"></ef-autosuggest>
```

Implement the `suggestions-fetch-requested` event listener to construct suggestion data from a user query. The event will be triggered when the value of the attached control has changed or when keyboard navigation is performed.

In the listener function, assign suggestion data to the `suggestions` property to display it in the popup.

```javascript
// sample dataset to perform search and process output to show on autosuggest
const data = [{ label: 'Cornelius Martin' },
  { label: 'Memphis Hoover' },
  { label: 'Angela Lloyd' },
  { label: 'Emilee Gay' },
  { label: 'Selah Richardson' }];

const autoSuggest = document.querySelector('ef-autosuggest');
autoSuggest.addEventListener('suggestions-fetch-requested', (event) => {
  // value from attached input control
  const query = event.detail.query;

  // handle the number of min characters and populate suggestions
  if (query && query.length >= 1) {
    autoSuggest.suggestions = data.filter((item) => item.label.indexOf(query) !== -1);
  }
  else {
    autoSuggest.suggestions = [];
  }
});
```
### Data property interface

Autosuggest natively processes data using the [Suggestion](https://github.com/Refinitiv/refinitiv-ui/blob/develop/packages/elements/src/autosuggest/helpers/types.ts) type. For data not applying the `ef-item` model, see [Integrate custom suggestion data](./elements/autosuggest#integrate-with-custom-suggestion-data).

Autosuggest uses the item `label` property to display item labels in the popup and highlight matched text. Autosuggest popup is visible only when there is at least one suggestion.

@> See [Custom renderer](./elements/autosuggest#custom-renderer) if you need to fully control how data should be displayed on UI.

::
```javascript
::autosuggest::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/text-field?min';
halo('text-field');
const data = [
  { label: 'Cornelius Martin' },
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
  { label: 'Ronan Deleon' }
];
const autoSuggest = document.querySelector('ef-autosuggest');
autoSuggest.addEventListener('suggestions-fetch-requested', (event) => {
  const query = event.detail.query;
  autoSuggest.suggestions = query ? data.filter((item) => item.label.indexOf(query) !== -1) : [];
});
```
```css
section {
  height: 380px;
  padding: 0 3px;
}
ef-text-field {
  width: 300px;
}
```
```html
<section>
  <ef-text-field id="input" placeholder="Type 'e'"></ef-text-field>
  <ef-autosuggest attach="#input"></ef-autosuggest>
</section>
```
::

### Grouping results

Autosuggest understands the Item object model, allowing the display of non-selectable headers and dividers. To show a `header` or `divider`, specify the type in suggestion items.

::
```javascript
::autosuggest::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/text-field?min';
halo('text-field');
const data = [{ label: 'Cornelius Martin', group: 'Core Team' },
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
const autoSuggest = document.querySelector('ef-autosuggest');

const groupData = (data) => {
  let groups = {};

  data.forEach((item) => {
    groups[item.group] = groups[item.group] || [];
    groups[item.group].push(item);
  });

  let items = [];
  Object.keys(groups).forEach((group) => {
    items.push({
      type: 'header',
      label: group
    });

    items = items.concat(groups[group]);
  });

  return items;
};

autoSuggest.addEventListener('suggestions-fetch-requested', (event) => {
  const query = event.detail.query;
  autoSuggest.suggestions = query ? groupData(data.filter((item) => item.label.indexOf(query) !== -1)) : [];
});
```
```css
section {
  height: 380px;
  padding: 0 3px;
}
ef-text-field {
  width: 300px;
}
```
```html
<section>
  <ef-text-field id="input" placeholder="Type 'e'"></ef-text-field>
  <ef-autosuggest attach="#input"></ef-autosuggest>
</section>
```
::

```javascript
const data = [
  { label: 'Cornelius Martin', group: 'Core Team' },
  { label: 'Memphis Hoover', group: 'Contractors' },
  { label: 'Angela Lloyd', group: 'Management' },
  // ...
];
const autoSuggest = document.querySelector('ef-autosuggest');

const groupData = (data) => {
  let groups = {};

  data.forEach((item) => {
    groups[item.group] = groups[item.group] || [];
    groups[item.group].push(item);
  });

  let items = [];
  Object.keys(groups).forEach((group) => {
    items.push({
      type: 'header',
      label: group
    });

    items = items.concat(groups[group]);
  });

  return items;
};

autoSuggest.addEventListener('suggestions-fetch-requested', (event) => {
  const query = event.detail.query;
  autoSuggest.suggestions = query ? groupData(data.filter((item) => item.label.indexOf(query) !== -1)) : [];
});
```

### Pagination
When there are many `suggestions` items, it is recommended to use pagination. The implementation of this is down to the app developer. A typical approach could be to show best matches or recent items.

To implement pagination in autosuggest, set the `moreResults` property to `true` when there are additional results to show. This property will display a **Get more results** button at the bottom of the autosuggest UI. Set the property to `false` when showing the last page.

Clicking the **Get more results** button will trigger an `suggestions-fetch-requested` event with the event parameter `event.detail.reason` set to `more-results`.

This example implements pagination and limits the result to show five suggestions per page.

::
```javascript
::autosuggest::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/text-field?min';
halo('text-field');
const data = [
  { label: 'Cornelius Martin' },
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
  { label: 'Ronan Deleon' }
];

let currentPage;
let suggestions;
let pageSize = 5;
let autoSuggest = document.querySelector('ef-autosuggest');

autoSuggest.addEventListener('suggestions-fetch-requested', (event) => {
  const query = event.detail.query;
  const reason = event.detail.reason;

  if (reason === 'more-results') {
      currentPage += 1;
  }
  else {
      currentPage = 1;
      suggestions = [];
  }

  const filteredData = query ? data.filter((item) => item.label.indexOf(query) !== -1) : [];

  const page = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  autoSuggest.moreResults = filteredData.length > currentPage * pageSize;
  autoSuggest.suggestions = suggestions = suggestions.concat(page);
});
```
```css
section {
  height: 380px;
  padding: 0 3px;
}
ef-text-field {
  width: 300px;
}
```
```html
<section>
  <ef-text-field id="input" placeholder="Type 'e'"></ef-text-field>
  <ef-autosuggest attach="#input"></ef-autosuggest>
</section>
```
::

```javascript
autoSuggest.addEventListener('suggestions-fetch-requested', (event) => {
  // ...
  const reason = event.detail.reason;

  // if this is from 'Get more results', do pagination logic
  if (reason === 'more-results') {
    // apply pagination logic
  }
  // ...
});
```

### Asynchronous autosuggestion
Most data is filtered on the server and the results are sent asynchronously to the client. To implement this in autosuggest, requests and responses can be managed using `suggestions-fetch-requested`.

Optionally, the `debounce-rate` attribute can reduce the number of server calls, and the `loading` property can show an animation while waiting for data from the server.

::
```javascript
::autosuggest::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/text-field?min';
halo('text-field');
const data = [
  { label: 'Cornelius Martin' },
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
  { label: 'Ronan Deleon' }
];
const autoSuggest = document.querySelector('ef-autosuggest');
autoSuggest.addEventListener('suggestions-fetch-requested', (event) => {
  const query = event.detail.query;

  // Show loading mask
  autoSuggest.loading = true;

  window.setTimeout(() => {
    // Make sure that the data we are setting is for current query
    if (query === autoSuggest.query) {
      autoSuggest.suggestions = query ? data.filter((item) => item.label.indexOf(query) !== -1) : [];
      autoSuggest.loading = false;
    }
  }, 500);
});
```
```css
section {
  height: 380px;
  padding: 0 3px;
}
ef-text-field {
  width: 300px;
}
```
```html
<section>
  <ef-text-field id="input" placeholder="Type 'e'"></ef-text-field>
  <ef-autosuggest attach="#input" debounceRate="500"></ef-autosuggest>
</section>
```
::

```html
<ef-autosuggest debounce-rate="500"></ef-autosuggest>
```
```javascript
// ...
autoSuggest.addEventListener('suggestions-fetch-requested', (event) => {
  const query = event.detail.query;
  xhttp.onreadystatechange = () => {
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

### Header and footer
Header and/or footer can be added to autosuggest by using slots.

::
```javascript
::autosuggest::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/text-field?min';
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/header?min';
halo('text-field');
halo('header');
const data = [
  { label: 'Cornelius Martin' },
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
  { label: 'Ronan Deleon' }
];
const autoSuggest = document.querySelector('ef-autosuggest');
autoSuggest.addEventListener('suggestions-fetch-requested', (event) => {
  const query = event.detail.query;
  autoSuggest.suggestions = query ? data.filter((item) => item.label.indexOf(query) !== -1) : [];
});
```
```css
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
```
```html
<div id="wrapper">
  <ef-text-field id="input" placeholder="Type 'e'"></ef-text-field>
  <ef-autosuggest attach="#input">
    <ef-header slot="header">Company Employees</ef-header>
    <div slot="footer" class="footer">Did we miss someone?</div>
  </ef-autosuggest>
</div>
```
::

```html
<ef-autosuggest>
  <ef-header slot="header">Company Employees</ef-header>
  <div slot="footer">Did we miss someone?</div>
</ef-autosuggest>
```

### Trigger request on focus
Use the `request-on-focus` attribute to request suggestions when the input is focused.

::
```javascript
::autosuggest::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/text-field?min';
halo('text-field');
const data = [
  { label: 'Cornelius Martin' },
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
  { label: 'Ronan Deleon' }
];
const autoSuggest = document.querySelector('ef-autosuggest');
autoSuggest.addEventListener('suggestions-fetch-requested', (event) => {
  const query = event.detail.query;
  autoSuggest.suggestions = query ? data.filter((item) => item.label.indexOf(query) !== -1) : data;
});
```
```css
section {
  height: 380px;
  padding: 0 3px;
}
ef-text-field {
  width: 300px;
}
```
```html
<section>
  <ef-text-field id="input" placeholder="Click here..."></ef-text-field>
  <ef-autosuggest attach="#input" request-on-focus></ef-autosuggest>
</section>
```
::

```html
<ef-autosuggest request-on-focus></ef-autosuggest>
```

### Popup position
By default, the autosuggest popup is positioned below the attached element. You can change its position by setting the `positionTarget` property. Call `refit()` if `positionTarget` has been called after `ef-autosuggest` has been instantiated.

For further position customization, `ef-autosuggest` supports attributes and properties of `ef-overlay`.

::
```javascript
::autosuggest::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/text-field?min';
halo('text-field');
const data = [
  { label: 'Cornelius Martin' },
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
  { label: 'Ronan Deleon' }
];
const autoSuggest = document.querySelector('ef-autosuggest');
autoSuggest.positionTarget = document.getElementById('custom-popup-position');
autoSuggest.addEventListener('suggestions-fetch-requested', (event) => {
  const query = event.detail.query;
  autoSuggest.suggestions = query ? data.filter((item) => item.label.indexOf(query) !== -1) : [];
});
```
```css
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
```
```html
<section>
  <ef-text-field id="input" placeholder="Type 'e'"></ef-text-field>
  <ef-autosuggest attach="#input"></ef-autosuggest>
  <div id="custom-popup-position"></div>
</section>
```
::

```javascript
autoSuggest.positionTarget = document.getElementById('custom-popup-position');
```

---

## Advanced usage
You can customize many aspects of autosuggest to provide a truly unique solution.

### Custom renderer
Use the `renderer` property to assign a function to override default rendering. The function will be called when each suggestion item is rendered and must return an HTML element.

``` javascript
autoSuggest.renderer = (suggestion, parameters) => {
  const query = parameters.query;
  const el = document.createElement('div');

  // Can implement text highlight based on query here. See `Helper methods section`
  el.innerText = suggestion.label;
  return el;
}
```

If autosuggest is customized and doesn't use `ef-item` or a descendant, a `highlightable` method may be needed to control item highlights and selections, and the `item-highlight` event may be required to set/remove highlight CSS.

!> Suggestions are always rendered in LightDOM, so normal CSS styling rules are applied.

::
```javascript
::autosuggest::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/text-field?min';
halo('text-field');
const data = [
  { label: 'Cornelius Martin', group: 'Core Team' },
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
  { label: 'Ronan Deleon', group: 'Management' }
];
const autoSuggest = document.querySelector('ef-autosuggest');
const getInitials = (label = '') => {
  const split = label.split(' ');

  if (split.length) {
    let initials = split[0][0].toUpperCase();
    if (split[1]) {
      initials += split[split.length - 1][0].toUpperCase();
    }

    return initials;
  }

  return '';
};

autoSuggest.highlightable = () => {
  // all items are highlightable and selectable
  return true;
};

autoSuggest.addEventListener('item-highlight', (event) => {
  event.preventDefault();
  const target = event.detail.target;
  const oldTarget = event.detail.oldTarget;

  if (target) {
    target.classList.toggle('selected', true);
  }

  if (oldTarget) {
    oldTarget.classList.toggle('selected', false);
  }
});

autoSuggest.renderer = (suggestion, parameters) => {
  const query = parameters.query;
  const el = document.createElement('div');
  el.classList.add('user-card');

  let innerHTML = '';

  innerHTML += `<div class="user-card__initials"> ${getInitials(suggestion.label)} </div>`;
  innerHTML += `<div class="user-card__container">`;
  innerHTML += `<div class="user-card__label"> ${autoSuggest.constructor.QueryWordSelect(suggestion.label, query, '<span class="text-highlighted">$1</span>')} </div>`;
  innerHTML += `<div class="user-card__group">Group: ${suggestion.group}</div>`;
  innerHTML += `</div>`;

  el.innerHTML = innerHTML;

  return el;
};

autoSuggest.addEventListener('suggestions-fetch-requested', (event) => {
  const query = event.detail.query;
  autoSuggest.suggestions = query ? data.filter((item) => item.label.indexOf(query) !== -1) : [];
});
```
```css
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
```
```html
<section>
  <ef-text-field id="input" placeholder="Type 'e'"></ef-text-field>
  <ef-autosuggest attach="#input"></ef-autosuggest>
</section>
```
::

``` javascript
autoSuggest.highlightable = (suggestion, el) => {
  return suggestion.type !== 'header' && suggestion.type !== 'divider';
}

autoSuggest.addEventListener('item-highlight', (event) => {
  event.preventDefault();
  const target = event.detail.target;
  const oldTarget = event.detail.oldTarget;

  if (target) {
    target.classList.toggle('selected', true);
  }

  if (oldTarget) {
    oldTarget.classList.toggle('selected', false);
  }
});
```

### Integrate with custom suggestion data
While autosuggest natively understands the Item object model, it is data agnostic, and can render suggestions with your data object schema. For example, if your suggestion data uses `value` instead of `label`, you can do mapping in the `renderer` function and implement `item-select` events and a `highlightable` method.

::
```javascript
::autosuggest::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/text-field?min';
halo('text-field');
const data = [
  { value: 'Cornelius Martin', readonly: true },
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
  { value: 'Ronan Deleon' }
];
const autoSuggest = document.querySelector('ef-autosuggest');
const input = document.getElementById('input');

autoSuggest.highlightable = (suggestion) => suggestion.readonly !== true ;

autoSuggest.addEventListener('item-select', (event) => {
  event.preventDefault();
  const suggestion = event.detail.suggestion;
  const query = event.detail.query;

  // Map the value back to input
  input.value = suggestion ? suggestion.value : query;
});

autoSuggest.renderer = (suggestion, parameters) => {
  let mappedData = {};
  mappedData.label = suggestion.value;
  mappedData.disabled = suggestion.readonly;

  // you can map suggestion to ef-item
  return autoSuggest.constructor.ItemRenderer(mappedData, parameters);
};

autoSuggest.addEventListener('suggestions-fetch-requested', (event) => {
  const query = event.detail.query;
  autoSuggest.suggestions = query ? data.filter((item) => item.value.indexOf(query) !== -1) : [];
});
```
```css
section {
  height: 380px;
  padding: 0 3px;
}
ef-text-field {
  width: 300px;
}
```
```html
<section>
  <ef-text-field id="input" placeholder="Type 'e'"></ef-text-field>
  <ef-autosuggest attach="#input"></ef-autosuggest>
</section>
```
::

```javascript
autoSuggest.renderer = (suggestion, parameters) => {
  let mappedData = {};

  mappedData.label = suggestion.value;
  mappedData.disabled = suggestion.readonly;

  // you can map suggestion to ef-item
  return autoSuggest.constructor.ItemRenderer(mappedData, parameters);
}

autoSuggest.addEventListener('item-select', (event) => {
  event.preventDefault();
  const suggestion = event.detail.suggestion;
  const query = event.detail.query;

  // map the value back to input
  input.value = suggestion ? suggestion.value : query;
});

autoSuggest.highlightable = (suggestion) => suggestion.readonly !== true;
```

### Use custom input
Autosuggest can be attached to any input component. In fact, it can be attached to any HTML element as long as a constructing query object procedure is provided.

For example, to use Multi Input instead of a standard Input: add event listeners to Multi Input in `add-attach-target-events` and use the `remove-attach-target-events` event to remove the listeners.

```javascript
autoSuggest.addEventListener('add-attach-target-events', (ev) => {
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

autoSuggest.addEventListener('remove-attach-target-events', (ev) => {
  ev.preventDefault();

  // Remove event listeners on destroy
  multiInput.removeEventListener('value-changed', autoSuggest.onInputValueChange);
  multiInput.removeEventListener('keydown', autoSuggest.onInputKeyDown);
  multiInput.removeEventListener('focus', autoSuggest.onInputFocus);
  multiInput.removeEventListener('blur', autoSuggest.onInputBlur);
});
```

Define the query using the `suggestions-query` event, and the suggestion selection using the `item-select` event.

```javascript
autoSuggest.addEventListener('suggestions-query', (ev) => {
  ev.preventDefault();

  // The query is populated from `value`
  autoSuggest.query = multiInput.value;
});

autoSuggest.addEventListener('item-select', (ev) => {
  ev.preventDefault();

  const suggestion = ev.detail.suggestion;
  const method = ev.detail.method;

  switch (method) {
    // ...
  }
});
```

::
```javascript
::autosuggest::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/multi-input?min';
halo('multi-input');
const data = [
  { label: 'Cornelius Martin' },
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
  { label: 'Ronan Deleon' }
];
const autoSuggest = document.querySelector('ef-autosuggest');
const multiInput = document.getElementById('multi-input');

multiInput.addEventListener('item-added', (event) => {
  event.preventDefault();

  multiInput.value = '';
});

autoSuggest.addEventListener('add-attach-target-events', (ev) => {
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

autoSuggest.addEventListener('remove-attach-target-events', (ev) => {
  ev.preventDefault();

  // do not forget to remove event listeners on destroy
  multiInput.removeEventListener('value-changed', autoSuggest.onInputValueChange);
  multiInput.removeEventListener('keydown', autoSuggest.onInputKeyDown);
  multiInput.removeEventListener('focus', autoSuggest.onInputFocus);
  multiInput.removeEventListener('blur', autoSuggest.onInputBlur);
});

autoSuggest.addEventListener('suggestions-query', (ev) => {
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

autoSuggest.addEventListener('item-select', (ev) => {
  ev.preventDefault();

  const suggestion = ev.detail.suggestion;
  const method = ev.detail.method;
  const query = ev.detail.query;

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

autoSuggest.addEventListener('suggestions-fetch-requested', (event) => {
  const query = event.detail.query;
  autoSuggest.suggestions = query ? data.filter((item) => item.label.indexOf(query) !== -1) : [];
});
```
```css
section {
  height: 380px;
  padding: 0 3px;
}
```
```html
<section>
  <ef-multi-input id="multi-input" placeholder="Type 'e'"></ef-multi-input>
  <ef-autosuggest attach="#multi-input"></ef-autosuggest>
</section>
```
::

### Complex query
In addition to string-based queries, autosuggest `query` also supports objects, meaning far more complex and powerful queries can be made. The following example uses a `query` object based on two input fields.

::
```javascript
::autosuggest::
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/text-field?min';
import 'https://cdn.skypack.dev/@refinitiv-ui/elements/select?min';
halo('text-field');
halo('select');
const data = [
  { label: 'Cornelius Martin', group: 'Core Team' },
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
  { label: 'Ronan Deleon', group: 'Management' }
];
const autoSuggest = document.querySelector('ef-autosuggest');
const groupEl = document.getElementById('group');
const inputEl = document.getElementById('input');

autoSuggest.addEventListener('remove-attach-target-events', () => {
  // Group change should instantiate inputValueChange as well
  groupEl.addEventListener('value-changed', autoSuggest.onInputValueChange);
});

autoSuggest.renderer = (suggestion, query) => {
  // Ensure that text highlight continues to work. Default render expects String
  const value = query.value;
  return autoSuggest.constructor.ItemRenderer(suggestion, value);
};

autoSuggest.addEventListener('item-select', (ev) => {
  const method = ev.detail.method;
  const query = ev.detail.query;

  // override reset method
  if (method === 'reset') {
    inputEl.value = query.value;
    ev.preventDefault();
  }
});

autoSuggest.addEventListener('suggestions-query', (ev) => {
  ev.preventDefault();

  // construct complex query
  autoSuggest.query = {
    group: groupEl.value,
    value: inputEl.value
  };
});

autoSuggest.addEventListener('suggestions-fetch-requested', (event) => {
  const query = event.detail.query;

  // get group and value from the query
  const group = query.group;
  const value = query.value;
  autoSuggest.suggestions = value && group ? data.filter((item) => item.group === group && item.label.indexOf(value) !== -1) : [];
});
```
```css
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
```
```html
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
```
::

### HTML Renderer
In modern frameworks, it may be more practical to render suggestions directly to `ef-autosuggest`, rather than using the `renderer` function. You can achieve more consistent code and better performance, thanks to Virtual DOM.

Set the `html-renderer` attribute if you intend to populate suggestions directly.

Consider the following example in Vue.js.

```html
<script>
  export default {
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    data: () => {
      return {
        query: '',
        suggestions: []
      };
    }
    methods: {
      highlightText: (label) => this.$refs.suggest.constructor.QueryWordSelect(label, this.query);
      },
      getSuggestions: ({ detail: { query } }) => {
        this.query = query;

        if (!query) {
          this.suggestions = this.data;
        }

        const re = new RegExp(autoSuggest.constructor.EscapeRegExp(query), 'i');
        this.suggestions = this.data.filter(({ label }) => re.test(label));
      },
      clearSuggestions: () => {
        this.suggestions = [];
      },
      selectSuggestion: (ev) => {
        const { detail: { method, suggestion } } = ev;
        if (method === 'click' || method === 'enter') {
          const { value, type } = suggestion;
          this.$emit('suggestion-selected', { value, type });
        }
      },
      mounted: () => {
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

!> Suggestions must be passed to `ef-autosuggest`. `ef-autosuggest.suggestions` must match the rendered element exactly, i.e. `ef-autosuggest.suggestions[0]` is identical to the first rendered element.

## Helper methods
Autosuggest provides some static helper methods.
You can use them through class name, `Autosuggest.<HELPER_METHOD_NAME>()` or the property of the constructor: `this.constructor.<HELPER_METHOD_NAME>()`.

<hr>

### EscapeRegExp (text)
Remove forbidden characters from the given string.

**<small>Parameters:</small>**

| Name   | Type   | Description       |
| ------ | ------ | ----------------- |
| `text` | string | String to process |

**<small>Return:</small>** `String`
String with forbidden characters removed.
<hr>

### QueryWordSelect (text, query, pattern (optional))
Replace all matched query words with an HTML string.

**<small>Parameters:</small>**

| Name                                | Type   | Description                                                                               |
| ----------------------------------- | ------ | ------------------------------------------------------------------------------------------|
| `text`                              | string | String to process                                                                         |
| `query`                             | string | Word to match in the given string                                                         |
| `pattern` <small>(Optional)</small> | string | HTML string to use instead of the default, which is `<span class="highlighted">$1</span>` |

**<small>Return:</small>** `String`
String with matching text processed by `pattern`
<hr>

### ItemRenderer (suggestion, query)
Construct the `ef-item` element from the suggestion object using one-to-one mapping.

**<small>Parameters:</small>**

| Name         | Type   | Description            |
| ------------ | ------ | ---------------------- |
| `suggestion` | object | Suggestion item object |
| `query`      | string | Query word             |

**<small>Return:</small>** `ef-item`
Item element
<hr>

## Accessibility
::a11y-intro::

`ef-autosuggest` popup is used in conjunction with the input field. It is developer responsibility to correctly decorate and link both elements.

`ef-autosuggest` has a role of `listbox`. The default renderer manages the state of autosuggest items. The example below illustrates a typical scenario:

```html
<label for="input">Type 'e'</label>
<input id="input"
       role="combobox"
       aria-controls="autosuggest"
       aria-expanded="false"
       aria-autocomplete="both"
       aria-haspopup="listbox">

<ef-autosuggest id="autosuggest" attach="#input"></ef-autosuggest>
```

```javascript
const inputElement = document.getElementById('input');
const autoSuggest = document.getElementById('autosuggest');

// Set `aria-expanded` based on autosuggest `opened` state
autoSuggest.addEventListener('opened-changed', (event) => {
  const opened = event.detail.value;
  inputElement.setAttribute('aria-expanded', `${opened}`);
  inputElement.removeAttribute('aria-activedescendant');
});

// Set `aria-activedescendant` based on selected item
autoSuggest.addEventListener('item-select', (event) => {
  const target = event.detail.target;
  const targetId = target ? (target.id || '') : '';
  inputElement.setAttribute('aria-activedescendant', targetId);
});
```

More sophisticated scenarios might require different implementation. Please reference the [documentation](https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-autocomplete-list.html) for more details.

::a11y-end::

## Glossary

**Query**

Object used to perform suggestions searching, and typically used to highlight the matched text on the suggestion item. In most scenarios, a query is text entered into an input box but the query can be an object to support more complex searching, see [Complex Query](./elements/autosuggest#complex-query).

**Value**

Object that is displayed in the input box. In most cases, the value is the input text.

**Reason**

Additional information when autosuggest is going to fetch the data. It indicates why autosuggest wants to update the suggestions list. `reason` can be used to control the behavior of autosuggestion, such as implementing paging.

| Reason               | Description                                                                                                                             |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| value-changed        | Input value has changed.                                                                                                                |
| input-focus          | `request-on-focus` is set and the input has received focus.                                                                             |
| suggestions-revealed | Autosuggest popup is hidden and users pressed <kbd>Up</kbd> or <kbd>Down</kbd> key to open suggestions.                                 |
| enter-pressed        | Autosuggest is hidden and user pressed <kbd>Enter</kbd> key to open suggestions                                                         |
| escape-pressed       | Autosuggest is hidden, the input has value and users pressed <kbd>Escape</kbd>. Can be used when suggestions are shown for empty value. |
| more-results         | `more-results` is set and users clicked on **Get More Results**.                                                                        |

<br>

**User Selected Method**

Additional information when the user selects a suggestion item. `item-select` event provide `method` in `event.detail` which represents how the suggestion has been selected. The developer can control the reaction on different selection methods.

| Method     | Description                                                           | Default Action                                                            |
| :--------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| click      | The user clicked on suggestion.                                       | Update input value from clicked suggestion and close auto suggest.        |
| enter      | The user pressed <kbd>Enter</kbd>.                                    | Update input value from selected/first suggestion and close auto suggest. |
| navigation | The user pressed <kbd>Up</kbd> or <kbd>Down</kbd>.                    | Update input value.                                                       |
| reset      | The user pressed <kbd>Escape</kbd>.                                   | Reset input value if set using **navigation** and close auto suggest.     |
| clear      | The user pressed <kbd>Escape</kbd> when auto suggest popup is closed. | Clear the input value.                                                    |
