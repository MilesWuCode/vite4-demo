<script setup lang="ts">
import PostCreateForm from '@/components/Post/CreateForm.vue'
import { ref } from 'vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'

const dialog = ref<HTMLDialogElement>()

const open = () => {
  // show, showModal差別按下esc可以關閉
  dialog.value && dialog.value.showModal()
}
const close = () => {
  dialog.value && dialog.value.close()
}
</script>

<template>
  <button class="btn" @click="open">Create</button>
  <dialog ref="dialog" class="modal">
    <form method="dialog" class="modal-box">
      <button class="btn-ghost btn-sm btn-circle btn absolute right-2 top-2" type="submit">
        <CloseIcon />
      </button>

      <PostCreateForm />
    </form>
    <form method="dialog" class="modal-backdrop">
      <button type="submit">close</button>
    </form>
  </dialog>
</template>
