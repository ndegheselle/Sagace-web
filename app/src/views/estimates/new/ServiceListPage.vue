<script setup lang="ts">
import { Estimate } from "@/lib/api/estimate";
import ArticleSelectModal from "@/views/billable/articles/ArticleSelectModal.vue";
import ServiceSelectModal from "@/views/billable/services/ServiceSelectModal.vue";
import { ref, useTemplateRef } from "vue";

const estimate = ref<Estimate>(new Estimate());
const modalArticleRef = useTemplateRef('articleModal');
const modalserviceRef = useTemplateRef('serviceModal');

async function addArticle() {
    if (await modalArticleRef.value?.show() && modalArticleRef.value?.selected) {
        estimate.value.addItem(modalArticleRef.value?.selected, 1);
    }
}

async function addService() {
    if (await modalserviceRef.value?.show() && modalserviceRef.value?.selected) {
        estimate.value.addItem(modalserviceRef.value?.selected, 1);
    }
}

function remove(index: number) {
    estimate.value.lines.splice(index, 1);
}

</script>

<template>
    <div class="container mx-auto flex flex-col my-1">
        <ul class="steps mt-4">
            <li class="step step-primary">
                <span><i class="fa-solid fa-file-invoice"></i> Devis</span>
            </li>
            <li class="step">
                <span><i class="fa-solid fa-user"></i> Client</span>
            </li>
            <li class="step">
                <span><i class="fa-solid fa-file-invoice-dollar"></i> Facture</span>
            </li>
        </ul>

        <div class="divider mx-auto w-1/2"></div>

        <div class="flex">
            <details class="dropdown dropdown-end ms-auto">
                <summary class="btn"><i class="fa-solid fa-plus"></i>Ajouter</summary>
                <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><a @click="addArticle"><i class="fa-solid fa-box"></i>Ajouter un article</a></li>
                    <li><a @click="addService"><i class="fa-solid fa-screwdriver-wrench"></i>Ajouter un service</a></li>
                </ul>
            </details>
        </div>

        <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-1">
            <table class="table">
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
                        <th class="text-right">Prix unitaire</th>
                        <th class="text-right">Qte</th>
                        <th class="text-right">Total</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(line, index) in estimate.lines"
    :key="line.item.id">
                        <td>
                            <div class="font-medium">
                                {{ line.item.name }}
                            </div>
                            <div class="text-sm opacity-60">
                                {{ line.item.description || '—' }}
                            </div>
                        </td>

                        <td class="text-right">
                            {{ line.item.price.toFixed(2) }} €
                        </td>

                        <td class="text-right">
                            <input class="input input-sm"
                                   type="number"
                                   min="1"
                                   v-model="line.quantity" />
                        </td>

                        <td class="text-right font-medium">
                            {{ line.total.toFixed(2) }} €
                        </td>
                        <td>
                            <button class="btn btn-sm btn-error btn-soft btn-circle" @click="remove(index)">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </td>
                    </tr>

                    <tr v-if="estimate.lines.length === 0">
                        <td colspan="5"
                            class="text-center text-base-content/50">
                            No lines added
                        </td>
                    </tr>
                </tbody>

                <!-- Totals -->
                <tfoot>
                    <tr>
                        <td colspan="3"
                            class="text-right">Total HT</td>
                        <td class="text-right">{{ estimate.totalHT.toFixed(2) }} €</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="3"
                            class="text-right">TVA (20%)</td>
                        <td class="text-right">{{ estimate.tva.toFixed(2) }} €</td>
                        <td></td>
                    </tr>
                    <tr class="font-bold">
                        <td colspan="3"
                            class="text-right">Total TTC</td>
                        <td class="text-right">{{ estimate.totalTTC.toFixed(2) }} €</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="w-full flex mt-2">
            <RouterLink to="/estimates/new/client"
                        class="btn btn-primary ms-auto"
                        :disabled="!estimate.lines.length"><i class="fa-solid fa-arrow-right"></i> Suivant</RouterLink>
        </div>

        <ArticleSelectModal ref="articleModal" />
        <ServiceSelectModal ref="serviceModal" />
    </div>
</template>
