import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import echoInit from '@/utils/laravel-echo'

import './assets/main.css'
import './assets/nprogress.css'

// 初始化echo
echoInit()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createHead())
app.use(VueQueryPlugin)

app.mount('#app')
