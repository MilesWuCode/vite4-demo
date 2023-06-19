<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import axios from '@/utils/axios'
import PostListSwiper from '@/components/Post/ListSwiper.vue'

export type Post = {
  id: string
  title: string
  content: string
  cover: string
  reaction: {
    like_count: number
    dislike_count: number
    like_state: 'like' | 'dislike'
    favorite_state: boolean
  }
  user: {
    id: string
    name: string
    avatar: string
  }
}

export type Posts = {
  data: Post[]
  meta: {
    currentPage: number
    perPage: number
    lastPage: number
  }
}

const fetchPosts = () => {
  return axios.get('/api/post', { params: { page: 1, limit: 20 } }).then(({ data }) => {
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
  <div class="text-sm breadcrumbs">
    <ul>
      <li>Long text 1</li>
      <li>Long text 2</li>
      <li>Long text 3</li>
      <li>Long text 4</li>
      <li>Long text 5</li>
    </ul>
  </div>

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
</template>
