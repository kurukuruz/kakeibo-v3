<script setup lang="ts">
import dayjs from 'dayjs';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import ToggleButton from 'primevue/togglebutton';
import InputNumber from 'primevue/inputnumber';
import TextArea from 'primevue/textarea';
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import TheCategorySelector from './TheCategorySelector.vue';
import TheCalculator from './TheCalculator.vue';
import { useEntryFormStore } from '../../stores/entry-form';
import { registerEntry, updateEntry, deleteEntry } from '../../dba/entries';
import { implementsEntryDoc } from '../../domains/entry';
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
  if (implementsEntryDoc(entry.value)) {
    updateEntry(activeBookId.value, entry.value);
  } else {
    registerEntry(activeBookId.value, entry.value);
  }
  display.value = false;
};

const confirm = useConfirm();
const toast = useToast();
const confirmDelete = () => {
  confirm.require({
    header: '削除確認',
    icon: 'pi pi-info-circle',
    message: '本当に削除しますか？',
    acceptClass: 'p-button-danger',
    accept: () => {
      if (activeBookId.value && implementsEntryDoc(entry.value)) {
        deleteEntry(activeBookId.value, entry.value.id);
        display.value = false;
        toast.add({ severity: 'info', summary: '削除しました', life: 3000 });
      }
    },
  });
};

const innerDate = computed(() => dayjs(entry.value.date));
</script>

<template>
  <Dialog
    v-model:visible="display"
    :modal="true"
    class="sm:-dialog-maximized"
  >
    <template #header>
      <div
        class="p-dialog-title ml-2 date-label"
        :class="{
          '-saturday': innerDate.day() === 6,
          '-sunday': innerDate.day() === 0
        }"
      >
        <span>{{ entry.date }}</span>
        <span class="text-base">&nbsp;{{ innerDate.format("ddd") }}</span>
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
    <template #footer>
      <Button
        v-if="implementsEntryDoc(entry)"
        icon="pi pi-trash"
        label="削除"
        severity="danger"
        @click="confirmDelete"
      />
      <div class="flex-grow-1">
        <!-- spacer -->
      </div>
      <Button
        icon="pi pi-cloud-upload"
        :label="implementsEntryDoc(entry) ? '更新' : '登録'"
        @click="upload"
      />
    </template>
  </Dialog>
  <ConfirmDialog />
  <Toast />
</template>

<style lang="scss" scoped>
.date-label {
  &.-saturday {
    color: blueviolet;
  }
  &.-sunday {
    color: crimson;
  }
}
</style>
