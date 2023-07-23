<script lang="ts" setup>
useHead({
	title: 'Newt・Nuxtフォーム',
  	meta: [
		{ name: 'description', content: 'NewtとNuxtを利用した問い合わせフォームです' }
  	]	
})

import { useForm } from 'vee-validate'
import * as yup from "yup"

const schema = yup.object({
	email: yup.string().email().required(),
	name: yup.string().required().min(2),
});

const { useFieldModel, handleSubmit, errors } = useForm({
	validationSchema: schema
})
const [name, email, message] = useFieldModel(['name', 'email', 'message'])

const onSubmit = handleSubmit(async (values) => {


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

<template>
	<div>
    	<div class="text-center　text-h6">GUIなどのバグ報告・その他問い合わせ</div>
    	<form @submit="onSubmit">
			<v-alert
				variant="text"
				type="warning"
				density="compact"
				v-if="errors.email"
				id="error-email-required" aria-live="assertive"

			>
				メールアドレスを正しく入力してください！
			</v-alert>
			<v-text-field
				label="メールアドレス"
				name="email"
				v-model="email"
			></v-text-field>
			

			<v-alert
				variant="text"
				type="warning"
				density="compact"
				v-if="errors.name"
				id="error-name-required" aria-live="assertive"
			>
				名前が未入力です！
			</v-alert>
			<v-text-field
				label="名前"
				name="name"
				v-model="name"
			></v-text-field>
		
			<v-textarea 
				label="本文"
				name="message"
				v-model="message"
			>
			</v-textarea>

			<div class="text-center justify-center">
				<v-btn class="me-4" type="submit">submit</v-btn>
			</div>
    	</form>
  	</div>
</template>