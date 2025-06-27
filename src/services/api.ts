import axios, { AxiosError } from 'axios'
import type { IFetchUserDataOptions } from '../interfaces/Requests'

const axiosInstance = axios.create({
  baseURL: 'http://0.0.0.0:3000',
  headers: {
    'Content-Type': 'application/json'
  }
})

const handleError = (error: AxiosError) => {
  if (error.response) {
    console.error('Response error:', error.response.data)
  } else if (error.request) {
    console.error('Request error:', error.request)
  } else {
    console.error('General error:', error.message)
  }
  throw error
}

export const addUserData = async (username: string) => {
  try {
    const response = await axiosInstance.post(`/github/${username}`)
    return response.data
  } catch (error) {
    handleError(error as AxiosError)
  }
}

export const fetchUserData = async (filters?: IFetchUserDataOptions) => {
  try {
    const response = await axiosInstance.get(`/github/`, {
      params: filters || {}
    })
    return response.data
  } catch (error) {
    handleError(error as AxiosError)
  }
}
