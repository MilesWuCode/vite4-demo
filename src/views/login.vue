<script setup lang="ts">
import LoginForm from '@/components/Login/Form.vue'
</script>

<template>
  <h1 class="text-3xl">Login</h1>
  <LoginForm class="max-w-sm mx-auto" />
</template>

<route lang="yaml">
meta:
  layout: default
  auth: guest
</route>
