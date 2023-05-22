import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://127.0.0.1:8000'
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
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default instance
