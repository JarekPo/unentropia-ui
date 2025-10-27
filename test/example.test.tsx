import { Button } from '@/components/ui/button';
import { render, screen } from '@testing-library/react';

test('renders button', () => {
  render(<Button>Click</Button>);
  expect(screen.getByText('Click')).toBeInTheDocument();
});