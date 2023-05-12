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
    <li v-for="(item, index) in menu" :key="index">
      <RouterLink :to="item.href">{{ item.name }}</RouterLink>
    </li>
  </ul>
</template>
