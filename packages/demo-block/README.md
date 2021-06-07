# Demo Page Handler

```html
<!doctype html>
<html>
<head>
  <title>My Element</title>

  <!--Import Demo Handler-->
  <script src="../../elf-demo/demo.js"></script>

  <!--Import Custom Element-->
  <script type="module" src="../my-element.js"></script>
</head>
<body>

  <demo-block header="Default State" tags="Alpha, Beta, Preview">
    Default layout is flex row.
    <my-element></my-element>
  </demo-block>

  <demo-block header="Layout option" layout="normal">
    This is standard block layout
    <h1>Header Level 1</h1>
    <h2>Header Level 2</h2>
    <h3>Header Level 3</h3>
  </demo-block>

</body>
</html>
```