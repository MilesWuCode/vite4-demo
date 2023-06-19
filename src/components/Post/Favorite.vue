<script setup lang="ts">
import { type Post } from '@/views/post/index.vue'
import OnIcon from '@/components/icons/FavoriteOnIcon.vue'
import OffIcon from '@/components/icons/FavoriteOffIcon.vue'
import { ref } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import axios from '@/utils/axios'
import type { AxiosError } from 'axios'
import notyf from '@/utils/notyf'

const props = defineProps<{
  post: Post
}>()

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
  }
})
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
