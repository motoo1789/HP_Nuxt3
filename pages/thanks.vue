<template>
	<div>
		<!-- <v-icon size="100px" color="blue-lighten-2">mdi-check-circle-outline</v-icon>
			
		<v-alert
			icon="mdi-check-circle-outline"
			color="info"
			title="Success ful!!"
			text="お問い合わせが完了いたしました。"
			variant="tonal"
			class="justify-center"
		>
		</v-alert> -->

		<v-card
			class="mx-auto text-center"
			max-width="350"
			elevation="0"
		>

			<v-icon size="100px" color="light-blue-accent-3 " >mdi-check-circle-outline</v-icon>

			<v-card-title>
				お問い合わせが完了しました
			</v-card-title>
			<v-card-text>
				メールアドレスに確認メールを送信しました
			</v-card-text>

			<NuxtLink :to="'/'">
				<v-btn
					:rounded=true
					color="light-blue-accent-3"
					size="large"
				>
					ホーム
				</v-btn>
			</NuxtLink>
		</v-card>
  	</div>
</template>

<script setup lang="ts">
  	

</script>

<style>
.blue-b{
    border: 1px blue solid
}
</style>