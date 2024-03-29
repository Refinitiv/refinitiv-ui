/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["autosuggest/Autosuggest DOM structure is correct"] = 
`<div part="header">
  <slot
    id="headerSlot"
    name="header"
  >
  </slot>
</div>
<div part="content">
  <slot>
  </slot>
  <ef-item
    aria-selected="false"
    id="moreResults"
    part="more-results"
    role="option"
    tabindex="-1"
  >
    <span part="more-results-text">
      More results for
      <mark>
      </mark>
    </span>
    <span
      part="more-results-keys"
      slot="right"
    >
      <kbd>
        SHIFT
      </kbd>
      +
      <kbd>
        ENTER
      </kbd>
    </span>
  </ef-item>
</div>
<div part="footer">
  <slot
    id="footerSlot"
    name="footer"
  >
  </slot>
</div>
<div part="loader">
  <div part="backdrop">
  </div>
  <ef-loader
    aria-label="Loading suggestion items"
    aria-live="assertive"
    role="progressbar"
  >
  </ef-loader>
</div>
`;
/* end snapshot autosuggest/Autosuggest DOM structure is correct */

