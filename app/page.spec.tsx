import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './page';
import '@testing-library/jest-dom';

// mock the banner and SplitSectionWithLinks
jest.mock("../components/Banner", () => {
  return {
    __esModule: true,
    default: () => <div>Banner Mock</div>,
  };
});

jest.mock("../components/SplitSectionWithLinks", () => {
  return {
    __esModule: true,
    default: () => <div>SplitSectionWithLinks Mock</div>,
  };
});

describe('Home Page', () => {
  it('renders the Banner component', () => {
    render(<Home />);
    expect(screen.getByText('Banner Mock')).toBeInTheDocument();
  });

  it('renders the SplitSectionWithLinks component', () => {
    render(<Home />);
    expect(screen.getByText('SplitSectionWithLinks Mock')).toBeInTheDocument();
  });
});
