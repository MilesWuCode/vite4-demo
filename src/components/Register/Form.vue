<script setup lang="ts">
import { defineRule, Field, Form, ErrorMessage, configure } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import { required, email, min, max, confirmed } from '@vee-validate/rules'
import { ref } from 'vue'

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

function switchLanguage() {
  setLocale(lang.value)
}

function onSubmit(values: any) {
  console.log(values)
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
  <Form @submit="onSubmit" @invalid-submit="onInvalidSubmit">
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
        <button type="submit" class="btn-primary btn">Submit</button>
      </div>
    </div>
  </Form>
</template>
