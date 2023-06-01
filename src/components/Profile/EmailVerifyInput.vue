<script setup lang="ts">
import { AxiosError } from 'axios'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useMutation } from '@tanstack/vue-query'
import axios from '@/utils/axios'
import notyf from '@/utils/notyf'
import VerifyIcon from '@/components/icons/VerifyIcon.vue'

const authStore = useAuthStore()

const { user } = storeToRefs(authStore)

const { mutate, isLoading } = useMutation({
  mutationFn: () => axios.post('/api/auth/send-verify-email', { email: user.value?.email }),
  onError: (error: AxiosError, variables, context) => {
    // 錯誤
    console.log('onError', error, variables, context)
  },
  onSuccess: (data, variables, context) => {
    // 回傳
    console.log('onSuccess', data, variables, context)

    notyf.success('email have been sent')
  },
  onSettled: (data, error, variables, context) => {
    // 結束
    console.log('onSettled', data, error, variables, context)
  }
})
</script>

<template>
  <div class="w-full max-w-sm form-control">
    <label class="label">
      <span class="label-text">Verify Email</span>
      <span class="label-text-alt"></span>
    </label>
    <div class="input-group">
      <input type="text" class="w-full input input-bordered" readonly :value="user?.email" />
      <button
        v-if="!user?.email_verified_at"
        type="button"
        class="btn"
        @click="() => mutate()"
        :disabled="isLoading"
      >
        to verify
      </button>
      <span v-else>
        <VerifyIcon class="text-green-600" />
      </span>
    </div>
    <label class="label">
      <span class="label-text-alt"></span>
      <span class="text-red-500 label-text-alt"></span>
    </label>
  </div>
</template>
