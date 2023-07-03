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
    class="fixed inset-0 z-50 lg:hidden"
  >
    <!-- overlay -->
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

    <!-- panel -->
    <DialogPanel class="relative flex h-full w-72 flex-col bg-white">
      <div class="border-gray navbar h-16 space-x-2 border border-b">
        <button
          type="button"
          ref="closeBtn"
          class="btn-ghost btn-circle btn lg:hidden"
          @click="emit('update:show', !show)"
        >
          <CloseIcon />
        </button>
        <h3 class="flex-1 text-xl">Logo</h3>
      </div>
      <div class="overflow-y-auto">
        <List @toggle="toggle" />
      </div>
    </DialogPanel>
  </Dialog>
</template>
