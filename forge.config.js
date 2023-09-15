const path = require('path');

module.exports = {
    name: "Lesepreis Verwaltung",
    author: "Serafim Thaler, David Mairhofer, Elias Walter Ebner",
    description: "Eine App, basiert auf vue.js und electron.js für die Verwaltung vom Lesepreis in den Oberschulen Fallmerayer",
    exe: `lesepreis-verwaltung.exe`,
    iconUrl: "https://raw.githubusercontent.com/serafimpear/lesepreis/SQLite-Test/lesepreis-logo.ico",
    owners: "serafim thaler",
    setupExe: `lesepreis-verwaltung-installer.exe`,
    setupIcon: "lesepreis-logo.ico",
    loadingGif: "loading-animation.gif",
    packagerConfig: {
        asar: true,
    },
    electronPackagerConfig: {
        icon: path.resolve(__dirname, 'lesepreis-logo.ico')
    },
    rebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {},
        },
        {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin'],
        },
        {
            name: '@electron-forge/maker-deb',
            config: {},
        },
        {
            name: '@electron-forge/maker-rpm',
            config: {},
        },
    ],
    plugins: [
        {
            name: '@electron-forge/plugin-auto-unpack-natives',
            config: {},
        },
    ],
};
