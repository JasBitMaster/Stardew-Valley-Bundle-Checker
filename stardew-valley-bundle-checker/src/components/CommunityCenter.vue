<template>
  <v-container class="fill-height fill-width">
    <v-responsive
      class="align-centerfill-height mx-auto" max-width="960">
      <v-responsive position="relative" width="960px" height="540px">
        <!--
        <template v-for="(room, index) in rooms">
          <CanvasRoom :room="room" />
        </template>
      -->
        <CanvasRoom />
      </v-responsive>
    </v-responsive>
  </v-container>
  <AppFooter />
</template>

<script setup>
  import AppFooter from '@/components/AppFooter.vue'
  import CanvasRoom from '@/components/CanvasRoom.vue'



  const props = defineProps({
    rooms:  [],
  })

</script>

<style scoped>

</style>