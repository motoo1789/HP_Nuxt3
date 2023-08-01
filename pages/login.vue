
<template>
	<div class="align-center justify-center" style="height: 100vh">
        <v-sheet width="400" class="mx-auto">
            <v-form fast-fail @submit.prevent="login">
                <v-text-field  variant="underlined" v-model="username" label="User Name"></v-text-field>

                <v-text-field variant="underlined" v-model="password" label="Password"></v-text-field>
                
                <v-btn type="submit" variant="outlined" color="light-blue-accent-3" block class="mt-2">Sign in</v-btn>

            </v-form>
        </v-sheet>

		<v-btn @click="signIn('github')" type="submit" variant="outlined" color="light-blue-accent-3" block class="mt-2">Githubでログイン</v-btn>
    </div>
</template>

<script lang="ts" setup>
const { signIn } = useAuth()

definePageMeta( {
	auth: {
		unauthenticatedOnly: true,
		navigateAuthenticatedTo: "/profile",
	}
})




</script>

<style scoped>
.blue-b {
	border: 1px blue solid
}
</style>