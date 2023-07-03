<script setup lang="ts">
import List from '@/components/Menu/List.vue'

defineProps<{
  show: boolean
}>()
</script>

<template>
  <div
    v-if="show"
    class="border-gray fixed bottom-0 top-16 hidden w-60 overflow-y-hidden border-r hover:overflow-y-scroll lg:block"
  >
    <List />
  </div>
</template>
