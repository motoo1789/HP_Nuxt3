
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

const rules = (value : string) => {
    if(value) 
    {
        return true;
    }

    return "入力してください"
}


const addAccount = async () => {
    const formData = new FormData();
    formData.append("name", this.name);
    formData.append("email", this.email);
    formData.append("password", this.password);
}






</script>

<style scoped>
.blue-b {
	border: 1px blue solid
}
</style>