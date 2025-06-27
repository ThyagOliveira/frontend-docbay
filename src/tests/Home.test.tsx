import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import Home from '../pages/Home'

test('renders Add User button on home page', () => {
  render(<Home />)
  expect(screen.getByText('+ Add User')).toBeInTheDocument()
})
