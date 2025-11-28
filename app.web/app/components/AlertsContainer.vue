<script setup lang="ts">
const { alerts, close } = useAlert();
</script>

<template>
    <div class="toast toast-top toast-center">
        <div role="alert" class="alert m-2" v-for="alert in alerts" :key="alert.id" :class="{
            'alert-info': alert.type === EnumAlertType.Info,
            'alert-warning': alert.type === EnumAlertType.Warning,
            'alert-error': alert.type === EnumAlertType.Error,
            'alert-success': alert.type === EnumAlertType.Success
        }">
            <i class="ph-xl" :class="{
                'ph-info ': alert.type === EnumAlertType.Info,
                'ph-warning-circle': alert.type === EnumAlertType.Warning || alert.type === EnumAlertType.Error,
                'ph-check-circle': alert.type === EnumAlertType.Success
            }" />
            <span>{{ alert.message }}</span>
            <button @click="close(alert.id)" class="btn btn-sm btn-ghost btn-circle" aria-label="close"><i
                    class="ph-x ph-lg" /></button>
        </div>
    </div>
</template>