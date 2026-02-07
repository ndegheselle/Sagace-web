<script lang="ts" setup>
defineProps<{
  modelValue: string,
  label: string,
  error?: {message: string}
}>();

defineEmits(['update:modelValue']);
defineOptions({
  inheritAttrs: false
});
</script>

<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
    </label>

    <input
      class="input input-bordered w-full"
      :class="{ 'input-error': error }"
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <small v-if="error" class="text-error mt-1">
      <i class="fa-solid fa-triangle-exclamation"></i>
      {{ error.message }}
    </small>
  </div>
</template>