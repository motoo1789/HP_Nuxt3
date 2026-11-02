<template>
    <div>
      <v-list nav>
            <v-list-item
                v-for="sidelist in sidelists"
                :key="sidelist.titleJP"
                :prepend-icon="sidelist.icon"
                :title="sidelist.titleJP"
                :active="route.path === sidelist.path"
                @click="go(sidelist.path)"
            />
        </v-list>
    </div>
</template>

<script setup lang="ts">

const emit = defineEmits<{ navigate: [] }>();
const route = useRoute();
const router = useRouter();

const sidelists = [
    {titleJP: "ホーム", titleENG: "Home", path: "/",  icon:"mdi-home-outline"},
    {titleJP: "プロフィール", titleENG: "Profile", path: "/profile", icon:"mdi-account-outline"},
    {titleJP: "ホビー", titleENG: "Hobby", path: "/hobby", icon:"mdi-gamepad-variant-outline"},
    {titleJP: "プロジェクト", titleENG: "Project", path: "/project", icon:"mdi-code-tags"},
    {titleJP: "コンタクト", titleENG: "Contact", path: "/contact", icon:"mdi-email-outline"},
]

async function go(path: string) {
  emit("navigate");
  if (route.path === path) {
    return;
  }
  await router.push(path);
}

</script>
