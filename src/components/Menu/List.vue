<script setup lang="ts">
import { reactive } from 'vue'

const menu = reactive([
  { name: 'Index', href: '/' },
  { name: 'Login', href: '/login' },
  { name: 'Register', href: '/register' },
  { name: 'Verify Email', href: '/verify-email' },
  { name: 'Forgot Password', href: '/forgot-password' },
  { name: 'Reset Password', href: '/reset-password' },
  { name: 'Profile', href: '/profile' },
  { name: 'Todo', href: '/todo' },
  { name: 'Post', href: '/post' },
  { name: 'Post#3', href: '/post/3' },
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
