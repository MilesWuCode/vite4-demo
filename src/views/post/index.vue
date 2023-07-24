<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import MyPost from '@/components/Post/MyPost.vue'
import NewPost from '@/components/Post/NewPost.vue'

const { isLogin } = useAuthStore()
</script>

<template>
  <!-- title -->
  <h1 class="text-3xl">Post</h1>

  <!-- breadcrumbs -->
  <div class="breadcrumbs text-sm">
    <ul>
      <li>Link-1</li>
      <li>Link-2</li>
      <li>Link-3</li>
      <li>Link-4</li>
      <li>Link-5</li>
    </ul>
  </div>

  <h2 class="text-2xl">New Post</h2>
  <NewPost />

  <h2 v-if="isLogin" class="text-2xl">My Posts</h2>
  <MyPost v-if="isLogin" class="md:m-2" />
</template>
