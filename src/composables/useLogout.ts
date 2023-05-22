import axios from '@/utils/axios'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

export const useLogout = () => {
  const router = useRouter()

  return async () => {
    await axios
      .post('/api/auth/logout')
      .catch(() => {
        alert('server error')
      })
      .finally(() => {
        Cookies.remove('token')

        router.go(0)
      })
  }
}
