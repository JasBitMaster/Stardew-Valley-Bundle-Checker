<template>
  <v-container class="fill-height fill-width">
    <v-responsive
      class="align-centerfill-height mx-auto" max-width="960">
      <v-responsive position="relative" width="960px" height="610px">
        <CanvasLoader @scroll-press="clickInput"/>
      </v-responsive>
    </v-responsive>
  </v-container>
  <input @change="loadData" accept="plain/text" type="file" id="file" name="file" hidden/>
  <AppFooter />
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { loadFile } from '../scripts/dataParser.js'
  import AppFooter from '@/components/AppFooter.vue'
  import CanvasLoader from './CanvasLoader.vue'

  const router = useRouter()

  /* Clicks file loader when scroll image is clicked */
  function clickInput() {
    document.getElementById("file").click()
  }
  /* Loads bundle data from save file then stores it and navigates to main page */
  async function loadData(evt) {
    loadFile(evt).then((fileData) => {
      console.log("Rooms: " + JSON.stringify(fileData.rooms))
      localStorage.setItem("rooms", JSON.stringify(fileData.rooms))
      router.push({name:"bundle"})
    })
  }
</script>

<style scoped>

</style>