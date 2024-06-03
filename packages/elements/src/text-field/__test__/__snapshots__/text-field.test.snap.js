/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["text-field/TextField DOM structure and properties are correct"] =
`<input
  aria-invalid="true"
  autocomplete="off"
  maxlength="10"
  minlength="5"
  part="input"
  pattern="[a-z]"
  placeholder="Placeholder"
  type="text"
>
<ef-icon
  icon="menu"
  part="icon"
>
</ef-icon>
`;
/* end snapshot text-field/TextField DOM structure and properties are correct */

snapshots["text-field/TextField Default DOM structure and properties are correct"] =
`<input
  autocomplete="off"
  part="input"
  type="text"
>
`;
/* end snapshot text-field/TextField Default DOM structure and properties are correct */

snapshots["text-field/DOM structure with clears is correct"] =
`<input
  autocomplete="off"
  part="input"
  type="text"
>
<div
  id="clears-button"
  part="button button-clear"
>
  <ef-icon
    icon="cross"
    part="icon icon-clear"
  >
  </ef-icon>
</div>
`;
/* end snapshot text-field/TextField Should have correct "clears" Shadow DOM structure */

snapshots["text-field/TextField DOM structure with clears is correct"] = 
`<input
  autocomplete="off"
  part="input"
  type="text"
>
<div
  id="clears-button"
  part="button button-clear"
>
  <ef-icon
    icon="cross"
    part="icon icon-clear"
  >
  </ef-icon>
</div>
`;
/* end snapshot text-field/TextField DOM structure with clears is correct */

