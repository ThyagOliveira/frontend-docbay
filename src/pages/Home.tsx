import { useState } from 'react'
import { EyeIcon } from '../assets'
import type { FilterType, ITableProps } from '../interfaces/Components'
import type { IGithubUser } from '../interfaces/GithubUsers'
import { Table } from '../components/Table'
import { SearchBar } from '../components/SearchBar'
import { Modal } from '../components/Modal'
import { Toast } from '../components/Toast'
import { CreateUserComponent } from '../components/CreateUserComponent'
import { useGithubUsers } from '../hooks/useGithubUsers'
import { addUserData } from '../services/api'

import '../styles/pages/Home.scss'

export default function Home() {
  const [searchText, setSearchText] = useState<string>('')
  const [filterType, setFilterType] = useState<FilterType>('location')
  const [githubUsers, getGithubUsers] = useGithubUsers(searchText, filterType)
  const [selectedGithubUser, setSelectedGithubUser] =
    useState<IGithubUser | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [showToast, setShowToast] = useState<boolean>(false)

  const handleGithubUserClick = (user: IGithubUser) => {
    setSelectedGithubUser(user)
  }

  const handleSearch = (searchText: string, type: FilterType) => {
    setSearchText(searchText)
    setFilterType(type)
  }

  const handleCloseModal = () => {
    setSelectedGithubUser(null)
  }

  const handleAddUser = async (username: string) => {
    if (!username.trim()) return
    await addUserData(username)
    await getGithubUsers()
    setIsAddModalOpen(false)
    setShowToast(true)
  }

  const tableProps: ITableProps = {
    data: githubUsers,
    columns: [
      { header: 'Git Hub Id', accessor: 'githubId' },
      { header: 'Name', accessor: 'name' },
      { header: 'Email', accessor: 'email' },
      { header: 'Location', accessor: 'location' },
      {
        header: 'Languages',
        accessor: 'languages',
        render: (user) => <>{user.languages?.join(', ')}</>
      },
      { header: 'Blog', accessor: 'blog' },
      {
        header: 'Actions',
        render: (user) => (
          <button onClick={() => handleGithubUserClick(user)}>
            <EyeIcon />
          </button>
        )
      }
    ],
    handleGithubUserClick: (user) => handleGithubUserClick(user)
  }

  return (
    <main className="home-container">
      <div className="home-header">
        <SearchBar onSearch={handleSearch} />
        <button
          className="add-user-btn"
          onClick={() => setIsAddModalOpen(true)}
        >
          + Add User
        </button>
      </div>

      <Table {...tableProps} />

      <Modal isOpen={!!selectedGithubUser} onClose={handleCloseModal}>
        {selectedGithubUser && (
          <>
            <div className="left-section">
              <img
                src={selectedGithubUser.avatarUrl}
                alt={selectedGithubUser.name}
              />
            </div>
            <div className="right-section">
              <h2>{selectedGithubUser.name || 'Not informed'}</h2>
              <p>Email: {selectedGithubUser.email || 'Not informed'}</p>
              <p>Location: {selectedGithubUser.location || 'Not informed'}</p>
              <p>Bio: {selectedGithubUser.bio || 'Not informed'}</p>
              <p>
                URL:{' '}
                <a
                  href={selectedGithubUser.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedGithubUser.url}
                </a>
              </p>
              <p>
                Language:{' '}
                {selectedGithubUser.languages.join(', ') || 'Not informed'}
              </p>
              {selectedGithubUser.blog ? (
                <p>
                  Blog:{' '}
                  <a
                    href={selectedGithubUser.blog}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedGithubUser.blog}
                  </a>
                </p>
              ) : (
                <p>Blog: Not informed</p>
              )}
            </div>
          </>
        )}
      </Modal>

      <CreateUserComponent
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUser}
      />

      {showToast && (
        <Toast
          type="success"
          message="GitHub user added successfully!"
          onClose={() => setShowToast(false)}
        />
      )}
    </main>
  )
}
