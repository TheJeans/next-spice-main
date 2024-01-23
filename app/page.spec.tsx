/**
 * @jest-environment jsdom
 */
 import { render, screen } from '@testing-library/react'
 import Page from './page'
 
 it('renders a link to the spice list', () => {
   render(<Page />)
   expect(screen.getByText('Spices')).toBeDefined()
 })
 