const path = require('path');

module.exports = {
  packagerConfig: {
    asar: true,
    icon: 'lesepreis-logo'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: "https://raw.githubusercontent.com/serafimpear/lesepreis/SQLite-Test/lesepreis-logo.ico",
        owners: "serafim thaler",
        setupIcon: path.resolve(__dirname, 'lesepreis-logo.ico'),
        loadingGif: "loading-animation.gif",
      },
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
