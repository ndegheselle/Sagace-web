<script setup lang="ts">
import { fakeArticles } from "@/lib/api/article";
import type { BillableItem } from "@/lib/api/estimate";
import { Estimate } from "@/lib/api/estimate";
import { fakeServices } from "@/lib/api/service";
import { computed, ref } from "vue";

const estimate = ref<Estimate>(new Estimate());

/* ---------------------------
   Add item form state
----------------------------*/
const selectedType = ref<"article" | "service">("article");
const selectedItemId = ref<string>("");
const quantity = ref<number>(1);

const availableItems = computed<BillableItem[]>(() =>
  selectedType.value === "article"
    ? fakeArticles
    : fakeServices
);

function addLine() {
  const item = availableItems.value.find(i => i.id === selectedItemId.value);
  if (!item || quantity.value <= 0) return;

  estimate.value.addItem(item, quantity.value);

  // reset form
  selectedItemId.value = "";
  quantity.value = 1;
}

function removeLine(itemId: string) {
  estimate.value.removeItem(itemId);
}
</script>

<template>
  <div class="space-y-6">

    <!-- Add line -->
    <div class="card bg-base-100 shadow">
      <div class="card-body grid grid-cols-1 md:grid-cols-5 gap-4">
        <select class="select select-bordered"
                v-model="selectedType">
          <option value="article">Article</option>
          <option value="service">Service</option>
        </select>

        <select class="select select-bordered md:col-span-2"
                v-model="selectedItemId">
          <option disabled value="">Select item</option>
          <option
            v-for="item in availableItems"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }} — {{ item.price.toFixed(2) }} €
          </option>
        </select>

        <input type="number"
               min="1"
               class="input input-bordered"
               v-model.number="quantity" />

        <button class="btn btn-primary"
                @click="addLine"
                :disabled="!selectedItemId">
          Add
        </button>
      </div>
    </div>

    <!-- Lines table -->
    <div class="overflow-x-auto">
      <table class="table table-zebra">
        <thead>
          <tr>
            <th>Item</th>
            <th class="text-right">Unit price</th>
            <th class="text-right">Qty</th>
            <th class="text-right">Total</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="line in estimate.lines" :key="line.item.id">
            <td>{{ line.item.name }}</td>

            <td class="text-right">
              {{ line.item.price.toFixed(2) }} €
            </td>

            <td class="text-right">
              {{ line.quantity }}
            </td>

            <td class="text-right font-medium">
              {{ line.total.toFixed(2) }} €
            </td>

            <td class="text-right">
              <button
                class="btn btn-ghost btn-sm text-error"
                @click="removeLine(line.item.id)"
              >
                ✕
              </button>
            </td>
          </tr>

          <tr v-if="estimate.lines.length === 0">
            <td colspan="5" class="text-center text-base-content/50">
              No lines added
            </td>
          </tr>
        </tbody>

        <!-- Totals -->
        <tfoot>
          <tr>
            <td colspan="3" class="text-right">Total HT</td>
            <td class="text-right">{{ estimate.totalHT.toFixed(2) }} €</td>
            <td></td>
          </tr>
          <tr>
            <td colspan="3" class="text-right">TVA (20%)</td>
            <td class="text-right">{{ estimate.tva.toFixed(2) }} €</td>
            <td></td>
          </tr>
          <tr class="font-bold">
            <td colspan="3" class="text-right">Total TTC</td>
            <td class="text-right">{{ estimate.totalTTC.toFixed(2) }} €</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>
