import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import App from './App';
import './themes/light';

test('Should render App with light theme', () => {
  const defaultTheme = 'light'
  render(<App theme={defaultTheme}/>);
  const theme = document.body.getAttribute('theme');
  expect(theme).toBe(defaultTheme);
});

test('Should Change chart type', () => {
  const { container } = render(<App />);
  const chart = container.querySelector('ef-interactive-chart');
  expect(chart.config.series[0].type).toBe('line');
  const areaChartTab = container.querySelector('ef-tab[label="Area Chart"]');
  fireEvent.click(areaChartTab);
  expect(chart.config.series[0].type).toBe('area');
  const barChartTab = container.querySelector('ef-tab[label="Bar Chart"]');
  fireEvent.click(barChartTab);
  expect(chart.config.series[0].type).toBe('bar');
});

test('Should open profile dialog', () => {
  const { container } = render(<App />);
  const profileButton = container.querySelector('#profileButton');
  fireEvent.click(profileButton);
  const dialog = container.querySelector('ef-dialog');
  expect(dialog.opened).toBe(true);
});

test('Should have default value in checkbox before and after open dialog', () => {
  const { container } = render(<App />);
  let checkbox = container.querySelector('ef-checkbox');
  expect(checkbox.checked).toBe(true);
  const profileButton = container.querySelector('#profileButton');
  fireEvent.click(profileButton);
  checkbox = container.querySelector('ef-checkbox');
  expect(checkbox.checked).toBe(true);
});

test('Should disable/enable confirm button', () => {
  const { container } = render(<App />);
  const profileButton = container.querySelector('#profileButton');
  fireEvent.click(profileButton);

  const confirmButton = container.querySelector('#confirmButton');
  expect(confirmButton.disabled).toBe(true);

  const nameInput = container.querySelector('#nameInput');
  nameInput.value = 'name';
  act(() => {
    nameInput.dispatchEvent(new CustomEvent('value-changed', { detail: { value: 'name'} }));
  });

  const emailInput = container.querySelector('#emailInput');
  emailInput.value = 'user@refinitiv.com';
  act(() => {
    emailInput.dispatchEvent(new CustomEvent('value-changed', { detail: { value: 'user@refinitiv.com' }}));
  });

  expect(confirmButton.disabled).toBe(false);
});
