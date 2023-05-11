<script setup lang="ts">
import { ref } from 'vue'
import type { Todo } from '@/stores/todo'

const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'changeState', id: string, state: Todo['state']): void
  (e: 'removeTodo', id: string): void
}>()

const state = ref(props.todo.state)

const onChange = () => {
  emit('changeState', props.todo.id, state.value)
}

const onRemove = () => {
  emit('removeTodo', props.todo.id)
}
</script>

<template>
  <div class="flex space-x-2">
    <!-- checkbox -->
    <input
      v-model="state"
      true-value="completed"
      false-value="active"
      type="checkbox"
      class="flex-none checkbox"
      @change="onChange"
    />

    <!-- content -->
    <div class="w-full break-words grow" :class="state === 'completed' && 'line-through'">
      {{ todo.content }}
    </div>

    <!-- delete button -->
    <button class="flex-none btn-sm btn" @click="onRemove">Del</button>
  </div>
</template>
