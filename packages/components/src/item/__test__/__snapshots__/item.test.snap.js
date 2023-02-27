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
  <ef-icon
    icon="tick"
    part="icon"
  >
  </ef-icon>
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
  <ef-icon
    icon=""
    part="icon"
  >
  </ef-icon>
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
  <div part="sub-label">
    tiger
  </div>
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
  <div part="sub-label">
    tiger
  </div>
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
  <div part="sub-label">
    tiger
  </div>
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
  <div part="sub-label">
    tiger
  </div>
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

snapshots["item/Item Special Attributes Check property for"] = 
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
  <ef-icon icon="right">
  </ef-icon>
</div>
`;
/* end snapshot item/Item Special Attributes Check property for */

snapshots["item/Item Special Attributes Check property multiple Checkbox for item should be displayed"] = 
`<div part="left">
  <ef-checkbox
    aria-checked="false"
    part="checkbox"
    role="checkbox"
    tabindex="-1"
  >
  </ef-checkbox>
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
/* end snapshot item/Item Special Attributes Check property multiple Checkbox for item should be displayed */

snapshots["item/Item Special Attributes Check property multiple Checkbox should be checked "] = 
`<div part="left">
  <ef-checkbox
    aria-checked="true"
    checked=""
    part="checkbox"
    role="checkbox"
    tabindex="-1"
  >
  </ef-checkbox>
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
/* end snapshot item/Item Special Attributes Check property multiple Checkbox should be checked  */

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

