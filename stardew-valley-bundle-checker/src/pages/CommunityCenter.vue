<template>
  <CommunityCenter :rooms="rooms"/>
</template>

<script setup>
  import CommunityCenter from '@/components/CommunityCenter.vue'
  import { onMounted } from 'vue';

  const props = defineProps(["rooms"])

  onMounted(() => {
    console.log(props.rooms)
  })
</script>