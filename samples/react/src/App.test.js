import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('fired page changed', () => {
  const handlePageChanged = jest.fn()
  render(<App />);
  fireEvent.click(screen.getByText('Page'));
  fireEvent.change(screen.getByText('3', {target: { value: '4' }}))
  expect(handlePageChanged).toHaveBeenCalled();
});
