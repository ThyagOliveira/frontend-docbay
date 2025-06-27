import { render, screen } from '@testing-library/react'
import { Toast } from '../components/Toast'

test('renders success toast', () => {
  render(<Toast message="User added" type="success" onClose={() => {}} />)
  expect(screen.getByText(/user added/i)).toBeInTheDocument()
})
