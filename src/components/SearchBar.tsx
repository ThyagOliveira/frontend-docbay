import React, { useState } from 'react'
import { SearchIcon } from '../assets'
import type {
  FilterType,
  IDropdownProps,
  ISearchBarProps
} from '../interfaces/Components'
import '../styles/components/SearchBar.scss'
import { Dropdown } from './Dropdown'

export const SearchBar: React.FunctionComponent<ISearchBarProps> = ({
  onSearch
}) => {
  const [search, setSearch] = useState<string>('')
  const [filterType, setFilterType] = useState<FilterType>('location')

  const handleSearch = () => {
    if (!search.trim()) {
      onSearch('', filterType)
    } else {
      onSearch(search, filterType)
    }
  }

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }
  const dropdownProps: IDropdownProps = {
    value: filterType,
    options: [
      { label: 'Location', value: 'location' },
      { label: 'Language', value: 'language' }
    ],
    onChange: (value) => setFilterType(value as FilterType)
  }

  return (
    <div className="search-box">
      <Dropdown {...dropdownProps} />
      <input
        type="text"
        placeholder={`Search users by ${filterType}...`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={handleKeyUp}
        className="search-box_input"
      />
      <button className="search-box_btn" onClick={handleSearch}>
        <SearchIcon />
      </button>
    </div>
  )
}
