import { describe, it, expect, beforeEach, vi } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'
import Favorite from '../Post/Favorite.vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import axios from '../../utils/axios'

describe('Favorite', () => {
  beforeEach(() => {})

  it('render', async () => {
    const axiosPost = vi.spyOn(axios, 'post')

    const id = '1'

    const state = false

    const wrapper: VueWrapper<any> = mount(Favorite, {
      global: {
        plugins: [VueQueryPlugin]
      },
      props: {
        id,
        state
      }
    })

    // 找組件裡的目標
    const checkbox = wrapper.find('[data-test="checkbox"]')

    // 組件裡的目標是否存在
    expect(checkbox.exists()).toBe(true)

    // 取得元素
    const checkboxEl = checkbox.element as HTMLInputElement

    // 組件內的值是否為state
    expect(wrapper.vm.isFavorite).toBe(state)

    // 元素是否checked為state
    expect(checkboxEl.checked).toBe(state)

    // 設定值為!state
    await checkbox.setValue(!state)

    // 組件內的值是否為!state
    expect(wrapper.vm.isFavorite).toBe(!state)

    // 元素是否checked為!state
    expect(checkboxEl.checked).toBe(!state)

    // 組件內的function被呼叫幾次
    expect(axiosPost).toHaveBeenCalledTimes(1)

    // 組件內的function被呼叫時的參數
    expect(axiosPost).toHaveBeenCalledWith(`/api/post/${id}/favorite`, {
      action: !state ? 'add' : 'del'
    })
  })
})
