<script setup lang="ts">
import { useAuth } from '@common/composables/auth';
import { useAlert } from '@common/composables/popups/alert';
import { getLogo } from '@common/data/companies';
import { formatDate } from '@common/utils/date';
import { type EstimateData, estimates, Estimate } from '@features/invoicing/data/estimates';
import { Line } from '@features/invoicing/data/item';
import { nextTick, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { user } = useAuth();
const route = useRoute();
const router = useRouter();
const alert = useAlert();
const estimate = ref<EstimateData>();
const apiUrl = import.meta.env.VITE_API_URL;

watch(() => route.params.id, async (id) => {
    let estimateApi: EstimateData | null = null;
    if (id && typeof id == 'string') {
        estimateApi = await estimates.getById(id);
    }

    if (!estimateApi) {
        router.push('/invoicing/estimates');
        alert.error(`Aucun devis trouvé pour l'id [${id}].`);
        return;
    }

    estimate.value = estimateApi;
    await nextTick();
    window.print();
}, { immediate: true });

function addDays(date: Date | undefined, days: number) {
    var result = new Date(date || new Date());
    result.setDate(result.getDate() + days);
    return result;
}
</script>
<template>
    <div data-theme="corporate" class="h-full paper">
        <div class="print-content">

            <div class="flex">
                <div v-if="user?.expand.company.logo" class="w-32 rounded-xl">
                    <img :src="getLogo(user?.expand.company)" />
                </div>

                <div class="my-auto">
                    <h1 class="text-4xl">{{ estimate?.reference }}</h1>
                    <span class="opacity-60">DEVIS</span>
                </div>
            </div>

            <div class="opacity-80 mt-1 space-y-1">
                <div>Date d’émission : {{ formatDate(new Date()) }}</div>
                <div>Date d’échéance : {{ formatDate(addDays(new Date(), 30)) }}</div>
            </div>

            <div class="grid grid-cols-2 gap-1 mt-4">
                <div class="rounded-box border border-base-300 py-2 px-4">
                    <div class="font-bold uppercase">{{ user?.expand.company.name }}</div>
                    <div>{{ user?.expand.company.SIRET }}</div>
                    <div>{{ user?.expand.company.adress }}</div>
                    <div class="mt-2">{{ user?.expand.company.phone }}</div>
                    <div>{{ user?.expand.company.email }}</div>
                </div>
                <div class="rounded-box border border-base-300 py-2 px-4 text-right">
                    <div class="font-bold uppercase">A l'attention de</div>
                    <div>{{ estimate?.expand.client.firstName }} {{ estimate?.expand.client.lastName }}</div>
                    <div>{{ estimate?.expand.client.adress }}</div>
                    <div class="mt-2">{{ estimate?.expand.client.phone }}</div>
                    <div>{{ estimate?.expand.client.email }}</div>
                </div>
            </div>

            <div class="overflow-x-auto rounded-box border border-base-300 bg-base-100 mt-1">
                <table class="table table-sm">
                    <colgroup>
                        <col>
                        <col style="width: 4rem">
                        <col style="width: 6rem">
                        <col style="width: 4rem">
                        <col style="width: 6rem">
                    </colgroup>
                    <thead>
                        <tr>
                            <th class="border-base-300">Désignation</th>
                            <th class="text-right border-base-300">TVA</th>
                            <th class="text-right border-base-300">PU HT</th>
                            <th class="text-right border-base-300">Qte</th>
                            <th class="text-right border-base-300">Total HT</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="line in estimate?.expand.lines" :key="line.id">
                            <td class="border-base-300">
                                <div class="font-medium">
                                    {{ line.expand.article?.name ?? line.expand.service?.name }}
                                </div>
                                <div class="text-sm opacity-60">
                                    {{ line.expand.article?.description ?? line.expand.service?.description ?? '—' }}
                                </div>
                            </td>

                            <td class="text-right border-base-300">
                                {{ (line.expand.article?.vatRate ?? line.expand.service?.vatRate ?? 0) * 100 }} %
                            </td>
                            <td class="text-right border-base-300">
                                {{ (line.expand.article?.unitPrice ?? line.expand.service?.unitPrice ?? 0).toFixed(2) }}
                                €
                            </td>
                            <td class="text-right border-base-300">
                                {{ line.quantity }}
                            </td>

                            <td class="text-right font-medium border-base-300">
                                {{ Line.totalHT(line).toFixed(2) }} €
                            </td>
                        </tr>

                        <tr v-if="estimate?.lines.length === 0">
                            <td colspan="100" class="text-center text-base-content/50 border-base-300">
                                Aucune lignes
                            </td>
                        </tr>
                    </tbody>

                    <!-- Totals -->
                    <tfoot>
                        <tr>
                            <td colspan="4" class="text-right border-base-300">Total HT</td>
                            <td class="text-right border-base-300">{{ Estimate.totalHT(estimate).toFixed(2) }} €</td>
                        </tr>
                        <tr>
                            <td colspan="4" class="text-right border-base-300">TVA</td>
                            <td class="text-right border-base-300">{{ Estimate.totalTax(estimate).toFixed(2) }} €</td>
                        </tr>
                        <tr class="font-bold">
                            <td colspan="4" class="text-right border-base-300">Total TTC</td>
                            <td class="text-right border-base-300">{{ Estimate.totalTTC(estimate).toFixed(2) }} €</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div class="flex mt-2">
                <div class="text-xs opacity-70 space-y-2 mt-2 flex-1">
                    <p class="m-0">
                        <strong>Validité du devis :</strong>
                        Devis valable <strong>30 jours</strong> à compter de sa date d’émission.
                    </p>
                    <p class="m-0">
                        <strong>Conditions de paiement :</strong>
                        Paiement à réception du devis. Aucun escompte accordé pour paiement anticipé.
                    </p>
                    <p class="m-0">
                        En cas de retard de paiement, des pénalités seront exigibles sans qu’un rappel
                        soit nécessaire, au taux légal en vigueur, ainsi qu’une indemnité forfaitaire
                        pour frais de recouvrement de <strong>40 €</strong>
                        (articles L441-10 et D441-5 du Code de commerce).
                    </p>
                    <p class="m-0">
                        La signature du présent devis vaut acceptation pleine et entière des prestations
                        décrites ci-dessus.
                    </p>
                </div>
                <div class="w-48 ml-4">
                    <p class="text-end">Signature</p>
                    <div class="w-full h-24 rounded-box border border-base-300">
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer entreprise -->
        <footer class="print-footer border-t border-base-300 pt-2 mt-2">
            <div class="text-xs text-center opacity-60">
                <p>
                    {{ user?.expand.company.name }} —
                    {{ user?.expand.company.adress }}
                </p>
                <p>
                    SIRET : {{ user?.expand.company.SIRET }}
                </p>
            </div>
        </footer>
    </div>
</template>

<style>
.paper {
    padding: 2rem;
    max-width: 64rem;
    margin-left: auto;
    margin-right: auto;
}

@media print {

    html,
    body {
        background: white !important;
        margin: 0;
    }

    .paper {
        max-width: fit-content;
        margin: 0;
        padding: 0;
    }

    .print-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .print-content {
        margin-bottom: 30mm;
    }
}
</style>