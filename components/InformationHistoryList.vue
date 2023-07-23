<template>
  <div>
    <v-card
        class="mx-auto"
        shaped="true"
    >
        <v-row class="blue-b" >
            <v-col class="green-b" >
                <v-card-title>
                  新着情報
                </v-card-title>
                <v-divider></v-divider>
                <v-expansion-panels>
                  <v-expansion-panel
                      v-for="(newinformation, key) in informationhisotory[currentpage - 1].contents"
                      :key="key"
                  >
                  <!-- HACK: -するの好きじゃないのでどうにかしたい -->
                     <v-expansion-panel-title>{{ newinformation.updateDate }}   {{ newinformation.abstract }}</v-expansion-panel-title>
                  <v-expansion-panel-text>{{ newinformation.detaile }}</v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
        </v-row>
    </v-card>
  </div>
</template>

<script setup lang="ts">

const { parseUpdateInformation } = getUpdateInformation();
const informationhisotory = await parseUpdateInformation();
console.log(informationhisotory.length)

const { currentpage } = useCurrentPage();

</script>

<style>

</style>