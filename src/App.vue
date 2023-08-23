<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LeftPanelNavigation from '@/components/LeftPanelNavigation.vue'
</script>

<template>
  <div id="root">
    <div id="smallscreen">SMALLSCREEN</div>
      <LeftPanelNavigation />
      <RouterView />
  </div>
</template>

<style scoped>
</style>
