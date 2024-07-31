<template>
  <CommunityCenter :rooms="rooms"/>
</template>

<script setup>
  import CommunityCenter from '@/components/CommunityCenter.vue'
  const roomsString = localStorage.getItem("rooms")
  const rooms = JSON.parse(roomsString)
</script>