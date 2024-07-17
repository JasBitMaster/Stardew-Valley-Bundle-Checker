<template>
  <v-container class="fill-height fill-width">
    <v-responsive
      class="align-centerfill-height mx-auto" max-width="960">
      <v-responsive position="relative" width="960px" height="540px">
        <CanvasSprite :sprite-index="0" texture="test" :offset-x="0" 
          :offset-y="0" :width="960" :height="540" :layer="0"/>
      </v-responsive>
    </v-responsive>
  </v-container>
  <AppFooter />
</template>

<script setup>
  import AppFooter from '@/components/AppFooter.vue'
  import CanvasSprite from '@/components/CanvasSprite.vue';

</script>

<style scoped>

</style>