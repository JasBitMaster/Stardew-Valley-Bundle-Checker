<template>
  <!-- Initialize background -->
  <CanvasSprite :sprite-type="'background'" :sprite="sprites[0]" :width="960" :height="540" :layer="0"/>
  <!-- Initialize bundles -->
  <template v-for="(bundle, index) in room.bundles">
    <CanvasSprite sprite-type="bundle" :sprite="bundleSprites[index]"
      :width="48" :height="48" :layer="1"/>
  </template>
</template>

<script setup>
  import CanvasSprite from '@/components/CanvasSprite.vue'
  import { onBeforeMount, onMounted } from 'vue';

  const props = defineProps({
    room:  {
      roomIndex: { type: String },
      bundles: []
    },
    index: { type: Number }
  })
  const emit = defineEmits(['mounted', 'arrowPress'])

  const bundleOffsets = [{x:444,y:100},{x:294,y:287},{x:588,y:291},{x:228,y:189},{x:669,y:189},{x:441,y:206}]
  var sprites = []
  var bundleSprites = []

  function init() {
    let tempSprite = genSprite(0,"JunimoNote",0,0)
    tempSprite.name = props.room.roomIndex
    sprites.push(tempSprite)

    //TODO: Load other fixed elements

    props.room.bundles.forEach((bundle, index) => {
      tempSprite = genSprite(bundle.colorIndex, bundle.texture, bundleOffsets[index].x, bundleOffsets[index].y)
      bundleSprites.push(tempSprite)
    });
  }
  function genSprite(index, texture, offsetX, offsetY) {
    return {index: index, texture: texture, offsetX: offsetX, offsetY: offsetY}
  }
  function startUp() {
    emit("mounted")
  }
  function onBundlePress(bundleIndex) {

  }
  function onArrowPress() {
    
  }
  //Initializes page for startup
  onBeforeMount(init)
  onMounted(startUp)
</script>

<style scoped>

</style>