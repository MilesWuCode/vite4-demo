<script setup lang="ts">
import { type Posts } from '@/views/post/index.vue'
import PostCard from '@/components/Post/Card.vue'

// @ts-ignore
import { register } from 'swiper/element/bundle'
import { ref } from 'vue'

register()

defineProps<{
  posts: Posts
}>()

const onProgress = (e: any) => {
  // const [progress] = e.detail
  // console.log(progress)
}

const onSlideChange = (e: any) => {
  // console.log('slide changed', e)
}

const swiperEl = ref(null)

const prev = () => {
  swiperEl.value && swiperEl.value.swiper.slidePrev()
}

const next = () => {
  swiperEl.value && swiperEl.value.swiper.slideNext()
}
</script>

<template>
  <div class="relative">
    <button
      type="button"
      class="btn-circle btn absolute left-4 top-[40%] z-10 hidden md:block"
      @click="prev"
    >
      ❮
    </button>
    <button
      type="button"
      class="btn-circle btn absolute right-4 top-[40%] z-10 hidden md:block"
      @click="next"
    >
      ❯
    </button>
    <swiper-container
      ref="swiperEl"
      slides-per-view="auto"
      :autoplay-delay="3000"
      :centered-slides="false"
      :free-mode="true"
      :keyboard="true"
      :rewind="true"
      :mousewheel="false"
      :navigation="false"
      :pagination-clickable="true"
      :pagination="true"
      :space-between="16"
      @progress="onProgress"
      @slidechange="onSlideChange"
      class="h-96"
    >
      <swiper-slide v-for="post in posts.data" :key="post.id" class="max-w-sm">
        <PostCard :post="post" />
      </swiper-slide>
    </swiper-container>
  </div>
</template>
