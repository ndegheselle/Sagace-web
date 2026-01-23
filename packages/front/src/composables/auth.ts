import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { User, api } from '@/data/auth';
import { api as usersApi } from '@/data/users';

const isLoggedIn = ref(false);
const user = ref<User | null>();
export const useAuth = () => {
    const router = useRouter();

    const login = async (email: string, password: string) => {
        user.value = await api.login(email, password);
        isLoggedIn.value = user.value != null;
    }

    const logout = async () => {
        await api.logout();
        user.value = null;
        isLoggedIn.value = user.value != null;
        router.push('/user/login');
    }

    const refresh = async () => {
        try {
            const me = await usersApi.get(); // cookie is sent automatically
            user.value = me;
            isLoggedIn.value = true;
        } catch (err) {
            user.value = null;
            isLoggedIn.value = false;
        }
        return isLoggedIn.value;
    }

    return {
        isLoggedIn,
        user,
        login,
        logout,
        refresh
    };
}