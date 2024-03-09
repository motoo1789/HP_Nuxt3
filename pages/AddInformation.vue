
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
						<!--概要-->
						<v-alert variant="text" type="warning" density="compact" v-if="errors.abstract"
							id="error-name-required" aria-live="assertive">
							概要が未入力です！
						</v-alert>
						<v-text-field label="概要" name="abstract" v-model="abstract"></v-text-field>

						<!--本文-->
						<v-alert variant="text" type="warning" density="compact" v-if="errors.detaile"
							id="error-name-required" aria-live="assertive">
							本文が未入力です！
						</v-alert>
						<v-textarea label="本文" name="detaile" v-model="detaile"></v-textarea>

						<!--作成日時-->
						<v-alert variant="text" type="warning" density="compact" v-if="errors.createdInformationDate"
							id="error-name-required" aria-live="assertive">
							作成日時が未入力です！
						</v-alert>
						<v-text-field label="作成日時" prepend-inner-icon="mdi-calendar-cursor" name="date"
							v-model="createdInformationDate" @click="dateDialog = true"></v-text-field>

						<v-dialog v-model="dateDialog" width="auto">
							<v-defaults-provider>
								<v-locale-provider locale="ja">
									<v-date-picker v-model="createdInformationDate" format="yyyy-dd-mm"></v-date-picker>
								</v-locale-provider>
							</v-defaults-provider>


							<v-btn color="light-blue-accent-3" @click="dateDialog = false">
								閉じる
							</v-btn>
						</v-dialog>

						<div class="text-center justify-center">
							<v-btn class="me-4" type="submit" color="light-blue-accent-3">送信</v-btn>
						</div>

						<v-snackbar min-width="auto" width="150" :timeout="3000" v-model="notifySuccess"
							color="light-blue-accent-3">
							<p class="text-center">送信成功！</p>
						</v-snackbar>

						<v-snackbar min-width="auto" width="150" :timeout="3000" v-model="notifyError" color="error">
							<p class="text-center">送信失敗！</p>
						</v-snackbar>
						<v-overlay v-model="overlay" class="align-center justify-center">
							<v-progress-circular color="white" :size="64" :width="7"
								:indeterminate=prograssCircular></v-progress-circular>
						</v-overlay>
					</form>
				</v-col>

			</v-row>
		</v-container>
	</div>
</template>

<script lang="ts" setup>
import { VDatePicker } from 'vuetify/labs/VDatePicker'
import { useForm } from 'vee-validate'
import { ref } from 'vue';

definePageMeta({ middleware: 'auth' })

const dateDialog = ref(false);
const imagetype = ["png", "jpeg", "jpg"];

import * as yup from "yup"
import { DatePickerType } from 'vuetify';

const schema = yup.object({
	abstract: yup.string().required(),
	detaile: yup.string().required(),
	createdInformationDate: yup.string().required(),
});

const { useFieldModel, handleSubmit, errors } = useForm({
	validationSchema: schema
})
const [abstract, detaile, createdInformationDate]
	= useFieldModel(['abstract', 'detaile', 'createdInformationDate'])

watch(createdInformationDate, (newCreatedProjectDate, oldCreatedProjectDate) => {
	// .valueは不要
	createdInformationDate.value = <string>newCreatedProjectDate.replace('UTC', '');
})

interface POSTFormat {
	abstract: string,
	detaile: string,
	createdInformationDate: string,
}

let notifySuccess = ref(false)
let notifyError = ref(false);
let prograssCircular = ref(false);
let overlay = ref(false);


const { postInformationEntity } = informationContents();

const onSubmit = handleSubmit(async (values) => {
	prograssCircular.value = true;
	overlay.value = true;

	const formData = {
		abstract: values.abstract,
		detaile: values.detaile,
		createdInformationDate: values.createdInformationDate,
	}

	try {
		const postState : boolean = await postInformationEntity(formData);
		if(postState) {
			overlay.value = false;
			prograssCircular.value = false;
			notifySuccess.value = true;
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