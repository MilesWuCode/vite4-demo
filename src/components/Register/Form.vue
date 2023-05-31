<script setup lang="ts">
import { defineRule, Field, Form, ErrorMessage, configure } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import { ref } from 'vue'
import { required, email, min, max, confirmed } from '@vee-validate/rules'
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import axios from '@/utils/axios'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import type { AxiosError } from 'axios'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

type FormType = {
  name: string
  email: string
  password: string
  comfirm_password: string
}

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('max', max)
defineRule('confirmed', confirmed)

configure({
  generateMessage: localize({
    ja,
    zhTW
  })
  // 驗證時機,限<Field />使用
  // validateOnInput: true
  // validateOnChange: true,
  // validateOnBlur: true,
  // validateOnModelUpdate: true,
})

setLocale('zhTW')

const lang = ref('zhTW')

const formRef = ref()

const router = useRouter()

const initialValues = {
  name: 'test',
  email: 'test@email.com',
  password: 'password',
  comfirm_password: 'password'
}

const { mutate, isLoading } = useMutation({
  mutationFn: (formValues: FormType) => axios.post('/api/auth/register', formValues),
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
      // formRef.value.setFieldError('email', 'error')

      // 多欄位
      let responseData = error.response?.data as any

      formRef.value.setErrors(responseData.errors)
    }
  },
  onSuccess: (data, variables, context) => {
    // 回傳
    console.log('onSuccess', data, variables, context)

    router.push('/login')
  },
  onSettled: (data, error, variables, context) => {
    // 結束
    console.log('onSettled', data, error, variables, context)
  }
})

// 只能設any
const onSubmit = (values: any) => {
  mutate(values)
}

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
  <Form
    :initial-values="initialValues"
    @submit="onSubmit"
    @invalid-submit="onInvalidSubmit"
    ref="formRef"
  >
    <div class="w-full max-w-xs form-control">
      <label class="label">
        <span class="label-text">Name</span>
        <span class="label-text-alt"></span>
      </label>
      <Field
        name="name"
        label="名字"
        type="text"
        placeholder="Your Name"
        class="w-full max-w-xs input-bordered input"
        rules="required|max:20"
      />
      <label class="label">
        <span class="label-text-alt"></span>
        <span class="text-red-500 label-text-alt">
          <ErrorMessage name="name" />
        </span>
      </label>

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

      <label class="label">
        <span class="label-text">Comfirm Password</span>
        <span class="label-text-alt"></span>
      </label>
      <Field
        name="comfirm_password"
        label="確認密碼"
        type="password"
        placeholder="Comfirm Password"
        class="w-full max-w-xs input-bordered input"
        rules="confirmed:@password"
      />
      <label class="label">
        <span class="label-text-alt"></span>
        <span class="text-red-500 label-text-alt"><ErrorMessage name="comfirm_password" /></span>
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

      <div class="flex justify-end">
        <button type="submit" class="btn-primary btn" :disabled="isLoading">Submit</button>
      </div>
    </div>
  </Form>
</template>
