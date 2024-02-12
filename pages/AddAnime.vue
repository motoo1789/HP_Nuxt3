
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

						<!--五十音-->
						<v-alert variant="text" type="warning" density="compact" v-if="errors.syllabary"
							id="error-name-required" aria-live="assertive">
							選択されていません！
						</v-alert>
						<v-radio-group inline label="五十音" name="syllabary" v-model="syllabary">
							<v-radio  v-for="(radioSyllabary, radioSyllabarykey) in radioSyllabarys" 
								class="mx-auto"
								:key="radioSyllabarykey" 
								:label=radioSyllabary.label 
								:value=radioSyllabary.value>	
							</v-radio>
						</v-radio-group>

						<!--タイトル-->
						<v-alert variant="text" type="warning" density="compact" v-if="errors.title"
							id="error-name-required" aria-live="assertive">
							タイトルが未入力です！
						</v-alert>
						<v-textarea label="アニメタイトル" name="title" v-model="title"></v-textarea>


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
import { useForm } from 'vee-validate'
import { ref } from 'vue';
import * as yup from "yup"

const radioSyllabarys = [
	{ label : "あ", value : "animeA" },
	{ label : "か", value : "animeKa" },
	{ label : "さ", value : "animeSa" },
	{ label : "た", value : "animeTa" },
	{ label : "な", value : "animeNa" },
	{ label : "は", value : "animeHa" },
	{ label : "ま", value : "animeMa" },
	{ label : "や", value : "animeYa" },
	{ label : "ら", value : "animeRa" },
	{ label : "わ", value : "animeWa" },
]

definePageMeta({ middleware: 'auth' })


const schema = yup.object({
	syllabary: yup.string().required(),
	title: yup.string().required(),
});

const { useFieldModel, handleSubmit, errors } = useForm({
	validationSchema: schema
})
const [syllabary, title]
	= useFieldModel(['syllabary', 'title'])


interface POSTFormat {
    syllabary : string,
    title : string[]
}

let notifySuccess = ref(false)
let notifyError = ref(false);
let prograssCircular = ref(false);
let overlay = ref(false);

const { postAnimeEntity } = animeContents();

const onSubmit = handleSubmit(async (values) => {
	prograssCircular.value = true;
	overlay.value = true;

	const formData = {
		syllabary: values.syllabary,
		title: values.title.split(/\n/),
	}
	console.log(formData);
	const postState : boolean = await postAnimeEntity(formData);
	
	if(postState) {
		overlay.value = false;
		prograssCircular.value = false;
		notifySuccess.value = true;
	}

})

</script>

<style scoped>
.blue-b {
	border: 1px blue solid
}
</style>