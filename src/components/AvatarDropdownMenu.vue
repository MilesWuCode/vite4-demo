<script setup lang="ts">
import { onMounted, watch, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useRoute, useRouter } from 'vue-router'
import localforage from 'localforage'
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

onMounted(() => {
  echoListen(isLogin.value)
})

watch(isLogin, (newValue) => {
  echoListen(newValue)
})

onBeforeUnmount(() => {
  echoListen(false)
})

function echoListen(run: boolean) {
  if (run) {
    window.Echo.private(`App.Models.User.${user.value?.id}`)
      .listen('.PostUpdated', (e: any) => {
        console.log(e.model)
      })
      .listen('.UserUpdated', (e: any) => {
        console.log(e.model)
      })
      .listen('.App\\Events\\LikeReactionEvent', (e: any) => {
        console.log(e.user)
      })
      .listen('.App\\Events\\FavoriteReactionEvent', (e: any) => {
        const { id, model, favorite_state: state } = e

        localforage.setItem(`${model}.${id}.favorite`, { state, time: new Date() })
      })
      .notification((notification: any) => {
        console.log(notification.type)
      })
  } else {
    window.Echo.leave(`App.Models.User.${user.value?.id}`)
  }
}
</script>

<template>
  <div v-if="isLogin" class="dropdown-end dropdown">
    <label tabindex="0" class="btn-ghost btn-circle avatar btn">
      <div class="rounded-full">
        <img :src="user?.avatar" />
      </div>
    </label>
    <ul
      tabindex="0"
      class="menu-compact dropdown-content menu rounded-box mt-3 w-52 bg-base-100 p-2 shadow"
    >
      <li>
        <a class="justify-between">
          Profile
          <span class="badge">New</span>
        </a>
      </li>
      <li><a>Settings</a></li>
      <li>
        <a href="javascript:;" @click="logout">Logout</a>
      </li>
    </ul>
  </div>
</template>
