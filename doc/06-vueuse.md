06-vueuse

```sh
# core
yarn add @vueuse/core

# head
yarn add @unhead/vue
```

main.ts

```ts
import { createHead } from '@unhead/vue'
```

components

```ts
import { useHead } from '@unhead/vue'

useHead({
  title: 'My awesome site'
})
```
