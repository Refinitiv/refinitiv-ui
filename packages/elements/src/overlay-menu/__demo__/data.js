/* eslint-disable */
window.data = [{
  type: 'header',
  label: 'Block One'
}, {
  icon: 'copy',
  value: 'One',
  label: 'One',
  title: 'Copy the One item'
}, {
  icon: 'cross',
  value: 'Two',
  label: 'Two'
}, {
  type: 'divider'
}, {
  icon: 'directory',
  value: 'Three',
  label: 'Three'
}, {
  icon: 'dislike-empty',
  value: 'Four',
  label: 'Four',
  items: [{
    type: 'header',
    label: 'Nested Block'
  }, {
    label: 'Four.Zero',
    value: 'Four Zero',
    items: [{
      label: 'Four.Zero.One',
      value: 'Four Zero One'
    }, {
      label: 'Four.Zero.Two',
      value: 'Four Zero Two'
    }, {
      label: 'Four.Zero.Three',
      value: 'Four Zero Three'
    }]
  }, {
    label: 'Four.One',
    value: 'Four One',
    icon: 'flame'
  }, {
    label: 'Four.Two',
    value: 'Four Two'
  }, {
    label: 'Four.Three',
    value: 'Four Three',
    items: [{
      label: 'Four.Three.One',
      value: 'Four Three One'
    }, {
      label: 'Four.Three.Two',
      value: 'Four Three Two'
    }, {
      label: 'Four.Three.Three',
      value: 'Four Three Three'
    }]
  }]
}, {
  value: 'Five',
  label: 'Five',
  disabled: true
}, {
  type: 'divider'
}, {
  value: 'Six',
  label: 'Six',
  items: [{
    label: 'Six.One',
    value: 'Six One'
  }, {
    label: 'Six.Two',
    value: 'Six Two'
  }, {
    label: 'Six.Three',
    value: 'Six Three',
    items: [{
      label: 'Six.Three.One',
      value: 'Six Three One'
    }, {
      label: 'Six.Three.Two',
      value: 'Six Three Two'
    }, {
      label: 'Six.Three.Three',
      value: 'Six Three Three'
    }]
  }]
}, {
  value: 'Seven',
  label: 'Seven',
  disabled: true,
  items: [{
    value: 'Seven One',
    label: 'Seven.One'
  }]
}];
