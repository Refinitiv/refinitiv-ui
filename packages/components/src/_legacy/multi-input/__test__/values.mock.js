export const getData = () => {
  return [
    { value: 'value 0', label: 'label 0', id: '0' },
    { value: 'value 1', label: 'label 1', id: '1' },
    { value: 'value 2', label: 'label 2', id: '2' }
  ];
};

export const getAlotOfValues = () => {
  let values = [];
  for (let index = 0; index < 50; index++) {
    values.push({ value: `value ${index}`, label: `label ${index}`, id: `${index}` });
  }
  return values;
};

export const getNewItem = () => {
  return { value: 'value 3', label: 'label 3', id: '3' };
};
