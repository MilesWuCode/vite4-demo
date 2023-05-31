/// <reference types="vite/client" />

/// <reference types="vite-plugin-pages/client" />

/// <reference types="vite-plugin-vue-layouts/client.d.ts" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_API_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
