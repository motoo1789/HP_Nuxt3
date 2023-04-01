<template>
  <div class="text-center">
    <v-pagination
        v-model="currentpage"
        :length=pageLength
        :total-visible="5"
        @input="onPageChange"
    ></v-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentpage: 1,
            pageLength: 0,
        }
    }
}
</script>

<style>

</style>