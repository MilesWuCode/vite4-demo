<script setup lang="ts">
// @ts-ignore
import { register } from 'swiper/element/bundle'

import { useQuery } from '@tanstack/vue-query'
import axios from '@/utils/axios'
import { get } from 'lodash-es'

register()

type Post = {
  id: string
  title: string
  content: string
  cover: string
}

type Posts = {
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

const onProgress = (e: any) => {
  const [progress] = e.detail

  console.log(progress)
}

const onSlideChange = (e: any) => {
  console.log('slide changed', e)
}
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
  <div v-if="isError" class="flex items-center justify-center">
    {{ error?.message }}
  </div>

  <!-- swiper -->
  <swiper-container
    v-if="!isLoading && data"
    slides-per-view="auto"
    :space-between="14"
    :centered-slides="true"
    :pagination="{
      hideOnClick: true
    }"
    :loop="true"
    @progress="onProgress"
    @slidechange="onSlideChange"
    class="h-96"
  >
    <swiper-slide v-for="post in data?.data" :key="post.id" class="max-w-sm">
      <RouterLink :to="`/post/${post.id}`">
        <div class="shadow-xl card card-compact bg-base-100">
          <figure>
            <img :src="post.cover" :alt="post.title" class="object-cover w-full h-48" />
          </figure>
          <div class="card-body">
            <h2 class="truncate card-title">{{ `${post.id} - ${post.title}` }}</h2>
            <p class="h-20 line-clamp-4">{{ post.content }}</p>
          </div>
        </div>
      </RouterLink>
    </swiper-slide>
  </swiper-container>
</template>
