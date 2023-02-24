/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["label/Label DOM structure is correct Should switch to line clamp template if line-clamp is set"] = 
`<span
  class="clamp modern"
  style="line-clamp:1;-webkit-line-clamp:1;word-break:break-all;"
>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum sapien justo, vel mattis quam rhoncus eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum sapien justo, vel mattis quam rhoncus eu.
</span>
`;
/* end snapshot label/Label DOM structure is correct Should switch to line clamp template if line-clamp is set */

snapshots["label/Label DOM structure is correct Should default to use the truncate template"] = 
`<div class="left modern split">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum sapien justo, vel mattis quam rhoncus eu.
</div>
<div class="center split">
</div>
<div class="modern right split">
  <span dir="ltr">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque elementum sapien justo, vel mattis quam rhoncus eu.
  </span>
</div>
`;
/* end snapshot label/Label DOM structure is correct Should default to use the truncate template */

