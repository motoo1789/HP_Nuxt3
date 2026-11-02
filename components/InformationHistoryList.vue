<template>
  <div>
    <v-card class="mx-auto" shaped="true">
      <v-row class="blue-b">
        <v-col class="green-b">
          <v-card-title class="color text-h5"> 新着情報 </v-card-title>
          <v-divider></v-divider>
          <v-progress-linear
            v-if="loading"
            indeterminate
            color="light-blue-accent-3"
            class="my-2"
          />
          <v-expansion-panels v-else>
            <v-expansion-panel
              v-for="(newinformation, key) in currentPageContents"
              :key="key"
            >
              <v-expansion-panel-title>
                {{ newinformation.updateDate }} {{ newinformation.abstract }}
              </v-expansion-panel-title>
              <v-expansion-panel-text class="msg-wrapper">
                {{ newinformation.detaile }}
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { InformationFields } from "~/composables/informationhistory";

const { parseUpdateInformation } = useUpdateInformation();
const { currentpage } = useCurrentPage();

const loading = ref(true);
const informationhisotory = ref<Array<{ page: number; contents: InformationFields[] }>>([]);

onMounted(async () => {
  try {
    informationhisotory.value = await parseUpdateInformation();
  } finally {
    loading.value = false;
  }
});

const currentPageContents = computed(
  () => informationhisotory.value[currentpage.value - 1]?.contents ?? [],
);
</script>

<style>
.msg-wrapper {
  white-space: pre-line;
}
</style>
