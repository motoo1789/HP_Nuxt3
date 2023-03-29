<template>
  <v-component>
    <div>
    <v-card
        class="mx-auto"
        shaped="true"
    >
        <v-row class="blue-b" justify="start" >
            <v-col class="red-b" cols="5"> 技術スキル
                <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    height="200px"
                ></v-img>
            </v-col>

            <v-col class="green-b" cols="7">
                あくまで自己評価です
                <!-- <div 
                    v-for="(rating, key) in ratings"
                    :key="key"
                    class="blue-b rating-container"
                > -->
                    <!-- <div ckass="rating-label">{{ rating.skill }}</div>
                    <v-rating
                        :model-value="rating.value"
                        readonly="true"
                        color="#82b0ff"
                        class="blue-b"
                    >
                    </v-rating> -->

                    
                    <v-row>
                        <v-col  
                            v-for="(rating, key) in ratings"
                            :key="key"
                            :align-self="center"
                            lg="4"
                            md="6"
                            sm="12"
                            xs="12"
                        >
                            <v-row align="center">
                                
                                    <div v-bind:style="styleSize" class="ma-2">
                                        {{ rating.skill }}
                                    </div>
                                    <v-rating
                                        :model-value="rating.value"
                                        readonly="true"
                                        color="#82b0ff"
                                    >
                                    </v-rating>

                            </v-row>
                        </v-col>
                    </v-row>               
            </v-col>
        </v-row>
    </v-card>
    <v-card
        class="mx-auto"
        shaped="true"
        
    >
        <v-row class="blue-b" justify="start">
            <v-col class="red-b" cols="5"> 資格
                <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    height="200px"
                ></v-img>
            </v-col>

            <v-col class="green-b" cols="7">
                <v-list
                    :items="qualifications"
                    item-title="name"
                ></v-list>
            </v-col>
        </v-row>
    </v-card>
    </div>
  </v-component>
</template>

<script>
export default {

    data() {
        return {
            maxsize: '100px',
            // styleSize: { 勉強用に残しておく
            //     width: "",
            //     color: "red"
            // },
            ratings: [
                { skill: "Java", value: "3" },
                { skill: "Docker", value: "2" },
                { skill: "Vue", value: "1" },
            ],
            qualifications: [
                { name: "ITパスポート" },
                { name: "基本情報技術者" },
                { name: "普通自動車免許" }
            ]
        }
    },
    computed : {
        styleSize() {
            return {
                width: this.maxsize,
            }
        }
    },
    created() {
        this.maxsize = this.calcSkilTextSize()

        // this.styleSize.width = this.maxsize 直接指定する場合はオブジェクトの中まで指定する
        // this.calcSkilTextSize();

        console.log(this.maxsize)
    },
    methods :{
        calcSkilTextSize() {
            const maxLength = Math.max(...this.ratings.map(item => item.skill.length)) * 10
            return String(maxLength) + "px";
        }
    }
}
</script>

<style>
    .blue-b{
        border: 1px blue solid
    }
</style>