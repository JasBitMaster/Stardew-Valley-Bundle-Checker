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
  <CanvasSprite :sprite-type="'itemSlot'" :sprite="sprites[4]"
    :width="204" :height="60" :layer="4" v-if="bundle.slots <=0"/>
  <!-- Initialize items -->
  <template v-for="(item, index) in bundle.items">
    <CanvasSprite sprite-type="item" :sprite="itemSprites[index]"
      :width="54" :height="54" :layer="4" :name="item.name"/>
  </template>
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

  const itemCenterX = (233 - 8) * scaler    // X position used to place item slot
  const itemCenterY = (90 - 8) * scaler    // Y position used to place center slot
  const itemOffsetX = (8 + 2) * scaler      // X offset per slot
  const itemOffsetY = (8 + 2) * scaler      // Y offset per row of slots

  var sprites = []        // Holds currently loaded sprites
  var slotSprites = []    // Holds currently slot sprites
  var itemSprites = []    // Holds currently slot sprites

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
    genObjs(slotSprites, props.bundle.slots, slotCenterX, slotCenterY, slotOffsetX, slotOffsetY)
    if(props.bundle.slots <= 0) {
      sprites.push(genSprite(0,"JunimoNote",slotCenterX - 75, slotCenterY - 3))
    }
    //TODO - load items
    genObjs(itemSprites, props.bundle.items.length, itemCenterX, itemCenterY, itemOffsetX, itemOffsetY)
    itemSprites.forEach((sprite, index)=> {
      sprite.index = props.bundle.items[index].spriteIndex
      sprite.texture = props.bundle.items[index].texture
      sprite.item = props.bundle.items[index]
    })
  }
  /* Generates a new sprite object based on the provided data */
  function genSprite(spriteIndex, texture, offsetX, offsetY) {
    return {index: spriteIndex, texture: texture, offsetX: offsetX, offsetY: offsetY}
  }
  /* Generates sprites for each object, positioned based on number of objects */
  function genObjs(array, count, centerX, centerY, offsetX, offsetY) {
    let positionX = []    // Object x positions
    let positionY = []    // Object y positions
    let startingX = 0     // Leftmost x position for row
    let startingY = 0     // Topmost y position for row

    if(count > 4) {
      let firstRow = Math.ceil(count / 2)   //Length of first row (always longest)
      let secondRow = count - firstRow      //Length of second row (always short)
      //Calculate starting position
      startingX = centerX - (offsetX * (firstRow - 1))
      startingY = centerY - offsetY
      //Generate first row of sprite offsets
      for(let i = 0; i < firstRow; i++) {
        positionX.push(startingX + offsetX * i * 2)
        positionY.push(startingY)
      }
      //Generate second row of sprite offsets
      startingX = centerX - (offsetX * (secondRow - 1))
      for(let i = 0; i < secondRow; i++) {
        positionX.push(startingX + offsetX * i * 2)
        positionY.push(startingY + offsetY * 2)
      }
    } else {
      //Calculate starting position
      startingX = centerX - (offsetX * (count - 1))
      //Generate row of sprite offsets
      for(let i = 0; i < count; i++) {
        positionX.push(startingX + offsetX * i * 2)
        positionY.push(centerY)
      }
    }
    //Generate sprites based on offsets
    for (let i = 0; i < count; i++) {
      array.push(genSprite(1,"JunimoNote", positionX[i], positionY[i]))
    }
  }

  /* Navigates back to previous page */
  function exit() {
    emit('close', props.index)
  }
  /* Initializes page for startup */
  onBeforeMount(init)

  /*
  Animation Code: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations
  Timeout Timer:  https://developer.mozilla.org/en-US/docs/Web/API/setInterval
  */
</script>

<style scoped>

</style>