import { defineNuxtPlugin } from '#app';
import { useAlert } from './alert.composable';
import AlertsContainer from './AlertsContainer.vue';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.component('AlertsContainer', AlertsContainer);
    nuxtApp.provide('alert', useAlert());
})