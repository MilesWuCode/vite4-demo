<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()

const { user } = storeToRefs(authStore)
</script>

<template>
  <div class="w-full max-w-xs form-control">
    <label class="label">
      <span class="label-text">Verify Email</span>
      <span class="label-text-alt"></span>
    </label>
    <div class="input-group">
      <input
        type="text"
        class="w-full max-w-xs input input-bordered"
        readonly
        :value="user?.email"
      />
      <button type="button" class="btn">to verify</button>
    </div>
    <label class="label">
      <span class="label-text-alt"></span>
      <span class="text-red-500 label-text-alt"></span>
    </label>
  </div>
</template>
