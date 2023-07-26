import { describe, it, expect, beforeEach } from 'vitest'
import { VueWrapper, mount } from '@vue/test-utils'
import Favorite from '../Post/Favorite.vue'
import { VueQueryPlugin } from '@tanstack/vue-query'

describe('Favorite', () => {
  beforeEach(() => {})

  it('render', async () => {
    const wrapper: VueWrapper<any> = mount(Favorite, {
      global: {
        plugins: [VueQueryPlugin]
      },
      propsData: {
        id: '3',
        state: false
      }
    })

    const checkbox = wrapper.find('[data-test="checkbox"]')

    const checkboxEl = checkbox.element as HTMLInputElement

    expect(checkboxEl.checked).toBe(false)

    await checkbox.trigger('change')
    // await checkbox.setValue(true)

    await wrapper.vm.$nextTick()

    expect(checkboxEl.checked).toBe(true)

    expect(wrapper.vm.isFavorite).toBe(true)
  })
})
