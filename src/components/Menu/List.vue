<script setup lang="ts">
import { reactive } from 'vue'

const menu = reactive([
  { name: 'Index', href: '/' },
  { name: 'Todo', href: '/todo' },
  { name: 'Not Found', href: '/not-found' }
])
</script>

<template>
  <ul class="menu">
    <li v-for="item in menu" :key="item.href">
      <RouterLink :to="item.href">{{ item.name }}</RouterLink>
    </li>
  </ul>
</template>
