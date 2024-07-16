<template>
  <v-container class="fill-height fill-width">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="960"
    >
      <v-responsive position="relative" width="960px" height="540px">
        <template>

        </template>
        <CanvasBackground />
        <canvas width="960px" height="270px" z-index="1" v-tooltip="'Test'" />
      </v-responsive>
    </v-responsive>
  </v-container>
  <AppFooter />
</template>

<script setup>
  import AppFooter from '@/components/AppFooter.vue'
  import CanvasBackground from '@/components/CanvasBackground.vue'

</script>

<style scoped>
#image {
  margin:auto
}
canvas {
  position: absolute;
}
</style>