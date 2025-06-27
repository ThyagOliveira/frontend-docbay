import React from 'react'
import '../styles/components/Footer.scss'

export const Footer: React.FunctionComponent = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Challenge. All rights reserved.</p>
      </div>
    </footer>
  )
}
