import axios from 'axios'
import toast from 'react-hot-toast'
import { removeStoredToken } from '../utils/auth'

const api = axios.create({
  baseURL:  'http://localhost:5000/api',
  timeout: 10000,
})

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      removeStoredToken()
      delete api.defaults.headers.common['Authorization']
      window.location.href = '/login'
      toast.error('Session expired. Please login again.')
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message)
    } else {
      toast.error('Something went wrong!')
    }
    return Promise.reject(error)
  }
)


export default api

