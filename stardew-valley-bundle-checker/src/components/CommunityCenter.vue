<template>
  <v-container class="fill-height fill-width">
    <v-responsive
      class="align-centerfill-height mx-auto" max-width="960">
      <v-responsive position="relative" width="960px" height="540px">
        
        <template v-for="(room, index) in rooms">
          <div style="display: none;" :ref="addRef">
            <CanvasRoom :room="room" :index="index" @updated="() => { pagesLoaded = 0 }"
              @mounted="loadConfirm" @arrowPress="onArrowPress"/>
          </div>
        </template>
       <!--
        <CanvasRoom :room="rooms[1]" :index="1"/>
         -->
      </v-responsive>
    </v-responsive>
  </v-container>
  <AppFooter />
</template>

<script setup>
  import AppFooter from '@/components/AppFooter.vue'
  import CanvasRoom from '@/components/CanvasRoom.vue'

  const props = defineProps({
    rooms:  [],
  })
  const roomRefs = []

  var currentPage = 1   // The currently visible page
  var pagesLoaded = 0   // How many subpages have loaded

  /* Navigates forward or back a page */
  function onArrowPress(direction) {
    let newPage = currentPage
    //Determine new page
    if(direction == "left") {
      newPage -= 1
    } else {
      newPage += 1
    }
    //Clamp to page count
    if(newPage < 0) {
      newPage = props.rooms.length - 1
    }
    if(newPage >= props.rooms.length) {
      newPage = 0
    }
    togglePage(newPage)
  }
  /* Switches which bundle page is currently visible */
  function togglePage(page) {
    roomRefs[page].style = "display: inherit;"
    if(currentPage != page) {
      roomRefs[currentPage].style = "display: none;"
      currentPage = page
    }
  }
  /* Loads references for subpages */
  function addRef(el) {
    roomRefs.push(el)
  }
  /* Makes first bundle visible once all subpages have loaded */
  function loadConfirm() {
    pagesLoaded += 1
    console.log(pagesLoaded)
    if(pagesLoaded >= props.rooms.length) {
      togglePage(0)
    }
  }
</script>

<style scoped>

</style>