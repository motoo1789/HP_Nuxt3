<template>
	<div>
    <div class="text-h6">GUIなどのバグ報告問い合わせ・</div>
		<form>
			<!-- 
			<v-text-field
				v-model="state.name"
				:error-messages="v$.name.$errors.map(e => e.$message)"
				:counter="10"
				label="名前"
				@input="v$.name.$touch"
				@blur="v$.name.$touch"
			></v-text-field> 
		-->

			<v-text-field
				v-model="state.email"
				:error-messages="v$.email.$errors.map(e => e.$message)"
				label="メールアドレス"
				required
				@input="v$.email.$touch"
				@blur="v$.email.$touch"
			></v-text-field>

			<v-text-field
				label="件名"
				required
			></v-text-field>

			<v-textarea label="本文"></v-textarea>

			<div class="text-center justify-center">
				<v-btn
					class="me-4"
					@click="v$.$validate"
				>
					submit
				</v-btn>
				<v-btn @click="clear">
					clear
				</v-btn>
			</div>
			
    	</form>
  	</div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { email, required } from '@vuelidate/validators'

  const initialState = {
    name: '',
    email: '',
    select: null,
    checkbox: null,
  }

  const state = reactive({
    ...initialState,
  })

  const items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
  ]

  const rules = {
    name: { required },
    email: { required, email },
    select: { required },
    items: { required },
    checkbox: { required },
  }

  const v$ = useVuelidate(rules, state)

  function clear () {
    v$.value.$reset()

    for (const [key, value] of Object.entries(initialState)) {
      state[key] = value
    }
  }

</script>

<style>

</style>