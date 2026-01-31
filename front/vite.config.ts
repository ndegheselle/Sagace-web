import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        tailwindcss()
    ],
    server: {
        host: true,
        port: Number(process.env.PORT),
        watch: {
            usePolling: true
        }
    },
    resolve: {
        alias: {
            '@common': fileURLToPath(new URL('./@common', import.meta.url)),
            '@features': fileURLToPath(new URL('./features', import.meta.url)),
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
})
