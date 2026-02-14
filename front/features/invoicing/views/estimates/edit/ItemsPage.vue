<script setup lang="ts">
import ArticleSelectModal from "@features/stock/views/articles/ArticleSelectModal.vue";
import ServiceSelectModal from "@features/stock/views/services/ServiceSelectModal.vue";
import { type EstimateData, estimates, Estimate } from '@features/invoicing/data/estimates';
import { useTemplateRef } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const modalArticleRef = useTemplateRef('articleModal');
const modalserviceRef = useTemplateRef('serviceModal');

async function addArticle() {
    if (await modalArticleRef.value?.show() && modalArticleRef.value?.selected) {
        Estimate.addArticle(estimate, modalArticleRef.value?.selected, 1);
    }
}

async function addService() {
    if (await modalserviceRef.value?.show() && modalserviceRef.value?.selected) {
        Estimate.addService(estimate, modalserviceRef.value?.selected, 1);
    }
}

function remove(index: number) {
    estimate?.lines.splice(index, 1);
}

function previous() {
    save();
    router.push(`/documents/estimates`);
}

function next() {
    save();
    if (estimate?.client)
        router.push(`/documents/estimates/${estimate?.id}/invoice`);
    else
        router.push(`/documents/estimates/${estimate?.id}/client`);
}

function save() {
    estimates.update(estimate.id, estimate);
}

const { estimate } = defineProps<{estimate: EstimateData}>();
</script>

<template>
    <div class="container mx-auto flex flex-col my-2">
        <ul class="steps mt-4">
            <li class="step step-primary">
                <span><i class="fa-solid fa-file-invoice"></i> Devis</span>
            </li>
            <li class="step">
                <div v-if="estimate?.client" class="indicator">
                    <span class="indicator-item text-success"><i class="fa-solid fa-check"></i></span>
                    <span><i class="fa-solid fa-user"></i> {{ estimate.expand.client.firstName }} {{ estimate.expand.client.lastName }}</span>
                </div>
                <div v-else>
                    <span><i class="fa-solid fa-user"></i> Client</span>
                </div>
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
                        <tr v-for="(line, index) in estimate?.lines" :key="line.item._id">
                            <td>
                                <div class="font-medium">
                                    {{ line.item.name }}
                                </div>
                                <div class="text-sm opacity-60">
                                    {{ line.item.description || '—' }}
                                </div>
                            </td>

                            <td class="text-right">
                                {{ line.item.unitPrice.toFixed(2) }} €
                            </td>

                            <td class="text-right">
                                <input class="input input-sm" type="number" min="1" v-model="line.quantity" />
                            </td>

                            <td class="text-right font-medium">
                                {{ line.totalHT.toFixed(2) }} €
                            </td>
                            <td>
                                <button class="btn btn-sm btn-error btn-soft btn-circle" @click="remove(index)">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>

                        <tr v-if="estimate?.lines.length === 0">
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
