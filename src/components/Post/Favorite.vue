<script setup lang="ts">
import { type Post, type Posts, type ReactionCatch } from '@/views/post/index.vue'
import OnIcon from '@/components/icons/FavoriteOnIcon.vue'
import OffIcon from '@/components/icons/FavoriteOffIcon.vue'
import { ref } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import axios from '@/utils/axios'
import type { AxiosError } from 'axios'
import notyf from '@/utils/notyf'
import localforage from 'localforage'

const props = defineProps<{
  post: Post
}>()

const queryClient = useQueryClient()

localforage.getItem(`post.${props.post.id}`).then((val) => {
  const reaction = val as ReactionCatch

  isFavorite.value = reaction.favorite_state
})

const isFavorite = ref(props.post.reaction.favorite_state)

const { mutate, isLoading } = useMutation({
  mutationFn: () => {
    return axios.post(`/api/post/${props.post.id}/reactToFavorite`, {
      action: isFavorite.value ? 'add' : 'del'
    })
  },
  onError: (error: AxiosError, variables, context) => {
    console.log('onError', error, variables, context)

    notyf.error(error.message)
  },
  onSuccess: (data, variables, context) => {
    console.log('onSuccess', data, variables, context)

    notyf.success((isFavorite.value ? '加入' : '移除') + '最愛')

    updateQueryCache()
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
</script>

<template>
  <label class="swap">
    <span v-if="isLoading" class="text-red-500 loading loading-spinner loading-md"></span>

    <template v-else>
      <!-- this hidden checkbox controls the state -->
      <input type="checkbox" v-model="isFavorite" @change="() => mutate()" />

      <!-- on -->
      <OnIcon class="text-red-500 fill-current swap-on" />

      <!-- off -->
      <OffIcon class="text-red-500 fill-current swap-off" />
    </template>
  </label>
</template>
