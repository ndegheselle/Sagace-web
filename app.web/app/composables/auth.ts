import type { User } from "@prisma/client"

export const useAuth = () => {
    const user = useState<User>('user', () => null)

    const login = async (email: string, password: string) => {
        const data = await $fetch('/api/auth/login', {
            method: 'POST',
            body: { email, password }
        });
        user.value = data;
    }

    const logout = async () => {
        await $fetch('/api/auth/logout', { method: 'POST' });
        user.value = null;
        navigateTo('/user/login');
    }

    const fetchUser = async () => {
        try {
            user.value = await $fetch('/api/auth/user');
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