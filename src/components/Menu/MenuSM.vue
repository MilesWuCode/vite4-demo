<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import List from '@/components/Menu/List.vue'

defineProps<{
  showMenu: boolean
}>()

const emit = defineEmits<{
  (e: 'update:showMenu', showMenu: boolean): void
}>()

function toggleMenu(val: boolean) {
  emit('update:showMenu', val)
}

const closeBtn = ref()
</script>

<template>
  <Dialog
    :open="showMenu"
    :initialFocus="closeBtn"
    @close="toggleMenu"
    class="fixed inset-0 z-40 md:hidden"
  >
    <!-- overlay -->
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

    <!-- panel -->
    <DialogPanel class="relative z-10 flex flex-col h-full bg-white w-72">
      <div class="flex p-4 border border-b border-gray">
        <h3 class="flex-1 text-xl">LOGO</h3>
        <button ref="closeBtn" class="flex-none" @click="toggleMenu(!showMenu)">
          <CloseIcon />
        </button>
      </div>
      <div class="overflow-y-auto">
        <List />
      </div>
    </DialogPanel>
  </Dialog>
</template>
