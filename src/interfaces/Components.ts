import type { IGithubUser } from './GithubUsers'

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IColumn {
  header: string
  accessor?: string
  render?: (row: any) => React.ReactNode
}

export interface ITableProps {
  data: any[]
  columns: IColumn[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  handleGithubUserClick: (githubUser: IGithubUser) => void
}

export interface IModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export type FilterType = 'location' | 'language'

export interface ISearchBarProps {
  onSearch: (searchText: string, type: FilterType) => void
}

export type IDropdownOption = {
  label: string
  value: string
}

export interface IDropdownProps {
  value: string
  options: IDropdownOption[]
  onChange: (value: string) => void
}

export interface ICreateUserComponentProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (username: string) => void
}

export interface IToastProps {
  type: 'success' | 'error'
  message: string
  onClose: () => void
}
