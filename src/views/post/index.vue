<script setup lang="ts">
// @ts-ignore
import { register } from 'swiper/element/bundle'

register()

const onProgress = (e: any) => {
  const [progress] = e.detail

  console.log(progress)
}

const onSlideChange = (e: any) => {
  console.log('slide changed', e)
}
</script>

<template>
  <h1 class="text-3xl">Post</h1>
  <swiper-container
    :slides-per-view="1"
    :space-between="10"
    :centered-slides="true"
    :pagination="{
      hideOnClick: true
    }"
    :breakpoints="{
      768: {
        slidesPerView: 3
      }
    }"
    :loop="true"
    @progress="onProgress"
    @slidechange="onSlideChange"
  >
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    <swiper-slide>Slide 6</swiper-slide>
    <swiper-slide>Slide 7</swiper-slide>
  </swiper-container>
</template>

<style scoped>
swiper-slide {
  border: 1px solid red;
  height: 200px;
}
</style>
