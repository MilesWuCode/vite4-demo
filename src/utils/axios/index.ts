import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import notyf from '@/utils/notyf'

const instance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_URL
})

instance.interceptors.request.use(
  function (config) {
    const token = Cookies.get('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error: AxiosError) {
    if (error.response?.status === 401) {
      // wip
    }

    if (error.response?.status === 429) {
      const data = error.response.data as any

      data.message && notyf.error(data.message)
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default instance
