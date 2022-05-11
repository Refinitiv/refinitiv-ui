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

@>This guideline uses create-react-app, React v17.0.2

## Initialise your project

To create a new app, you may choose one of the following methods:

### npx

```sh
npx create-react-app my-app
```

It will create a directory called `my-app` inside the current folder. Inside that directory, it will generate the initial project structure and install the required dependencies.

Serve your app to check if the project is created correctly.

```sh
cd my-app
npm start
```

## Install EF elements and themes

Installs elements and themes.

```sh
npm install @refinitiv-ui/elements
npm install @refinitiv-ui/halo-theme
```

Import elements that you want to use and theme in `src/index.js`. You can also import EF components and themes anywhere in react components but for the simplicity we'll import all at once.

```javascript
import '@refinitiv-ui/elements/loader';
import '@refinitiv-ui/elements/button';
import '@refinitiv-ui/elements/panel';
import '@refinitiv-ui/elements/text-field';
import '@refinitiv-ui/elements/password-field';

import '@refinitiv-ui/halo-theme/dark/imports/native-elements';
import '@refinitiv-ui/elements/loader/themes/halo/dark';
import '@refinitiv-ui/elements/button/themes/halo/dark';
import '@refinitiv-ui/elements/panel/themes/halo/dark';
import '@refinitiv-ui/elements/text-field/themes/halo/dark';
import '@refinitiv-ui/elements/password-field/themes/halo/dark';
```

Use EF elements to create a simple login page. Replace the content in `src/App.js` with the following code.

```javascript
import React, { useState } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('Hello!');
  const [loading, setLoading] = useState(false);

  function login() {
    setLoading(true);

    setTimeout(() => {
      setTitle('Done!');
      setLoading(false);
    }, 2000);
  }

  return (
    <ef-panel id="login-page" spacing>
      {loading ? (
        <ef-loader></ef-loader>
      ) : (
        <>
          <h1>{title}</h1>
          <ef-text-field placeholder='Username'></ef-text-field>
          <ef-password-field placeholder='Password'></ef-password-field>
          <div id="button-group">
            <ef-button onClick={login}>Login</ef-button>
            <ef-button>Cancel</ef-button>
          </div>
        </>
      )}
    </ef-panel>
  );
}

export default App;
```

And in `src/App.css`

```css
#login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  height: 200px;
  margin: 40px auto;
}

#button-group {
  margin: 10px 0;
}
```

Finally, starting your app and it should automatically open `http://localhost:3000/` on your default browser.

```sh
yarn start
```

## Using web components in React

Web components can be used in React just like any other HTML elements. However, there are a few differences to note.

### class vs className

Web component uses `class` attribute instead of `className`.

```jsx
function Panel() {
  return (
    <ef-panel class="container">
      ...
    </ef-panel>
  );
}
```

### Boolean Attributes

Boolean attributes such as `disabled`, `readonly`, `checked` are set by the presence of the attribute itself, not the value. To represent a `false` value in JSX, set the attribute's value to `undefined` or `null` or simply remove the attribute. This behavior is the same as [HTML specifications](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes).

Regardless of the value, the following code will **disable** the `ef-text-field`.

```jsx
<ef-text-field disabled></ef-text-field>
<ef-text-field disabled="true"></ef-text-field>
<ef-text-field disabled="false"></ef-text-field>
<ef-text-field disabled={true}></ef-text-field>
<ef-text-field disabled={false}></ef-text-field>
```

The following will omit `disabled` attribute and **enable** `ef-text-field`.

```jsx
<ef-text-field></ef-text-field>
<ef-text-field disabled={undefined}></ef-text-field>
```

### Array and Object

React only allows **primitive data** to be passed through attributes. For `Array` and `Object`, you can either pass data through element's property or use `JSON.stringify()` to parse the data before passing to attribute.

```jsx
<ef-sparkline data={JSON.stringify([-2, -3, 4])}></ef-sparkline>
```

or

```jsx
function SparklineChart() {
  const chartRef = React.useRef();
  React.useLayoutEffect(() => {
    if (chartRef.current) {
      chartRef.current.data = [-2, -3, 4];
    }
  }, [chartRef]);
  return <ef-sparkline ref={chartRef}></ef-sparkline>;
}
```

### Events

Use `ref` to access and store DOM element, then add an event-listener inside `useLayoutEffect` which fires synchronously after the DOM mutation (or `componentDidMount` in class component). Finally, don't forget to unsubscribe from event-listener when component unmounts.

```jsx
function App() {
  const textFieldRef = React.useRef();
  const [value, setValue] = React.useState('');

  React.useLayoutEffect(() => {
    const handleChange = (event) => {
      setValue(event.detail.value);
    };

    const { current } = textFieldRef;

    if (current) {
      current.addEventListener('value-changed', handleChange);
    }

    return () => current.removeEventListener('value-changed', handleChange); // unsubscribe
  }, [textFieldRef]);

  return (
    <ef-text-field ref={textFieldRef}></ef-text-field>
    <p>Value: {value}</p>
  );
}
```

## Testing With Jest

If you use [Create React App](https://create-react-app.dev/), Jest is already included out of the box with useful defaults.

### Jest configuration

By default, Jest doesn't transform dependencies inside `/node_modules` folder, it will not understand the code and resulting in syntax error. You need to use `transformIgnorePatterns` to allow transpiling EF modules, and other modules if requires [see more](https://jestjs.io/docs/configuration#transformignorepatterns-arraystring).

Additionally, Jest doesn't support package exports feature in package.json yet – this has been supported in new modern bundlers e.g. WebPack 5. As a result, Jest wouldn't be able to find importing modules in your application. You can resolve this by using `moduleNameMapper` in Jest configuration, `package.json`.

```json
  "jest": {
    "transformIgnorePatterns": ["node_modules/(?!@refinitiv-ui)/"],
    "moduleNameMapper": {
      "@refinitiv-ui/elements/((?!lib).*)$": "<rootDir>/node_modules/@refinitiv-ui/elements/lib/$1"
    }
  }
```

::footer::
