<script setup lang="ts">
import { useLogout } from '@/composables/useLogout'
import { useAuth } from '@/stores/auth'

const auth = useAuth()

const logout = useLogout()
</script>

<template>
  <div v-if="auth.isLogin" class="dropdown dropdown-end">
    <label tabindex="0" class="btn btn-circle btn-ghost avatar">
      <div class="rounded-full">
        <img src="/cat01.jpg" />
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
      <li>
        <button type="button" @click="logout">Logout</button>
      </li>
    </ul>
  </div>
</template>
