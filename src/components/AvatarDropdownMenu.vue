<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import notyf from '@/utils/notyf'

const authStore = useAuthStore()

const route = useRoute()

const router = useRouter()

// 不使用computed
// const isLogin = computed(() => authStore.isLogin)
// const user = computed(() => authStore.user)
// 改用storeToRefs
const { isLogin, user } = storeToRefs(authStore)

// 登出
async function logout() {
  // store登出
  await authStore.logout().then(() => {
    notyf.success('用戶登出')
  })

  // 登出後判別是否在會員專用
  route.meta.auth == 'member' && router.go(0)
}
</script>

<template>
  <div v-if="isLogin" class="dropdown dropdown-end">
    <label tabindex="0" class="btn btn-circle btn-ghost avatar">
      <div class="rounded-full">
        <img :src="user?.avatar" />
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
