<template>
  <!-- Initialize background -->
  <CanvasSprite :sprite-type="'background'" :sprite="sprites[0]" :width="960" :height="540" :layer="3"/>
  <!-- Initialize back buttons -->
  <CanvasSprite :sprite-type="'navigation'" :sprite="sprites[1]" @click="exit"
    :width="36" :height="36" :layer="4"/>
  <CanvasSprite :sprite-type="'navigation'" :sprite="sprites[2]" @click="exit"
    :width="36" :height="36" :layer="4"/>
  <!-- Initialize bundle icon -->
  <CanvasSprite :sprite-type="'bundleIcon'" :sprite="sprites[3]" :width="96" :height="96" :layer="4"/>
  <!-- Initialize slots -->
  <template v-for="n in bundle.slots">
    <CanvasSprite sprite-type="itemSlot" :sprite="slotSprites[n-1]"
      :width="54" :height="54" :layer="4"/>
  </template>
  <!-- Initialize items -->
  <!--
  <template v-for="n in bundle.slots">
    <CanvasSprite sprite-type="itemSlot" :sprite="slotSprites[n-1]"
      :width="54" :height="54" :layer="4"/>
  </template>
  -->
</template>

<script setup>
  import CanvasSprite from '@/components/CanvasSprite.vue'
  import { onBeforeMount } from 'vue';

  const props = defineProps({
    bundle: {
      bundleName:   {type: String},
      texture:      {type: String},
      reward:       {type: Object}, 
      colorIndex:   {type: Number},
      slots:        {type: Number},
      spriteIndex:  {type: Number},
      items:        [],
    },
    index:          {type: Number},
  })
  const emit = defineEmits(['close'])

  const scaler = 3                          // Image scaling rate
  const slotCenterX = (233 - 9) * scaler    // X position used to place center slot
  const slotCenterY = (135 - 9) * scaler    // Y position used to place center slot
  const slotOffsetX = (9 + 1) * scaler      // X offset per slot
  const slotOffsetY = (9 + 1) * scaler      // Y offset per row of slots

  var sprites = []        // Holds currently loaded sprites
  var slotSprites = []    // Holds currently slot sprites

  /* Loads sprite data before page attempts to load references */
  function init() {
    //Load background texture
    let bgSprite = genSprite(1,"JunimoNote",0,0)
    bgSprite.name = props.bundle.bundleName
    sprites.push(bgSprite)
    //Load navigation buttons
    sprites.push(genSprite(1,"Cursors",64,64))
    sprites.push(genSprite(0,"Cursors",920,4))
    //Load bundle icon
    sprites.push(genSprite(props.bundle.spriteIndex, props.bundle.texture, 655, 66))
    //Load item slots
    genSlots(props.bundle.slots)
    //TODO - load items

  }
  /* Generates a new sprite object based on the provided data */
  function genSprite(spriteIndex, texture, offsetX, offsetY) {
    return {index: spriteIndex, texture: texture, offsetX: offsetX, offsetY: offsetY}
  }
  /* Generates sprites for each slot, positioned based on number of slots */
  function genSlots(count) {
    let offsetX = []      // Slot x positions
    let offsetY = []      // Slot y positions
    let startingX = 0     // Leftmost x position for row
    let startingY = 0     // Topmost y position for row

    if(count > 4) {
      let firstRow = Math.ceil(count / 2)   //Length of first row (always longest)
      let secondRow = count - firstRow      //Length of second row (always short)
      //Calculate starting position
      startingX = slotCenterX - (slotOffsetX * (firstRow - 1))
      startingY = slotCenterY - slotOffsetY
      //Generate first row of sprite offsets
      for(let i = 0; i < firstRow; i++) {
        offsetX.push(startingX + slotOffsetX * i * 2)
        offsetY.push(startingY)
      }
      //Generate second row of sprite offsets
      startingX = slotCenterX - (slotOffsetX * (secondRow - 1))
      for(let i = 0; i < secondRow; i++) {
        offsetX.push(startingX + slotOffsetX * i * 2)
        offsetY.push(startingY + slotOffsetY * 2)
      }
    } else {
      //Calculate starting position
      startingX = slotCenterX - (slotOffsetX * (count - 1))
      //Generate row of sprite offsets
      for(let i = 0; i < count; i++) {
        offsetX.push(startingX + slotOffsetX * i * 2)
        offsetY.push(slotCenterY)
      }
    }
    //Generate sprites based on offsets
    for (let i = 0; i < count; i++) {
      slotSprites.push(genSprite(1,"JunimoNote",offsetX[i],offsetY[i]))
    }
  }

  /* Navigates back to previous page */
  function exit() {
    emit('close', props.index)
  }
  /* Initializes page for startup */
  onBeforeMount(init)
</script>

<style scoped>

</style>