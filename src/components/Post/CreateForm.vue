<script setup lang="ts">
import { defineRule, configure, useForm, Field, ErrorMessage } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import { required, max } from '@vee-validate/rules'
import { useMutation } from '@tanstack/vue-query'
import axios from '@/utils/axios'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import notyf from '@/utils/notyf'
import type { AxiosError } from 'axios'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

const emit = defineEmits<{
  (e: 'close'): void
}>()

type FormType = {
  title: string
  coantent: string
}

defineRule('required', required)

defineRule('max', max)

/**
 * 因為表單在dialog裡
 * 按esc時會onBlur出現驗證錯誤
 * 關閉validateOnBlur可以避免
 */
configure({
  generateMessage: localize({
    ja,
    zhTW
  }),
  // 驗證時機,限<Field />使用
  // validateOnInput: true,
  // validateOnChange: true,
  validateOnBlur: false
  // validateOnModelUpdate: true
})

setLocale('zhTW')

const { handleSubmit, setFieldError, setErrors, resetForm } = useForm<FormType>()

const { mutate, isLoading } = useMutation({
  mutationFn: (formValues: FormType) => axios.post('/api/user/post', formValues),
  // onMutate: (variables) => {
  //   console.log('onMutate', variables)
  //   // 送出前

  //   // Optionally return a context containing data to use when for example rolling back
  //   return { id: 1 }
  // },
  onError: (error: AxiosError, variables, context) => {
    // 錯誤
    console.log('onError', error, variables, context)

    if (error.response?.status === 422) {
      // 單欄位
      // setFieldError('email', 'error')

      // 多欄位
      let responseData = error.response?.data as any

      setErrors(responseData.errors)
    }
  },
  onSuccess: (data, variables, context) => {
    // 回傳
    console.log('onSuccess', data, variables, context)

    notyf.success('新增成功')

    // 欄位清空
    resetForm()

    // dialog關閉
    emit('close')
  },
  onSettled: (data, error, variables, context) => {
    // 結束
    console.log('onSettled', data, error, variables, context)
  }
})

const onSubmit = handleSubmit((values) => {
  mutate(values)
}, onInvalidSubmit)

/**
 * 表單送出驗證有錯時對欄位focus
 * ts目前只能設any
 */
function onInvalidSubmit({ values, errors, results }: any) {
  for (var item in errors) {
    document.getElementsByName(item)[0].focus()

    break
  }

  console.log(values) // current form values
  console.log(errors) // a map of field names and their first error message
  console.log(results) // a detailed map of field names and their validation results
}
</script>

<template>
  <form @submit="onSubmit" novalidate>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Title</span>
        <span class="label-text-alt"></span>
      </label>
      <Field
        name="title"
        label="Title"
        type="text"
        placeholder="Post Title"
        class="input input-bordered"
        rules="required|max:200"
        autofocus
      />
      <label class="label">
        <span class="label-text-alt"></span>
        <span class="label-text-alt text-red-500">
          <ErrorMessage name="title" />
        </span>
      </label>
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text">Content</span>
        <span class="label-text-alt"></span>
      </label>
      <Field name="content" label="Content" rules="max:2000" v-slot="{ field }">
        <textarea
          v-bind="field"
          class="textarea textarea-bordered h-32"
          placeholder="Post Content"
        ></textarea>
      </Field>
      <label class="label">
        <span class="label-text-alt"></span>
        <span class="label-text-alt text-red-500"><ErrorMessage name="content" /></span>
      </label>
    </div>

    <!-- submit -->
    <div class="flex flex-col space-y-2">
      <button type="submit" class="btn btn-primary" :disabled="isLoading">Submit</button>
    </div>
  </form>
</template>
