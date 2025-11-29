<script setup lang="ts">

  const confirmation = useConfirmation();
  const alert = useAlert();

</script>

<template>
  <div class="container mx-auto mt-1">
    <button class="btn" @click="alert.info('afaf')">Toatsed</button>
    <button class="btn" @click="confirmation.show('Title', 'Message', 'ph-alien')">Modal</button>
  </div>
</template>