import { describe, it, expect, beforeEach, vi } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'
import Favorite from '../Post/Favorite.vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import axios from '../../utils/axios'

describe('Favorite', () => {
  beforeEach(() => {})

  it('render', async () => {
    const axiosPost = vi.spyOn(axios, 'post')

    const wrapper: VueWrapper<any> = mount(Favorite, {
      global: {
        plugins: [VueQueryPlugin]
      },
      propsData: {
        id: '33',
        state: false
      }
    })

    // 找組件裡的目標
    const checkbox = wrapper.find('[data-test="checkbox"]')

    // 組件裡的目標是否存在
    expect(checkbox.exists()).toBe(true)

    // 取得元素
    const checkboxEl = checkbox.element as HTMLInputElement

    // 元素是否checked為false
    expect(checkboxEl.checked).toBe(false)

    // 觸發事件change
    await checkbox.trigger('change')

    // 等待變化
    await wrapper.vm.$nextTick()

    // 組件內的function被呼叫幾次
    expect(axiosPost).toHaveBeenCalledTimes(1)

    // 組件內的function被呼叫時的參數
    expect(axiosPost).toHaveBeenCalledWith('/api/post/33/favorite', { action: 'del' })

    // 設定值為true
    await checkbox.setValue(true)

    // 元素是否checked為true
    expect(checkboxEl.checked).toBe(true)

    // 組件內的值是否為true
    expect(wrapper.vm.isFavorite).toBe(true)
  })
})
