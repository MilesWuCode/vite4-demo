<script setup lang="ts">
import OnIcon from '@/components/icons/FavoriteOnIcon.vue'
import OffIcon from '@/components/icons/FavoriteOffIcon.vue'
</script>

<template>
  <label class="swap">
    <!-- this hidden checkbox controls the state -->
    <input type="checkbox" />

    <!-- on -->
    <OnIcon class="text-red-500 fill-current swap-on" />

    <!-- off -->
    <OffIcon class="text-red-500 fill-current swap-off" />
  </label>
</template>
