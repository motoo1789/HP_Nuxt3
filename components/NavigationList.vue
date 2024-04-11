<template>
    <div>
      <v-list>
            <v-list-item v-for="sidelist in sidelists" 
                :key="sidelist.titleJP" 
                prepend-icon=sidelist.icon
            >
                <NuxtLink :to="sidelist.path" class="link-style" :class="{outage: sidelist.path === '/contact' ? true : false}">
                    <v-list-item-icon>
                        <v-icon > {{ sidelist.icon }}</v-icon>
                    </v-list-item-icon>
                    {{ sidelist.titleJP }}
                </NuxtLink>
            </v-list-item> 
        </v-list>
    </div>
</template>

<script setup lang="ts">


	const sidelists = [
		{titleJP: "ホーム", titleENG: "Home", path: "/",  icon:"mdi-home-outline"},
		{titleJP: "プロフィール", titleENG: "Profile", path: "/profile", icon:"mdi-account-outline"},
		{titleJP: "ホビー", titleENG: "Hobby", path: "/hobby", icon:"mdi-gamepad-variant-outline"},
		{titleJP: "プロジェクト", titleENG: "Project", path: "/project", icon:"mdi-code-tags"},
		{titleJP: "コンタクト", titleENG: "Contact", path: "/contact", icon:"mdi-email-outline"},
	]

</script>

<style>
    .outage {
        text-decoration: line-through;
    }
</style>