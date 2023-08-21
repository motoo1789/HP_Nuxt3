
<template>
	<div>
		
		<v-container>
			<v-row>
				<v-col>
					<p class="text-center　text-h6">成果物追加</p>
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
						<v-alert variant="text" type="warning" density="compact" v-if="errors.abstract" id="error-name-required"
							aria-live="assertive">
							概要が未入力です！
						</v-alert>
						<v-text-field label="概要" name="abstract" v-model="abstract"></v-text-field>

						<!--本文-->
						<v-alert variant="text" type="warning" density="compact" v-if="errors.detail" id="error-name-required"
							aria-live="assertive">
							概要が未入力です！
						</v-alert>
						<v-textarea label="本文" name="detail" v-model="detail"></v-textarea>

						<!--フレームワーク-->
						<v-alert variant="text" type="warning" density="compact" v-if="errors.framework" id="error-name-required"
							aria-live="assertive">
							フレームワークが未入力です！
						</v-alert>
						<v-text-field label="フレームワーク" name="framework" v-model="framework"></v-text-field>

						<!--ライブラリ-->
						<v-alert variant="text" type="warning" density="compact" v-if="errors.library" id="error-name-required"
							aria-live="assertive">
							ライブラリが未入力です！
						</v-alert>
						<v-text-field label="ライブラリ" name="library" v-model="library"></v-text-field>

						<!--言語-->
						<v-alert variant="text" type="warning" density="compact" v-if="errors.language" id="error-name-required"
							aria-live="assertive">
							言語が未入力です！
						</v-alert>
						<v-text-field label="言語" name="language" v-model="language"></v-text-field>

					
						<!--Github　URL-->
						<v-alert variant="text" type="warning" density="compact" v-if="errors.github" id="error-name-required"
							aria-live="assertive">
							GithubURLが未入力です！
						</v-alert>
						<v-text-field label="Github URL" name="github" v-model="github"></v-text-field>

						<!--作成日時-->
						<v-alert variant="text" type="warning" density="compact" v-if="errors.createdProjectDate" id="error-name-required"
							aria-live="assertive">
							作成日時が未入力です！
						</v-alert>
						<v-text-field
							label="作成日時"
							prepend-inner-icon="mdi-calendar-cursor"
							name="date"
							v-model="createdProjectDate"
							@click="dateDialog = true"
						></v-text-field>

						<v-dialog v-model="dateDialog" width="auto">
							<v-defaults-provider >
								<v-locale-provider locale="ja">
									<v-date-picker v-model="createdProjectDate" format="yyyy-dd-mm" ></v-date-picker>
								</v-locale-provider>
							</v-defaults-provider>
							

							<v-btn 
								color="light-blue-accent-3" 		
								@click="dateDialog = false"
							>
								閉じる
							</v-btn>
						</v-dialog>

						<v-alert variant="text" type="warning" density="compact" v-if="errors.image" id="error-name-required"
							aria-live="assertive">
							画像の選択がされていません！
						</v-alert>
						<v-file-input
							show-size
							density="compact"
							label="画像"
							prepend-icon=""
							prepend-inner-icon="mdi-camera"
							name="image"
							v-model="iamge"
						></v-file-input>

						<!-- <v-alert variant="text" type="warning" density="compact" v-if="errors.movie" id="error-name-required"
							aria-live="assertive">
							動画の選択がされていません！
						</v-alert>
						<v-file-input
							show-size
							density="compact"
							label="動画"
							prepend-icon=""
							prepend-inner-icon="mdi-movie-play"
							name="movie"
							v-model="movie"
						></v-file-input> -->

						
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


import * as yup from "yup"

const schema = yup.object({
	title: yup.string().required(),
	abstract:   yup.string().required(),
	detail:  yup.string().required(),
	language:  yup.string().required(),
	library:  yup.string().required(),
	framework:  yup.string().required(),
	github:  yup.string().required(),
	createdProjectDate:  yup.string().required(),
	image: yup.mixed().required().test("type", "Only the picture",
		(value) => {
			
			return value && ( 
				value.type === "image/jpeg" || value.type === "image/png"
			);
		}
	)
	// image: yup.mixed().required().test({
    //   message: () => 'imgじゃないです',
    //   test: value => {
	// 	return value && ( value.type === "image/jpeg" || value.type === "image/png")
	// 	const isValid = ['image/jpeg', 'image/png'].includes((img?.name));
    //   	if (!isValid) {
	// 		return false
	// 	}
    //     return true;
        
    //   },
    // }),

	// movie: yup.mixed().required().test({
    //   message: () => 'movieじゃないです',
    //   test: img => {
	// 	const isValid = ['video/mp4', 'movie/mp4'].includes((img?.name));
    //   	if (!isValid) {
	// 		return false
	// 	}
    //     return true;
        
    //   },
	// })
});

const { useFieldModel, handleSubmit, errors } = useForm({
	validationSchema: schema
})
const [title, abstract, detail,language, library, framework, github, createdProjectDate, iamge] 
		= useFieldModel(['title', 'abstract', 'detail','language', 'library', 'framework', 'github', 'createdProjectDate','iamge'])

watch(createdProjectDate, (newCreatedProjectDate, oldCreatedProjectDate) => {
    // .valueは不要
    console.log("old ", oldCreatedProjectDate) 
    console.log("new ", newCreatedProjectDate)
	createdProjectDate.value = <string> newCreatedProjectDate.replace('UTC', '');
})

//  const { vueApp } = useNuxtApp()
//  vueApp.use(VueReCaptcha, {
//    siteKey: process.env.SITE_KEY!,
//    loaderOptions: {
//      renderParameters: {
//        hl: 'ja'
//      }
//    }
//  })
//  const recaptchaInstance = useReCaptcha()


const onSubmit = handleSubmit(async (values) => {

	// await recaptchaInstance?.recaptchaLoaded()
	// const token = await recaptchaInstance?.executeRecaptcha('submit')
	// values.googleReCaptchaToken = token

	const formData = new FormData()
	Object.entries(values).forEach(([key, value]) => {
		console.log(value)
		formData.append(key, value)
	})

	try {
		const response = useFetch ("/api/contentful/post", {
			method: 'POST',
			body: formData,
		})

		if (response.ok) {
			await navigateTo('/thanks')
		} else {
			
			await navigateTo('/error')
		}
	} catch (err) {
		console.log("こっちのerrorでしょ")
		// await navigateTo('/error')
	}
})
</script>

<style scoped>
.blue-b {
	border: 1px blue solid
}
</style>