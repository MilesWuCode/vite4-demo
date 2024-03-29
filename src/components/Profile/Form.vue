<script setup lang="ts">
import { defineRule, configure, useForm, Field, ErrorMessage } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import { required, email, min, max } from '@vee-validate/rules'
import { useMutation } from '@tanstack/vue-query'
import axios from '@/utils/axios'
import EmailVerifyInput from '@/components/Profile/EmailVerifyInput.vue'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import notyf from '@/utils/notyf'
import type { AxiosError } from 'axios'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import { useAuthStore } from '@/stores/auth'

const props = defineProps<{
  data: { id: number | string; name: string }
}>()

type FormType = {
  name: string
}

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)

configure({
  generateMessage: localize({
    ja,
    zhTW
  })
  // 驗證時機,限<Field />使用
  // validateOnInput: true,
  // validateOnChange: true,
  // validateOnBlur: true,
  // validateOnModelUpdate: true,
})

setLocale('zhTW')

const initialValues = {
  name: props.data.name
}

const { handleSubmit, setFieldError, setErrors } = useForm<FormType>({
  initialValues: initialValues
})

const authStore = useAuthStore()

const { mutate, isLoading } = useMutation({
  mutationFn: (formValues: FormType) => axios.put('/api/me', formValues),
  onMutate: (variables) => {
    console.log('onMutate', variables)
    // 送出前

    // Optionally return a context containing data to use when for example rolling back
    return { id: 1 }
  },
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

    // 更新資料
    authStore.fetchUser()

    notyf.success('更新成功')
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
    <div class="form-control w-full max-w-sm">
      <label class="label">
        <span class="label-text">Name</span>
        <span class="label-text-alt"></span>
      </label>
      <Field
        name="name"
        label="名字"
        type="text"
        placeholder="Your Name"
        class="input input-bordered"
        rules="required|max:20"
      />
      <label class="label">
        <span class="label-text-alt"></span>
        <span class="label-text-alt text-red-500">
          <ErrorMessage name="name" />
        </span>
      </label>
    </div>

    <EmailVerifyInput />

    <!-- submit -->
    <div class="flex w-full max-w-sm flex-col space-y-2">
      <button type="submit" class="btn btn-primary w-full" :disabled="isLoading">Submit</button>
    </div>
  </form>
</template>
