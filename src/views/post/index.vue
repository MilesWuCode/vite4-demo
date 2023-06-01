<script setup lang="ts">
// @ts-ignore
import { register } from 'swiper/element/bundle'

register()

const spaceBetween = 10

const onProgress = (e: any) => {
  const [progress] = e.detail

  console.log(progress)
}

const onSlideChange = (e: any) => {
  console.log('slide changed', e)
}

const a = () => {
  alert(1)
}
</script>

<template>
  <h1 class="text-3xl">Post</h1>
  <swiper-container
    :slides-per-view="1"
    :space-between="spaceBetween"
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
    <swiper-slide>Slide 1 <button @click="a" class="btn">click</button></swiper-slide>
    <swiper-slide>Slide 2 <button @click="a" class="btn">click</button></swiper-slide>
    <swiper-slide>Slide 3 <button @click="a" class="btn">click</button></swiper-slide>
    <swiper-slide>Slide 4 <button @click="a" class="btn">click</button></swiper-slide>
    <swiper-slide>Slide 5 <button @click="a" class="btn">click</button></swiper-slide>
    <swiper-slide>Slide 6 <button @click="a" class="btn">click</button></swiper-slide>
    <swiper-slide>Slide 7 <button @click="a" class="btn">click</button></swiper-slide>
  </swiper-container>
</template>

<style scoped>
swiper-slide {
  border: 1px solid red;
  height: 200px;
}
</style>
