<template>
  <!-- Initialize background -->
  <CanvasSprite :sprite-type="'background'" :sprite="sprites[0]" :width="960" :height="540" :layer="3"/>
  <!-- Initialize back buttons -->
  <CanvasSprite :sprite-type="'navigation'" :sprite="sprites[1]" @click="exit"
    :width="36" :height="36" :layer="4"/>
  <CanvasSprite :sprite-type="'navigation'" :sprite="sprites[2]" @click="exit"
    :width="36" :height="36" :layer="4"/>
  <!-- Initialize bundle icon -->
  <CanvasSprite :sprite-type="'bundleIcon'" :sprite="sprites[3]" :width="96" :height="96" :layer="4"/>
  <!--
  <template v-for="(bundle, index) in room.bundles">
    <CanvasSprite sprite-type="bundle" :sprite="bundleSprites[index]"
      :width="48" :height="48" :layer="1"/>
  </template>
  -->
</template>

<script setup>
  import CanvasSprite from '@/components/CanvasSprite.vue'
  import { onBeforeMount } from 'vue';

  const props = defineProps({
    bundle: {
      bundleName:   {type: String},
      texture:      {type: String},
      reward:       {type: Object}, 
      colorIndex:   {type: Number},
      slots:        {type: Number},
      spriteIndex:  {type: Number},
      items:        [],
    },
    index:          {type: Number},
  })
  const emit = defineEmits(['close'])

  var sprites = []    // Holds currently loaded sprites

  /* Loads sprite data before page attempts to load references */
  function init() {
    //Load background texture
    let bgSprite = genSprite(1,"JunimoNote",0,0)
    bgSprite.name = props.bundle.bundleName
    sprites.push(bgSprite)
    //Load navigation buttons
    sprites.push(genSprite(1,"Cursors",64,64))
    sprites.push(genSprite(0,"Cursors",920,4))
    //Load bundle icon
    sprites.push(genSprite(props.bundle.spriteIndex, props.bundle.texture, 655, 66))
    //TODO - load slots
    
    //TODO - load items

  }
  /* Generates a new sprite object based on the provided data */
  function genSprite(spriteIndex, texture, offsetX, offsetY) {
    return {index: spriteIndex, texture: texture, offsetX: offsetX, offsetY: offsetY}
  }
  /* Navigates back to previous page */
  function exit() {
    emit('close', props.index)
  }
  /* Initializes page for startup */
  onBeforeMount(init)
</script>

<style scoped>

</style>