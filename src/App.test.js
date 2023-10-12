import { render, screen } from '@testing-library/react';
import App from './App';

test('renders KartUNS', () => {
  render(<App />);
  const linkElement = screen.getByText(/KartUNS login/i);
  expect(linkElement).toBeInTheDocument();
});
