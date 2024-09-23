<template>
  <!-- Initialize title image -->
  <CanvasSprite :sprite-type="'title'" :sprite="sprites[0]" :width="800" :height="400" :layer="0"/>
  <!-- Initialize title scroll -->
  <CanvasSprite :sprite-type="'scroll'" :sprite="sprites[1]" :width="960" :height="54" :layer="2"/>
  <!-- Initialize golden scroll -->
  <CanvasSprite :sprite-type="'loader'" :sprite="sprites[2]" :width="90" :height="84"
    :layer="2" :name="sprites[2].name" @click="scrollPress"/>
</template>

<script setup>
  import CanvasSprite from '@/components/CanvasSprite.vue'
  import { onBeforeMount, onBeforeUpdate } from 'vue';

  const emit = defineEmits(['scrollPress'])

  var sprites = []    // Holds currently loaded sprites

  /* Loads sprite data before page attempts to load references */
  function init() {
    //Load background texture
    sprites.push(genSprite(0,"Title", 80, 0))
    //Load room reward textures
    let titleSprite = genSprite(0,"Cursors", 0, 400)
    titleSprite.name = "Bundle Checker"
    sprites.push(titleSprite)
    //Load room reward textures
    let scrollSprite = genSprite(0,"Cursors", 432, 500)
    scrollSprite.name = "To find save file (Windows):\n" + "Search \"%AppData%\" then\n" +
    "go to /Stardew Valley/saves,\n" + "and select file with farm name"
    sprites.push(scrollSprite)
  }
  /* Generates a new sprite object based on the provided data */
  function genSprite(spriteIndex, texture, offsetX, offsetY) {
    return {index: spriteIndex, texture: texture, offsetX: offsetX, offsetY: offsetY}
  }
  /*  */
  function scrollPress() {
    emit("scrollPress")
  }
  /* Initializes page for startup */
  onBeforeMount(init)
  onBeforeUpdate(init)
</script>

<style scoped>

</style>