export default defineNuxtPlugin((nuxtApp) => {
return {
    provide: {
      alert: useAlert(),
    },
  }
})