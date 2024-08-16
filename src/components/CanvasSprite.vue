<template>
  <div class="canvas">
    <canvas :style="{top: sprite.offsetY +'px', left: sprite.offsetX +'px', zIndex:layer}"
    :width=" width +'px'" :height="height +'px'" ref="myCanvas"
    @mousemove="drawTooltip" @mouseenter="startAnimate" @mouseleave="endAnimate">
    </canvas>
    <span class="tooltip" ref="tooltipSpan" id="border">Test</span>
  </div>
</template>

<script setup>

  import { animateSprite, drawSprite } from '@/scripts/spriteParser.js'
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

  const myCanvas = ref(null)      // Current canvas to draw on
  const context = ref(null)       // 2DContext of current canvas
  const tooltipSpan = ref(null)   //Sprite's tooltip

  let currentFrame = 0
  let animateID = null

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
      tooltipSpan.value.style.top = (y - 10) + 'px'
      tooltipSpan.value.style.left = (x - 10) + 'px'
      tooltipSpan.value.style.display = 'block'
    } else {
      tooltipSpan.value.style.display = 'none'
    }
  }
  /* Starts the sprite animating on begin hover */
  function startAnimate() {
    if(props.spriteType == "bundle" || props.spriteType == "reward") {
      if(!animateID) {
        animateID = setInterval(() => animate, 250)
      }
    }
  }
  /* Stops the sprite animating on exit hover */
  function endAnimate() {
    if(props.spriteType == "bundle" || props.spriteType == "reward") {
      clearInterval(animateID)
      animateID = null

      context.clearRect(0, 0, props.width, props.height)
      loadImage()
    }
  }
  /* Animates the object by advancing frame and redrawing */
  function animate() {
    currentFrame++
    if(currentFrame >= 4) {
      currentFrame = 0
    }
    animateSprite(context, props.width, props.height, currentFrame, props.spriteType, props.sprite)
  }

  onMounted(startUp)
</script>

<style scoped>
  canvas {
    position: absolute;
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
  .tooltip {
    display: none;
  }
  .canvas:hover .tooltip {
    z-index: 10;
    display: block;
    position: fixed;
    overflow: hidden;
  }
</style>