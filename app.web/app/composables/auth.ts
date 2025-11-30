
import type { User } from "#shared/models";

export const useAuth = () => {
    const user = useState<User | null>('user', () => null)

    const login = async (email: string, password: string) => {
        user.value = await $fetch<User>('/api/auth/login', {
            method: 'POST',
            body: { email, password }
        });
    }

    const logout = async () => {
        await $fetch('/api/auth/logout', { method: 'POST' });
        user.value = null;
        navigateTo('/user/login');
    }

    const fetchUser = async () => {
        try {
            user.value = await $fetch<User>('/api/auth/user');
        } catch (error) {
            user.value = null;
        }
    }

    return {
        user,
        login,
        logout,
        fetchUser
    };
}