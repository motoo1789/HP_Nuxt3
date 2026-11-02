
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

				<v-text-field variant="underlined" v-model="password" label="Password" 
					:type="showPasswaord ? 'text' : 'password'"
					:append-inner-icon="showPasswaord ? 'mdi-eye' : 'mdi-eye-off'"
					@click:append-inner="showPasswaord = !showPasswaord"
				>
				</v-text-field>

				<v-btn type="submit" variant="outlined" color="light-blue-accent-3" block class="mt-2" v-if="status === 'unauthenticated'">ログイン</v-btn>

				<!-- <v-btn @click="signIn('github')" type="submit" variant="outlined" color="light-blue-accent-3" block v-if="status === 'unauthenticated'"
				class="mt-2">Githubでログイン</v-btn> -->

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
const { status, signIn, getSession } = useAuth()

const email = ref("");
const password = ref("");
let showAlert = ref(false);
let showPasswaord = ref(false);

const loginMailPass = async () => {
	showAlert.value = false
	try {
		const result = await signIn("credentials", {
			email: email.value,
			password: password.value,
			redirect: false,
			callbackUrl: "/",
		})

		// signIn は失敗時も ok: true になり得るため error を見る（nuxt-auth 1.x）
		if (result?.error) {
			showAlert.value = true
			return
		}

		await getSession()
		if (status.value === "authenticated") {
			await navigateTo("/")
			return
		}

		showAlert.value = true
	} catch (err) {
		console.error("login failed", err)
		showAlert.value = true
	}
}








</script>

<style scoped>
.blue-b {
	border: 1px blue solid
}
</style>