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
  email_verified_at: string
}

export const useAuthStore = defineStore('auth', () => {
  const isLogin = ref(false)

  const user = ref<User | null>(null)

  async function checkState() {
    const state = !!Cookies.get('token')

    if (state === isLogin.value) {
      // 沒變動,離開
      return
    } else {
      // 有變動,檢查用戶資料
      isLogin.value = state
    }

    if (state && user.value === null) {
      // 有token但沒用戶資料時取得資料
      await axios
        .get('/api/me')
        .then(({ data }) => {
          user.value = {
            id: get(data, 'data.id', ''),
            name: get(data, 'data.name', ''),
            email: get(data, 'data.email', ''),
            avatar: get(data, 'data.avatar', ''),
            email_verified_at: get(data, 'data.email_verified_at')
          }
        })
        .catch(() => {
          // 發生錯誤時登出
          Cookies.remove('token')

          isLogin.value = false

          user.value = null
        })
    }

    if (!state) {
      // 沒有token清空用戶資料
      user.value = null
    }
  }

  async function logout() {
    await axios.post('/api/auth/logout').finally(() => {
      Cookies.remove('token')

      isLogin.value = false
    })
  }

  return { isLogin, user, checkState, logout }
})
