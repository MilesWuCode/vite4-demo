<script setup lang="ts">
import { type Posts } from '@/views/post/index.vue'
import PostCard from '@/components/Post/Card.vue'

// @ts-ignore
import { register } from 'swiper/element/bundle'
register()

defineProps<{
  posts: Posts
}>()

const onProgress = (e: any) => {
  const [progress] = e.detail

  console.log(progress)
}

const onSlideChange = (e: any) => {
  console.log('slide changed', e)
}
</script>

<template>
  <swiper-container
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
    <swiper-slide v-for="post in posts.data" :key="post.id" class="max-w-sm">
      <RouterLink :to="`/post/${post.id}`">
        <PostCard :post="post" />
      </RouterLink>
    </swiper-slide>
  </swiper-container>
</template>
