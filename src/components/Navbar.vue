<script setup lang="ts">
import MenuIcon from '@/components/icons/MenuIcon.vue'
import MenuKebabIcon from '@/components/icons/MenuKebabIcon.vue'

defineProps<{
  showOffcanvas: boolean
  showSidebar: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show-offcanvas', val: boolean): void
  (e: 'update:show-sidebar', val: boolean): void
}>()
</script>

<template>
  <div class="sticky top-0 bg-white border-b opacity-1 navbar border-gray">
    <div class="flex-none">
      <button
        type="button"
        class="md:hidden btn btn-square btn-ghost"
        @click="emit('update:show-offcanvas', !showOffcanvas)"
      >
        <MenuIcon />
      </button>
      <button
        type="button"
        class="hidden md:flex btn btn-square btn-ghost"
        @click="emit('update:show-sidebar', !showSidebar)"
      >
        <MenuIcon />
      </button>
    </div>
    <div class="flex-1">
      <h3 class="text-xl">Logo</h3>
    </div>
    <div class="flex-none">
      <div class="avatar placeholder">
        <div class="w-10 rounded-full bg-black-focus text-black-content">
          <span class="text-xl">JO</span>
        </div>
      </div>
      <button class="btn btn-square btn-ghost">
        <MenuKebabIcon />
      </button>
    </div>
  </div>
</template>
