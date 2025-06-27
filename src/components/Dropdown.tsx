// import type React from 'react'
// import type { IDropdownProps } from '../interfaces/Components'
// import '../styles/components/Dropdown.scss'
// import { useState } from 'react'

// export const Dropdown: React.FunctionComponent<IDropdownProps> = ({
//   value,
//   options,
//   onChange
// }) => {
//   const [open, setOpen] = useState(false)
//   const [selected, setSelected] = useState('location')

//   return (
//     <div className="custom-dropdown">
//       <button onClick={() => setOpen(!open)}>{selected}</button>
//       {open && (
//         <ul className="dropdown-list">
//           {options.map((opt) => (
//             <li
//               key={opt.value}
//               onClick={() => {
//                 setSelected(opt.value)
//                 setOpen(false)
//               }}
//             >
//               {opt.label}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   )

//   return (
//     <div className="custom-dropdown">
//       <select
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="custom-dropdown_select"
//       >
//         {options.map((opt) => (
//           <option key={opt.value} value={opt.value}>
//             {opt.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   )
// }

// src/components/Dropdown.tsx
import React, { useState, useRef, useEffect } from 'react'
import '../styles/components/Dropdown.scss'

export type DropdownOption = {
  label: string
  value: string
}

interface DropdownProps {
  value: string
  options: DropdownOption[]
  onChange: (value: string) => void
}

export const Dropdown: React.FunctionComponent<DropdownProps> = ({
  value,
  options,
  onChange
}) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || 'Select'

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="custom-dropdown_toggle"
        onClick={() => setOpen((prev) => !prev)}
      >
        {selectedLabel}
        <span className="dropdown-icon" />
      </button>
      {open && (
        <div className="custom-dropdown_menu">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`custom-dropdown_item ${
                opt.value === value ? 'active' : ''
              }`}
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
