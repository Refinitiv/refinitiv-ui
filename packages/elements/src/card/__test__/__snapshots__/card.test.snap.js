/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["card/Card DOM structure Basic DOM structure"] = 
`<div part="header">
  <div part="header-body">
    <slot name="header">
    </slot>
  </div>
</div>
<div part="body">
  <slot>
  </slot>
</div>
<div part="footer">
  <div part="footer-body">
    <slot name="footer">
    </slot>
  </div>
</div>
`;
/* end snapshot card/Card DOM structure Basic DOM structure */

snapshots["card/Card DOM structure DOM structure with header and footer"] = 
`<div part="header has-content">
  <div part="header-body">
    <slot name="header">
    </slot>
    <ef-label
      line-clamp="3"
      part="header-text"
    >
      Header
    </ef-label>
  </div>
</div>
<div part="body">
  <slot>
  </slot>
</div>
<div part="footer has-content">
  <div part="footer-body">
    <slot name="footer">
    </slot>
    <ef-label line-clamp="3">
      Footer
    </ef-label>
  </div>
</div>
`;
/* end snapshot card/Card DOM structure DOM structure with header and footer */

snapshots["card/Card DOM structure DOM structure with slotted content"] = 
`<div part="header has-content">
  <div part="header-body">
    <slot name="header">
    </slot>
  </div>
</div>
<div part="body">
  <slot>
  </slot>
</div>
<div part="footer has-content">
  <div part="footer-body">
    <slot name="footer">
    </slot>
  </div>
</div>
`;
/* end snapshot card/Card DOM structure DOM structure with slotted content */

snapshots["card/Card DOM structure DOM structure with menu Should contain menu data"] = 
`<div part="header has-content">
  <div part="header-body">
    <slot name="header">
    </slot>
  </div>
  <ef-button
    aria-controls="menu-popup"
    aria-expanded="false"
    aria-haspopup="true"
    aria-label="Open Menu"
    empty=""
    icon="more-vertical"
    part="menu-button"
    role="button"
    tabindex="0"
    textpos="after"
    transparent=""
  >
  </ef-button>
  <ef-overlay-menu
    id="menu-popup"
    part="menu-popup"
    position="bottom-end"
    role="menu"
    tabindex="-1"
    with-shadow=""
  >
  </ef-overlay-menu>
</div>
<div part="body">
  <slot>
  </slot>
</div>
<div part="footer">
  <div part="footer-body">
    <slot name="footer">
    </slot>
  </div>
</div>
`;
/* end snapshot card/Card DOM structure DOM structure with menu Should contain menu data */

snapshots["card/Card DOM structure DOM structure with menu Should not contain menu data when unset the menu data"] = 
`<div part="header">
  <div part="header-body">
    <slot name="header">
    </slot>
  </div>
</div>
<div part="body">
  <slot>
  </slot>
</div>
<div part="footer">
  <div part="footer-body">
    <slot name="footer">
    </slot>
  </div>
</div>
`;
/* end snapshot card/Card DOM structure DOM structure with menu Should not contain menu data when unset the menu data */

