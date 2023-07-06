<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import axios from '@/utils/axios'
import localforage from 'localforage'
import MyPosts from '@/components/Post/MyPosts.vue'
import PostListSwiper from '@/components/Post/ListSwiper.vue'

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
    current_page: number
    per_page: number
    last_page: number
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

  <h2 class="text-2xl">My Posts</h2>

  <MyPosts class="md:m-2" />
</template>
