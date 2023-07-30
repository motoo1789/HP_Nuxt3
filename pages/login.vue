
<template>
	<div class="align-center justify-center" style="height: 100vh">
        <v-sheet width="400" class="mx-auto">
            <v-form fast-fail @submit.prevent="login">
                <v-text-field  variant="underlined" v-model="username" label="User Name"></v-text-field>

                <v-text-field variant="underlined" v-model="password" label="Password"></v-text-field>
                
                <v-btn type="submit" variant="outlined" color="light-blue-accent-3" block class="mt-2">Sign in</v-btn>

            </v-form>
        </v-sheet>
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