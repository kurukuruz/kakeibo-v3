<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import TextArea from 'primevue/textarea';
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import TheCategorySelector from './TheCategorySelector.vue';
import TheCalculator from './TheCalculator.vue';
import { useEntryFormStore } from '../../stores/entry-form';

const entryFormStore = useEntryFormStore();
const { display, entry } = storeToRefs(entryFormStore);

const categoryId = computed({
  get: () => entry.value.categoryId,
  set: (newVal) => { entry.value.categoryId = newVal; },
});
const memo = computed({
  get: () => entry.value.memo,
  set: (newVal) => { entry.value.memo = newVal; },
});
const amount = computed({
  get: () => entry.value.amount,
  set: (newVal) => { entry.value.amount = newVal; },
});
const formula = ref('');
watch(entry, () => {
  formula.value = entry.value.amount > 0 ? entry.value.amount.toString() : '';
});
</script>

<template>
  <Dialog
    v-model:visible="display"
    :modal="true"
  >
    <template #header>
      <div class="flex align-items-center gap-1">
        <Button
          icon="pi pi-cloud-upload"
        />
        <div class="p-dialog-title align-self-stretch">
          <span class="vertical-align-middle">{{ entry.date }}</span>
        </div>
      </div>
    </template>
    <TheCategorySelector
      v-model="categoryId"
      class="w-full"
    />
    <TextArea
      v-model="memo"
      placeholder="（詳細）"
      row="2"
      class="w-full"
    />
    <InputNumber
      v-model="amount"
      mode="currency"
      currency="JPY"
      locale="jp-JP"
      class="w-full"
      input-class="text-right"
      aria-describedby="formula-formdialog"
      readonly
    />
    <div class="w-full h-2rem p-2 text-right text-small">
      {{ formula }}
    </div>
    <TheCalculator
      v-model="amount"
      v-model:formula="formula"
    />
  </Dialog>
</template>
