/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["item/Item Defaults Should have correct Shadow DOM structure"] = 
`<div part="left">
  <slot name="left">
  </slot>
</div>
<div part="center">
  <slot>
  </slot>
</div>
<div part="right">
  <slot name="right">
  </slot>
</div>
`;
/* end snapshot item/Item Defaults Should have correct Shadow DOM structure */

snapshots["item/Item Defaults Should have correct Shadow DOM structure with icon"] = 
`<div part="left">
  <ds-icon
    icon="tick"
    part="icon"
  >
  </ds-icon>
  <slot name="left">
  </slot>
</div>
<div part="center">
  <slot>
  </slot>
</div>
<div part="right">
  <slot name="right">
  </slot>
</div>
`;
/* end snapshot item/Item Defaults Should have correct Shadow DOM structure with icon */

snapshots["item/Item Defaults Should have correct Shadow DOM structure with empty icon"] = 
`<div part="left">
  <ds-icon
    icon=""
    part="icon"
  >
  </ds-icon>
  <slot name="left">
  </slot>
</div>
<div part="center">
  <slot>
  </slot>
</div>
<div part="right">
  <slot name="right">
  </slot>
</div>
`;
/* end snapshot item/Item Defaults Should have correct Shadow DOM structure with empty icon */

snapshots["item/Item Defaults Header item should have correct Shadow DOM structure with subLabel"] = 
`<div part="left">
  <slot name="left">
  </slot>
</div>
<div part="center">
  tiger
  <slot>
  </slot>
</div>
<div part="right">
  <slot name="right">
  </slot>
</div>
`;
/* end snapshot item/Item Defaults Header item should have correct Shadow DOM structure with subLabel */

snapshots["item/Item Defaults Default item should have correct Shadow DOM structure with label and subLabel"] = 
`<div part="left">
  <slot name="left">
  </slot>
</div>
<div part="center">
  tiger
  <slot>
  </slot>
</div>
<div part="right">
  <slot name="right">
  </slot>
</div>
`;
/* end snapshot item/Item Defaults Default item should have correct Shadow DOM structure with label and subLabel */

snapshots["item/Item Defaults Default item should have correct Shadow DOM structure with content and subLabel"] = 
`<div part="left">
  <slot name="left">
  </slot>
</div>
<div part="center">
  <slot>
  </slot>
</div>
<div part="right">
  <slot name="right">
  </slot>
</div>
`;
/* end snapshot item/Item Defaults Default item should have correct Shadow DOM structure with content and subLabel */

snapshots["item/Item Defaults Default item should have correct Shadow DOM structure with subLabel, if there is no content or label"] = 
`<div part="left">
  <slot name="left">
  </slot>
</div>
<div part="center">
  <slot>
  </slot>
</div>
<div part="right">
  <slot name="right">
  </slot>
</div>
`;
/* end snapshot item/Item Defaults Default item should have correct Shadow DOM structure with subLabel, if there is no content or label */

snapshots["item/Item Defaults Default item should have correct Shadow DOM structure with label, sub-label and ignorable default slot children"] = 
`<div part="left">
  <slot name="left">
  </slot>
</div>
<div part="center">
  tiger
  <slot>
  </slot>
</div>
<div part="right">
  <slot name="right">
  </slot>
</div>
`;
/* end snapshot item/Item Defaults Default item should have correct Shadow DOM structure with label, sub-label and ignorable default slot children */

snapshots["item/Item Defaults Slots are correctly populated"] = 
`<div
  class="left"
  slot="left"
>
  Left Item
</div>
<div class="center">
  Center Item
</div>
<div
  class="right"
  slot="right"
>
  Right Item
</div>
`;
/* end snapshot item/Item Defaults Slots are correctly populated */

snapshots["item/Item Special Attributes Check property multiple Checkbox for item should not be displayed"] = 
`<div part="left">
  <slot name="left">
  </slot>
</div>
<div part="center">
  <slot>
  </slot>
</div>
<div part="right">
  <slot name="right">
  </slot>
</div>
`;
/* end snapshot item/Item Special Attributes Check property multiple Checkbox for item should not be displayed */

