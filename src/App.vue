<template>
  <v-app>
    <v-main id="bg">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
    
</script>

<style>
#bg {
  cursor: url('./assets/imgs/Cursor.png'), auto;
  background: url('@/assets/imgs/stardewbackground.png') no-repeat center center fixed;
  background-size: cover;
}
template {
  cursor: url('./assets/imgs/Cursor.png'), default;
}
a {
  cursor: url('@/assets/imgs/Cursor.png'), default;
}

@font-face {
    font-family: "sv-bold";
    src: url('./assets/fonts/svbold.ttf');
}
@font-face {
    font-family: "sv-thin";
    src: url('./assets/fonts/svthin.ttf');
}
</style>