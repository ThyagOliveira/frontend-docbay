import React from 'react'
import type { IModalProps } from '../interfaces/Components'
import '../styles/components/Modal.scss'

export const Modal: React.FunctionComponent<IModalProps> = ({
  isOpen,
  onClose,
  children
}) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  )
}
