<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import axios from '@/utils/axios'
import localforage from 'localforage'
import PostCard from '@/components/Post/Card.vue'
import PostCreateDialog from '@/components/Post/CreateDialog.vue'
import type { Posts, FavoriteCatch } from '@/views/post/index.vue'

const fetchData = () => {
  return axios
    .get('/api/post', { params: { page: 1, limit: 4 } })
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
  queryKey: ['my-posts'],
  queryFn: fetchData
})
</script>

<template>
  <div class="space-y-2">
    <!-- create -->
    <PostCreateDialog />

    <!-- loading -->
    <div v-if="isLoading" class="flex items-center justify-center">
      <span class="loading loading-spinner loading-md"></span>
    </div>

    <!-- error -->
    <div v-else-if="isError" class="flex items-center justify-center">
      {{ error?.message }}
    </div>

    <!-- list -->
    <div v-if="data" class="flex flex-wrap justify-center gap-2 md:justify-start">
      <PostCard v-for="post in data.data" :key="post.id" :post="post" class="w-[24rem] max-w-sm" />
    </div>

    <!-- Pagination -->
    <div class="flex justify-center">
      <div class="join">
        <button class="join-item btn">1</button>
        <button class="btn-active join-item btn">2</button>
        <button class="join-item btn">3</button>
        <button class="join-item btn">4</button>
      </div>
    </div>
  </div>
</template>
