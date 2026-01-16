<script setup lang="ts">
import AlertsContainer from '@/components/popups/AlertsContainer.vue';
import ConfirmationModal from '@/components/popups/ConfirmationModal.vue';
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
                        <li>
                            <RouterLink to="/documents/estimates"><i class="fa-solid fa-file-invoice"></i>Devis
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/documents/invoices"><i class="fa-solid fa-file-invoice-dollar"></i>Factures
                            </RouterLink>
                        </li>
                        <li>
                            <h2 class="menu-title">Préstations</h2>
                            <ul>
                                <li>
                                    <RouterLink to="/articles"><i class="fa-solid fa-boxes-stacked"></i>Articles
                                    </RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/services"><i class="fa-solid fa-screwdriver-wrench"></i>Services
                                    </RouterLink>
                                </li>
                            </ul>
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
                    <li>
                        <RouterLink to="/documents/estimates"><i class="fa-solid fa-file-invoice"></i>Devis</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/documents/invoices"><i class="fa-solid fa-file-invoice-dollar"></i>Factures
                        </RouterLink>
                    </li>
                    <li>
                        <details>
                            <summary>Préstations</summary>
                            <ul class="bg-base-100 rounded-t-none p-2">
                                <li>
                                    <RouterLink to="/articles"><i class="fa-solid fa-boxes-stacked"></i>Articles
                                    </RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/services"><i class="fa-solid fa-screwdriver-wrench"></i>Services
                                    </RouterLink>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>

            <div class="navbar-end">
                <div v-if="isLoggedIn" class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-circle avatar">
                        <div class="rounded-full text-lg">
                            <i class="fa-solid fa-user "></i>
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