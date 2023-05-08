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
    <div class="flex-none space-x-2">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
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
      <button class="btn btn-ghost btn-circle">
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
      <button class="btn btn-ghost btn-circle">
        <div class="indicator">
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
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span class="badge badge-xs badge-primary indicator-item"></span>
        </div>
      </button>
      <button class="btn btn-square btn-ghost">
        <MenuKebabIcon />
      </button>
    </div>
  </div>
</template>
