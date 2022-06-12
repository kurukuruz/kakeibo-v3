<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import TextArea from 'primevue/textarea';
import { ref } from 'vue';
import TheCategorySelector from './TheCategorySelector.vue';
import TheCalculator from './TheCalculator.vue';

const display = ref(false);
const openDialog = () => {
  display.value = true;
};

const amount = ref(0);
const formula = ref('');
</script>

<template>
  <Button
    icon="pi pi-check"
    @click="openDialog"
  />
  <Dialog v-model:visible="display">
    <template #header>
      <Button
        label="登録"
        class="p-button-text"
      />
      テスト
    </template>
    <TheCategorySelector class="w-full" />
    <TextArea
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
