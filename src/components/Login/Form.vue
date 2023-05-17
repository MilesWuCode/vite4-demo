<script setup lang="ts">
import { defineRule, Field, Form, ErrorMessage, configure } from 'vee-validate'
import { localize, setLocale } from '@vee-validate/i18n'
import ja from '@vee-validate/i18n/dist/locale/ja.json'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import { required, email, min, max } from '@vee-validate/rules'
import { ref } from 'vue'

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

const onSubmit = (values: any) => {
  console.log(values)
}

const switchLanguage = () => {
  setLocale(lang.value)
}
</script>

<template>
  <Form @submit="onSubmit">
    <div class="w-full max-w-xs form-control">
      <!-- email -->
      <label class="label">
        <span class="label-text">Email</span>
        <span class="label-text-alt"></span>
      </label>
      <Field
        name="E-mail"
        type="email"
        placeholder="Your Email"
        class="w-full max-w-xs input-bordered input"
        rules="required|email"
      />
      <label class="label">
        <span class="label-text-alt"></span>
        <span class="text-red-500 label-text-alt">
          <ErrorMessage name="E-mail" />
        </span>
      </label>

      <!-- password -->
      <label class="label">
        <span class="label-text">Password</span>
        <span class="label-text-alt"></span>
      </label>
      <Field
        name="密碼"
        type="password"
        placeholder="Your Password"
        class="w-full max-w-xs input-bordered input"
        rules="required|min:8|max:32"
      />
      <label class="label">
        <span class="label-text-alt"></span>
        <span class="text-red-500 label-text-alt"><ErrorMessage name="密碼" /></span>
      </label>

      <label class="cursor-pointer label">
        <span class="label-text">switch language</span>
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
