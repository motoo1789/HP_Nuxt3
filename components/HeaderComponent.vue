<template>
    <div>
        <header>
            <v-app-bar color="blue-lighten-1 " :clipped-left="true" app  >
                <template v-slot:prepend >
                    <v-app-bar-nav-icon @click.stop=show class="hidden-lg-and-up"></v-app-bar-nav-icon>
                </template>


                <v-app-bar-title class="text-h5" to="/index">
                    <NuxtLink :to="`/`" class="link-style-home ">{{ title }}</NuxtLink>
                </v-app-bar-title>


                <v-alert>{{ data?.user?.email }}</v-alert>
                <p> </p>
                <v-btn class="text-h6" v-if="status === 'authenticated'">
                    <NuxtLink @click="signOut({callbackUrl: '/'})"  class="link-style-home ">サインアウト</NuxtLink>
                </v-btn>
                <v-btn class="text-h6" v-else>
                    <NuxtLink :to="`/login`" class="link-style-home ">サインイン</NuxtLink>
                </v-btn>
                
                
            </v-app-bar>     

            <v-navigation-drawer
                v-model="showDrawer"
                location="left"
                temporary
            >
                <NavigationList />
            </v-navigation-drawer>
        </header>
        
    </div>
</template>
  
<script setup lang="ts">
    import { ref } from "vue";
    const  { signOut, data, status } = useAuth();

    const title = "Motoo Lab";
    let showDrawer = ref(false);

    const show = () => {
        console.log("fdsafd");
        showDrawer.value = !showDrawer.value;
    }

  </script>
  
  <style>
    .blue-b{
        border: 1px blue solid
    }


  </style>