/// <reference types="vite/client" />

/// <reference types="vite-plugin-pages/client" />

/// <reference types="vite-plugin-vue-layouts/client.d.ts" />

interface ImportMetaEnv {
  // base
  readonly VITE_APP_NAME: string
  readonly VITE_API_URL: string
  // pusher
  readonly VITE_PUSHER_APP_KEY: string
  readonly VITE_PUSHER_HOST: number
  readonly VITE_PUSHER_PORT: string
  readonly VITE_PUSHER_APP_CLUSTER: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
