
<template>
	<div>
		<v-container>
			<v-row>
				<v-col>
					<p class="text-center text-h6">バグ報告・その他問い合わせ
					</p>
				</v-col>

			</v-row>
			<v-row>
				<v-col>
					<form @submit="onSubmit">
						<v-alert variant="text" type="warning" density="compact" v-if="errors.email"
							id="error-email-required" aria-live="assertive">
							メールアドレスを正しく入力してください！
						</v-alert>
						<v-text-field label="メールアドレス" name="email" v-model="email"></v-text-field>


						<v-alert variant="text" type="warning" density="compact" v-if="errors.name" id="error-name-required"
							aria-live="assertive">
							名前が未入力です！
						</v-alert>
						<v-text-field label="名前" name="name" v-model="name"></v-text-field>

						<v-textarea label="本文" name="message" v-model="message">
						</v-textarea>

						<div class="text-center justify-center">
							<v-btn class="me-4" type="submit" color="light-blue-accent-3">送信</v-btn>
						</div>
					</form>
				</v-col>

			</v-row>
		</v-container>
	</div>
</template>

<script lang="ts" setup>

useHead({
	title: 'Newt・Nuxtフォーム',
	meta: [
		{ name: 'description', content: 'NewtとNuxtを利用した問い合わせフォームです' }
	]
})

import { useForm } from 'vee-validate'
import { VueReCaptcha, useReCaptcha } from 'vue-recaptcha-v3'

import * as yup from "yup"
const configContentful = useRuntimeConfig();

const schema = yup.object({
	email: yup.string().email().required(),
	name: yup.string().required().min(2),
});

const { useFieldModel, handleSubmit, errors } = useForm({
	validationSchema: schema
})
const [name, email, message] = useFieldModel(['name', 'email', 'message'])

 const { vueApp } = useNuxtApp()
 vueApp.use(VueReCaptcha, {
   siteKey: configContentful.public.reCAPTCHA.key!,
   loaderOptions: {
    renderParameters: {
       hl: 'ja'
    }
   }
})
const recaptchaInstance = useReCaptcha()


const onSubmit = handleSubmit(async (values) => {

	await recaptchaInstance?.recaptchaLoaded()
	const token = await recaptchaInstance?.executeRecaptcha('submit')
	values.googleReCaptchaToken = token

	const formData = new FormData()
	Object.entries(values).forEach(([key, value]) => {
		formData.append(key, value)
	})

	try {
		const response = await fetch(configContentful.public.newt.formEndpoint!, {
			method: 'POST',
			body: formData,
			headers: {
				Accept: 'application/json'
			}
		})

		if (response.ok) {
			await navigateTo('/thanks')
		} else {
			await navigateTo('/error')
		}
	} catch (err) {
		await navigateTo('/error')
	}
})
</script>

<style scoped>
.blue-b {
	border: 1px blue solid
}
</style>