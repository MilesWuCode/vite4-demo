// 使用layouts,pages套件

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import NProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 模糊
  linkActiveClass: 'active',
  // 準確
  linkExactActiveClass: 'active',
  routes: setupLayouts(generatedRoutes)
})

router.beforeEach(async (to, from) => {
  // 進度條開始
  NProgress.configure({ showSpinner: false }).start()

  // store
  const authStore = useAuthStore()

  // 進入頁面檢查和取得用戶資料
  await authStore.checkState()

  // 是否登入
  const isLogin = authStore.isLogin

  // 訪客進入登入頁
  // 不可有to返回網址,不然會有無線迴圈
  // 加上一頁返回頁網址
  // 檢查有form返回網址優先使用
  if (to.path === '/login' && !isLogin && !to.query.redirect) {
    if (from.path !== '/login' && from.meta.auth === 'guest') {
      return {
        path: '/login',
        query: { redirect: '/' }
      }
    } else {
      return {
        path: '/login',
        query: { redirect: from.query.redirect || from.fullPath }
      }
    }
  }

  // 訪客專用
  // 若有登入,返回原頁
  if (to.meta.auth === 'guest' && isLogin) {
    return from
  }

  // 會員專用
  // 若未登入,先去登入頁,加返回原頁網址
  if (to.meta.auth === 'member' && !isLogin) {
    return {
      path: '/login',
      query: { redirect: to.fullPath }
    }
  }
})

router.afterEach(() => {
  // 進度條結束
  NProgress.done()
})

export default router
