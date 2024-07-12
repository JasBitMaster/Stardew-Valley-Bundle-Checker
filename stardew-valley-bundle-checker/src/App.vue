<template>
  <v-app>
    <v-main id="bg">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  //
</script>

<style>
#bg {
  background: url('@/assets/imgs/stardewbackground.png') no-repeat center center fixed;
  background-size: cover;
}
@font-face {
    font-family: "sdv-text";
    src: url('./assets/fonts/Stardew_Valley.ttf');
}
</style>