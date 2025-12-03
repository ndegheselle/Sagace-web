<script setup lang="ts">
const { login } = useAuth();

const credentials = reactive({
    email: '',
    password: ''
});

const error = ref('');
const isLoading = ref(false);

async function onLogin() {
    isLoading.value = true;
    error.value = '';
    try {
        await login(credentials.email, credentials.password);
        navigateTo('/');
    } catch (e: any) {
        error.value = e.data?.message || 'Login failed';
    } finally {
        isLoading.value = false;
    }

}

</script>

<template>
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 m-auto mt-4">
        <legend class="fieldset-legend">Login</legend>

        <label class="label">Email</label>
        <input type="email"
               class="input"
               placeholder="Email"
               :class="{ 'input-error': !!error }"
               v-model="credentials.email" />

        <span class="label">Password</span>
        <input type="password"
               class="input"
               placeholder="Password"
               :class="{ 'input-error': !!error }"
               v-model="credentials.password" />
        <small class="text-error"
               v-if="error">
            <i class="ph-warning"></i>
            {{ error }}
        </small>


        <button class="btn btn-primary mt-4"
                :disabled="isLoading"
                @click="onLogin">
            <span v-if="isLoading"
                  class="loading loading-spinner loading-sm"></span>
            Login
        </button>
    </fieldset>
</template>