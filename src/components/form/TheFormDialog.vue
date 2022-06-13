<script setup lang="ts">
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import TextArea from 'primevue/textarea';
import { ref } from 'vue';
import TheCategorySelector from './TheCategorySelector.vue';
import TheCalculator from './TheCalculator.vue';

interface IProps {
  buttonLabel?: string;
  buttonIcon?: string;
  buttonIconPos?: 'left' | 'right' | 'top' | 'bottom';
  buttonClass?: string;
}

const props = defineProps<IProps>();

const display = ref(false);
const openDialog = () => {
  display.value = true;
};

const amount = ref(0);
const formula = ref('');
</script>

<template>
  <Button
    :label="props.buttonLabel"
    :icon="props.buttonIcon"
    :icon-pos="props.buttonIconPos"
    :class="props.buttonClass"
    @click="openDialog"
  />
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
          <span class="vertical-align-middle">TEST</span>
        </div>
      </div>
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
