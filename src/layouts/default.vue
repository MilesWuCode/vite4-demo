<script setup lang="ts">
import { ref } from 'vue'
import Offcanvas from '@/components/Menu/Offcanvas.vue'
import Sidebar from '@/components/Menu/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const showOffcanvas = ref(false)
const showSidebar = ref(true)
</script>

<template>
  <div>
    <!-- offcanvas:menu -->
    <Offcanvas v-model:show="showOffcanvas" />

    <!-- top:navbar -->
    <Navbar v-model:showOffcanvas="showOffcanvas" v-model:showSidebar="showSidebar" />

    <!-- left:menu -->
    <Sidebar :show="showSidebar" />

    <!-- right -->
    <div :class="showSidebar && 'lg:pl-60'" class="flex min-h-[calc(100vh-70px)] flex-col">
      <!-- page -->
      <div class="flex-1">
        <RouterView />
      </div>

      <!-- footer -->
      <Footer />
    </div>
  </div>
</template>
