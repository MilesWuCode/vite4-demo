<script setup lang="ts">
import MenuIcon from '@/components/icons/MenuIcon.vue'
import MenuKebabIcon from '@/components/icons/MenuKebabIcon.vue'

defineProps<{
  showMenuSm: boolean
  showMenuMd: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show-menu-sm', val: boolean): void
  (e: 'update:show-menu-md', val: boolean): void
}>()
</script>

<template>
  <div class="sticky top-0 bg-white border-b opacity-1 navbar border-gray">
    <div class="flex-none">
      <button
        type="button"
        class="md:hidden btn btn-square btn-ghost"
        @click="emit('update:show-menu-sm', !showMenuSm)"
      >
        <MenuIcon />
      </button>
      <button
        type="button"
        class="hidden md:flex btn btn-square btn-ghost"
        @click="emit('update:show-menu-md', !showMenuMd)"
      >
        <MenuIcon />
      </button>
    </div>
    <div class="flex-1">
      <h3 class="text-xl">Logo</h3>
    </div>
    <div class="flex-none">
      <button class="btn btn-square btn-ghost">
        <MenuKebabIcon />
      </button>
    </div>
  </div>
</template>
