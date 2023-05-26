<script setup lang="ts">
import RegisterForm from '@/components/Register/Form.vue'
</script>

<template>
  <h1 class="text-3xl">Register</h1>
  <RegisterForm class="max-w-sm mx-auto" />
</template>

<route lang="yaml">
meta:
  layout: default
  auth: guest
</route>
