/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["select/Template Template Parts Empty DOM has all required parts"] = 
`<div
  aria-controls="menu"
  aria-expanded="false"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
`;
/* end snapshot select/Template Template Parts Empty DOM has all required parts */

snapshots["select/Template Template Parts Placeholder is rendered"] = 
`<div
  aria-controls="menu"
  aria-expanded="false"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  placeholder="Placeholder"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
      Placeholder
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
`;
/* end snapshot select/Template Template Parts Placeholder is rendered */

snapshots["select/Template Template Parts Lazy Render: options"] = 
`<div
  aria-controls="menu"
  aria-expanded="false"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
`;
/* end snapshot select/Template Template Parts Lazy Render: options */

snapshots["select/Template Template Parts Lazy Render: options opened"] = 
`<div
  aria-controls="menu"
  aria-expanded="true"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  focused=""
  id="menu"
  lock-position-target=""
  opened=""
  part="list"
  role="listbox"
  tabindex="-1"
  with-shadow=""
>
  <slot>
  </slot>
</ef-overlay>
`;
/* end snapshot select/Template Template Parts Lazy Render: options opened */

snapshots["select/Template Template Parts Lazy Render: data"] = 
`<div
  aria-controls="menu"
  aria-expanded="false"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
`;
/* end snapshot select/Template Template Parts Lazy Render: data */

snapshots["select/Template Template Parts Lazy Render: data opened"] = 
`<div
  aria-controls="menu"
  aria-expanded="true"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  focused=""
  id="menu"
  lock-position-target=""
  opened=""
  part="list"
  role="listbox"
  tabindex="-1"
  with-shadow=""
>
  <ef-item
    aria-selected="false"
    part="item"
    role="presentation"
    tabindex="-1"
    type="header"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="presentation"
    tabindex="-1"
    type="divider"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
</ef-overlay>
`;
/* end snapshot select/Template Template Parts Lazy Render: data opened */

snapshots["select/Template Template Parts Data is reflected to render"] = 
`<div
  aria-controls="menu"
  aria-expanded="true"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  focused=""
  id="menu"
  lock-position-target=""
  opened=""
  part="list"
  role="listbox"
  tabindex="-1"
  with-shadow=""
>
  <ef-item
    aria-selected="false"
    part="item"
    role="presentation"
    tabindex="-1"
    type="header"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="presentation"
    tabindex="-1"
    type="divider"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
</ef-overlay>
`;
/* end snapshot select/Template Template Parts Data is reflected to render */

snapshots["select/Template Template Parts Data is reflected to reverse render"] = 
`<div
  aria-controls="menu"
  aria-expanded="true"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  id="menu"
  lock-position-target=""
  opened=""
  part="list"
  role="listbox"
  tabindex="-1"
  with-shadow=""
>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="presentation"
    tabindex="-1"
    type="divider"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="option"
    tabindex="0"
  >
  </ef-item>
  <ef-item
    aria-selected="false"
    part="item"
    role="presentation"
    tabindex="-1"
    type="header"
  >
  </ef-item>
</ef-overlay>
`;
/* end snapshot select/Template Template Parts Data is reflected to reverse render */

snapshots["select/Template Template Parts Data is reflected to render null data"] = 
`<div
  aria-controls="menu"
  aria-expanded="true"
  aria-haspopup="listbox"
  aria-invalid="false"
  aria-required="false"
  id="box"
  role="combobox"
  tabindex="0"
>
  <div id="text">
    <div part="placeholder">
    </div>
  </div>
  <ef-icon
    aria-hidden="true"
    icon="down"
    part="icon"
  >
  </ef-icon>
</div>
<div id="trigger">
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  id="menu"
  lock-position-target=""
  opened=""
  part="list"
  role="listbox"
  tabindex="-1"
  with-shadow=""
>
  <slot>
  </slot>
</ef-overlay>
`;
/* end snapshot select/Template Template Parts Data is reflected to render null data */

