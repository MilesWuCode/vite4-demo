import { describe, it, expect, beforeEach, vi } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'
import Favorite from '../Post/Favorite.vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import axios from '../../utils/axios'

describe('Favorite', () => {
  beforeEach(() => {})

  it('render', async () => {
    const postdata = vi.spyOn(axios, 'post')

    const wrapper: VueWrapper<any> = mount(Favorite, {
      global: {
        plugins: [VueQueryPlugin]
      },
      propsData: {
        id: '33',
        state: false
      }
    })

    const checkbox = wrapper.find('[data-test="checkbox"]')

    const checkboxEl = checkbox.element as HTMLInputElement

    expect(checkboxEl.checked).toBe(false)

    await checkbox.trigger('change')

    await wrapper.vm.$nextTick()

    expect(postdata).toHaveBeenCalledTimes(1)
    expect(postdata).toHaveBeenCalledWith('/api/post/33/favorite', { action: 'del' })

    await checkbox.setValue(true)

    expect(checkboxEl.checked).toBe(true)

    expect(wrapper.vm.isFavorite).toBe(true)
  })
})
