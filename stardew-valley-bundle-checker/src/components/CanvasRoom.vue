<template>
  <!-- Initialize background -->
  <!--
  <CanvasSprite :sprite-index="0" texture="JunimoNote" sprite-type="background"
    :offset-x="0" :offset-y="0" :width="960" :height="540" :layer="0"/>
  -->
  <CanvasSprite :sprite-type="'background'" :sprite="sprites[0]" :width="960" :height="540" :layer="0"/>


  <!--
  <template v-for="(bundle, index) in room.bundles">
    <CanvasSprite sprite-type="bundle" :sprite=""
      :width="48" :height="48" :layer="1"/>
  </template>
  -->
</template>

<script setup>
  import CanvasSprite from '@/components/CanvasSprite.vue'
  import { onBeforeMount, onMounted } from 'vue';

  const props = defineProps({
    room:  {
      roomIndex: { type: String },
      bundles: []
    },
  })

  const bundleOffsets = [{x:0,y:0},{x:100,y:0},{x:200,y:0},{x:300,y:0},{x:400,y:0},{x:500,y:0}]
  var sprites = []
  var bundleSprites = []

  

  function init() {
    let tempSprite = {index: "", texture: "", offsetX: "", offsetY: ""}

    tempSprite.index = 0
    tempSprite.texture = "JunimoNote"
    tempSprite.offsetX = 0
    tempSprite.offsetY = 0
    sprites.push(tempSprite)

    //Load other fixed elements
  }

  function startUp() {
    let tempSprite = {index: "", texture: "", offsetX: "", offsetY: ""}
    /*
    props.room.bundles.forEach((bundle, index) => {
      tempSprite.index = bundle.colorIndex
      tempSprite.texture = bundle.texture
      tempSprite.offsetX = bundleOffsets[index].x
      tempSprite.offsetY = bundleOffsets[index].y
      bundleSprites.push(tempSprite)
    }); */
  }

  function onBundlePress(bundleIndex) {

  }
  function onArrowPress() {

  }
  //Initializes page for startup
  onBeforeMount(init)
  onMounted(startUp)

  /*
  https://vuejs.org/guide/components/props.html
  https://vuejs.org/guide/components/events
  https://router.vuejs.org/guide/essentials/navigation.html
  */
</script>

<style scoped>

</style>