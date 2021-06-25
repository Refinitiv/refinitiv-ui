# Demo Block Element

A custom element that can wrap around any other elements for demo and development purpose.

## Installation

```sh
npm install -D @refinitiv-ui/demo-block
```

## Usage

Include demo styles to `<head>` section and import the module to your page.

```html
<link rel="stylesheet" href="/node_modules/@refinitiv-ui/demo-block/demo.css">
```

```javascript
<script type="module">
  import '@refinitiv-ui/demo-block';
</script>
```

Wrap element or content that you want to show in demo block inside `<demo-block>`.

```html
<demo-block header="Layout option" layout="normal" tags="header">
  This is standard block layout
  <h1>Header Level 1</h1>
  <h2>Header Level 2</h2>
  <h3>Header Level 3</h3>
</demo-block>
```
