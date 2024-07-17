<template>
  <canvas :style="{top: offsetX +'px', left: offsetY +'px'}"
    :width=" width +'px'" :height="height +'px'" :z-index="layer"  id="canvas" />
</template>

<script setup>
  import { defineProps } from 'vue'

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
  
  function startUp() {
    console.log(props.width + " " + props.height + " " + props.layer)
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
canvas {
  position: absolute;
}
</style>