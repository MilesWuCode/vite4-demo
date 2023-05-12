<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import List from '@/components/Menu/List.vue'

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'update:show', show: boolean): void
}>()

function toggle(val: boolean) {
  emit('update:show', val)
}

const closeBtn = ref()
</script>

<template>
  <Dialog
    :open="show"
    :initialFocus="closeBtn"
    @close="toggle"
    class="fixed inset-0 z-40 md:hidden"
  >
    <!-- overlay -->
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

    <!-- panel -->
    <DialogPanel class="relative z-10 flex flex-col h-full bg-white w-72">
      <div class="h-16 border border-b navbar border-gray">
        <h3 class="flex-1 text-xl">LOGO</h3>
        <button ref="closeBtn" class="flex-none" @click="emit('update:show', !show)">
          <CloseIcon />
        </button>
      </div>
      <div class="overflow-y-auto">
        <List />
      </div>
    </DialogPanel>
  </Dialog>
</template>
