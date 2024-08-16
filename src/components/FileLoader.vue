<template absolute>

      <div class="text-center">
        <v-img class="mb-4" height="300" src="@/assets/imgs/logo.png" />
        <div id="border">
          <h1 class="text-h2">Bundle Checker</h1>
        </div>
      </div>

      <div class="py-12"></div>

      <div class="text-center">
        <div id="border">
          <p>Press the scroll to load a save file...</p>
        </div>
      </div>
    
      <div class="button" @mousemove="drawTooltip" >
        <v-img height="96" width="96" id="image" src="@/assets/imgs/Golden_Scroll.png"
        @click="clickInput">
        </v-img>
        <span class="tooltip" ref="tooltipSpan" id="border">Test</span>
      </div>
      
      <input @change="loadData" accept="plain/text" type="file" id="file" name="file" hidden/>

  
  <AppFooter />
  
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { loadFile } from '../scripts/dataParser.js'
  import AppFooter from '@/components/AppFooter.vue'
  import CanvasSprite from './CanvasSprite.vue'
  import { ref } from 'vue'

  const router = useRouter()
  const tooltipSpan = ref(null)

  /* Clicks file loader when scroll image is clicked */
  function clickInput() {
    document.getElementById("file").click()
  }
  /* Loads bundle data from save file then stores it and navigates to main page */
  async function loadData(evt) {
    loadFile(evt).then((rooms) => {
      console.log("Rooms: " + JSON.stringify(rooms))
      localStorage.setItem("rooms", JSON.stringify(rooms))
      router.push({name:"bundle"})
    })
  }
  /* Draws tooltip for items with tooltips */
  function drawTooltip(event) {
    let x = event.clientX,
        y = event.clientY
    //Set tooltip position according to mouse position
    tooltipSpan.value.style.top = (y - 700) + 'px'
    tooltipSpan.value.style.left = (x - 600) + 'px'
  }
</script>

<style scoped>
  #border {
    border:15px solid transparent;
    border-image: url(../assets/imgs/menu_border.png) 15 stretch;
    border-radius: 15px;
    max-width: fit-content;
    background-color: #F6B569;
    background-clip: border-box;
    padding: 12px;
    position: relative;
    margin: auto;
  }

  #image {
    margin:auto
  }

  h1, p {
    font-family: 'sv-bold';
    font-size: x-large;
    text-shadow: black 2px 2px 5px;
  }

  .tooltip {
    display: none;
  }

  .button:hover .tooltip {
    z-index: 10;
    font-family: 'sv-thin';
    font-weight: bold;
    font-size: 2rem;
    color: #000;
    display: block;
    position: fixed;
    overflow: hidden;
  }
</style>