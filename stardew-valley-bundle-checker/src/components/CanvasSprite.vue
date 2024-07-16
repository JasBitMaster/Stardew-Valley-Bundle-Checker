<template>
  <canvas width="{{ width }}" height="{{ height }}" z-index="{{ layer }}" id="canvas" />
</template>

<script setup>
  
  function startUp() {
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

  export default {
    props: {
      spriteIndex:  { type: Number },
      texture:      { type: String },
      width:        { type: Number },
      height:       { type: Number },
      layer:        { type: Number },
    }
  }

</script>

<style scoped>

</style>