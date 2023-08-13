
<template>
	<div>
		<v-date-picker></v-date-picker>
		<v-container>
			<v-row>
				<v-col>
					<p class="text-center　text-h6">成果物追加</p>
				</v-col>

			</v-row>
			<v-row>
				<v-col>
					
					<form @submit="onSubmit">
						<v-alert variant="text" type="warning" density="compact" v-if="errors.email"
							id="error-email-required" aria-live="assertive">
							タイトルを正しく入力してください！
						</v-alert>
						<v-text-field label="タイトル" name="title" v-model="email"></v-text-field>


						<v-alert variant="text" type="warning" density="compact" v-if="errors.name" id="error-name-required"
							aria-live="assertive">
							名前が未入力です！
						</v-alert>
						<v-text-field label="概要" name="abstract" v-model="name"></v-text-field>

						<v-textarea label="本文" name="detail" v-model="message">
						</v-textarea>

						<v-alert variant="text" type="warning" density="compact" v-if="errors.name" id="error-name-required"
							aria-live="assertive">
							フレームワークが未入力です！
						</v-alert>
						<v-text-field label="フレームワーク" name="framework" v-model="name"></v-text-field>

						<v-alert variant="text" type="warning" density="compact" v-if="errors.name" id="error-name-required"
							aria-live="assertive">
							ライブラリが未入力です！
						</v-alert>
						<v-text-field label="ライブラリ" name="library" v-model="name"></v-text-field>

						<v-alert variant="text" type="warning" density="compact" v-if="errors.name" id="error-name-required"
							aria-live="assertive">
							言語が未入力です！
						</v-alert>
						<v-text-field label="言語" name="language" v-model="name"></v-text-field>

						<v-alert variant="text" type="warning" density="compact" v-if="errors.name" id="error-name-required"
							aria-live="assertive">
							名前が未入力です！
						</v-alert>
						<v-text-field label="概要" name="name" v-model="name"></v-text-field>

						<v-alert variant="text" type="warning" density="compact" v-if="errors.name" id="error-name-required"
							aria-live="assertive">
							GithubURLが未入力です！
						</v-alert>
						<v-text-field label="Github U" name="github" v-model="name"></v-text-field>

						<v-alert variant="text" type="warning" density="compact" v-if="errors.name" id="error-name-required"
							aria-live="assertive">
							作成日時が未入力です！
						</v-alert>
						<VueDatePicker v-model="date"></VueDatePicker>

						



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
import { VDatePicker } from 'vuetify/labs/VDatePicker'

useHead({
	title: 'Newt・Nuxtフォーム',
	meta: [
		{ name: 'description', content: 'NewtとNuxtを利用した問い合わせフォームです' }
	]
})

import { useForm } from 'vee-validate'
import { VueReCaptcha, useReCaptcha } from 'vue-recaptcha-v3'
import { ref } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref();


import * as yup from "yup"

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
   siteKey: '6LdvemQnAAAAANA5WrFjmfpfi7U6oVc8cF-Tz6Gb',
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
		const response = await fetch('https://motoolab.form.newt.so/v1/Ycl-scwxX', {
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