export default defineNuxtRouteMiddleware(async (to) => {
    const publicPages = ['/user/login'];
    if (publicPages.includes(to.path)) {
        return
    }
    
    const { user, fetchUser } = useAuth();
    if (!user.value)
        await fetchUser();
    if (!user.value)
        return navigateTo('/user/login');
})