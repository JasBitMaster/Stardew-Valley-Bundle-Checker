<template>
  <div class="canvas">
    <canvas :style="{top: sprite.offsetY +'px', left: sprite.offsetX +'px', zIndex:layer}" ref="myCanvas"
    :width=" width +'px'" :height="height +'px'" @mousemove="drawTooltip">
    </canvas>
    <span class="tooltip" ref="tooltipSpan" id="border">Test</span>
  </div>
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
    name:         { type: String },
  })

  const myCanvas = ref(null)    // Current canvas to draw on
  const context = ref(null)     // 2DContext of current canvas
  const tooltipSpan = ref(null)

  /* Initializes context values and loads texture */
  function startUp() {
    context.value = myCanvas.value.getContext("2d")
    context.value.font = "32px sv-bold"
    context.value.textBaseline = "middle"
    context.value.textAlign = "center"
    tooltipSpan.value.innerText = props.name
    tooltipSpan.value.style.display = 'none'
    loadImage()
  }
  /* Draws sprite to the canvas */
  function loadImage() {
    drawSprite(context, props.spriteType, props.sprite)
  }
  /* Draws tooltip for items with tooltips */
  function drawTooltip(event) {
    if (tooltipSpan.value.innerText != "undefined") {
      let x = event.clientX,
          y = event.clientY
      //Set tooltip position according to mouse position
      tooltipSpan.value.style.top = (y + 10) + 'px'
      tooltipSpan.value.style.left = (x + 10) + 'px'
      tooltipSpan.value.style.display = 'block'
    } else {
      tooltipSpan.value.style.display = 'none'
    }
  }

  onMounted(startUp)
</script>

<style scoped>
canvas {
  position: absolute;
}
.tooltip {
  display: none;
}

#border {
  border:15px solid transparent;
  border-image: url(../assets/imgs/menu_border.png) 15 stretch;
  border-radius: 15px;
  max-width: fit-content;
  background-color: #F6B569;
  background-clip: border-box;
  padding: 8px;
  font-family: 'sv-thin';
  font-weight: bold;
  font-size: 2rem;
  color: #000;
}

.canvas:hover .tooltip {
  z-index: 10;
  display: block;
  position: fixed;
  overflow: hidden;
}
</style>