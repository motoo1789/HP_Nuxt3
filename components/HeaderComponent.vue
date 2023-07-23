<template>
    <div>
        <header>
            <v-app-bar color="blue-lighten-1" :clipped-left="true" app >
                <template v-slot:prepend>
                    <v-app-bar-nav-icon @click.stop=show class="hidden-lg-and-up"></v-app-bar-nav-icon>
                </template>

                <v-spacer />
                <NuxtLink :to="`/`" class="link-style-home">
                    <v-app-bar-title class="text-center text-h5" to="/index">{{ title }}</v-app-bar-title>
                </NuxtLink>
                <v-spacer />
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

    const title = "Motoo Lab";
    let showDrawer = ref(false);

    const show = () => {
        console.log("fdsafd");
        showDrawer.value = !showDrawer.value;
    }

  </script>
  
  <style>

  </style>