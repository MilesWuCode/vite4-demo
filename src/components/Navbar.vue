<script setup lang="ts">
import MenuIcon from '@/components/icons/MenuIcon.vue'
import MenuKebabIcon from '@/components/icons/MenuKebabIcon.vue'
import AvatarDropdownMenuVue from '@/components/AvatarDropdownMenu.vue'
import { ref } from 'vue'

defineProps<{
  showOffcanvas: boolean
  showSidebar: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show-offcanvas', val: boolean): void
  (e: 'update:show-sidebar', val: boolean): void
}>()

const logo = ref(import.meta.env.VITE_APP_NAME)
</script>

<template>
  <div class="border-gray navbar sticky top-0 z-50 h-16 border-b bg-base-100">
    <!-- left:menu -->
    <div class="flex-none space-x-2">
      <button
        type="button"
        class="btn-ghost btn-circle btn lg:hidden"
        @click="emit('update:show-offcanvas', !showOffcanvas)"
      >
        <MenuIcon />
      </button>
      <button
        type="button"
        class="btn-ghost btn-circle btn hidden lg:flex"
        @click="emit('update:show-sidebar', !showSidebar)"
      >
        <MenuIcon />
      </button>

      <h3 class="text-xl">{{ logo }}</h3>
    </div>

    <!-- logo -->
    <div class="flex-1">
      <!-- search -->
    </div>

    <!-- right:tools -->
    <div class="flex-none space-x-2">
      <button class="btn-ghost btn-circle btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      <!-- avatar,menu -->
      <AvatarDropdownMenuVue />

      <button class="btn-ghost btn-circle btn">
        <MenuKebabIcon />
      </button>
    </div>
  </div>
</template>
