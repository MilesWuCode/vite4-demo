<script setup lang="ts">
import LoginForm from '@/components/Login/Form.vue'
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

const onSubmit = () => {
  console.log('onSubmit')
  return
}
</script>

<template>
  <!-- Open the modal using ID.showModal() method -->
  <!-- Open the modal using ID.showModal() method -->
  <button class="btn" @click="open">open modal</button>
  <dialog ref="dialog" class="modal">
    <form method="dialog" class="modal-box">
      <button class="btn-ghost btn-sm btn-circle btn absolute right-2 top-2"><CloseIcon /></button>

      <LoginForm />
    </form>
  </dialog>
</template>
