```sh
yarn add tailwindcss postcss autoprefixer

npx tailwindcss init -p
```

tailwind.config.js

```diff
module.exports = {
+  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: []
}
```
