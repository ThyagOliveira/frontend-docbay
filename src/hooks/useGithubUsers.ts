import { useCallback, useEffect, useState } from 'react'
import { fetchUserData } from '../services/api'
import type { IGithubUser } from '../interfaces/GithubUsers'
import type { FilterType } from '../interfaces/Components'
import type { IMeta } from '../interfaces/Response'

export const useGithubUsers = (
  searchText: string,
  filterType: FilterType,
  page: number,
  limit = 10
): [IGithubUser[], () => Promise<void>, IMeta] => {
  const [githubUsers, setGithubUsers] = useState<IGithubUser[]>([])
  const [meta, setMeta] = useState<IMeta>({
    total: 0,
    currentPage: 1,
    perPage: 10,
    lastPage: 1
  })

  const getGithubUsers = useCallback(async () => {
    try {
      const filters = {
        page,
        limit,
        ...(searchText ? { [filterType]: searchText } : {})
      }

      const { data, meta } = await fetchUserData(filters)

      setGithubUsers(data)
      setMeta(meta)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }, [searchText, filterType, page, limit])

  useEffect(() => {
    getGithubUsers()
  }, [searchText, getGithubUsers])

  return [githubUsers, getGithubUsers, meta]
}
