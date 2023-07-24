<script setup lang="ts">
import type { Posts } from '@/types/post'
import PostCard from '@/components/Post/Card.vue'

// @ts-ignore
import { register } from 'swiper/element/bundle'
import { ref } from 'vue'
import type { SwiperContainer } from 'swiper/element'
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon.vue'
import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue'

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

const swiperEl = ref<SwiperContainer>()

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
      class="btn btn-circle absolute left-4 top-[40%] z-10 hidden md:block"
      @click="prev"
    >
      <ArrowLeftIcon class="h-12 w-12" />
    </button>
    <button
      type="button"
      class="btn btn-circle absolute right-4 top-[40%] z-10 hidden md:block"
      @click="next"
    >
      <ArrowRightIcon class="h-12 w-12" />
    </button>
    <swiper-container
      ref="swiperEl"
      slides-per-view="auto"
      :autoplay-delay="3000"
      :centered-slides="true"
      :free-mode="true"
      :keyboard="true"
      :rewind="true"
      :mousewheel="false"
      :navigation="false"
      :pagination-clickable="true"
      :pagination="true"
      :space-between="8"
      @progress="onProgress"
      @slidechange="onSlideChange"
      :breakpoints="{
        500: {
          centeredSlides: false
        }
      }"
      class="h-[430px]"
    >
      <swiper-slide v-for="post in posts.data" :key="post.id" class="max-w-sm">
        <PostCard :post="post" />
      </swiper-slide>
    </swiper-container>
  </div>
</template>
