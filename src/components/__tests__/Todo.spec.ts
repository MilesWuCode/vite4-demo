import { describe, it, expect, beforeAll } from 'vitest'

import { VueWrapper, mount } from '@vue/test-utils'
import TodoRoot from '../Todo/Root.vue'

import { setActivePinia, createPinia } from 'pinia'
import { useTodoStore } from '../../stores/todo'

describe('Todo', () => {
  let wrapper: VueWrapper

  beforeAll(() => {
    // 準備pinia
    setActivePinia(createPinia())

    // 組件
    wrapper = mount(TodoRoot)
  })

  it('all', async () => {
    // 取得store
    const todoStore = useTodoStore()

    // 取得輸入欄位
    const todoInput = wrapper.find('[data-test="todoInput"]')

    // 檢查輸入欄位是否存在
    expect(todoInput.exists()).toBe(true)

    // 取得加入按鈕
    const todoAddButton = wrapper.find('[data-test="todoAddButton"]')

    // 檢查加入按鈕是否存在
    expect(todoAddButton.exists()).toBe(true)

    // 輸入hello
    await todoInput.setValue('hello')

    // 點擊加入按鈕
    await todoAddButton.trigger('click')

    // 檢查store長度是否為1
    expect(todoStore.total).toBe(1)

    // 檢查store存的內容是否為hello
    expect(todoStore.list[0].content).toBe('hello')

    // 檢查store存的內容是否為active
    expect(todoStore.list[0].state).toBe('active')

    // 檢查子組件產生長度為1
    expect(wrapper.findAllComponents('[data-test="todoItem"]').length).toBe(1)

    // 取得第1個子組件
    const firstTodoItem = wrapper.findAllComponents('[data-test="todoItem"]').at(0)

    // 檢查第1個子組件的文字為hello
    expect(firstTodoItem?.find('[data-test="content"]').text()).toBe('hello')

    // 設定第1個子組件state為completed
    await firstTodoItem?.find('[data-test="stateChangeButton"]').setValue('completed')

    // 檢查store存的內容是否為completed
    expect(todoStore.list[0].state).toBe('completed')

    // 按刪除按鈕
    await firstTodoItem?.find('[data-test="deleteButton"]').trigger('click')

    // 檢查store長度是否為0
    expect(todoStore.total).toBe(0)

    // 檢查子組件產生長度為0
    expect(wrapper.findAllComponents('[data-test="todoItem"]').length).toBe(0)
  })
})
