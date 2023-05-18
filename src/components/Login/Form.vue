<script setup lang="ts">
import { defineRule, configure, useForm, Field, ErrorMessage } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import { required, email, min, max } from '@vee-validate/rules'
import { ref } from 'vue'
import axios from '@/utils/axios'
import { useMutation } from '@tanstack/vue-query'
import type { AxiosError } from 'axios'
import { useRoute, useRouter } from 'vue-router'
import Cookies from 'js-cookie'

type FormType = {
  email: string
  password: string
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

const lang = ref('zhTW')

const route = useRoute()
const router = useRouter()

console.log(route.query.redirect)

const { redirect } = route.query

const initialValues = {
  email: 'test@email.com',
  password: 'password'
}

const { handleSubmit, setFieldError, setErrors } = useForm<FormType>({
  initialValues: initialValues
})

const { mutate, isLoading } = useMutation({
  mutationFn: (formValues: FormType) => axios.post('/api/auth/login', formValues),
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
    } else {
      alert('server error...')
    }
  },
  onSuccess: (data, variables, context) => {
    // 回傳
    console.log('onSuccess', data, variables, context)

    Cookies.set('token', data.data.token)

    redirect && router.push(redirect as string)
  },
  onSettled: (data, error, variables, context) => {
    // 結束
    console.log('onSettled', data, error, variables, context)
  }
})

const onSubmit = handleSubmit((values) => {
  mutate(values)
}, onInvalidSubmit)

function switchLanguage() {
  setLocale(lang.value)
}

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
    <div class="w-full max-w-xs form-control">
      <label class="label">
        <span class="label-text">Email</span>
        <span class="label-text-alt"></span>
      </label>
      <Field
        name="email"
        label="E-mail"
        type="email"
        placeholder="Your Email"
        class="w-full max-w-xs input-bordered input"
        rules="required|email"
      />
      <label class="label">
        <span class="label-text-alt"></span>
        <span class="text-red-500 label-text-alt">
          <ErrorMessage name="email" />
        </span>
      </label>

      <label class="label">
        <span class="label-text">Password</span>
        <span class="label-text-alt"></span>
      </label>
      <Field
        name="password"
        label="密碼"
        type="password"
        placeholder="Your Password"
        class="w-full max-w-xs input-bordered input"
        rules="required|min:8|max:32"
      />
      <label class="label">
        <span class="label-text-alt"></span>
        <span class="text-red-500 label-text-alt"><ErrorMessage name="password" /></span>
      </label>

      <label class="cursor-pointer label">
        <span class="label-text">Switch language</span>
        <input
          v-model="lang"
          type="checkbox"
          class="toggle"
          true-value="zhTW"
          false-value="ja"
          @change="switchLanguage"
        />
      </label>
    </div>

    <!-- submit -->
    <div class="flex justify-end w-full max-w-xs">
      <button type="submit" class="btn-primary btn" :disabled="isLoading">Submit</button>
    </div>
  </form>
</template>
