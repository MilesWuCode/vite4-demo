<script setup lang="ts">
import { ref } from 'vue'
import MenuSM from '@/components/Menu/MenuSM.vue'
import MenuMD from '@/components/Menu/MenuMD.vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const showMenuSM = ref(false)
const showMenuMD = ref(true)
</script>

<template>
  <div>
    <!-- offcanvas:menu -->
    <MenuSM v-model:show-menu="showMenuSM" />

    <!-- top:navbar -->
    <Navbar v-model:show-menu-sm="showMenuSM" v-model:show-menu-md="showMenuMD" />

    <!-- left:menu -->
    <MenuMD :show-menu="showMenuMD" />

    <!-- right -->
    <div class="lg:pl-80">
      <!-- page -->
      <RouterView />

      <!-- footer -->
      <Footer />
    </div>
  </div>
</template>
