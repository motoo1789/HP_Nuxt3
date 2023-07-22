<template>
	<div>
    <div class="text-h6">GUIなどのバグ報告・その他問い合わせ</div>
		<form @submit="onSubmit">
			<!-- 
			<v-text-field
				v-model="state.name"
				:error-messages="v$.name.$errors.map(e => e.$message)"
				:counter="10"
				label="名前"
				@input="v$.name.$touch"
				@blur="v$.name.$touch"
			></v-text-field> 
		-->

			<v-text-field
				v-model="state.email"
				:error-messages="v$.email.$errors.map(e => e.$message)"
				label="メールアドレス"
				required
				@input="v$.email.$touch"
				@blur="v$.email.$touch"
				name="email"
			></v-text-field>

			<v-text-field
				label="名前"
				name="name"
			></v-text-field>

			<v-textarea 
				label="本文"
				name="message"
			>
			</v-textarea>

			<div class="text-center justify-center">
				<v-btn class="me-4" @click="v$.$validate" type="submit">submit</v-btn>
				<v-btn @click="clear">clear</v-btn>
			</div>
			
    	</form>
  	</div>
</template>

<script setup lang="ts">
  	import { reactive } from 'vue'
  	import { useVuelidate } from '@vuelidate/core'
  	import { email, required } from '@vuelidate/validators'
	import { useForm } from 'vee-validate'

 	const initialState = {
		name: '',
		email: '',
		select: null,
		checkbox: null,
  	}

  	const state = reactive({
    	...initialState,
  	})


  	const rules = {
		name: { required },
		email: { required, email },
		select: { required },
		items: { required },
		checkbox: { required },
  	}

  	const v$ = useVuelidate(rules, state)

  	function clear () {
    	v$.value.$reset()

    	for (const [key, value] of Object.entries(initialState)) {
      		state[key] = value
    	}
  	}

	// add Newt
	const schema = {
		name (value: string) {
			if (!value) {
				return 'Name is required'
			}
			return true
		}
	}
	const { useFieldModel, handleSubmit, errors } = useForm({

	})
	const onSubmit = handleSubmit(async (values) => {
		// await recaptchaInstance?.recaptchaLoaded()
		// const token = await recaptchaInstance?.executeRecaptcha('submit')
		// values.googleReCaptchaToken = token



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

<style>

</style>