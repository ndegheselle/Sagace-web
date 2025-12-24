import { useRouter } from 'vue-router';
import { ref } from 'vue';

import { User, api } from '@/lib/api/auth';
import { fakeUser } from '@/lib/api/auth/auth.fake';

export const useAuth = () => {
    const router = useRouter();
    const isLoggedIn = ref(true);
    const user = ref<User | null>(fakeUser);

    const login = async (email: string, password: string) => {
        user.value = await api.login(email, password);
        isLoggedIn.value = user.value != null;
    }

    const logout = async () => {
        user.value = null;
        isLoggedIn.value = user.value != null;
        router.push('/user/login');
    }

    return {
        isLoggedIn,
        user,
        login,
        logout,
        refresh: fetch
    };
}