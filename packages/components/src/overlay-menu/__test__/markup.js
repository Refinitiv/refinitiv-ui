const flatMarkup = `
        <ef-overlay-menu>
            <ef-item type="header">A Header</ef-item>
            <ef-item value="one">Item One</ef-item>
            <ef-item value="two">Item Two</ef-item>
            <ef-item type="divider"></ef-item>
            <ef-item value="disabled" disabled>Item Disabled</ef-item>
            <ef-item value="readonly" readonly>Item Readonly</ef-item>
            <ef-item value="hidden" style="display: none">Item Hidden</ef-item>
        </ef-overlay-menu>
`;

const flatMarkupOpened = `
        <ef-overlay-menu opened>
            <ef-item type="header">A Header</ef-item>
            <ef-item value="one">Item One</ef-item>
            <ef-item value="two">Item Two</ef-item>
            <ef-item type="divider"></ef-item>
            <ef-item value="disabled" disabled>Item Disabled</ef-item>
            <ef-item value="readonly" readonly>Item Readonly</ef-item>
            <ef-item value="hidden" style="display: none">Item Hidden</ef-item>
        </ef-overlay-menu>
`;

const flatMarkupWithSelection = `
        <ef-overlay-menu>
            <ef-item type="header">A Header</ef-item>
            <ef-item value="one">Item One</ef-item>
            <ef-item value="two" selected>Item Two</ef-item>
            <ef-item type="divider"></ef-item>
            <ef-item value="disabled" disabled>Item Disabled</ef-item>
            <ef-item value="readonly" readonly>Item Readonly</ef-item>
            <ef-item value="hidden" style="display: none">Item Hidden</ef-item>
        </ef-overlay-menu>
`;

const nestedMarkup = `
        <div>
          <ef-overlay-menu id="top-menu">
            <ef-item type="header">A Header</ef-item>
            <ef-item value="one">Item One</ef-item>
            <ef-item value="two">Item Two</ef-item>
            <ef-item type="divider"></ef-item>
            <ef-item value="disabled" disabled>Item Disabled</ef-item>
            <ef-item value="readonly" readonly>Item Readonly</ef-item>
            <ef-item value="hidden" style="display: none">Item Hidden</ef-item>
            <ef-item for="sub-one">Sub Menu One</ef-item>
          </ef-overlay-menu>
          <ef-overlay-menu id="sub-one">
            <ef-item type="header">A Header</ef-item>
            <ef-item value="sm-one">Sub Item One</ef-item>
            <ef-item value="sm-two">Sub Item Two</ef-item>
            <ef-item type="divider"></ef-item>
            <ef-item value="sm-disabled" disabled>Sub Item Disabled</ef-item>
            <ef-item value="sm-readonly" readonly>Sub Item Readonly</ef-item>
            <ef-item value="sm-hidden" style="display: none">Sub Item Hidden</ef-item>
            <ef-item for="sub-two">Sub Menu Two</ef-item>
          </ef-overlay-menu>
          <ef-overlay-menu id="sub-two">
            <ef-item type="header">A Header</ef-item>
            <ef-item value="ssm-one">Item One</ef-item>
            <ef-item value="ssm-two">Item Two</ef-item>
            <ef-item type="divider"></ef-item>
            <ef-item value="ssm-disabled" disabled>Item Disabled</ef-item>
            <ef-item value="ssm-readonly" readonly>Item Readonly</ef-item>
            <ef-item value="ssm-hidden" style="display: none">Item Hidden</ef-item>
          </ef-overlay-menu>
        </div>
`;

const nestedMarkupWithSelection = `
        <div>
          <ef-overlay-menu id="top-menu">
            <ef-item type="header">A Header</ef-item>
            <ef-item value="one">Item One</ef-item>
            <ef-item value="two" selected>Item Two</ef-item>
            <ef-item type="divider"></ef-item>
            <ef-item value="disabled" disabled>Item Disabled</ef-item>
            <ef-item value="readonly" readonly>Item Readonly</ef-item>
            <ef-item value="hidden" style="display: none">Item Hidden</ef-item>
            <ef-item for="sub-one">Sub Menu One</ef-item>
          </ef-overlay-menu>
          <ef-overlay-menu id="sub-one">
            <ef-item type="header">A Header</ef-item>
            <ef-item value="sm-one">Sub Item One</ef-item>
            <ef-item value="sm-two" selected>Sub Item Two</ef-item>
            <ef-item type="divider"></ef-item>
            <ef-item value="sm-disabled" disabled>Sub Item Disabled</ef-item>
            <ef-item value="sm-readonly" readonly>Sub Item Readonly</ef-item>
            <ef-item value="sm-hidden" style="display: none">Sub Item Hidden</ef-item>
            <ef-item for="sub-two">Sub Menu Two</ef-item>
          </ef-overlay-menu>
          <ef-overlay-menu id="sub-two">
            <ef-item type="header">A Header</ef-item>
            <ef-item value="ssm-one">Item One</ef-item>
            <ef-item value="ssm-two" selected>Item Two</ef-item>
            <ef-item type="divider"></ef-item>
            <ef-item value="ssm-disabled" disabled>Item Disabled</ef-item>
            <ef-item value="ssm-readonly" readonly>Item Readonly</ef-item>
            <ef-item value="ssm-hidden" style="display: none">Item Hidden</ef-item>
          </ef-overlay-menu>
        </div>
`;

export { flatMarkup, flatMarkupWithSelection, nestedMarkup, nestedMarkupWithSelection, flatMarkupOpened };
