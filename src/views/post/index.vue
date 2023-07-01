<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import axios from '@/utils/axios'
import localforage from 'localforage'
import PostListSwiper from '@/components/Post/ListSwiper.vue'
import PostCard from '@/components/Post/Card.vue'

export type Post = {
  id: string
  title: string
  content: string
  cover: string
  reaction: Reaction
  user: {
    id: string
    name: string
    avatar: string
  }
}

export type Posts = {
  cached_at: Date
  data: Post[]
  meta: {
    currentPage: number
    perPage: number
    lastPage: number
  }
}

type Reaction = {
  like_count: number
  dislike_count: number
  like_state: 'like' | 'dislike' | ''
  favorite_state: boolean
}

export type FavoriteCatch = {
  state: boolean
  time: Date
}

const fetchPosts = () => {
  return axios
    .get('/api/post', { params: { page: 1, limit: 6 } })
    .then(({ data }: { data: Posts }) => {
      // api建立時間或快取時間
      const catchTime = data.cached_at

      // favorite
      Object.values(data.data).forEach((item) => {
        // 取出indexedDB
        localforage.getItem(`post.${item.id}.favorite`).then((val) => {
          const favorite = val as FavoriteCatch

          // 沒有資料或時間小於快取時間
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
  queryFn: fetchPosts
})
</script>

<template>
  <!-- title -->
  <h1 class="text-3xl">Post</h1>

  <!-- breadcrumbs -->
  <div class="breadcrumbs text-sm">
    <ul>
      <li>Long text 1</li>
      <li>Long text 2</li>
      <li>Long text 3</li>
      <li>Long text 4</li>
      <li>Long text 5</li>
    </ul>
  </div>

  <h2 class="text-2xl">New Post</h2>
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
    <PostListSwiper v-else-if="data" :posts="data" />
  </div>

  <h2 class="text-2xl">My Post</h2>
  <div>
    <div v-if="data" class="flex flex-wrap justify-center gap-4 md:justify-start md:px-4">
      <PostCard v-for="post in data.data" :key="post.id" :post="post" class="w-[24rem] max-w-sm" />
    </div>

    <!-- Pagination -->
    <div class="my-4 flex justify-center">
      <div class="join">
        <button class="join-item btn">1</button>
        <button class="btn-active join-item btn">2</button>
        <button class="join-item btn">3</button>
        <button class="join-item btn">4</button>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.box {
  @apply h-32 w-full bg-green-300;
}
</style>
