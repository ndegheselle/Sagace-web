<script setup>
import { useAlert } from './alert.composable';

const { alerts } = useAlert()
</script>

<template>
  <div class="fixed top-4 right-4 space-y-2 z-50">
    <div
      v-for="alert in alerts.stack"
      :key="alert.id"
      class="px-4 py-2 rounded text-white shadow"
      :class="{
        'bg-blue-600': alert.type === EnumAlertType.Info,
        'bg-green-600': alert.type === EnumAlertType.Success,
        'bg-red-600': alert.type === EnumAlertType.Error
      }"
    >
      {{ alert.message }}
    </div>
  </div>
</template>