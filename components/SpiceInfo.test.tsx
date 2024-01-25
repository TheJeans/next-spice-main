import React from 'react';
import { render, screen } from '@testing-library/react';
import SpiceInfo from './SpiceInfo'; // Adjust the import path as necessary

describe('SpiceInfo Component', () => {
  it('renders spice information correctly', () => {
    const mockSpice = {
      id: 1,
      name: 'Test Spice',
      color: 'ff0000',
      price: '$10',
      heat: 5,
    };

    render(<SpiceInfo item={mockSpice} />);

    expect(screen.getByText(mockSpice.name)).toBeInTheDocument();
    expect(screen.getByTestId('spice-price').textContent).toContain(mockSpice.price);
    expect(screen.getByTestId('spice-heat').textContent).toContain(mockSpice.heat.toString());
  });
});
