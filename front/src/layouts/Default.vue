<script setup lang="ts">
import AlertsContainer from '@common/components/popups/AlertsContainer.vue';
import ConfirmationModal from '@common/components/popups/ConfirmationModal.vue';
import { useAuth } from '@common/composables/auth';
import { getLogo } from '@common/data/companies';

const { isLoggedIn, user, logout } = useAuth();

let isDark = JSON.parse(localStorage.getItem('isdark') ?? 'false');
function toggleTheme(dark: boolean) {
    localStorage.setItem('isdark', JSON.stringify(dark));
    isDark = dark;
}
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <nav class="navbar bg-base-300 shadow-sm">
            <div class="navbar-start">
                <div class="dropdown">
                    <div tabindex="0"
                         role="button"
                         class="btn btn-ghost lg:hidden">
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

                <RouterLink to="/"
                            class="text-xl">
                    <div v-if="isLoggedIn">
                        <div class="avatar">
                            <div v-if="user?.expand.company.logo"
                                 class="w-10 rounded-xl">
                                <img :src="getLogo(user?.expand.company)" />
                            </div>
                            <div v-else
                                 class="w-10 flex items-center justify-center text-2xl">
                                <i class="fa-solid fa-image"></i>
                            </div>
                        </div>
                        <span class="ms-2">{{ user?.expand.company.name || 'Entreprise' }}</span>
                    </div>
                </RouterLink>
            </div>
            <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal px-1">
                    <li>
                        <RouterLink to="/clients"><i class="fa-solid fa-users"></i> Clients</RouterLink>
                    </li>
                    <li class="indicator">
                        <span class="indicator-item badge badge-secondary badge-xs"></span>
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
                <button class="btn btn-ghost btn-circle avatar me-1">
                    <label class="swap swap-rotate">
                        <input type="checkbox"
                               class="theme-controller"
                               :checked="isDark"
                               value="corporate"
                               @change="() => toggleTheme(!isDark)" />
                        <i class="swap-on fa-solid fa-sun"></i>
                        <i class="swap-off fa-solid fa-moon"></i>
                    </label>
                </button>
                <div v-if="isLoggedIn"
                     class="dropdown dropdown-end">
                    <div tabindex="0"
                         role="button"
                         class="btn btn-circle avatar">
                        <div class="rounded-full text-lg">
                            <i class="fa-solid fa-user "></i>
                        </div>
                    </div>
                    <ul tabindex="-1"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li class="menu-title">{{ user?.email }}</li>
                        <li>
                            <RouterLink to="/user/profil">
                                <i class="fa-solid fa-address-card"></i> Profil</RouterLink>
                        </li>
                        <li><a @click="logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</a></li>
                    </ul>
                </div>
                <ul v-else
                    class="menu menu-horizontal px-1">
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