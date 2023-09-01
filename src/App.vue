<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LeftPanelNavigation from '@/components/LeftPanelNavigation.vue'
import TitleBar from '@/components/TitleBar.vue'
</script>

<template>
    <TitleBar />
    <div id="root">
        <div id="smallscreen">SMALLSCREEN</div>
        <LeftPanelNavigation />
        <RouterView />
    </div>
</template>

<style scoped></style>
