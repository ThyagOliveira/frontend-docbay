import React, { useState } from 'react'
import type { ICreateUserComponentProps } from '../interfaces/Components'
import { Modal } from './Modal'

import '../styles/components/CreateUserComponent.scss'
import { Toast } from './Toast'

export const CreateUserComponent: React.FunctionComponent<
  ICreateUserComponentProps
> = ({ isOpen, onClose, onSubmit }) => {
  const [username, setUsername] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showToast, setShowToast] = useState(false)

  const handleAdd = async () => {
    if (!username.trim()) return

    setIsSubmitting(true)
    setErrorMessage('')

    try {
      await onSubmit(username.trim())
      setUsername('')
    } catch (error) {
      setErrorMessage('User not found or an error occurred.')
      console.error('Error:', error)
      setShowToast(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="add-user-modal">
          <h2>Add GitHub User</h2>
          <input
            type="text"
            className={errorMessage ? 'input-error' : ''}
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="modal-actions">
            <button className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn-submit"
              onClick={handleAdd}
              disabled={isSubmitting || !username.trim()}
            >
              {isSubmitting ? <div className="spinner"></div> : 'Add'}
            </button>
          </div>
        </div>
      </Modal>
      {showToast && (
        <Toast
          type="error"
          message={errorMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  )
}
