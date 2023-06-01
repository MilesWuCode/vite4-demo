<script setup lang="ts">
import { defineRule, configure, useForm, Field, ErrorMessage } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import notyf from '@/utils/notyf'
import { required, email } from '@vee-validate/rules'
import { useMutation } from '@tanstack/vue-query'
import axios from '@/utils/axios'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import type { AxiosError } from 'axios'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

type FormType = {
  email: string
}

defineRule('required', required)
defineRule('email', email)

configure({
  generateMessage: localize({
    ja,
    zhTW
  })
})

setLocale('zhTW')

const initialValues = {
  email: 'test@email.com'
}

const { handleSubmit, setFieldError, setErrors } = useForm<FormType>({
  initialValues: initialValues
})

const { mutate, isLoading } = useMutation({
  mutationFn: (formValues: FormType) => axios.post('/api/auth/forgot-password', formValues),
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

    notyf.success('寄出驗證信')
  },
  onSettled: (data, error, variables, context) => {
    // 結束
    console.log('onSettled', data, error, variables, context)
  }
})

const onSubmit = handleSubmit((values) => {
  mutate(values)
}, onInvalidSubmit)

// 只能設any
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
    <!-- input group -->
    <div class="w-full max-w-sm form-control">
      <label class="label">
        <span class="label-text">Email</span>
        <span class="label-text-alt"></span>
      </label>
      <Field
        name="email"
        label="E-mail"
        type="email"
        placeholder="Your Email"
        class="input-bordered input"
        rules="required|email"
      />
      <label class="label">
        <span class="label-text-alt"></span>
        <span class="text-red-500 label-text-alt">
          <ErrorMessage name="email" />
        </span>
      </label>
    </div>

    <!-- submit -->
    <div class="flex flex-col w-full max-w-sm space-y-2">
      <button type="submit" class="w-full btn-primary btn" :disabled="isLoading">Submit</button>
    </div>
  </form>
</template>
