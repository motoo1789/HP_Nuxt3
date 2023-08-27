
<template>
	<div class="align-center justify-center" style="height: 100vh">
		<v-sheet width="400" class="mx-auto">

			<v-form fast-fail @submit.prevent="loginMailPass">
				<v-alert variant="text" type="warning" density="compact" v-if="showAlert === true"
					id="error-email-required" aria-live="assertive"
				>
					メールアドレスとパスワードを確認してください！
				</v-alert>
				<v-text-field variant="underlined" v-model="email" label="User Mail"></v-text-field>

				<v-text-field variant="underlined" v-model="password" label="Password"></v-text-field>

				<v-btn type="submit" variant="outlined" color="light-blue-accent-3" block class="mt-2" v-if="status === 'unauthenticated'">ログイン</v-btn>

				<v-btn @click="signIn('github')" type="submit" variant="outlined" color="light-blue-accent-3" block v-if="status === 'unauthenticated'"
				class="mt-2">Githubでログイン</v-btn>

				<NuxtLink :to="`/AddAcount`" class="link-style-home ">
					<v-btn type="submit" variant="outlined" color="light-blue-accent-3" block class="mt-2 ">
						アカウント登録
					</v-btn>
				</NuxtLink>
			</v-form>
		</v-sheet>

		
	</div>
</template>

<script lang="ts" setup>
definePageMeta({
	auth: {
		unauthenticatedOnly: true,
		navigateAuthenticatedTo: '/',
	},
})


import { ref } from "vue";
const { status, data, signIn } = useAuth()

const email = ref("");
const password = ref("");
let showAlert = ref(false);

const loginMailPass = async () => {
	const result = await signIn('credentials', { email: email.value, password: password.value, redirect: false, callbackUrl: "/" });
	console.log(result);

	if(status.value === 'unauthenticated')
	{
		showAlert.value = true
	}
	else if(status.value === 'authenticated')
	{
		showAlert.value = false;
		navigateTo('/')
		
	}
}








</script>

<style scoped>
.blue-b {
	border: 1px blue solid
}
</style>