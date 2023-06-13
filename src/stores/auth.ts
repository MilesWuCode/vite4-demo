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
    // 有token表示登入中
    const state = !!Cookies.get('token')

    /**
     * 若和先前isLogin不同表示登入或登出
     */
    if (state === isLogin.value) {
      // 沒變動,離開
      return
    } else {
      // 有變動更新isLogin
      isLogin.value = state
    }

    /**
     * 登入中
     * 若用戶沒有資料
     * 更新用戶資料
     */
    if (state && user.value === null) {
      // 有token但沒用戶資料時取得資料
      await fetchUser().catch(() => {
        // 發生錯誤時登出
        Cookies.remove('token')

        isLogin.value = false

        user.value = null
      })
    }

    /**
     * 未登入
     * 清空用戶資料
     */
    if (!state) {
      user.value = null
    }
  }

  /**
   * 執行登出
   */
  async function logout() {
    await axios.post('/api/auth/logout').finally(() => {
      Cookies.remove('token')

      isLogin.value = false
    })
  }

  /**
   * 取得用戶資料
   */
  async function fetchUser() {
    const state = !!Cookies.get('token')

    if (state) {
      await axios.get('/api/me').then(({ data }) => {
        user.value = {
          id: get(data, 'data.id', ''),
          name: get(data, 'data.name', ''),
          email: get(data, 'data.email', ''),
          avatar: get(data, 'data.avatar', ''),
          email_verified_at: get(data, 'data.email_verified_at')
        }
      })
    }
  }

  return { isLogin, user, checkState, logout, fetchUser }
})
