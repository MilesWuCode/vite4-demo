<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'Index - ' + import.meta.env.VITE_APP_NAME
})
</script>

<template>
  <h1 class="text-3xl">Index</h1>
</template>
