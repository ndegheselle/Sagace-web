
export const useAuth = () => {
    const { loggedIn, user, fetch: refreshSession, clear: clearSession } = useUserSession();

    const login = async (email: string, password: string) => {
        await $fetch('/api/auth/login', {
            method: 'POST',
            body: { email, password }
        });
        await refreshSession();
    }

    const logout = async () => {
        clearSession();
        await navigateTo('/user/login');
    }

    return {
        isLoggedIn: loggedIn,
        user,
        login,
        logout,
        refresh: fetch
    };
}