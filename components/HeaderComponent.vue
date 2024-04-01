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

                <v-icon 
                    large
                    v-for="(icon,index) in icons" :key="index"
                    @click="jumpPage(icon.url)"
                    @mouseover="isHover = index" 
                    @mouseout="isHover = null" 
                    class="mx-2 d-none d-sm-flex"
                    :class="{purupuru: isHover === index}"
                >
                    {{ icon.mdiIcon }}
                </v-icon>

                <div class="text-center mx-2" v-if="status === 'authenticated'">
                    <v-menu location="bottom" class="link-style-home">
                        <template v-slot:activator="{ props }">
                            <v-btn
                                class="text-h6"
                                v-bind="props"
                                icon="mdi-account"
                            >
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item
                                v-for="(item, index) in items"
                                :key="index"
                                @click=louginusermenu(item.link)
                            >
                                <template v-slot:prepend>
                                    <v-icon :icon="item.icon"></v-icon>
                                </template>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
                <v-btn class="text-h6" v-else>
                    <NuxtLink :to="`/login`" class="link-style-home ">ログイン</NuxtLink>
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
        showDrawer.value = !showDrawer.value;
    }

    // icon
    let isHover = ref<number | null>(null);
    
    const icons = [
        {
            url: "https://github.com/motoo1789",
            mdiIcon: "mdi-github"
        },
        {
            url: "https://twitter.com/Motoo1789",
            mdiIcon: "mdi-twitter "
        },
    ]

    const jumpPage = (url: any) => {
        window.open(url, '_blank')
    }

    const items = [
        {   
            icon: 'mdi-account-wrench-outline',
            title: '管理者用ページ' ,
            link: 'adminhome',
        },
        { 
            icon: 'mdi-logout ',  
            title: 'ログアウト' ,
            link: 'logout'
        },
    ]

    const louginusermenu = ( selectMenu : string ) => {
        switch(selectMenu)
        {
            case "adminhome":
                navigateTo(selectMenu);
                break;
            case "logout":
                signOut({callbackUrl: '/'})
                break;
        }
    }

  </script>
  
  <style>
    .blue-b{
        border: 1px blue solid
    }
    
    .purupuru {
        animation: purupuru 0.8s linear 0s 1;
    }

    @keyframes purupuru {
        0%   { transform: scale(1.0, 1.0) translate(0%, 0%); }
        20%  { transform: scale(1.0, 1.06) translate(-5%, -4%) skew(6deg, 0deg); }
        50%  { transform: scale(1.0, 0.94) translate(5%, 4%) skew(-6deg, 0deg); }
        65%  { transform: scale(1.0, 1.03) translate(2%, -2%) skew(-3deg, 0deg); }
        80%  { transform: scale(1.0, 0.97) translate(-2%, 2%) skew(3deg, 0deg); }
        100% { transform: scale(1.0, 1.0) translate(0%, 0%); }
    }
  </style>