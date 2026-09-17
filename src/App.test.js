import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the guest house home page', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', {
      name: /a comfortable stay, near to the siganduru chowdeshwari temple/i,
    })
  ).toBeInTheDocument();
});
