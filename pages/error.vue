<template>
	<div>
		<v-card
			class="mx-auto text-center"
			max-width="350"
			elevation="0"
		>

			<v-icon size="100px" color="blue-lighten-2 " >mdi-check-circle-outline</v-icon>

			<v-card-title>
				お問い合わせに失敗しました
			</v-card-title>

			<v-card-actions class="justify-center">
				<NuxtLink :to="'/'">
					<v-btn
						
						color="blue-lighten-1"
						size="x-large"
					>
						お問い合わせページへ
					</v-btn>
				</NuxtLink>

			</v-card-actions>

			
		</v-card>
		
  	</div>
</template>

<script setup lang="ts">

</script>

<style>

</style>