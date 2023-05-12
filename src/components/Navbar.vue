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
  <div class="sticky top-0 h-16 bg-white border-b navbar border-gray">
    <!-- left:menu -->
    <div class="flex-none space-x-2">
      <button
        type="button"
        class="md:hidden btn btn-circle btn-ghost"
        @click="emit('update:show-offcanvas', !showOffcanvas)"
      >
        <MenuIcon />
      </button>
      <button
        type="button"
        class="hidden md:flex btn btn-circle btn-ghost"
        @click="emit('update:show-sidebar', !showSidebar)"
      >
        <MenuIcon />
      </button>

      <h3 class="text-xl">Logo</h3>
    </div>

    <!-- logo -->
    <div class="flex-1">
      <!-- search -->
    </div>

    <!-- right:tools -->
    <div class="flex-none space-x-2">
      <button class="btn btn-circle btn-ghost">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
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
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-circle btn-ghost avatar">
          <div class="rounded-full">
            <img src="cat01.jpg" />
          </div>
        </label>
        <ul
          tabindex="0"
          class="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>

      <button class="btn btn-circle btn-ghost">
        <MenuKebabIcon />
      </button>
    </div>
  </div>
</template>
