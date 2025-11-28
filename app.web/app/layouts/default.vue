<template>
    <div class="min-h-screen flex flex-col">
        <nav class="navbar bg-base-300 shadow-sm">
            <div class="flex-1">
                <a class="btn btn-ghost text-xl">Sagace</a>
            </div>
            <div class="flex-none">
                <ul class="menu menu-horizontal px-1">
                    <li><NuxtLink to="/user/login"><i class="ph-user"/> Login</NuxtLink ></li>
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