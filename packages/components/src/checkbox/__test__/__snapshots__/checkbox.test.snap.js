/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Checkbox Basic Structure default light DOM with no label is correct"] = 
`<ds-checkbox
  aria-checked="false"
  role="checkbox"
  tabindex="0"
>
</ds-checkbox>
`;
/* end snapshot Checkbox Basic Structure default light DOM with no label is correct */

snapshots["Checkbox Basic Structure default shadow DOM with no label is correct"] = 
`<ds-sub-checkbox
  part="checkbox"
  tabindex="-1"
>
</ds-sub-checkbox>
<ds-sub-label part="label">
  <slot>
  </slot>
</ds-sub-label>
`;
/* end snapshot Checkbox Basic Structure default shadow DOM with no label is correct */

snapshots["Checkbox Basic Structure default light DOM with label is correct"] = 
`<ds-checkbox
  aria-checked="false"
  role="checkbox"
  tabindex="0"
>
  Checkbox label
</ds-checkbox>
`;
/* end snapshot Checkbox Basic Structure default light DOM with label is correct */

snapshots["Checkbox Basic Structure default shadow DOM with label is correct"] = 
`<ds-sub-checkbox
  part="checkbox"
  tabindex="-1"
>
</ds-sub-checkbox>
<ds-sub-label part="label">
  <slot>
  </slot>
</ds-sub-label>
`;
/* end snapshot Checkbox Basic Structure default shadow DOM with label is correct */

snapshots["Checkbox Basic Structure checked light DOM with label is correct"] = 
`<ds-checkbox
  aria-checked="true"
  checked=""
  role="checkbox"
  tabindex="0"
>
  Checkbox label
</ds-checkbox>
`;
/* end snapshot Checkbox Basic Structure checked light DOM with label is correct */

snapshots["Checkbox Basic Structure checked shadow DOM with label is correct"] = 
`<ds-sub-checkbox
  checked=""
  part="checkbox"
  tabindex="-1"
>
</ds-sub-checkbox>
<ds-sub-label part="label">
  <slot>
  </slot>
</ds-sub-label>
`;
/* end snapshot Checkbox Basic Structure checked shadow DOM with label is correct */

snapshots["Checkbox Basic Structure disabled light DOM with label is correct"] = 
`<ds-checkbox
  aria-checked="false"
  aria-disabled="true"
  disabled=""
  role="checkbox"
  style="pointer-events: none;"
  tabindex="-1"
>
  Checkbox label
</ds-checkbox>
`;
/* end snapshot Checkbox Basic Structure disabled light DOM with label is correct */

snapshots["Checkbox Basic Structure disabled shadow DOM with label is correct"] = 
`<ds-sub-checkbox
  aria-disabled="true"
  disabled=""
  part="checkbox"
  style="pointer-events: none;"
  tabindex="-1"
>
</ds-sub-checkbox>
<ds-sub-label part="label">
  <slot>
  </slot>
</ds-sub-label>
`;
/* end snapshot Checkbox Basic Structure disabled shadow DOM with label is correct */

snapshots["Checkbox Basic Structure readonly light DOM with label is correct"] = 
`<ds-checkbox
  aria-checked="false"
  readonly=""
  role="checkbox"
  tabindex="0"
>
  Checkbox label
</ds-checkbox>
`;
/* end snapshot Checkbox Basic Structure readonly light DOM with label is correct */

snapshots["Checkbox Basic Structure readonly shadow DOM with label is correct"] = 
`<ds-sub-checkbox
  part="checkbox"
  readonly=""
  tabindex="-1"
>
</ds-sub-checkbox>
<ds-sub-label part="label">
  <slot>
  </slot>
</ds-sub-label>
`;
/* end snapshot Checkbox Basic Structure readonly shadow DOM with label is correct */

snapshots["Checkbox Basic Structure disabled light checked DOM with label is correct"] = 
`<ds-checkbox
  aria-checked="true"
  aria-disabled="true"
  checked=""
  disabled=""
  role="checkbox"
  style="pointer-events: none;"
  tabindex="-1"
>
  Checkbox label
</ds-checkbox>
`;
/* end snapshot Checkbox Basic Structure disabled light checked DOM with label is correct */

snapshots["Checkbox Basic Structure disabled shadow checked DOM with label is correct"] = 
`<ds-sub-checkbox
  aria-disabled="true"
  checked=""
  disabled=""
  part="checkbox"
  style="pointer-events: none;"
  tabindex="-1"
>
</ds-sub-checkbox>
<ds-sub-label part="label">
  <slot>
  </slot>
</ds-sub-label>
`;
/* end snapshot Checkbox Basic Structure disabled shadow checked DOM with label is correct */

snapshots["Checkbox Basic Structure readonly light checked DOM with label is correct"] = 
`<ds-checkbox
  aria-checked="true"
  checked=""
  readonly=""
  role="checkbox"
  tabindex="0"
>
  Checkbox label
</ds-checkbox>
`;
/* end snapshot Checkbox Basic Structure readonly light checked DOM with label is correct */

snapshots["Checkbox Basic Structure readonly shadow checked DOM with label is correct"] = 
`<ds-sub-checkbox
  checked=""
  part="checkbox"
  readonly=""
  tabindex="-1"
>
</ds-sub-checkbox>
<ds-sub-label part="label">
  <slot>
  </slot>
</ds-sub-label>
`;
/* end snapshot Checkbox Basic Structure readonly shadow checked DOM with label is correct */

