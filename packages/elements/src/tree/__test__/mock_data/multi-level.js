export const multiLevelData = [
  {
    'value': 'l11',
    'label': 'Level 1-1',
    'items': [{
      'value': 'l21',
      'label': 'Level 2-1',
      'expanded': true,
      'items': [{
        'value': 'l31',
        'label': 'Level 3-1',
      },{
        'value': 'l32',
        'label': 'Level 3-2',
      }]
    },{
      'value': 'l22',
      'label': 'Level 2-2',
      'expanded': true,
      'items': [{
        'value': 'l33',
        'label': 'Level 3-3',
      }]
    }]
  }, {
    'value': 'l12',
    'label': 'Level 1-2',
    'items': [{
      'value': 'l23',
      'label': 'Level 2-3',
      'expanded': true,
      'items': [{
        'value': 'l34',
        'label': 'Level 3-4',
      },{
        'value': 'l35',
        'label': 'Level 3-5',
      }]
    },{
      'value': 'l24',
      'label': 'Level 2-4'
    }]
  }
];

export const multiLevelInvalidData = [
  {
    'value': 'l11',
    'selected': true,
    'label': 'Level 1-1',
    'items': [{
      'value': 'l21',
      'label': 'Level 2-1',
      'selected': false,
      'expanded': true,
      'items': [{
        'value': 'l31',
        'label': 'Level 3-1',
        'selected': true,
      },{
        'value': 'l32',
        'label': 'Level 3-2',
        'selected': true,
      }]
    },{
      'value': 'l22',
      'label': 'Level 2-2',
      'selected': false,
      'expanded': true,
      'items': [{
        'value': 'l33',
        'label': 'Level 3-3',
        'selected': true,
      }]
    }]
  }, {
    'value': 'l12',
    'label': 'Level 1-2',
    'expanded': true,
    'selected': true,
    'items': [{
      'value': 'l23',
      'label': 'Level 2-3',
      'selected': false,
      'expanded': true,
      'items': [{
        'value': 'l34',
        'label': 'Level 3-4',
        'selected': true,
        'expanded': true,
      },{
        'value': 'l35',
        'label': 'Level 3-5',
        'selected': true,
        'expanded': true,
      }]
    },{
      'value': 'l24',
      'label': 'Level 2-4',
      'selected': true,
      'expanded': true,
    }]
  }
];
