<script setup lang="ts">
import { type Post } from '@/views/post/index.vue'
import Favorite from '@/components/Post/Favorite.vue'

defineProps<{
  post: Post
}>()
</script>

<template>
  <div class="shadow-xl card card-compact bg-base-100">
    <div class="relative">
      <RouterLink :to="`/post/${post.id}`">
        <figure>
          <img :src="post.cover" :alt="post.title" class="object-cover w-full h-48" />
        </figure>
      </RouterLink>
      <Favorite class="absolute bottom-1 right-1" :post="post" />
    </div>
    <div class="card-body">
      <h2 class="truncate card-title">{{ `${post.id} - ${post.title}` }}</h2>
      <p class="h-20 line-clamp-4">{{ post.content }}</p>
    </div>
  </div>
</template>
