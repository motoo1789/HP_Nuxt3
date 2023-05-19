<template>
    <div>
        <v-app-bar :clipped-left="true" app>
            <v-spacer />
            <NuxtLink :to="`/`">
                <v-app-bar-title class="text-center" to="/index">{{ title }}</v-app-bar-title>
            </NuxtLink>
            <v-spacer />
        </v-app-bar>     
    </div>
</template>
  
<script>
  export default {
  
      data() {
          return {
              title: "Motoo Lab",
              clipped: true,
          }
      },
      computed: {
      }
  }
  </script>
  
  <style>
  .border-b {
    border: 1px red;
  }
  </style>