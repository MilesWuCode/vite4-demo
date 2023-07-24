<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import axios from '@/utils/axios'
import localforage from 'localforage'
import PostSwiper from '@/components/Post/Swiper.vue'
import type { Posts, FavoriteCatch } from '@/types/post'

const fetchData = () => {
  return axios
    .get('/api/post', { params: { page: 1, limit: 6 } })
    .then(({ data }: { data: Posts }) => {
      // api建立時間或快取時間
      const catchTime = new Date(data.cached_at)

      // favorite
      Object.values(data.data).forEach((item) => {
        // 取出indexedDB
        localforage.getItem(`post.${item.id}.favorite`).then((val) => {
          const favorite = val as FavoriteCatch

          // 沒有資料或資料時間小於快取時間
          if (favorite === null || favorite?.time < catchTime) {
            // 存入indexedDB
            localforage.setItem(`post.${item.id}.favorite`, {
              state: item.reaction.favorite_state,
              time: new Date()
            })
          }
        })
      })

      return data
    })
}

const { isLoading, isError, data, error } = useQuery<Posts, Error>({
  queryKey: ['posts'],
  queryFn: fetchData
})
</script>

<template>
  <div>
    <!-- loading -->
    <div v-if="isLoading" class="flex items-center justify-center">
      <span class="loading loading-spinner loading-md"></span>
    </div>

    <!-- error -->
    <div v-else-if="isError" class="flex items-center justify-center">
      {{ error?.message }}
    </div>

    <!-- swiper -->
    <PostSwiper v-else-if="data" :posts="data" />
  </div>
</template>
