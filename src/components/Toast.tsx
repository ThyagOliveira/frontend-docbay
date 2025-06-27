import type React from 'react'
import { useEffect } from 'react'
import type { IToastProps } from '../interfaces/Components'

import '../styles/components/Toast.scss'

export const Toast: React.FunctionComponent<IToastProps> = ({
  type,
  message,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])
  return (
    <div className={`toast ${type}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
    </div>
  )
}
