<template>
  <v-container class="fill-height fill-width">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
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

      <div class="py-16"></div>
      <div class="py-8"></div>

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
      <input @change="loadFile" accept="plain/text" type="file" id="file" name="file" hidden/>
    </v-responsive>
  </v-container>
  <v-footer
  app="true"
  color="#262626B0"
  >
  <v-col class="text-center">
    Programmed by <a href="">JasBitMaster</a>
  </v-col>
  <v-divider class="border-opacity-100" inset="20px" thickness="2px" color="white" vertical />
  <v-col class="text-center">
    Inspired by <a href="">Blade</a>, <a href="">ArgonMatrix</a>, and the
    <br>rest of the Stardew Valley Community
  </v-col>
  <v-divider class="border-opacity-100" inset="20px" thickness="2px" color="white" vertical />
  <v-col class="text-center">
    Stardew Valley, including all game assets,
    <br>belongs to <a href="">ConcernedApe</a>
  </v-col>
  </v-footer>
</template>

<script setup>
  import { loadFile } from '../scripts/dataParser.js';

  function clickInput() {
    document.getElementById("file").click()
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
  font-family: 'sdv-text';
  font-size: x-large;
  text-shadow: black 2px 2px 5px;
}
</style>