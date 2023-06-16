import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import axios from 'axios'
import Cookies from 'js-cookie'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import './assets/main.css'
import './assets/nprogress.css'

// @ts-ignore
window.Pusher = Pusher

// @ts-ignore
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  wsHost: import.meta.env.VITE_PUSHER_HOST,
  wsPort: import.meta.env.VITE_PUSHER_PORT,
  wssPort: import.meta.env.VITE_PUSHER_PORT,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: false,
  encrypted: true,
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
  // 身份驗證位置
  // authEndpoint: import.meta.env.VITE_API_URL + '/broadcasting/auth',
  // Authorization動態不可用
  // auth: {
  //   headers: {
  //     Authorization: 'Bearer ' + Cookies.get('token')
  //   }
  // }
  // 重寫可用
  authorizer: (channel, options) => {
    return {
      authorize: (socketId, callback) => {
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/broadcasting/auth`,
            {
              socket_id: socketId,
              channel_name: channel.name
            },
            {
              headers: {
                Authorization: 'Bearer ' + Cookies.get('token')
              }
            }
          )
          .then((response) => {
            callback(null, response.data)
          })
          .catch((error) => {
            callback(error)
          })
      }
    }
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createHead())
app.use(VueQueryPlugin)

// 可以使用provide/inject做全域
// app.provide('Pusher', Pusher)
// app.provide('Echo', echo)

app.mount('#app')
