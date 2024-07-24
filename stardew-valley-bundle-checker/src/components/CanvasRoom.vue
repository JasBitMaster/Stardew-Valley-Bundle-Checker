<template>
  <!-- Initialize background -->
  <CanvasSprite :sprite-type="'background'" :sprite="sprites[0]" :width="960" :height="540" :layer="0"/>
  <!-- Initialize background -->
  <CanvasSprite :sprite-type="'navigation'" :sprite="sprites[1]" @click="onArrowPress('left')"
    :width="36" :height="36" :layer="2"/>
  <CanvasSprite :sprite-type="'navigation'" :sprite="sprites[2]" @click="onArrowPress('right')"
    :width="36" :height="36" :layer="2"/>
  <!-- Initialize bundles -->
  <template v-for="(bundle, index) in room.bundles">
    <CanvasSprite sprite-type="bundle" :sprite="bundleSprites[index]"
      :width="48" :height="48" :layer="1"/>
  </template>
</template>

<script setup>
  import CanvasSprite from '@/components/CanvasSprite.vue'
  import { onBeforeMount, onMounted, onUpdated } from 'vue';

  const props = defineProps({
    room:  {
      roomIndex: { type: String },
      bundles: []
    },
    index: { type: Number }
  })
  const emit = defineEmits(['updated','mounted', 'arrowPress'])

  const bundleOffsets =                           // Position offsets for each bundle
  [{x:444,y:100},{x:294,y:287},{x:588,y:291},
  {x:228,y:189},{x:669,y:189},{x:441,y:206}]

  var sprites = []                                // Holds currently loaded sprites
  var bundleSprites = []                          // Holds currently loaded bundle sprites

  /* Loads sprite data before page attempts to load references */
  function init() {
    //Load background texture
    let bgSprite = genSprite(0,"JunimoNote",0,0)
    bgSprite.name = props.room.roomIndex
    sprites.push(bgSprite)
    //Load arrow textures
    sprites.push(genSprite(1,"Cursors",64,16))
    sprites.push(genSprite(2,"Cursors",860,16))
    //Load bundle textures
    props.room.bundles.forEach((bundle, index) => {
      let newSprite = genSprite(bundle.colorIndex, "JunimoNote", 
        bundleOffsets[index].x, bundleOffsets[index].y)
      bundleSprites.push(newSprite)
    });
  }
  /* Generates a new sprite object based on the provided data */
  function genSprite(spriteIndex, texture, offsetX, offsetY) {
    return {index: spriteIndex, texture: texture, offsetX: offsetX, offsetY: offsetY}
  }
  /* Navigates forward or backward on pages */
  function onArrowPress(direction) {
    emit("arrowPress", direction)
  }
  /* Loads new page based on bundle clicked */
  function onBundlePress() {
    
  }
  /* Notifies parent that page has loaded */
  function startUp() {
    emit("mounted")
  }

  /* Initializes page for startup */
  onBeforeMount(init)
  onMounted(startUp)
  onUpdated(emit("updated"))
</script>

<style scoped>

</style>