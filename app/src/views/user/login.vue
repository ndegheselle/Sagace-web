<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuth } from '@/composables/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const { login } = useAuth();

const credentials = reactive({
    email: 'john.doe@example.com',
    password: 'password123'
});

const error = ref('');
const isLoading = ref(false);

async function onLogin() {
    isLoading.value = true;
    error.value = '';
    try {
        await login(credentials.email, credentials.password);
        router.push('/');
    } catch (e: any) {
        error.value = e.data?.message || 'Login failed';
    } finally {
        isLoading.value = false;
    }
}

</script>

<template>
    <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto mt-2 mb-auto">
        <legend class="fieldset-legend text-2xl">Connexion</legend>

        <label class="label">Email</label>
        <input type="email" class="input" placeholder="Email" :class="{ 'input-error': !!error }"
            v-model="credentials.email" />

        <span class="label">Password</span>
        <input type="password" class="input" placeholder="Password" :class="{ 'input-error': !!error }"
            v-model="credentials.password" />
        <small class="text-error" v-if="error">
            <i class="fa-solid fa-triangle-exclamation"></i>
            {{ error }}
        </small>


        <button class="btn btn-primary mt-4" :disabled="isLoading" @click="onLogin">
            <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
            Connexion
        </button>
    </fieldset>
</template>