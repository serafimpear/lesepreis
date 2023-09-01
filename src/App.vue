<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LeftPanelNavigation from '@/components/LeftPanelNavigation.vue'
import TitleBar from '@/components/TitleBar.vue'
</script>

<template>
    <TitleBar />
    <div id="root">
        <LeftPanelNavigation />
        <RouterView />
    </div>
</template>

<style scoped></style>
