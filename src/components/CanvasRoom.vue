<template>
  <!-- Initialize background -->
  <CanvasSprite :sprite-type="'background'" :sprite="sprites[0]" :width="960" :height="540" :layer="0"/>
  <!-- Initialize arrows -->
  <CanvasSprite :sprite-type="'navigation'" :sprite="sprites[1]" @click="onArrowPress('left')"
    :width="36" :height="36" :layer="2"/>
  <CanvasSprite :sprite-type="'navigation'" :sprite="sprites[2]" @click="onArrowPress('right')"
    :width="36" :height="36" :layer="2"/>
  <!-- Initialize bundles -->
  <template v-for="(bundle, index) in room.bundles">
    <CanvasSprite sprite-type="bundle" :sprite="bundleSprites[index]" :name="bundle.bundleName + ' Bundle'"
      :width="48" :height="48" :layer="1" @click="bundlePress(index)" />
      <div style="display: none;" :ref="addRef">
        <CanvasBundle :bundle="bundle" :index="index" @close="exitPress"/>
      </div>
  </template>
  <!-- Initialize scroll -->
  <CanvasSprite :sprite-type="'scroll'" :sprite="sprites[3]" :width="960" :height="54" :layer="5"/>
</template>

<script setup>
  import CanvasSprite from '@/components/CanvasSprite.vue'
  import CanvasBundle from './CanvasBundle.vue';
  import { onBeforeMount, onBeforeUpdate, onMounted, onUpdated } from 'vue';

  const props = defineProps({
    room:  {
      roomIndex: { type: String },
      reward:    { type: String },
      bundles: []
    },
    index: { type: Number }
  })
  const bundleRefs = []

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
    let scrollSprite = genSprite(0,"Cursors", 0, 556)
    //TODO - overwrite with actual reward
    scrollSprite.name = "Reward: " + props.room.reward
    sprites.push(scrollSprite)
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
  /* Loads popup page based on bundle clicked */
  function bundlePress(bundleIndex) {
    bundleRefs[bundleIndex].style = "display: inherit;"
  }
  /* Hide popup page on exit */
  function exitPress(bundleIndex) {
    bundleRefs[bundleIndex].style = "display: none;"
  }
  /* Loads references for subpages */
  function addRef(el) {
    bundleRefs.push(el)
  }
  /* Notifies parent that page has loaded */
  function startUp() {
    emit("mounted")
  }
  /* Initializes page for startup */
  onBeforeMount(init)
  onMounted(startUp)
  onBeforeUpdate(init)
  onUpdated(emit("updated"))
</script>

<style scoped>

</style>