<script setup lang="ts">
import { type Post } from '@/views/post/index.vue'

defineProps<{
  post: Post
}>()
</script>

<template>
  <div class="shadow-xl card card-compact bg-base-100">
    <figure>
      <img :src="post.cover" :alt="post.title" class="object-cover w-full h-48" />
    </figure>
    <div class="card-body">
      <h2 class="truncate card-title">{{ `${post.id} - ${post.title}` }}</h2>
      <p class="h-20 line-clamp-4">{{ post.content }}</p>
    </div>
  </div>
</template>
