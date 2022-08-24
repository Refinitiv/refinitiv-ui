<!--
type: page
title: React
location: ./tutorials/react
layout: default
-->

<div style="float:right">
  <a href="https://reactjs.org/" target="_blank">reactjs.org</a>
</div>

# React Guide

@>This guideline uses create-react-app, React v18.2.0

## Using Web Components in React

Current version of React does not fully support Web Components. You have to pass the properties and events in a special ways,
the best solution is to write a React Component that behaves as a wrapper for your Web Component.

@>Experimental version of react is fully support Web Components you can try this yourself with a [live demo](https://codesandbox.io/s/tabbar-router-experimental-dq0npp?file=/src/App.js). To follow the status of it check out [custom-elements-everywhere.com](https://custom-elements-everywhere.com/#react).

To overcome these shortcomings in our example, we will show how we can create thin React wrapper components around our Web Components. 

### Create a wrapper component

To create React application we will use [Create React App](https://create-react-app.dev/) CLI tool. Run the following command.

```sh
npx create-react-app my-app
```

It will create a directory called `my-app` inside the current folder. Inside that directory, it will generate the initial project structure and install the required dependencies.

<br>

Then installs elements and themes.

```sh
npm install @refinitiv-ui/elements @refinitiv-ui/halo-theme
```

Import elements that you want to use and theme in `src/index.js`. You can also import EF components and themes anywhere in react components but for the simplicity we'll import all at once.

```javascript
import '@refinitiv-ui/elements/select';
import '@refinitiv-ui/elements/panel';

import '@refinitiv-ui/halo-theme/dark/imports/native-elements';
import '@refinitiv-ui/elements/select/themes/halo/dark';
import '@refinitiv-ui/elements/panel/themes/halo/dark';
```

<br>

In our React application, we will need to create a React Select component to wrap our existing `ef-select` component.
We need to map the Web Component properties and events to our React version of the component with the `useLayoutEffect` hook (or `componentDidMount` in class component).

```jsx
import React from 'react';

function Select ({ className, value, onChange, data }) {
  const selectRef = React.useRef(); // grab a DOM reference to our `ef-select` 

  React.useLayoutEffect(() => {
    const { current } = ref;

    const handleChange = (event) => {
      onChange(event.detail.value);
    }

    current.data = data;
    current.value = value;
    current.addEventListener('value-changed', handleChange);

    return () => current.removeEventListener('value-changed', handleChange);

  }, [selectRef, onChange, data, value]);

  return <ef-select ref={selectRef} class={className} value={value}></ef-select>
}

export default Select;
```

One common confusion is that Web Components use `class` instead of `className`.

```html
<ef-select class="my-select"></ef-select>
```

<br>

Add our Select component to `src/App.js`

```jsx
import React, { useState } from 'react';
import Select from './Select';
import './App.css';

function App() {
  const [value, setValue] = useState('');

  const data = [{ label: 'Tea', value: 'tea' }, { label: 'Beer', value: 'beer' }];

  const handleChange = (value) => {
    setValue(value);
  }

  const handleClickReset = () => {
    setValue('');
  }

  return (
    <ef-panel spacing>
      <Select className='my-select' onChange={handleChange} data={data} value={value} />
      <button onClick={handleClickReset}>Reset</button>
    </ef-panel>
  );
}

export default App;
```

And in `src/App.css`

```css
.my-select {
  width: 200px;
  margin-right: 10px;
}
```

Finally, starting your app and it should automatically open `http://localhost:3000/` on your default browser.

```sh
npm start
```

### Using utility wrapper

The previous section has shown you how to wire Web Components into React Components yourself. However, this process could be automated with a wrapper that takes care about formatting objects and arrays to JSON and registering functions as event listeners.

We recommended the package that created by Lit team called [@lit-labs/react](https://github.com/lit/lit/tree/main/packages/labs/react#lit-labsreact).

*> This package is part of [Lit Labs](https://lit.dev/docs/libraries/labs/) that isn't quite ready for production and It's subject to breaking changes.

From inside your project folder, run:

```sh
npm install @lit-labs/react
```

Import React, a refinitv-ui element class, and createComponent.

```jsx
import React from 'react';
import { createComponent } from '@lit-labs/react';
import { Select as EfSelect } from '@refinitiv-ui/elements/select';

export const Select = createComponent(
  React,
  'ef-select',
  EfSelect,
  {
    onchange: 'value-changed',
  }
);
```

After defining the React component, you can use it just as you would any other React component.

```jsx
const [value, setValue] = useState('');
const data = [{ label: 'Tea', value: 'tea' }, { label: 'Beer', value: 'beer' }];

return (
  <div>
    <Select
      className="my-select"
      data={data}
      value={value}
      onchange={(event) => { setValue(event.detail.value) }}
    />
    ...
  </div>
)
```

## Testing With Jest

If you use [Create React App](https://create-react-app.dev/), Jest is already included out of the box with useful defaults.

By default, Jest doesn't transform dependencies inside `/node_modules` folder, it will not understand the code and resulting in syntax error. You need to use `transformIgnorePatterns` to allow transpiling EF modules, and other modules if requires [see more](https://jestjs.io/docs/configuration#transformignorepatterns-arraystring).

Additionally, Jest doesn't support package exports feature in package.json yet – this has been supported in new modern bundlers e.g. WebPack 5. As a result, Jest wouldn't be able to find importing modules in your application. You can resolve this by using `moduleNameMapper` in Jest configuration, `package.json`.

```json
  "jest": {
    "transformIgnorePatterns": ["node_modules/(?!@refinitiv-ui)/"],
    "moduleNameMapper": {
      "@refinitiv-ui/((?!.*-theme).*?)/(.*)": "<rootDir>/node_modules/@refinitiv-ui/$1/lib/$2"
    }
  }
```

::footer::
