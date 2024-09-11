<template>
    <nav class="left-panel-navigation">
        <div class="left-panel-navigation-container">
            <div class="nav-element-logo">
                <img src="@/assets/svgs/oberschulen-fallmerayer-pure-logo.svg" style="width: 2.3em;"
                    class="oberschulen-fallmerayer-logo">
                <span class="nav-element-description">
                    <span style="display: block; font-size: 0.9em; line-height: 0.9em;overflow:hidden">Oberschulen
                        Fallmerayer</span>
                    <span
                        style="display: block; font-size: 0.9em; font-weight: 700; line-height: 1em;">Schulbibliothek</span>
                </span>
            </div>
            <div class="nav-element-logo">
                <img src="@/assets/svgs/lesepreis-logo.png" class="lesepreis-logo" height="52">
                <span class="nav-element-description">
                    <span style="display: block; font-size: 1.2em; line-height: 1.2em;">Lesepreis</span>
                    <span style="display: block; font-size: 1.2em; font-weight: 600; line-height: 1.2em;">Verwaltung</span>
                </span>
            </div>
            <nav class="app-navigation-list">
                <NavElement to="/students-leaderboard" text="Rangliste"><img src="@/assets/svgs/icon-people-group.svg">
                </NavElement>
                <NavElement to="/books" text="Bücher"><img src="@/assets/svgs/icon-books.svg"> </NavElement>
                <NavElement to="/manage" text="Verwalten"><img src="@/assets/svgs/icon-manage.svg"> </NavElement>
                <NavElement to="/settings" text="Einstellungen"><img src="@/assets/svgs/icon-settings.svg"> </NavElement>
                <!--NavElement to="/settings" text="Einstellungen"><img src="@/assets/svgs/icon-settings.svg"> </NavElement-->
            </nav>
            <div class="ps">
                <!--erstellt von<br style="font-size: 1em;">
                <span style="font-weight: 600;font-size: 1em;">
                    Divina Sandra<br style="font-size: 1em;">
                </span><br style="font-size: 1em;">
                <a target="_blank" href="https://github.com/4AT-TP-19-20/projekt-lesepreisui" style="font-size: 1em;">inspiriert <img class="icon-link" src="@/assets/svgs/icon-link.svg"></a> von<br>
                <span style="font-weight: 400;font-size: 1em;">
                    Manuel Ploner<br style="font-size: 1em;">
                    Mattia Galiani<br style="font-size: 1em;">
                    Maximilian Mitterrutzner</span
        
                    BESSER BEIM STARTBILDSHIRM
        
            -->
                <div>Fragen? Probleme? Wünsche?<br>
                    <a href="#" @click="contact">Kontakieren Sie den Entwickler
                        <img src="@/assets/svgs/icon-support.svg"></a>
                </div>
            </div>
            <RouterLink to="/" class="exit-link" @click="resetName">
                <div class="nav-element" id="return-to-main-menu">
                    <img src="@/assets/svgs/icon-sign-out.svg">
                    <span class="nav-element-description">Zum Startbildschirm</span>
                </div>
            </RouterLink>
        </div>
        <!-- <div class="left-panel-navigation-slider">
            <img src="@/assets/svgs/icon-slider-left.svg">
        </div> -->
    </nav>
</template>

<style>
.exit-link:hover {
    text-decoration: none;
}
</style>

<script>
import NavElement from "@/components/NavElement.vue"
const { ipcRenderer } = require('electron')

export default {
    components: {
        NavElement
    },

    methods: {
        contact: function () {
            require('electron').shell.openExternal('https://github.com/serafimpear/lesepreis/issues');
        },

        resetName: function () {
            console.log('resetting name');
            ipcRenderer.send("changeTitleYear", false);
        }
    }
}
</script>