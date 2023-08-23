<template>
    <RouterLink :to="to">
        <div class="nav-element">
            <div class="nav-element-vertical-line"></div>
            <slot></slot>
            <span class="nav-element-description">{{ text }}</span>
        </div>
    </RouterLink>
</template>

<script>
export default {
    props: [ 'text', 'to'],
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: inherit;
}

a:visited {
    color: inherit;
}
</style>

<style>
div.nav-element {
    height: 40px;
    display: flex;
    align-items: center;
    column-gap: 20px;
    margin-left: -24px;
}

div.nav-element img {
    width: 40px;
}

nav.left-panel-navigation:hover div.nav-element#return-to-main-menu,
nav.left-panel-navigation:active div.nav-element#return-to-main-menu {
    margin-left: -7px;
}

nav.left-panel-navigation:hover div.nav-element,
nav.left-panel-navigation:active div.nav-element {
    margin-left: 0;
}

nav.left-panel-navigation span.nav-element-description,
nav.left-panel-navigation span.nav-element-description {
    overflow: hidden;
    width: 0;
    display: inline-block;
    line-break: loose;
}

nav.left-panel-navigation:hover span.nav-element-description,
nav.left-panel-navigation:active span.nav-element-description {
    width: 220px;
}

div.nav-element div.nav-element-vertical-line {
    width: 5px;
    height: 100%;
}

a.router-link-active div.nav-element-vertical-line {
    background: black;
}

a.router-link-active span.nav-element-description {
    font-weight: 600;
}
</style>