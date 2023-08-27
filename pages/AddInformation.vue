
<template>
	<div>
		
		<v-container>
			<v-row>
				<v-col>
					<p class="text-center text-h6">新着情報追加</p>
				</v-col>

			</v-row>
			<v-row>
				<v-col>
					
					<form @submit="onSubmit">
						<!--タイトル-->
						

						<!--概要-->
						<v-alert variant="text" type="warning" density="compact" v-if="errors.abstract" id="error-name-required"
							aria-live="assertive">
							概要が未入力です！
						</v-alert>
						<v-text-field label="概要" name="abstract" v-model="abstract"></v-text-field>

						<!--本文-->
						<v-alert variant="text" type="warning" density="compact" v-if="errors.detaile" id="error-name-required"
							aria-live="assertive">
							本文が未入力です！
						</v-alert>
						<v-textarea label="本文" name="detaile" v-model="detaile"></v-textarea>

						<!--作成日時-->
						<v-alert variant="text" type="warning" density="compact" v-if="errors.createdInformationDate" id="error-name-required"
							aria-live="assertive">
							作成日時が未入力です！
						</v-alert>
						<v-text-field
							label="作成日時"
							prepend-inner-icon="mdi-calendar-cursor"
							name="date"
							v-model="createdInformationDate"
							@click="dateDialog = true"
						></v-text-field>

						<v-dialog v-model="dateDialog" width="auto">
							<v-defaults-provider >
								<v-locale-provider locale="ja">
									<v-date-picker v-model="createdInformationDate" format="yyyy-dd-mm" ></v-date-picker>
								</v-locale-provider>
							</v-defaults-provider>
							

							<v-btn 
								color="light-blue-accent-3" 		
								@click="dateDialog = false"
							>
								閉じる
							</v-btn>
						</v-dialog>
						
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

const dateDialog = ref(false);
//const createdProjectDate = ref()

const imagetype = ["png", "jpeg", "jpg"];

import * as yup from "yup"
import { DatePickerType } from 'vuetify';

const schema = yup.object({
	abstract:   yup.string().required(),
	detaile:  yup.string().required(),
	createdInformationDate:  yup.string().required(),
});

const { useFieldModel, handleSubmit, errors } = useForm({
	validationSchema: schema
})
const [abstract, detaile,createdInformationDate] 
		= useFieldModel(['abstract', 'detaile','createdInformationDate'])

watch(createdInformationDate, (newCreatedProjectDate, oldCreatedProjectDate) => {
    // .valueは不要
    console.log("old ", oldCreatedProjectDate) 
    console.log("new ", newCreatedProjectDate)
	createdInformationDate.value = <string> newCreatedProjectDate.replace('UTC', '');
})

interface POSTFormat {
	abstract: string,
	detaile: string,
	createdInformationDate: string,
}

const onSubmit = handleSubmit(async (values) => {

	// const formData = new FormData()
	// Object.entries(values).forEach(([key, value]) => {
	// 	console.log(value)
	// 	formData.append(key, value)
	// })
	const formData = {
		abstract: values.abstract,
		detaile: values.detaile,
		createdInformationDate: values.createdInformationDate,
	}
	

	try {
		console.log(formData);
		const response = useFetch ("/api/contentful/PostInformation", {
			method: 'POST',
			body: formData,
			headers: {
				Accept: 'application/json'
			}
		})

		if (response.data.value === 'success') {
			await navigateTo('/thanks')
		} else {
			console.log(response)
			// await navigateTo('/error')
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