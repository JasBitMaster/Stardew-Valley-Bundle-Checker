<template>
  <v-container class="fill-height fill-width">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="960"
    >
      <div class="text-center">
        <v-img
          class="mb-4"
          height="300"
          src="@/assets/imgs/logo.png"
        />
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
      
      <v-img
        @click="clickInput"
        class="mb-4"
        height="96"
        width="96"
        id="image"
        src="@/assets/imgs/Golden_Scroll.png"
      />
      <input @change="loadData" accept="plain/text" type="file" id="file" name="file" hidden/>
    </v-responsive>
  </v-container>
  <AppFooter />
</template>

<script setup>
  import { useRouter } from 'vue-router';
  import { loadFile } from '../scripts/dataParser.js'
  import AppFooter from '@/components/AppFooter.vue'

  const router = useRouter()

  function clickInput() {
    document.getElementById("file").click()
  }
  async function loadData(evt) {
    loadFile(evt).then((rooms) => {
      console.log("Rooms: " + JSON.stringify(rooms))
      localStorage.setItem("rooms", JSON.stringify(rooms))
      router.push({name:"bundle"})
    })
  }
</script>

<style scoped>
#border {
  border:15px solid transparent;
  border-image: url(src/assets/imgs/menu_border.png) 15 stretch;
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
</style>