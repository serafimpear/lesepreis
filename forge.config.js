module.exports = {
  "name": "Lesepreis Verwaltung",
  "author": "Serafim Thaler, David Mairhofer",
  "description": "Eine App, basiert auf vue.js und electron.js für die Verwaltung vom Lesepreis in den Oberschulen Fallmerayer",
  "exe": "lesepreis_verwaltung.exe",
  "iconUrl": "",
  packagerConfig: {
    asar: false,
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
