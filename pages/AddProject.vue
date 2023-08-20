
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
							v-model="image"
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
	// image: yup.mixed().required().test("type", "Only the picture",
	// 	(value) => {
	// 		console.log(typeof value)
			
	// 	}
	// )
	image: yup.mixed().required().test(
		"image",
      'imgじゃないです',
      (value) => {
		console.log(value[0].name);
		const filename:string = value[0].name;
		const isValid = filename.lastIndexOf('jpg');
		if (!isValid) {
			return false
		}
        return true;

		// return value && ( value[0].type === "image/jpeg" || value[0].type === "image/png");
		// value && ( value.type === "image/jpeg" || value.type === "image/png")
		// const isValid = ['image/jpeg', 'image/png'].includes((img?.name));
      	// if (!isValid) {
		// 	return false
		// }
        // return true;
        
      },
    )

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
const [title, abstract, detail,language, library, framework, github, createdProjectDate, image] 
		= useFieldModel(['title', 'abstract', 'detail','language', 'library', 'framework', 'github', 'createdProjectDate','image'])

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
		await navigateTo('/error')
	}
})
</script>

<style scoped>
.blue-b {
	border: 1px blue solid
}
</style>