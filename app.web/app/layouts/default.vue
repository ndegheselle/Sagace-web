<script setup lang="ts">
const { isLoggedIn, user, logout } = useAuth();
console.log('Layout checking user authentication...', isLoggedIn.value, user.value?.target.name);
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <nav class="navbar bg-base-300 shadow-sm">
            <div class="flex-1">
                <NuxtLink to="/" class="btn btn-ghost text-xl">Sagace</NuxtLink>
            </div>

            <div class="flex-none">
                <div v-if="isLoggedIn" class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul tabindex="-1"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li class="menu-title"></li>
                        <li><a @click="logout"><i class="ph-sign-out" /> Logout</a></li>
                    </ul>
                </div>
                <ul v-else class="menu menu-horizontal px-1">
                    <li>
                        <NuxtLink to="/user/login"><i class="ph-user" /> Login</NuxtLink>
                    </li>
                </ul>
            </div>
        </nav>

        <main class="flex">
            <slot />
        </main>

        <footer class="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 mt-auto">
            <aside>
                <p>
                    Copyright © {{ new Date().getFullYear() }} - Sagaced
                </p>
            </aside>
        </footer>

        <ConfirmationModal />
        <AlertsContainer />
    </div>
</template>