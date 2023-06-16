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
     * 若和先前isLogin相同
     * 沒變動離開
     */
    if (state === isLogin.value) {
      return
    }

    /**
     * 登入中
     * 更新用戶資料
     *
     * 未登入
     * 清空用戶資料
     */
    if (state) {
      await fetchUser()
    } else {
      Cookies.remove('token')

      user.value = null

      isLogin.value = false
    }
  }

  /**
   * 執行登出
   */
  async function logout() {
    // @ts-ignore
    window.Echo.leaveAllChannels()

    await axios.post('/api/auth/logout').finally(() => {
      Cookies.remove('token')

      user.value = null

      isLogin.value = false
    })
  }

  /**
   * 取得用戶資料
   */
  async function fetchUser() {
    const state = !!Cookies.get('token')

    if (state) {
      await axios
        .get('/api/me')
        .then(({ data }) => {
          // 成功取得資料才算登入
          user.value = {
            id: get(data, 'data.id', ''),
            name: get(data, 'data.name', ''),
            email: get(data, 'data.email', ''),
            avatar: get(data, 'data.avatar', ''),
            email_verified_at: get(data, 'data.email_verified_at')
          }

          isLogin.value = true
        })
        .catch(() => {
          // 發生錯誤時登出
          Cookies.remove('token')

          user.value = null

          isLogin.value = false
        })
    }
  }

  return { isLogin, user, checkState, logout, fetchUser }
})
