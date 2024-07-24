<template>
  <v-container class="fill-height fill-width">
    <v-responsive
      class="align-centerfill-height mx-auto" max-width="960">
      <v-responsive position="relative" width="960px" height="540px">
        
        <template v-for="(room, index) in rooms">
          <div style="display: none;" :ref="addRef">
            <CanvasRoom :room="room" :index="index" @mounted="loadConfirm"/>
          </div>
        </template>
        <!--
        <CanvasRoom :room="rooms[0]" />
        -->
      </v-responsive>
    </v-responsive>
  </v-container>
  <AppFooter />
</template>

<script setup>
  import AppFooter from '@/components/AppFooter.vue'
  import CanvasRoom from '@/components/CanvasRoom.vue'
  import { onMounted } from 'vue';

  const props = defineProps({
    rooms:  [],
  })
  const roomRefs = []
  var currentPage = 2
  var pagesLoaded = 0

  function onArrowPress() {
    
  }
  function loadConfirm() {
    pagesLoaded += 1
    if(pagesLoaded >= props.rooms.length) {
      togglePage(0)
    }
  }
  function togglePage(page) {
    roomRefs[page].style = "display: inherit;"
    roomRefs[currentPage].style = "display: none;"
    currentPage = page
  }
  function addRef(el) {
    roomRefs.push(el)
  }
</script>

<style scoped>
  CanvasRoom {
    display: none;
  }
</style>