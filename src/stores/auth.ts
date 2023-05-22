import axios from '@/utils/axios'
import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useAuth = defineStore('auth', () => {
  const isLogin = ref(!!Cookies.get('token'))

  function checkState() {
    isLogin.value = !!Cookies.get('token')
  }

  async function logout() {
    const route = useRoute()

    const router = useRouter()

    await axios
      .post('/api/auth/logout')
      .catch(() => {
        alert('server error')
      })
      .finally(() => {
        Cookies.remove('token')

        isLogin.value = false

        route.meta.auth == 'member' && router.go(0)
      })
  }

  return { isLogin, checkState, logout }
})
