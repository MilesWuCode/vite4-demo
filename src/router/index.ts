import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import Index from '../views/index.vue'
import NotFound from '../views/[...all].vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 模糊
  linkActiveClass: 'active',
  // 準確
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          component: Index,
          meta: { auth: 'public' }
        },
        {
          path: 'login',
          component: () => import('../views/login.vue'),
          meta: { auth: 'guest' }
        },
        {
          path: 'register',
          component: () => import('../views/register.vue'),
          meta: { auth: 'guest' }
        },
        {
          path: 'profile',
          component: () => import('../views/profile.vue'),
          meta: { auth: 'member' }
        },
        {
          path: 'todo',
          component: () => import('../views/todo.vue'),
          meta: { auth: 'member' }
        }
      ]
    },
    {
      path: '/post',
      component: () => import('../layouts/DefaultLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/post/index.vue'),
          meta: { auth: 'member' }
        },
        {
          path: ':id',
          component: () => import('../views/post/[id].vue'),
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
          component: () => import('../views/about.vue'),
          meta: { auth: 'all' }
        }
      ]
    },
    {
      path: '/',
      component: () => import('../layouts/DefaultLayout.vue'),
      children: [
        {
          path: '/:pathMatch(.*)*',
          component: NotFound,
          meta: { auth: 'all' }
        }
      ]
    }
    // { path: '/:pathMatch(.*)*', component: NotFound }
  ]
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  // 進入頁面檢查
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

export default router
