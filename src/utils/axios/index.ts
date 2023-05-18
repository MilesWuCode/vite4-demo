import axios from 'axios'

const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://127.0.0.1:8000'
})

// instance.defaults.withCredentials = true

export default instance
