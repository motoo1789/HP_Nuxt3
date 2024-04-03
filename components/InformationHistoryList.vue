<template>
  <div>
    <v-card
        class="mx-auto"
        shaped="true"
    >
        <v-row>
            <v-col class="green-b" >
                <v-card-title class="color text-h5">
                  新着情報
                </v-card-title>
                <v-divider></v-divider>
                <v-expansion-panels>
                  <v-expansion-panel
                      v-for="(newinformation, key) in informationhisotory[currentpage - 1].contents"
                      :key="key"
                  >
                    <v-expansion-panel-title >{{ newinformation.updateDate }}   {{ newinformation.abstract }}</v-expansion-panel-title>
                    <v-expansion-panel-text class="msg-wrapper">{{ newinformation.detail }}</v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
            </v-col>
        </v-row>
    </v-card>
  </div>
</template>

<script setup lang="ts">

  const { getInformationContents } = informationContents();
  const informationhisotory = await getInformationContents();

  const { currentpage } = useCurrentPage();

</script>

<style>
.msg-wrapper {
  white-space: pre-line;
}
</style>