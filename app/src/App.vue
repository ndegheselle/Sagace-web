<script setup lang="ts">
import ConfirmationModal from './components/popups/ConfirmationModal.vue';
import AlertsContainer from './components/popups/AlertsContainer.vue';
import { useAuth } from '@/composables/auth';

const { isLoggedIn, user, logout } = useAuth();
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <nav class="navbar bg-base-300 shadow-sm">
            <div class="flex-1">
                <div class="dropdown">
                    <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                        <i class="fa-solid fa-bars-staggered"></i>
                    </div>
                    <ul tabindex="-1"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <RouterLink to="/clients"><i class="fa-solid fa-users"></i>Clients</RouterLink>
                        </li>
                    </ul>
                </div>

                <RouterLink to="/" class="btn btn-ghost text-xl">Sagace</RouterLink>
            </div>

            <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal px-1">
                    <li>
                        <RouterLink to="/clients"><i class="fa-solid fa-users"></i> Clients</RouterLink>
                    </li>
                </ul>
            </div>

            <div class="navbar-end">
                <div v-if="isLoggedIn" class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://i.pravatar.cc" />
                        </div>
                    </div>
                    <ul tabindex="-1"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li class="menu-title">{{ user?.name }}</li>
                        <li><a @click="logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</a></li>
                    </ul>
                </div>
                <ul v-else class="menu menu-horizontal px-1">
                    <li>
                        <RouterLink to="/user/login"><i class="fa-solid fa-user"></i> Login</RouterLink>
                    </li>
                </ul>
            </div>
        </nav>

        <main class="flex flex-1">
            <RouterView />
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