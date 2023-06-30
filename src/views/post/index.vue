<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import axios from '@/utils/axios'
import PostListSwiper from '@/components/Post/ListSwiper.vue'
import localforage from 'localforage'

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

export type Reaction = {
  like_count: number
  dislike_count: number
  like_state: 'like' | 'dislike' | ''
  favorite_state: boolean
}

export type ReactionCatch = Reaction & {
  time: Date
}

const fetchPosts = () => {
  return axios
    .get('/api/post', { params: { page: 1, limit: 20 } })
    .then(({ data }: { data: Posts }) => {
      const catchTime = data.cached_at

      Object.values(data.data).forEach((item) => {
        localforage.getItem(`post.${item.id}`).then((val) => {
          const reaction = val as ReactionCatch

          if (reaction.time < catchTime) {
            localforage.setItem(`post.${item.id}`, { ...item.reaction, time: new Date() })
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
