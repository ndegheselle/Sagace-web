<script setup lang="ts">
import clientsApi from '~/utils/api/ClientsClient';
import { PaginationOptions } from '~~/shared/base/paginated';

const confirmation = useConfirmation();
const alert = useAlert();

function testApi() {
    clientsApi.getAll(new PaginationOptions(1, 10)).then((response) => {
        console.log(response);
    });
}

</script>

<template>
    <div class="container mx-auto mt-1">
        <button class="btn" @click="alert.info('afaf')">Toatsed</button>
        <button class="btn" @click="testApi()">Test</button>
    </div>
</template>