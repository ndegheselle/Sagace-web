export default defineNuxtRouteMiddleware(async (to) => {
    const publicPages = ['/user/login'];
    if (publicPages.includes(to.path)) {
        return
    }
    
    const { isLoggedIn } = useAuth();
    if (isLoggedIn.value != true)
        return navigateTo('/user/login');
})