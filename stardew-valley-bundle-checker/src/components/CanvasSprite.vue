<template>
  <canvas :style="{top: sprite.offsetY +'px', left: sprite.offsetX +'px'}" ref="myCanvas"
    :width=" width +'px'" :height="height +'px'" :z-index="layer" />
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

  const myCanvas = ref(null)
  const context = ref(null)

  function startUp() {
    console.log("Mounted...")
    context.value = myCanvas.value.getContext("2d")
    loadImage()
  }
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