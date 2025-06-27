import { render, screen } from '@testing-library/react'
import { Table } from '../components/Table'

const mockUsers = [
  { id: 1, name: 'Ana', languages: ['JavaScript'] },
  { id: 2, name: 'João', languages: ['Python'] }
]

test('renders table rows with user names', () => {
  render(
    <Table
      data={mockUsers}
      columns={[
        { header: 'Name', accessor: 'name' },
        {
          header: 'Languages',
          render: (row) => row.languages.join(', ')
        }
      ]}
      currentPage={1}
      totalPages={1}
      onPageChange={() => {}}
      handleGithubUserClick={() => {}}
    />
  )

  expect(screen.getByText('Ana')).toBeInTheDocument()
  expect(screen.getByText('João')).toBeInTheDocument()
})
