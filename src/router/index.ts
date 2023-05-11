import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import IndexView from '../views/IndexView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        { path: '', component: IndexView },
        { path: 'todo', component: () => import('../views/TodoView.vue') }
      ]
    },
    {
      path: '/',
      component: () => import('../layouts/OtherLayout.vue'),
      children: [{ path: 'about', component: () => import('../views/AboutView.vue') }]
    },
    { path: '/:pathMatch(.*)*', component: NotFoundView }
  ]
})

export default router
