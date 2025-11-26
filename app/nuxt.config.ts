import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	css: ["./app/styles.css"],
	vite: { plugins: [tailwindcss(),], },
	plugins: ['~/app/features/popups/alert/alert.plugin.ts'],
});