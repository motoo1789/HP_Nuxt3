
<template>
	<div class="align-center justify-center" style="height: 100vh">
        <v-sheet width="400" class="mx-auto">

            <v-form fast-fail @submit.prevent="addAccount">
                <v-text-field  variant="underlined" :rules="rules" v-model="name" label="User Name"></v-text-field>
                
                <v-text-field  variant="underlined" :rules="rules" v-model="email" label="User Mail"></v-text-field>

                <v-text-field variant="underlined" :rules="rules" v-model="password" label="Password"></v-text-field>
                
                <v-btn type="submit" variant="outlined" color="light-blue-accent-3" block class="mt-2">アカウント登録</v-btn>

            </v-form>
        </v-sheet>
    </div>
</template>

<script lang="ts" setup>

const name = ref("");
const email = ref("");
const password = ref("");

const rules = [
    (value:string) => {
        if(value) 
        {
            return true;
        }

        return "入力してください"
    }
];

interface AddUser {
    name: string,
    email: string,
    password: string
}

const addAccount = async () => {

    const formData: AddUser = {
        name: name.value,
        email: email.value,
        password: password.value
    }


    const data = await useFetch('/api/account/addUser', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json", // JSON形式でデータを送信するためのヘッダー
        },
        params: {
            "name": name.value,
            "email": email.value,
            "password": password.value
        },
        body: formData,// formDataをJSON文字列に変換して送信
    });
}

</script>

<style scoped>

.blue-b {
	border: 1px blue solid
}

</style>