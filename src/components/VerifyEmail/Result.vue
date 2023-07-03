<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query'
import { useRoute } from 'vue-router'
import axios from '@/utils/axios'
import type { AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()

const { code, email } = route.query

const formValues = {
  email,
  code
}

const authStore = useAuthStore()

const { mutate, isLoading, isError, error } = useMutation({
  mutationFn: () => axios.post('/api/auth/verify-email', formValues),
  onMutate: (variables) => {
    console.log('onMutate', variables)
  },
  onError: (error: AxiosError, variables, context) => {
    // 錯誤
    console.log('onError', error, variables, context)
  },
  onSuccess: (data, variables, context) => {
    // 回傳
    console.log('onSuccess', data, variables, context)

    // 更新資料
    authStore.fetchUser()
  },
  onSettled: (data, error, variables, context) => {
    // 結束
    console.log('onSettled', data, error, variables, context)
  }
})

if (email && code) {
  mutate()
}
</script>

<template>
  <div>
    <template v-if="isLoading">loading...</template>
    <template v-else-if="isError || !email || !code">
      <div class="alert alert-error shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 flex-shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>無法驗證<br />{{ error?.message }}</span>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="alert alert-success shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 flex-shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>驗證成功</span>
        </div>
      </div>
    </template>
  </div>
</template>
