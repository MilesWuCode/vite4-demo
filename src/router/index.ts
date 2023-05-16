import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import IndexView from '../views/IndexView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import Cookies from 'js-cookie'

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
          meta: { auth: 'all' }
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
  const isLogin = !!Cookies.get('token')

  // 頁面是訪客專用
  if (to.meta.auth === 'guest' && isLogin) {
    return from
  }

  // 頁面是會員專用
  if (to.meta.auth === 'member' && !isLogin) {
    return {
      path: '/login',
      query: { redirect: to.fullPath }
    }
  }
})

export default router
