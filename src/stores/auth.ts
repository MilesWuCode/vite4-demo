import { defineStore } from 'pinia'
import { get } from 'lodash-es'
import { ref } from 'vue'
import axios from '@/utils/axios'
import Cookies from 'js-cookie'

type User = {
  id: number | string
  name: string
  email: string
  avatar: string
}

export const useAuthStore = defineStore('auth', () => {
  const isLogin = ref(!!Cookies.get('token'))

  const user = ref<User | null>(null)

  async function checkState() {
    const state = !!Cookies.get('token')

    if (state === isLogin.value) {
      // 沒變動
      return
    } else {
      // 有變動
      isLogin.value = state
    }

    if (state) {
      // true值更新資料
      await axios.get('/api/me').then(({ data }) => {
        user.value = {
          id: get(data, 'data.id', ''),
          name: get(data, 'data.name', ''),
          email: get(data, 'data.email', ''),
          avatar: get(data, 'data.avatar', '')
        }
      })
    } else {
      // false值清空
      user.value = null
    }
  }

  async function logout() {
    await axios
      .post('/api/auth/logout')
      .catch(() => {
        alert('server error')
      })
      .finally(() => {
        Cookies.remove('token')

        isLogin.value = false
      })
  }

  return { isLogin, user, checkState, logout }
})
