<script setup lang="ts">
import List from '@/components/Menu/List.vue'

defineProps<{
  showMenu: boolean
}>()
</script>

<template>
  <div
    v-if="showMenu"
    class="fixed bottom-0 hidden overflow-y-hidden border-r top-16 w-80 lg:block border-gray hover:overflow-y-scroll"
  >
    <List />
  </div>
</template>
