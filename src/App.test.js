import { render, screen } from '@testing-library/react';
import App from './App';
import { pageMetadata } from './seoMetadata';

test('renders the guest house home page', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', {
      name: /a comfortable stay, near to the siganduru chowdeshwari temple/i,
    })
  ).toBeInTheDocument();
});

test('includes route metadata for the main routed pages', () => {
  expect(pageMetadata['/']).toMatchObject({
    title: expect.stringContaining('KRS Guest House'),
  });
  expect(pageMetadata['/attraction']).toMatchObject({
    title: expect.stringContaining('Places to Visit'),
  });
  expect(pageMetadata['/location']).toMatchObject({
    title: expect.stringContaining('Location'),
  });
});
