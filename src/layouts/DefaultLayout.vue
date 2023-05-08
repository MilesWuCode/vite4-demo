<script setup lang="ts">
import MenuIcon from '@/components/icons/MenuIcon.vue'
import MenuKebabIcon from '@/components/icons/MenuKebabIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { ref } from 'vue'

const isOpen = ref(false)
const showSidebar = ref(false)
const close = ref()

function setIsOpen(value: boolean) {
  isOpen.value = value
}
</script>

<template>
  <div>
    <!-- sidebar -->
    <Dialog
      :open="isOpen"
      @close="setIsOpen"
      :initialFocus="close"
      class="md:hidden fixed inset-0 z-40"
    >
      <!-- overlay -->
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

      <!-- panel -->
      <DialogPanel class="flex flex-col relative z-10 h-full w-72 bg-white">
        <div class="flex p-2">
          <h3 class="text-xl flex-1">LOGO</h3>
          <button ref="close" class="flex-none" @click="isOpen = !isOpen"><CloseIcon /></button>
        </div>
        <div class="overflow-y-auto">
          <ul class="menu">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 4</a></li>
          </ul>
        </div>
      </DialogPanel>
    </Dialog>

    <div>
      <!-- navbar -->
      <div class="navbar">
        <div class="flex-none">
          <!-- sm:menu -->
          <button
            type="button"
            class="md:hidden btn btn-square btn-ghost"
            @click="isOpen = !isOpen"
          >
            <MenuIcon />
          </button>
          <!-- md:menu -->
          <button
            type="button"
            class="hidden md:flex btn btn-square btn-ghost"
            @click="showSidebar = !showSidebar"
          >
            <MenuIcon />
          </button>
        </div>
        <div class="flex-1">
          <h3 class="text-xl">LOGO</h3>
        </div>
        <div class="flex-none">
          <button class="btn btn-square btn-ghost">
            <MenuKebabIcon />
          </button>
        </div>
      </div>

      <div class="flex">
        <!-- left -->
        <!-- md:menu -->
        <div
          :class="!showSidebar && 'md:hidden'"
          class="hidden md:block w-64 h-[calc(100vh-4rem)] border-r border-t border-gray overflow-y-hidden hover:overflow-y-scroll"
        >
          <ul class="menu">
            <li><a>Item 1</a></li>
            <li><a>Item 2</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 3</a></li>
            <li><a>Item 4</a></li>
          </ul>
        </div>

        <!-- right -->
        <div class="flex-1 px-2 border-t border-gray">
          <!-- page -->
          <RouterView />

          <!-- footer -->
          <small>default layout</small>
        </div>
      </div>
    </div>
  </div>
</template>
