import { describe, it, expect, beforeAll } from 'vitest'

import { VueWrapper, mount, shallowMount } from '@vue/test-utils'
import TodoRoot from '../Todo/Root.vue'
import TodoItem from '../Todo/Item.vue'

import { setActivePinia, createPinia } from 'pinia'
import { useTodoStore } from '../../stores/todo'

describe('Todo', () => {
  let wrapper: VueWrapper

  beforeAll(() => {
    setActivePinia(createPinia())

    wrapper = mount(TodoRoot)
  })

  it('all', async () => {
    const todoStore = useTodoStore()

    const todoInput = wrapper.find('[data-test="todoInput"]')

    expect(todoInput.exists()).toBe(true)

    const todoAddButton = wrapper.find('[data-test="todoAddButton"]')

    expect(todoAddButton.exists()).toBe(true)

    await todoInput.setValue('hello')

    await todoAddButton.trigger('click')

    expect(todoStore.total).toBe(1)

    expect(todoStore.list[0].content).toBe('hello')

    expect(todoStore.list[0].state).toBe('active')

    expect(wrapper.findAllComponents('[data-test="todoItem"]').length).toBe(1)

    const firstTodoItem = wrapper.findAllComponents('[data-test="todoItem"]').at(0)

    expect(firstTodoItem?.find('[data-test="content"]').text()).toBe('hello')

    await firstTodoItem?.find('[data-test="stateChangeButton"]').setValue('completed')

    expect(todoStore.list[0].state).toBe('completed')

    await firstTodoItem?.find('[data-test="deleteButton"]').trigger('click')

    expect(todoStore.total).toBe(0)

    expect(wrapper.findAllComponents('[data-test="todoItem"]').length).toBe(0)
  })
})
