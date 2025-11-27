<script setup lang="ts">
const { alerts, close } = useAlert();
</script>

<template>
    <div class="fixed left-0 right-0 top-0 z-1000">


        <div role="alert" class="alert m-2" v-for="alert in alerts" :key="alert.id" :class="{
            'alert-info': alert.type === EnumPopupType.Info,
            'alert-warning': alert.type === EnumPopupType.Warning,
            'alert-error': alert.type === EnumPopupType.Error,
            'alert-success': alert.type === EnumPopupType.Success
        }">
            <i class="ph-xl" :class="{
                'ph-info ': alert.type === EnumPopupType.Info,
                'ph-warning-circle': alert.type === EnumPopupType.Warning || alert.type === EnumPopupType.Error,
                'ph-check-circle': alert.type === EnumPopupType.Success
            }" />
            <span>{{ alert.message }}</span>
            <button @click="close(alert.id)" class="btn btn-sm btn-ghost btn-circle" aria-label="close"><i
                    class="ph-x ph-lg" /></button>
        </div>

    </div>
</template>