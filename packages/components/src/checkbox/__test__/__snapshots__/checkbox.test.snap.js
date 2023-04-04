/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["ui-checkbox DOM Structure default DOM with no label is correct"] = 
`<ui-checkbox
  aria-checked="false"
  role="checkbox"
  tabindex="0"
>
</ui-checkbox>
`;
/* end snapshot ui-checkbox DOM Structure default DOM with no label is correct */

snapshots["ui-checkbox DOM Structure default DOM with label is correct"] = 
`<ui-sub-checkbox
  part="checkbox"
  tabindex="-1"
>
</ui-sub-checkbox>
<div part="label">
  <slot>
  </slot>
</div>
`;
/* end snapshot ui-checkbox DOM Structure default DOM with label is correct */

snapshots["ui-checkbox DOM Structure checked DOM with label is correct"] = 
`<ui-sub-checkbox
  checked=""
  part="checkbox"
  tabindex="-1"
>
</ui-sub-checkbox>
<div part="label">
  <slot>
  </slot>
</div>
`;
/* end snapshot ui-checkbox DOM Structure checked DOM with label is correct */

