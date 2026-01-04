<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, watch, computed, nextTick } from 'vue';
import { Invoice, api } from '@/lib/api/documents/invoices';
import { useAlert } from '@/composables/popups/alert';
import { useAuth } from '@/composables/auth';

const { user } = useAuth()
const route = useRoute()
const router = useRouter()
const alert = useAlert()

const invoice = ref<Invoice>()

watch(
    () => route.params.id,
    async (id) => {
        let invoiceApi: Invoice | null = null

        if (id && typeof id === 'string') {
            invoiceApi = await api.getById(id)
        }

        if (!invoiceApi) {
            router.push('/documents/invoices')
            alert.error(`Aucune facture trouvée pour l'id [${id}].`)
            return
        }

        invoice.value = invoiceApi;
        await nextTick();
        window.print();
    },
    { immediate: true }
)

const issueDate = computed(() =>
    invoice.value?.issuedAt
        ? new Date(invoice.value.issuedAt).toLocaleDateString()
        : '—'
)

const dueDate = computed(() =>
    invoice.value?.dueDate
        ? new Date(invoice.value.dueDate).toLocaleDateString()
        : '—'
)
</script>
<template>
    <div data-theme="corporate" class="h-full paper">
        <div class="print-content">
            <h1 class="text-5xl">
                Facture {{ invoice?.invoiceNumber }}
            </h1>

            <div class="opacity-80 mt-1 space-y-1">
                <div>Date d’émission : {{ issueDate }}</div>
                <div>Date d’échéance : {{ dueDate }}</div>
            </div>

            <!-- Parties -->
            <div class="grid grid-cols-2 gap-1 mt-4">
                <div class="rounded-box border border-base-300 py-2 px-4">
                    <div class="font-bold uppercase">
                        {{ user?.company.name }}
                    </div>
                    <div>{{ user?.company.SIRET }}</div>
                    <div>{{ user?.company.adress }}</div>
                    <div class="mt-2">{{ user?.company.phone }}</div>
                    <div>{{ user?.company.email }}</div>
                </div>

                <div class="rounded-box border border-base-300 py-2 px-4 text-right">
                    <div class="font-bold uppercase">Facturé à</div>
                    <div>{{ invoice?.client?.fullName }}</div>
                    <div>{{ invoice?.client?.address }}</div>
                    <div class="mt-2">{{ invoice?.client?.phone }}</div>
                    <div>{{ invoice?.client?.email }}</div>
                </div>
            </div>

            <!-- Lines -->
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
                            <th class="text-right border-base-300">
                                PU HT
                            </th>
                            <th class="text-right border-base-300">Qte</th>
                            <th class="text-right border-base-300">Total HT</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="line in invoice?.lines" :key="line.item.id">
                            <td class="border-base-300">
                                <div class="font-medium">
                                    {{ line.item.name }}
                                </div>
                                <div class="text-sm opacity-60">
                                    {{ line.item.description || '—' }}
                                </div>
                            </td>
                            <td class="text-right border-base-300">
                                {{ line.item.vatRateType * 100 }} %
                            </td>
                            <td class="text-right border-base-300">
                                {{ line.item.unitPrice.toFixed(2) }} €
                            </td>

                            <td class="text-right border-base-300">
                                {{ line.quantity }}
                            </td>

                            <td class="text-right font-medium border-base-300">
                                {{ line.totalHT.toFixed(2) }} €
                            </td>
                        </tr>

                        <tr v-if="invoice?.lines.length === 0">
                            <td colspan="100" class="text-center text-base-content/50 border-base-300">
                                Aucune ligne
                            </td>
                        </tr>
                    </tbody>

                    <!-- Totals -->
                    <tfoot>
                        <tr>
                            <td colspan="4" class="text-right border-base-300">
                                Total HT
                            </td>
                            <td class="text-right border-base-300">
                                {{ invoice?.totalHT.toFixed(2) }} €
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" class="text-right border-base-300">
                                TVA
                            </td>
                            <td class="text-right border-base-300">
                                {{ invoice?.tva.toFixed(2) }} €
                            </td>
                        </tr>
                        <tr class="font-bold">
                            <td colspan="4" class="text-right border-base-300">
                                Total TTC
                            </td>
                            <td class="text-right border-base-300">
                                {{ invoice?.totalTTC.toFixed(2) }} €
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <!-- Payment info -->
            <div class="flex mt-2">
                <div class="text-xs opacity-70 space-y-2 mt-2 flex-1">
                    <p class="m-0">
                        <strong>Conditions de paiement :</strong>
                        Paiement exigible à la date d’échéance indiquée.
                    </p>

                    <p v-if="invoice?.paymentMethod" class="m-0">
                        <strong>Moyen de paiement :</strong>
                        {{ invoice.paymentMethod }}
                    </p>

                    <p v-if="invoice?.paidAt" class="m-0">
                        <strong>Facture réglée le :</strong>
                        {{ new Date(invoice.paidAt).toLocaleDateString() }}
                    </p>

                    <p class="m-0">
                        En cas de retard de paiement, des pénalités seront exigibles
                        au taux légal en vigueur ainsi qu’une indemnité forfaitaire
                        de <strong>40 €</strong> pour frais de recouvrement
                        (articles L441-10 et D441-5 du Code de commerce).
                    </p>
                </div>

                <div class="w-48 ml-4">
                    <p class="text-end">Signature</p>
                    <div class="w-full h-24 rounded-box border border-base-300"></div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="print-footer border-t border-base-300 pt-2 mt-2">
            <div class="text-xs text-center opacity-60">
                <p>
                    {{ user?.company.name }} —
                    {{ user?.company.adress }}
                </p>
                <p>
                    SIRET : {{ user?.company.SIRET }}
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