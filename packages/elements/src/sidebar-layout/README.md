# Sidebar Layout

```live(preview)
<style>
ef-sidebar-layout {
  height: 200px;
}
[slot="sidebar-content"] {
  text-align: center;
  padding: 50px 0;
  background-color: #dfe2e8;
}
[slot="main-content"] {
  text-align: center;
  padding: 90px 0;
  background-color: #f1f1f1;
}
</style>
<ef-sidebar-layout>
  <ef-header slot="sidebar-header" level="1">Sidebar Layout</ef-header>
  <ef-panel slot="sidebar-content" spacing>Menus</ef-panel>
  <ef-panel slot="main-content" spacing>This is awesome.</ef-panel>
</ef-sidebar-layout>
```

`ef-sidebar-layout` provides an app layout with sidebar. There are four sections where a component can be slotted in.

* Sidebar header
* Sidebar content
* Main header
* Main content

The header slots can be omitted and also the component will automatically provide a vertical scrollbar if the content is too long.

### Using sidebar layout
`ef-sidebar-layout` is a layout, it is up to the developer to slot any contents in. Typically, it should be used together with `ef-header` for header slots, and `ef-panel` for contents. Those components that are used inside the layout have to be imported by the app.

```live
<style>
ef-sidebar-layout {
  height: 200px;
}

[slot="sidebar-content"] {
  text-align: center;
  padding: 70px 0;
}

[slot="main-content"] {
  text-align: center;
  padding: 70px 0;
}
</style>
<ef-sidebar-layout>
  <ef-header slot="sidebar-header" level="1">Sidebar Layout</ef-header>
  <ef-panel slot="sidebar-content" spacing class="sidebar-content">Sidebar Content</ef-panel>
  <ef-header slot="main-header" level="1">Main Header</ef-header>
  <ef-panel slot="main-content" spacing class="main-content">Main Content</ef-panel>
</ef-sidebar-layout>
```

```html
<ef-sidebar-layout>
  <ef-header slot="sidebar-header" level="1">Sidebar Header</ef-header>
  <ef-panel slot="sidebar-content" spacing>Sidebar Content</ef-panel>
  <ef-header slot="main-header" level="1">Main Header</ef-header>
  <ef-panel slot="main-content" spacing>Main Content</ef-panel>
</ef-sidebar-layout>
```

### Add toolbar commands
Menus on header could be implemented by using slots of `ef-header`.

```live
<style>
ef-sidebar-layout {
  height: 200px;
}
[slot="sidebar-content"] {
  text-align: center;
  padding: 60px 0;
}
[slot="main-content"] {
  text-align: center;
  padding: 60px 0;
}
</style>
<ef-sidebar-layout>
  <ef-header slot="sidebar-header" level="1">Title</ef-header>
  <ef-panel slot="sidebar-content" spacing>Sidebar Content</ef-panel>
  <ef-header slot="main-header" level="1">
    <ef-button slot="right" transparent icon="settings"></ef-button>
    <ef-button slot="right" transparent icon="share"></ef-button>
  </ef-header>
  <ef-panel slot="main-content" spacing>Main Content</ef-panel>
</ef-sidebar-layout>
```

```html
<ef-sidebar-layout>
  <ef-header slot="sidebar-header" level="1">Title</ef-header>
  <ef-panel slot="sidebar-content" spacing>Sidebar Content</ef-panel>
  <ef-header slot="main-header" level="1">
    <ef-button slot="right" transparent icon="settings"></ef-button>
    <ef-button slot="right" transparent icon="share"></ef-button>
  </ef-header>
  <ef-panel slot="main-content" spacing>Main Content</ef-panel>
</ef-sidebar-layout>
```

### Toggled sidebar
Sidebar can be hidden by adding `collapsed` attribute. Toggle button to collapse the sidebar can be implemented by code.

```live
<style>
ef-sidebar-layout {
  height: 200px;
}
[slot="sidebar-content"] {
  text-align: center;
  padding: 60px 0;
}
[slot="main-content"] {
  text-align: center;
  padding: 60px 0;
}
</style>
<ef-sidebar-layout id="layout">
  <ef-header slot="sidebar-header" level="1">Title</ef-header>
  <ef-panel spacing slot="sidebar-content">Sidebar Content</ef-panel>
  <ef-header slot="main-header" level="1">
    <ef-button transparent slot="left" id="toggleBtn" icon="leftpanel-open"></ef-button>
    <ef-button slot="right" transparent icon="settings"></ef-button>
  </ef-header>
  <ef-panel spacing slot="main-content">Main Content</ef-panel>
</ef-sidebar-layout>
<script>
var layout = document.getElementById('layout');
var toggleBtn = document.getElementById('toggleBtn');
toggleBtn.addEventListener('click', function () {
  layout.collapsed = !layout.collapsed;
  toggleBtn.setAttribute('icon', layout.collapsed ? 'leftpanel-closed' : 'leftpanel-open');
});
</script>
```

```html
<ef-sidebar-layout id="layout">
  <ef-header slot="sidebar-header" level="1">Title</ef-header>
  <ef-panel spacing slot="sidebar-content">Sidebar Content</ef-panel>
  <ef-header slot="main-header" level="1">
    <ef-button transparent slot="left" id="toggleBtn" icon="leftpanel-open"></ef-button>
    <ef-button slot="right" transparent icon="settings"></ef-button>
  </ef-header>
  <ef-panel spacing slot="main-content">Main Content</ef-panel>
</ef-sidebar-layout>

<script>
  var layout = document.getElementById('layout');
  var toggleBtn = document.getElementById('toggleBtn');
  toggleBtn.addEventListener('click', function () {
    layout.collapsed = !layout.collapsed;
    toggleBtn.setAttribute('icon', layout.collapsed ? 'leftpanel-closed' : 'leftpanel-open');
  });
</script>
```
