const flatData = [
  {
    label: 'A Header',
    type: 'header'
  },
  {
    label: 'Item One',
    value: 'one'
  },
  {
    label: 'Item Two',
    value: 'two'
  },
  {
    type: 'divider'
  },
  {
    label: 'Item Disabled',
    value: 'disabled',
    disabled: true
  },
  {
    label: 'Item Readonly',
    value: 'readonly',
    readonly: true
  }
];

const nestedData = [
  {
    label: 'A Header',
    type: 'header'
  },
  {
    label: 'Item One',
    value: 'one'
  },
  {
    label: 'Item Two',
    value: 'two'
  },
  {
    type: 'divider'
  },
  {
    label: 'Sub Menu',
    items: [
      {
        label: 'SM One',
        value: 'sm-one'
      },
      {
        label: 'SM Two',
        value: 'sm-two'
      },
      {
        type: 'divider'
      },
      {
        label: 'SM Disabled',
        value: 'sm-disabled',
        disabled: true
      },
      {
        label: 'SM Readonly',
        value: 'sm-readonly',
        readonly: true
      },
      {
        label: 'Sub Sub Menu',
        items: [
          {
            label: 'SSM One',
            value: 'ssm-one'
          },
          {
            label: 'SSM Two',
            value: 'ssm-two'
          },
          {
            type: 'divider'
          },
          {
            label: 'SSM Disabled',
            value: 'ssm-disabled',
            disabled: true
          },
          {
            label: 'SSM Readonly',
            value: 'ssm-readonly',
            readonly: true
          }
        ]
      }
    ]
  },
  {
    label: 'Item Disabled',
    value: 'disabled',
    disabled: true
  },
  {
    label: 'Item Readonly',
    value: 'readonly',
    readonly: true
  }
];

const numberData = [
  {value: 0, label: "Item 0"},
  {value: 1, label: "Item 1"},
  {value: 2, label: "Item 2"}
];
export { flatData, nestedData, numberData };
