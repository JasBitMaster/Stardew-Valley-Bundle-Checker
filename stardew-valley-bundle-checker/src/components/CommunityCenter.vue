<template>
  <v-container class="fill-height fill-width">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="960"
    >
      <canvas width="960rem" height="540rem" id="canvas">
        
      </canvas>
    </v-responsive>
  </v-container>
  <AppFooter />
</template>

<script setup>
  import AppFooter from '@/components/AppFooter.vue'

  function startUp() {
    let img = new Image()
    img.src = "src/assets/sprites/JunimoNote.png"
    img.onload = function() {
      loadCanvas(img)
    }
  }
    function loadCanvas(img) { 
    let canvas = document.getElementById("canvas")
    let context = canvas.getContext("2d")
    context.imageSmoothingEnabled = false
    context.drawImage(img, 0,0,320,180,0,0,960,540)
  }

  startUp()

</script>

<style scoped>
#image {
  margin:auto
}
</style>