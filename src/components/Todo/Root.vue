<script setup lang="ts">
import { ref } from 'vue'
import { v4 as uuid } from 'uuid'
import { type Todo, type Filter, useTodoStore } from '@/stores/todo'
import Item from './Item.vue'

defineOptions({
  // 取名,devtools顯示
  name: 'TodoRoot',
  // 預設true,上層attrs傳入
  // 使用v-bind="$attrs"顯示
  inheritAttrs: true,
  // 自訂義參數
  // 使用$options.customOptions顯示
  customOptions: {}
})

const store = useTodoStore()

const input = ref('')

const tabs: Filter[] = ['all', 'active', 'completed']

const filter = ref<Filter>(tabs[0])

const addTodo = () => {
  if (input.value.length === 0) return

  store.create({
    id: uuid(),
    content: input.value,
    state: 'active'
  })

  input.value = ''
}

const changeState = (id: string | number, state: Todo['state']) => {
  store.changeState(id, state)
}

const removeTodo = (id: string | number) => {
  store.remove(id)
}
</script>

<template>
  <div class="flex flex-col space-y-2">
    <!-- input -->
    <div class="form-control">
      <div class="input-group">
        <input
          v-model.trim="input"
          type="text"
          data-test="todoInput"
          class="input input-bordered w-full"
        />
        <button class="btn btn-square" @click="addTodo" data-test="todoAddButton">add</button>
      </div>
    </div>

    <!-- tabs -->
    <div class="tabs justify-around">
      <!-- completed / total -->
      <span class="tab">{{ store.completedTotal }} / {{ store.total }}</span>

      <!-- select filter -->
      <button
        v-for="item of tabs"
        :key="item"
        class="tab"
        :class="filter === item && 'tab-active'"
        @click="() => (filter = item)"
      >
        {{ item }}
      </button>
    </div>

    <!-- list -->
    <ul class="space-y-2">
      <li v-for="item in store.filterByState(filter)" :key="item.id">
        <Item
          :todo="item"
          @change-state="changeState"
          @remove-todo="removeTodo"
          data-test="todoItem"
        />
      </li>
    </ul>
  </div>
</template>
