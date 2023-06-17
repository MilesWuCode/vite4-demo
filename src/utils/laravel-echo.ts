import axios from 'axios'
import Cookies from 'js-cookie'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

declare global {
  interface Window {
    Pusher: Pusher
    Echo: Echo
  }
}

const echoInit = () => {
  // @ts-ignore
  window.Pusher = Pusher

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

    // 寫死token
    // auth: {
    //   headers: {
    //     Authorization: 'Bearer ' + Cookies.get('token')
    //   }
    // },

    // 重寫可用
    // @ts-ignore
    authorizer: (channel, options) => {
      return {
        // @ts-ignore
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
}
export default echoInit
