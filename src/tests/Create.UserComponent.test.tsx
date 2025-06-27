import { render, screen, fireEvent } from '@testing-library/react'
import { CreateUserComponent } from '../components/CreateUserComponent'

test('calls onSubmit with username', () => {
  const mockSubmit = vi.fn()
  render(
    <CreateUserComponent
      isOpen={true}
      onClose={() => {}}
      onSubmit={mockSubmit}
    />
  )

  const input = screen.getByPlaceholderText(/enter github username/i)
  fireEvent.change(input, { target: { value: 'ThyagOliveira' } })

  const button = screen.getByRole('button', { name: /add/i })
  fireEvent.click(button)

  expect(mockSubmit).toHaveBeenCalledWith('ThyagOliveira')
})
