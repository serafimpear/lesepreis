import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'fs';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require ('path')

// https://vitejs.dev/config/
export default defineConfig({
    base: '',
    plugins: [
        vue(),
    ],
    define: {
        'process.env.VITE_APP_VERSION': JSON.stringify(
            JSON.parse(readFileSync('./package.json')).version
        )
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})