<template>
  <canvas width="960px" height="540px" z-index="0" id="canvas" />
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

</script>

<style scoped>

</style>