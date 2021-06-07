# Header

```live(preview)
<ef-header level="1">Header Level 1</ef-header>
<ef-header level="2">Header Level 2</ef-header>
<ef-header level="3">Header Level 3</ef-header>
```

Header is used to identify and separate different sections of a page. Headers help to organize the page content into a sensible hierarchy and improve the user experience.

### Basic usage

Content in `ef-header` will be displayed as a title.

```live
<ef-header>Header Title</ef-header>
```

```html
<ef-header>Header Title</ef-header>
```


### Levels

Level can be set to `ef-header` to improve data hierarchy. Styling of level is managed by theme.

```live
<ef-header level="1">Header Level 1</ef-header>
<ef-header level="2">Header Level 2</ef-header>
<ef-header level="3">Header Level 3</ef-header>
```

```html
<ef-header level="1">Header Level 1</ef-header>
<ef-header level="2">Header Level 2</ef-header>
<ef-header level="3">Header Level 3</ef-header>
```

### Including links in headers
You can create a header with linking by using a HTML link tag inside header content.

```live
<ef-header level="1"><a href="#">Header Level Link 1</a></ef-header>
<ef-header level="2"><a href="#">Header Level Link 2</a></ef-header>
<ef-header level="3"><a href="#">Header Level Link 3</a></ef-header>
```

```html
<ef-header level="1"><a href="#">Header Level Link 1</a></ef-header>
<ef-header level="2"><a href="#">Header Level Link 2</a></ef-header>
<ef-header level="3"><a href="#">Header Level Link 3</a></ef-header>
```


### Slotting content
You can include a component in header by assigning it to a slot.

```live
<ef-header level="1">Header Level 1
    <ef-button slot="left" icon="menu" transparent></ef-button>
    <ef-checkbox slot="right" checked>Option</ef-checkbox>
</ef-header>
<ef-header level="2">Header Level 2
    <ef-checkbox slot="right" checked>Option</ef-checkbox>
</ef-header>
<ef-header level="3">Header Level 3
    <ef-button slot="right" icon="filter" transparent></ef-button>
    <ef-checkbox slot="right" checked>Option</ef-checkbox>
</ef-header>
```

```html
<ef-header level="1">Header Level 1
    <ef-button slot="left" icon="menu" transparent></ef-button>
    <ef-checkbox slot="right" checked>Option</ef-checkbox>
</ef-header>
<ef-header level="2">Header Level 2
    <ef-checkbox slot="right" checked>Option</ef-checkbox>
</ef-header>
<ef-header level="3">Header Level 3
    <ef-button slot="right" icon="filter" transparent></ef-button>
    <ef-checkbox slot="right" checked>Option</ef-checkbox>
</ef-header>
```

