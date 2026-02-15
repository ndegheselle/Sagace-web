<script setup lang="ts">
import ArticleSelectModal from "@features/stock/views/articles/ArticleSelectModal.vue";
import ServiceSelectModal from "@features/stock/views/services/ServiceSelectModal.vue";
import { type EstimateData, estimates, Estimate } from '@features/invoicing/data/estimates';
import { ref, useTemplateRef, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { estimatesLines, Line, type EstimateLineData } from "@features/invoicing/data/item";
import { useAlert } from "@common/composables/popups/alert";

// Composables
const router = useRouter();
const route = useRoute();
const alert = useAlert();

// Template refs
const modalArticleRef = useTemplateRef('articleModal');
const modalserviceRef = useTemplateRef('serviceModal');

// Reactive state
const estimate = ref<EstimateData>();

// Watchers
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
    estimateApi.expand.lines ??= [];
    estimate.value = estimateApi;
}, { immediate: true });

// Methods
async function addArticle() {
    if (!estimate.value || !estimate.value?.expand?.lines)
        return;

    if (await modalArticleRef.value?.show() && modalArticleRef.value?.selected) {
        const line = await estimates.addArticle(estimate.value.id, modalArticleRef.value?.selected, 1);
        const existingLine = estimate.value.expand.lines.find(l => l.id === line.id);
        if (existingLine)
            existingLine.quantity = line.quantity;
        else
            estimate.value.expand.lines.push(line);
    }
}

async function addService() {
    if (!estimate.value || !estimate.value?.expand?.lines)
        return;

    if (await modalserviceRef.value?.show() && modalserviceRef.value?.selected) {
        const line = await estimates.addService(estimate.value.id, modalserviceRef.value?.selected, 1);
        const existingLine = estimate.value.expand.lines.find(l => l.id === line.id);
        if (existingLine)
            existingLine.quantity = line.quantity;
        else
            estimate.value.expand.lines.push(line);
    }
}

async function removeLine(line: EstimateLineData) {
    if (!estimate.value || !line || !estimate.value?.expand?.lines)
        return;

    await estimates.removeLine(estimate.value.id, line.id);
    estimate.value.expand.lines = estimate.value.expand.lines.filter(item => item !== line);
}

async function updateLineQuantity(line: EstimateLineData) {
    if (!estimate.value || !line || !estimate.value?.expand?.lines)
        return;
    await estimatesLines.update(line.id, { quantity: line.quantity });
}

function previous() {
    router.push(`/documents/estimates`);
}

function next() {
    router.push(`/documents/estimates/${estimate.value?.id}/invoice`);
}
</script>

<template>
    <!-- Template remains unchanged -->
    <div class="container mx-auto flex flex-col my-2">
        <ul class="steps mt-4">
            <li class="step step-primary">
                <span><i class="fa-solid fa-file-invoice"></i> Devis</span>
            </li>
            <li class="step">
                <span><i class="fa-solid fa-file-invoice-dollar"></i> Facture</span>
            </li>
        </ul>

        <div class="flex-1">

            <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4">
                <table class="table table-sm">
                    <colgroup>
                        <col>
                        <col>
                        <col style="width: 8rem">
                        <col style="width: 8rem">
                        <col style="width: 4rem">
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Désignation</th>
                            <th class="text-right">PU HT</th>
                            <th class="text-right">Qte</th>
                            <th class="text-right">Total HT</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="line in estimate?.expand.lines" :key="line.id">
                            <td>
                                <div class="font-medium">
                                    {{ line.expand.article?.name ?? line.expand.service?.name }}
                                </div>
                                <div class="text-sm opacity-60">
                                    {{ line.expand.article?.description ?? line.expand.service?.description ?? '—' }}
                                </div>
                            </td>

                            <td class="text-right">
                                {{ (line.expand.article?.unitPrice ?? line.expand.service?.unitPrice ?? 0).toFixed(2) }}
                                €
                            </td>

                            <td class="text-right">
                                <input class="input input-sm" type="number" min="1" v-model="line.quantity"
                                    @change="updateLineQuantity(line)" />
                            </td>

                            <td class="text-right font-medium">
                                {{ Line.totalHT(line).toFixed(2) }} €
                            </td>
                            <td>
                                <button class="btn btn-sm btn-error btn-soft btn-circle" @click="removeLine(line)">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>

                        <tr v-if="!estimate?.expand.lines?.length">
                            <td colspan="5" class="text-center text-base-content/50">
                                Aucune lignes
                            </td>
                        </tr>
                        <tr>
                            <td colspan="5" class="p-0">
                                <div class="flex bg-base-200 p-2">
                                    <button class="btn btn-soft btn-xs mx-auto my-1" popovertarget="add-line-popover"
                                        style="anchor-name:--anchor-add-line"><i class="fa-solid fa-plus"></i>Ajouter
                                        une
                                        ligne</button>
                                    <ul id="add-line-popover"
                                        class="dropdown menu bg-base-100 rounded-box w-52 p-2 shadow-sm" popover
                                        style="position-anchor:--anchor-add-line">
                                        <li><a @click="addArticle"><i class="fa-solid fa-box"></i>Ajouter un
                                                article</a>
                                        </li>
                                        <li><a @click="addService"><i class="fa-solid fa-screwdriver-wrench"></i>Ajouter
                                                un service</a></li>
                                        <div class="divider m-0 mx-4" />
                                        <li class="menu-disabled"><a><i class="fa-solid fa-file-invoice"></i>Copier un
                                                autre devis</a></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>

                    <!-- Totals -->
                    <tfoot>
                        <tr>
                            <td colspan="3" class="text-right">Total HT</td>
                            <td class="text-right">{{ Estimate.totalHT(estimate).toFixed(2) }} €</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colspan="3" class="text-right">TVA (20%)</td>
                            <td class="text-right">{{ Estimate.totalTax(estimate).toFixed(2) }} €</td>
                            <td></td>
                        </tr>
                        <tr class="font-bold">
                            <td colspan="3" class="text-right">Total TTC</td>
                            <td class="text-right">{{ Estimate.totalTTC(estimate).toFixed(2) }} €</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>

        <div class="w-full flex mt-1">
            <button @click="previous" class="btn"><i class="fa-solid fa-arrow-left"></i>
                Précédent</button>
            <button @click="next" class="btn btn-primary ms-auto"><i class="fa-solid fa-arrow-right"></i>
                Suivant</button>
        </div>

        <ArticleSelectModal ref="articleModal" />
        <ServiceSelectModal ref="serviceModal" />
    </div>
</template>