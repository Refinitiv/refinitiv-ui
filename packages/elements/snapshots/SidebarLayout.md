# `SidebarLayout`

#### `Has correct shadow dom structure`

```html
<ef-layout
  flex=""
  nowrap=""
  part="container"
>
  <ef-layout
    container=""
    flex=""
    part="sidebar"
  >
    <ef-layout>
      <slot name="sidebar-header">
      </slot>
    </ef-layout>
    <ef-layout
      basis="auto"
      scrollable=""
    >
      <slot name="sidebar-content">
      </slot>
    </ef-layout>
  </ef-layout>
  <ef-layout
    basis="100%"
    container=""
    flex=""
    part="main"
  >
    <ef-layout>
      <slot name="main-header">
      </slot>
    </ef-layout>
    <ef-layout
      basis="auto"
      scrollable=""
    >
      <slot name="main-content">
      </slot>
    </ef-layout>
  </ef-layout>
</ef-layout>

```

