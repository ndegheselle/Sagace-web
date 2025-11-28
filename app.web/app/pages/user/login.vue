<script setup lang="ts">

const confirmation = useConfirmation();
const alert = useAlert();

</script>

<template>
    <div class="card bg-base-200 w-96 shadow-xl m-auto p-4 mt-4">
        <div class="card-body">
            <h2 class="card-title">Login</h2>
            <div>
                <div class="flex flex-col gap-4 mt-4">
                    <label class="input input-bordered flex items-center gap-2">
                        <i class="ph-envelope"></i>
                        <input type="email" class="validator grow" placeholder="E-mail" required />
                    </label>
                    <label class="input input-bordered flex items-center gap-2">
                        <i class="ph-password" />
                        <input type="password" class="grow" required minlength="8"
                        placeholder="Password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" />
                    </label>

                    <button class="btn btn-primary">
                        <i class="ph-sign-in" />
                        Login
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>