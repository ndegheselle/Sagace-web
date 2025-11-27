<script setup lang="ts">
// alternatively, you can also use it here
const { $alert } = useNuxtApp();
</script>

<template>
  <div>
    <button class="btn" @click="$alert.info('afaf')">Toasted</button>
  </div>
</template>