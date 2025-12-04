
import type { User } from "#shared/models";

export const useAuth = () => {
    const { loggedIn, user, fetch: refreshSession, clear: clearSession } = useUserSession();
    const alert = useAlert();

    const login = async (email: string, password: string) => {
        await $fetch<User>('/api/auth/login', {
            method: 'POST',
            body: { email, password }
        });
        await refreshSession();
    }

    const logout = async () => {
        clearSession();
        await navigateTo('/user/login');
        alert.success('You have been logged out.');
    }

    return {
        isLoggedIn: loggedIn,
        user,
        login,
        logout,
        refresh: fetch
    };
}