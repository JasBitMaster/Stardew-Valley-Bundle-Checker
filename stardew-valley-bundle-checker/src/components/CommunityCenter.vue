<template>
  <v-container class="fill-height fill-width">
    <v-responsive
      class="align-centerfill-height mx-auto" max-width="960">
      <v-responsive position="relative" width="960px" height="540px">
        <!-- Initialize background -->
        <CanvasSprite :sprite-index="1" texture="JunimoNote" sprite-type="background"
          :offset-x="0" :offset-y="0" :width="960" :height="540" :layer="0"/>
        <!--
        <template v-for="(room, index) in rooms">
          <CanvasSprite :sprite-index="room.colorIndex" texture="JunimoNote" sprite-type="background"
            :offset-x="100" :offset-y="100" :width="16" :height="16" :layer="1"/>
        </template>
        -->
      </v-responsive>
    </v-responsive>
  </v-container>
  <AppFooter />
</template>

<script setup>
  import AppFooter from '@/components/AppFooter.vue'
  import CanvasSprite from '@/components/CanvasSprite.vue';



  const props = defineProps(
  {
    rooms:  [],
  }
)

</script>

<style scoped>

</style>