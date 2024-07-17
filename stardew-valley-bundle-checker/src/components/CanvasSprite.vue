<template>
  <canvas :style="{top: offsetX +'px', left: offsetY +'px'}" ref="myCanvas"
    :width=" width +'px'" :height="height +'px'" :z-index="layer" />
</template>

<script setup>
  import { loadBackground } from '@/scripts/spriteParser.js'
  import { onMounted, ref } from 'vue';

  console.log("Running...")

  const props = defineProps(
    {
      spriteIndex:  { type: Number },
      texture:      { type: String },
      offsetX:      { type: Number },
      offsetY:      { type: Number },
      width:        { type: Number },
      height:       { type: Number },
      layer:        { type: Number },
    }
  )
  const myCanvas = ref(null)
  const context = ref(null)

  function startUp() {
    console.log("Mounted...")
    context.value = myCanvas.value.getContext("2d")
    loadImage()
  }

  function loadImage() {
    loadBackground(context, 0)
  } 

  onMounted(startUp)
</script>

<style scoped>
canvas {
  position: absolute;
}
</style>