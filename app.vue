<template>
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

const layout = "default"

export default defineComponent({
  setup() {
    
  },
})
</script>
