<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import ToggleButton from 'primevue/togglebutton';
import InputNumber from 'primevue/inputnumber';
import TextArea from 'primevue/textarea';
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import TheCategorySelector from './TheCategorySelector.vue';
import TheCalculator from './TheCalculator.vue';
import { useEntryFormStore } from '../../stores/entry-form';
import { registerEntry, updateEntry } from '../../dba/entries';
import { IEntryDoc } from '../../domains/entry';
import { useBookListStore } from '../../stores/book-list';

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
const isIncome = computed({
  get: () => entry.value.division === 'income',
  set: (newVal) => { entry.value.division = newVal ? 'income' : 'payout'; },
});

const bookListStore = useBookListStore();
const { activeBookId } = storeToRefs(bookListStore);

const upload = () => {
  if (!activeBookId.value) return;
  if ((entry.value as any).id) {
    updateEntry(activeBookId.value, entry.value as IEntryDoc);
  } else {
    registerEntry(activeBookId.value, entry.value);
  }
  display.value = false;
};
</script>

<template>
  <Dialog
    v-model:visible="display"
    :modal="true"
  >
    <template #header>
      <Button
        icon="pi pi-cloud-upload"
        @click="upload"
      />
      <div class="p-dialog-title ml-2">
        <span>{{ entry.date }}</span>
      </div>
      <div class="flex-grow-1">
        <!-- spacer -->
      </div>
    </template>
    <TheCategorySelector
      v-model="categoryId"
      v-model:division="entry.division"
      class="w-full"
    />
    <TextArea
      v-model="memo"
      placeholder="（詳細）"
      row="2"
      class="w-full"
    />
    <div class="flex">
      <ToggleButton
        v-model="isIncome"
        on-label="収入"
        on-icon="pi pi-sync"
        off-label="支出"
        off-icon="pi pi-sync"
        icon-pos="right"
        class="p-button-sm"
      />
      <InputNumber
        v-model="amount"
        mode="currency"
        currency="JPY"
        locale="jp-JP"
        input-class="text-right"
        aria-describedby="formula-formdialog"
        readonly
        class="flex-grow-1"
      />
    </div>
    <div class="w-full h-2rem p-2 text-right text-small">
      {{ formula }}
    </div>
    <TheCalculator
      v-model="amount"
      v-model:formula="formula"
    />
  </Dialog>
</template>
