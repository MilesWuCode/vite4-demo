<script setup lang="ts">
import { ref } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import axios from '@/utils/axios'
import localforage from 'localforage'
import notyf from '@/utils/notyf'
import OffIcon from '@/components/icons/FavoriteOffIcon.vue'
import OnIcon from '@/components/icons/FavoriteOnIcon.vue'
import type { AxiosError } from 'axios'
import type { FavoriteCatch } from '@/types/post'

const props = defineProps<{
  id: string | number
  state: boolean
}>()

// const queryClient = useQueryClient()

// 原資料
const isFavorite = ref(props.state)

// indexedDB資料
localforage.getItem(`post.${props.id}.favorite`).then((val) => {
  const favorite = val as FavoriteCatch

  favorite && (isFavorite.value = favorite.state)
})

// 更新
const { mutate, isLoading } = useMutation({
  mutationFn: () => {
    return axios.post(`/api/post/${props.id}/favorite`, {
      action: isFavorite.value ? 'add' : 'del'
    })
  },
  onError: (error: AxiosError, variables, context) => {
    console.log('onError', error, variables, context)

    notyf.error(error.message)
  },
  onSuccess: (data, variables, context) => {
    console.log('onSuccess', data, variables, context)

    localforage.setItem(`post.${props.id}.favorite`, {
      state: isFavorite.value,
      time: new Date()
    })

    notyf.success((isFavorite.value ? '加入' : '移除') + '最愛')

    // 使用websocket不用再做更新
    // updateQueryCache()
  }
})

/**
 * 更新cache
 * 若query keys太多就不要做
 * 不然會做不完
 *
 * 應該有更好的方法
 * - 同步組件
 * - 同步分頁
 * - 快取用戶狀態
 */

/**
 const updateQueryCache = () => {
  const posts = queryClient.getQueryData(['posts']) as Posts

  let isChange = false

  for (const item of posts.data) {
    if (item.id === props.post.id) {
      item.reaction.favorite_state = isFavorite.value

      isChange = true

      break
    }
  }

  if (isChange) {
    queryClient.setQueryData(['posts'], posts)
  }
}
*/
</script>

<template>
  <label class="swap">
    <span v-if="isLoading" class="loading loading-spinner loading-md text-red-500"></span>

    <template v-else>
      <!-- this hidden checkbox controls the state -->
      <input type="checkbox" v-model="isFavorite" @change="() => mutate()" data-test="checkbox" />

      <!-- on -->
      <OnIcon class="swap-on fill-current text-red-500" />

      <!-- off -->
      <OffIcon class="swap-off fill-current text-red-500" />
    </template>
  </label>
</template>
