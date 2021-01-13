import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const topBarElement = screen.getByText(/FWF/i);
  expect(topBarElement).toBeInTheDocument();
});
