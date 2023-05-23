<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import ProfileForm from '@/components/Profile/Form.vue'
import axios from '@/utils/axios'
import { get } from 'lodash-es'

type Profile = {
  id: number | string
  name: string
}

const fetchProfile = () => {
  return axios.get('/api/me').then(({ data }) => {
    console.log(1)
    return {
      id: get(data, 'data.id', ''),
      name: get(data, 'data.name', '')
    }
  })
}

const { isLoading, isError, data, error } = useQuery<Profile, Error>({
  queryKey: ['profile'],
  queryFn: fetchProfile
  // 多久該向api取得最新資料:0,Infinity
  // staleTime: 0,
  // 保留多久時間:5分鐘
  // cacheTime: 5 * 60 * 1000,
  // 回到視窗後是否再次refetch
  // refetchOnWindowFocus: false
})
</script>

<template>
  <template v-if="isLoading">loading...</template>
  <template v-else-if="isError">{{ error?.message }}</template>
  <template v-else-if="data">
    <h1 class="text-3xl">Profile</h1>
    <ProfileForm :data="data" class="max-w-sm mx-auto" />
  </template>
</template>
