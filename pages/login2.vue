
<template>
	<div class="align-center justify-center" style="height: 100vh">
        <v-sheet width="400" class="mx-auto">
            <pre>{{ status }}</pre>
            <pre>{{ data }}</pre>
            <pre>{{ alert }}</pre>
            <v-form fast-fail @submit.prevent="loginMailPass">
                <v-text-field  variant="underlined" v-model="email" label="User Mail"></v-text-field>

                <v-text-field variant="underlined" v-model="password" label="Password"></v-text-field>
                
                <v-btn type="submit" variant="outlined" color="light-blue-accent-3" block class="mt-2">Sign in</v-btn>

            </v-form>
        </v-sheet>

		<v-btn @click="signIn()" type="submit" variant="outlined" color="light-blue-accent-3" block class="mt-2">Githubでログイン</v-btn>

    <!-- <NuxtLink :to="`/AddAcount`" class="link-style-home ">
      <v-btn  type="submit" variant="outlined" color="light-blue-accent-3" block class="mt-2 " >
        アカウント登録
      </v-btn>
    </NuxtLink> -->
    </div>
</template>

<script lang="ts" setup>



const { status, data, signOut, signIn } = useAuth()

const email = ref("");
const password = ref("");
let alert = ref("初期値");

const loginMailPass = async () => {
  const result = await signIn( 'credentials', { email: email.value, password: password.value, redirect: false });
  console.log(result);

}



definePageMeta( {
	auth: {
		unauthenticatedOnly: true,
		navigateAuthenticatedTo: "/",
	}
})




</script>

<style scoped>
.blue-b {
	border: 1px blue solid
}
</style>