<script setup lang="ts">
import { defineRule, Field, Form, ErrorMessage, configure } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import { required, email, min, max } from '@vee-validate/rules'
import { ref } from 'vue'
import axios from '@/utils/axios'
import { useMutation } from '@tanstack/vue-query'

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

const initialValues = {
  email: 'test@email.com',
  password: 'password'
}

const {
  // data,
  // error,
  // isError,
  // isIdle,
  // isLoading,
  // isPaused,
  // isSuccess,
  // failureCount,
  // failureReason,
  mutate
  // mutateAsync,
  // reset,
  // status
} = useMutation({
  mutationFn: (formValues) => axios.post('/auth/login', formValues),
  onMutate: (variables) => {
    // A mutation is about to happen!

    // Optionally return a context containing data to use when for example rolling back
    return { id: 1 }
  },
  onError: (error, variables, context) => {
    // An error happened!
    console.log(`rolling back optimistic update with id ${context.id}`)
  },
  onSuccess: (data, variables, context) => {
    // Boom baby!
  },
  onSettled: (data, error, variables, context) => {
    // Error or success... doesn't matter!
  }
})

function switchLanguage() {
  setLocale(lang.value)
}

function onSubmit(values: any) {
  // mutate(variables, {
  //   onError,
  //   onSettled,
  //   onSuccess,
  // })
  mutate(values)
}

function onInvalidSubmit({ values, errors, results }) {
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
  <Form @submit="onSubmit" :initial-values="initialValues" @invalid-submit="onInvalidSubmit">
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
      <button type="submit" class="btn-primary btn">Submit</button>
    </div>
  </Form>
</template>
