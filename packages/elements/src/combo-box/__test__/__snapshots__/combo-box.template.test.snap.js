/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["combo-box/Template Template Parts Empty DOM has all required parts"] = 
`<div part="input-wrapper">
  <input
    aria-autocomplete="list"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-owns="internal-list"
    autocomplete="off"
    part="input"
    role="combobox"
    type="text"
  >
  <div
    id="toggle-button"
    part="button button-toggle"
  >
    <ef-icon
      icon="down"
      part="icon icon-toggle"
    >
    </ef-icon>
  </div>
</div>
`;
/* end snapshot combo-box/Template Template Parts Empty DOM has all required parts */

snapshots["combo-box/Template Template Parts Lazy Render: data"] = 
`<div part="input-wrapper">
  <input
    aria-activedescendant="AF"
    aria-autocomplete="list"
    aria-expanded="true"
    aria-haspopup="listbox"
    aria-owns="internal-list"
    autocomplete="off"
    part="input"
    role="combobox"
    type="text"
  >
  <div
    id="toggle-button"
    part="button button-toggle"
  >
    <ef-icon
      icon="down"
      part="icon icon-toggle"
    >
    </ef-icon>
  </div>
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  first-resize-done=""
  no-autofocus=""
  no-focus-management=""
  no-overlap=""
  opened=""
  part="list"
  tabindex="-1"
  with-shadow=""
>
  <ef-list
    aria-multiselectable="false"
    id="internal-list"
    role="listbox"
    tabindex=""
  >
    <ef-list-item
      aria-selected="false"
      role="presentation"
      type="header"
    >
    </ef-list-item>
    <ef-list-item
      aria-selected="false"
      highlighted=""
      id="AF"
      role="option"
    >
    </ef-list-item>
    <ef-list-item
      aria-selected="false"
      id="AX"
      role="option"
    >
    </ef-list-item>
    <ef-list-item
      aria-selected="false"
      id="AL"
      role="option"
    >
    </ef-list-item>
  </ef-list>
</ef-overlay>
`;
/* end snapshot combo-box/Template Template Parts Lazy Render: data */

snapshots["combo-box/Template Template Parts Data is reflected to render"] = 
`<div part="input-wrapper">
  <input
    aria-activedescendant="AF"
    aria-autocomplete="list"
    aria-expanded="true"
    aria-haspopup="listbox"
    aria-owns="internal-list"
    autocomplete="off"
    part="input"
    role="combobox"
    type="text"
  >
  <div
    id="toggle-button"
    part="button button-toggle"
  >
    <ef-icon
      icon="down"
      part="icon icon-toggle"
    >
    </ef-icon>
  </div>
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  first-resize-done=""
  no-autofocus=""
  no-focus-management=""
  no-overlap=""
  opened=""
  part="list"
  tabindex="-1"
  with-shadow=""
>
  <ef-list
    aria-multiselectable="false"
    id="internal-list"
    role="listbox"
    tabindex=""
  >
    <ef-list-item
      aria-selected="false"
      role="presentation"
      type="header"
    >
    </ef-list-item>
    <ef-list-item
      aria-selected="false"
      highlighted=""
      id="AF"
      role="option"
    >
    </ef-list-item>
    <ef-list-item
      aria-selected="false"
      id="AX"
      role="option"
    >
    </ef-list-item>
    <ef-list-item
      aria-selected="false"
      id="AL"
      role="option"
    >
    </ef-list-item>
  </ef-list>
</ef-overlay>
`;
/* end snapshot combo-box/Template Template Parts Data is reflected to render */

snapshots["combo-box/Template Template Parts Data is reflected to render: reverse"] = 
`<div part="input-wrapper">
  <input
    aria-activedescendant="AL"
    aria-autocomplete="list"
    aria-expanded="true"
    aria-haspopup="listbox"
    aria-owns="internal-list"
    autocomplete="off"
    part="input"
    role="combobox"
    type="text"
  >
  <div
    id="toggle-button"
    part="button button-toggle"
  >
    <ef-icon
      icon="down"
      part="icon icon-toggle"
    >
    </ef-icon>
  </div>
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  first-resize-done=""
  no-autofocus=""
  no-focus-management=""
  no-overlap=""
  opened=""
  part="list"
  tabindex="-1"
  with-shadow=""
>
  <ef-list
    aria-multiselectable="false"
    id="internal-list"
    role="listbox"
    tabindex=""
  >
    <ef-list-item
      aria-selected="false"
      highlighted=""
      id="AL"
      role="option"
    >
    </ef-list-item>
    <ef-list-item
      aria-selected="false"
      id="AX"
      role="option"
    >
    </ef-list-item>
    <ef-list-item
      aria-selected="false"
      id="AF"
      role="option"
    >
    </ef-list-item>
  </ef-list>
</ef-overlay>
`;
/* end snapshot combo-box/Template Template Parts Data is reflected to render: reverse */

snapshots["combo-box/Template Template Parts Data is reflected to render: empty"] = 
`<div part="input-wrapper">
  <input
    aria-activedescendant=""
    aria-autocomplete="list"
    aria-expanded="true"
    aria-haspopup="listbox"
    aria-owns="internal-list"
    autocomplete="off"
    part="input"
    role="combobox"
    type="text"
  >
  <div
    id="toggle-button"
    part="button button-toggle"
  >
    <ef-icon
      icon="down"
      part="icon icon-toggle"
    >
    </ef-icon>
  </div>
</div>
<ef-overlay-viewport>
</ef-overlay-viewport>
<ef-overlay
  first-resize-done=""
  no-autofocus=""
  no-focus-management=""
  no-overlap=""
  opened=""
  part="list"
  tabindex="-1"
  with-shadow=""
>
  <ef-list-item
    aria-disabled="true"
    aria-selected="false"
    disabled=""
  >
    No results found.
  </ef-list-item>
</ef-overlay>
`;
/* end snapshot combo-box/Template Template Parts Data is reflected to render: empty */

snapshots["combo-box/Template Template Parts Placeholder is rendered placeholder must be rendered correctly"] = 
`<div part="input-wrapper">
  <input
    aria-autocomplete="list"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-owns="internal-list"
    autocomplete="off"
    part="input"
    placeholder="Placeholder"
    role="combobox"
    type="text"
  >
  <div
    id="toggle-button"
    part="button button-toggle"
  >
    <ef-icon
      icon="down"
      part="icon icon-toggle"
    >
    </ef-icon>
  </div>
</div>
`;
/* end snapshot combo-box/Template Template Parts Placeholder is rendered placeholder must be rendered correctly */

snapshots["combo-box/Template Template Parts Placeholder is rendered placeholder must be removed"] = 
`<div part="input-wrapper">
  <input
    aria-autocomplete="list"
    aria-expanded="false"
    aria-haspopup="listbox"
    aria-owns="internal-list"
    autocomplete="off"
    part="input"
    role="combobox"
    type="text"
  >
  <div
    id="toggle-button"
    part="button button-toggle"
  >
    <ef-icon
      icon="down"
      part="icon icon-toggle"
    >
    </ef-icon>
  </div>
</div>
`;
/* end snapshot combo-box/Template Template Parts Placeholder is rendered placeholder must be removed */

