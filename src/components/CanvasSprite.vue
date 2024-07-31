<template>
  <canvas :style="{top: sprite.offsetY +'px', left: sprite.offsetX +'px', zIndex:layer}" ref="myCanvas"
    :width=" width +'px'" :height="height +'px'" />
</template>

<script setup>

  import { drawSprite } from '@/scripts/spriteParser.js'
  import { onMounted, ref } from 'vue';

  console.log("Running...")

  const props = defineProps({
    sprite:       { type: Object },
    spriteType:   { type: String },
    width:        { type: Number },
    height:       { type: Number },
    layer:        { type: Number },
  })

  const myCanvas = ref(null)    // Current canvas to draw on
  const context = ref(null)     // 2DContext of current canvas

  /* Initializes context values and loads texture */
  function startUp() {
    context.value = myCanvas.value.getContext("2d")
    context.value.font = "32px sv-bold"
    context.value.textBaseline = "middle"
    context.value.textAlign = "center"
    loadImage()
  }
  /* Draws sprite to the canvas */
  function loadImage() {
    drawSprite(context, props.spriteType, props.sprite)
  }

  onMounted(startUp)
</script>

<style scoped>
canvas {
  position: absolute;
}
</style>