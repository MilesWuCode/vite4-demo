import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import IndexView from '../views/IndexView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          component: IndexView,
          meta: { auth: 'public' }
        },
        {
          path: 'login',
          component: () => import('../views/LoginView.vue'),
          meta: { auth: 'guest' }
        },
        {
          path: 'register',
          component: () => import('../views/RegisterView.vue'),
          meta: { auth: 'guest' }
        },
        {
          path: 'todo',
          component: () => import('../views/TodoView.vue'),
          meta: { auth: 'member' }
        },
        {
          path: 'post',
          component: () => import('../views/PostView.vue'),
          meta: { auth: 'member' }
        }
      ]
    },
    {
      path: '/',
      component: () => import('../layouts/OtherLayout.vue'),
      children: [
        {
          path: 'about',
          component: () => import('../views/AboutView.vue'),
          meta: { auth: 'all' }
        }
      ]
    },
    { path: '/:pathMatch(.*)*', component: NotFoundView }
  ]
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  // 進入頁面檢查
  authStore.checkState()

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

export default router
