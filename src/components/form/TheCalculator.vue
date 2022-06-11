<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import parseFormula from '../../commons/formula-parser';
import CalculatorButton from './CalculatorButton.vue';

interface IProps {
  modelValue: number;
  formula: string;
}

interface IEmits {
  (e: 'update:modelValue', value: number): void,
  (e: 'update:formula', value: string): void,
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: 0,
  formula: '',
});

const emit = defineEmits<IEmits>();

const innerValue = ref(props.modelValue);
watchEffect(() => {
  emit('update:modelValue', innerValue.value);
});

const innerFormula = ref(props.formula);
watchEffect(() => {
  emit('update:formula', innerFormula.value);
});

const updateVaue = () => {
  innerValue.value = parseFormula(innerFormula.value);
};

const pop = () => {
  innerFormula.value = innerFormula.value.slice(0, -1);
};

const push = (v: number | string) => {
  if (typeof v === 'number') {
    if (v > 0 || innerFormula.value.slice(-1).match(/[0-9]/)) {
      // 0以外または直前が数字の場合は数式に加える
      innerFormula.value += v;
      updateVaue();
    }
    // 0を入れようとした際に直前が数字出ない場合は処理をしない
  } else if (innerFormula.value.length !== 0) {
    if (!innerFormula.value.slice(-1).match(/[0-9]/)) {
      // 直前が数値でない(=演算子である)場合は演算子を除去する
      pop();
    }
    innerFormula.value += v;
  }
};

const finish = () => {
  innerFormula.value = `${innerValue.value}`;
};

const clearAll = () => {
  innerFormula.value = '';
  innerValue.value = 0;
};
</script>

<template>
  <div class="max-w-30rem">
    <div class="grid">
      <CalculatorButton
        label="BK"
        narrow
        @click="pop"
      />
      <CalculatorButton
        label="C"
        narrow
      />
      <CalculatorButton
        label="CA"
        narrow
        @click="clearAll"
      />
      <CalculatorButton
        label="/"
        narrow
        @click="push('/')"
      />
    </div>
    <div class="grid">
      <CalculatorButton
        label="7"
        @click="push(7)"
      />
      <CalculatorButton
        label="8"
        @click="push(8)"
      />
      <CalculatorButton
        label="9"
        @click="push(9)"
      />
      <CalculatorButton
        label="*"
        @click="push('*')"
      />
    </div>
    <div class="grid">
      <CalculatorButton
        label="4"
        @click="push(4)"
      />
      <CalculatorButton
        label="5"
        @click="push(5)"
      />
      <CalculatorButton
        label="6"
        @click="push(6)"
      />
      <CalculatorButton
        label="-"
        @click="push('-')"
      />
    </div>
    <div class="grid">
      <CalculatorButton
        label="1"
        @click="push(1)"
      />
      <CalculatorButton
        label="2"
        @click="push(2)"
      />
      <CalculatorButton
        label="3"
        @click="push(3)"
      />
      <CalculatorButton
        label="+"
        @click="push('+')"
      />
    </div>
    <div class="grid">
      <CalculatorButton
        label="0"
        double
        @click="push(0)"
      />
      <CalculatorButton
        label="00"
        @click="push(0);push(0)"
      />
      <CalculatorButton
        label="="
        @click="finish"
      />
    </div>
  </div>
</template>
