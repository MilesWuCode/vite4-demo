<script setup lang="ts">
import List from '@/components/Menu/List.vue'

defineProps<{
  show: boolean
}>()
</script>

<template>
  <div
    v-if="show"
    class="fixed bottom-0 hidden overflow-y-hidden border-r top-16 w-60 lg:block border-gray hover:overflow-y-scroll"
  >
    <List />
  </div>
</template>
