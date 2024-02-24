
<template>
	<div>
		<v-container>
			<v-row>
				<v-col>
					<p class="text-center text-h6">成果物追加</p>
				</v-col>
			</v-row>
			<v-row>
				<v-col>

					<form @submit="onSubmit">
						<!--タイトル-->
						<v-alert variant="text" type="warning" density="compact" v-if="errors.title"
							id="error-email-required" aria-live="assertive">
							タイトルを正しく入力してください！
						</v-alert>
						<v-text-field label="タイトル" name="title" v-model="title"></v-text-field>

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

						<!--フレームワーク-->
						<v-alert variant="text" type="warning" density="compact" v-if="errors.framework"
							id="error-name-required" aria-live="assertive">
							フレームワークが未入力です！
						</v-alert>
						<v-text-field label="フレームワーク" name="framework" v-model="framework"></v-text-field>

						<!--ライブラリ-->
						<v-alert variant="text" type="warning" density="compact" v-if="errors.library"
							id="error-name-required" aria-live="assertive">
							ライブラリが未入力です！
						</v-alert>
						<v-text-field label="ライブラリ" name="library" v-model="library"></v-text-field>

						<!--言語-->
						<v-alert variant="text" type="warning" density="compact" v-if="errors.language"
							id="error-name-required" aria-live="assertive">
							言語が未入力です！
						</v-alert>
						<v-text-field label="言語" name="language" v-model="language"></v-text-field>


						<!--Github　URL-->
						<v-alert variant="text" type="warning" density="compact" v-if="errors.github"
							id="error-name-required" aria-live="assertive">
							GithubURLが未入力です！
						</v-alert>
						<v-text-field label="Github URL" name="github" v-model="github"></v-text-field>

						<!--作成日時-->
						<v-alert variant="text" type="warning" density="compact" v-if="errors.createdProjectDate"
							id="error-name-required" aria-live="assertive">
							作成日時が未入力です！
						</v-alert>
						<v-text-field label="作成日時" prepend-inner-icon="mdi-calendar-cursor" name="date"
							v-model="createdProjectDate" @click="dateDialog = true"></v-text-field>

						<v-dialog v-model="dateDialog" width="auto">
							<v-defaults-provider>
								<v-locale-provider locale="ja">
									<v-date-picker v-model="createdProjectDate" format="yyyy-dd-mm"></v-date-picker>
								</v-locale-provider>
							</v-defaults-provider>


							<v-btn color="light-blue-accent-3" @click="dateDialog = false">
								閉じる
							</v-btn>
						</v-dialog>

						<v-alert variant="text" type="warning" density="compact" v-if="errors.image"
							id="error-name-required" aria-live="assertive">
							画像の選択がされていません！
						</v-alert>
						<v-file-input show-size density="compact" label="画像" prepend-icon="" prepend-inner-icon="mdi-camera"
							name="image" v-model="image"></v-file-input>

						<v-alert variant="text" type="warning" density="compact" v-if="errors.movie"
							id="error-name-required" aria-live="assertive">
							動画の選択がされていません！
						</v-alert>
						<v-file-input show-size density="compact" label="動画" prepend-icon=""
							prepend-inner-icon="mdi-movie-play" name="movie" v-model="movie"></v-file-input>


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
import { VueReCaptcha, useReCaptcha } from 'vue-recaptcha-v3'
import { ref } from 'vue';

definePageMeta({ middleware: 'auth' })

const dateDialog = ref(false);
const imagetype = ["png", "jpeg", "jpg"];

import * as yup from "yup"

const schema = yup.object({
	title: yup.string().required(),
	abstract: yup.string().required(),
	detaile: yup.string().required(),
	language: yup.string().required(),
	library: yup.string().required(),
	framework: yup.string().required(),
	github: yup.string().required(),
	createdProjectDate: yup.string().required(),
	image: yup.mixed().required().test(
		"image",
		'imgじゃないです',
		image => {
			const filename: string = image[0] !== undefined ? image[0].name : "";
			const findFileType = imagetype.find((type: string) => filename.indexOf(type) !== -1);

			if (findFileType) {
				return true;
			}
			return false;
		},
	),
	movie: yup.mixed().required().test(
		'movie',
		'movieじゃないです',
		movie => {
			const filename: string = movie[0] !== undefined ? movie[0].name : "";
			if (filename.indexOf('mp4') !== -1) {
				return true
			}
			return false;
		}
	)
});

const { useFieldModel, handleSubmit, errors } = useForm({
	validationSchema: schema
})
const [title, abstract, detaile, language, library, framework, github, createdProjectDate, image, movie]
	= useFieldModel(['title', 'abstract', 'detaile', 'language', 'library', 'framework', 'github', 'createdProjectDate', 'image', 'movie'])

watch(createdProjectDate, (newCreatedProjectDate, oldCreatedProjectDate) => {
	// .valueは不要
	createdProjectDate.value = <string>newCreatedProjectDate.replace('UTC', '');
})

//  const { vueApp } = useNuxtApp()
//  vueApp.use(VueReCaptcha, {
//    siteKey: process.env.NEXT_PUBLIC_SITE_KEY!,
//    loaderOptions: {
//      renderParameters: {
//        hl: 'ja'
//      }
//    }
//  })
 const recaptchaInstance = useReCaptcha()

interface POSTFormat {
	title: string,
	abstract: string,
	detaile: string,
	library: string
	language: string,
	framework: string,
	github: string,
	createdProjectDate: string,
	image: string,
	movie: string,
}

// post関係変数
let notifySuccess = ref(false)
let notifyError = ref(false);
let prograssCircular = ref(false);
let overlay = ref(false);

const onSubmit = handleSubmit(async (values) => {
	prograssCircular.value = true;
	overlay.value = true;

	await recaptchaInstance?.recaptchaLoaded()
	const token = await recaptchaInstance?.executeRecaptcha('submit')
	values.googleReCaptchaToken = token

	const postDataObject: POSTFormat = {
		title: values.title,
		abstract: values.abstract,
		detaile: values.detaile,
		library: values.library,
		language: values.language,
		framework: values.framework,
		github: values.github,
		createdProjectDate: values.createdProjectDate,
		image: await getBase64(values.image[0]) as string,
		movie: await getBase64(values.movie[0]) as string
	}

	try {
		const response = await useFetch("/api/contentful/PostProject", {
			method: 'POST',
			body: postDataObject,
		})

		if (response.data.value === 'success') {
			overlay.value = false;
			prograssCircular.value = false;
			notifySuccess.value = true;
		} else {
			overlay.value = false;
			prograssCircular.value = false;
			notifyError.value = true;
		}
	} catch (err) {
		await navigateTo('/error')
	}
})

const getBase64 = (file: File) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});
}


</script>

<style scoped>
.blue-b {
	border: 1px blue solid
}
</style>