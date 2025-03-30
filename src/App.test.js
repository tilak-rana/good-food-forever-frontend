import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the main heading', () => {
  render(<App />);
  
  // Assuming there's a main heading or another element to check for
  const headingElement = screen.getByRole('heading', { name: /welcome to my app/i });
  
  expect(headingElement).toBeInTheDocument();
});
