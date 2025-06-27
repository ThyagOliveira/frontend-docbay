import { useCallback, useEffect, useState } from 'react'
import { fetchUserData } from '../services/api'
import type { IGithubUser } from '../interfaces/GithubUsers'
import type { FilterType } from '../interfaces/Components'

export const useGithubUsers = (
  searchText: string,
  filterType: FilterType
): [IGithubUser[], () => Promise<void>] => {
  const [githubUsers, setGithubUsers] = useState<IGithubUser[]>([])

  const getGithubUsers = useCallback(async () => {
    try {
      const filters = searchText ? { [filterType]: searchText } : undefined

      const githubUsersData = await fetchUserData(filters)

      setGithubUsers(githubUsersData)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }, [searchText, filterType])

  useEffect(() => {
    getGithubUsers()
  }, [searchText, getGithubUsers])

  return [githubUsers, getGithubUsers]
}
