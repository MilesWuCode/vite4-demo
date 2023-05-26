<script setup lang="ts">
import TodoRoot from '@/components/Todo/Root.vue'
</script>

<template>
  <h1 class="text-3xl">Todo</h1>
  <TodoRoot class="max-w-sm mx-auto" />
</template>

<route lang="yaml">
meta:
  layout: default
  auth: member
</route>
