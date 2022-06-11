<script setup lang="ts">
import CalculatorButton from './CalculatorButton.vue';
</script>

<template>
  <div class="max-w-30rem">
    <div class="grid">
      <CalculatorButton label="BK" narrow />
      <CalculatorButton label="C" narrow />
      <CalculatorButton label="CA" narrow />
      <CalculatorButton label="÷" narrow />
    </div>
    <div class="grid">
      <CalculatorButton label="7" />
      <CalculatorButton label="8" />
      <CalculatorButton label="9" />
      <CalculatorButton label="×" />
    </div>
    <div class="grid">
      <CalculatorButton label="4" />
      <CalculatorButton label="5" />
      <CalculatorButton label="6" />
      <CalculatorButton label="－" />
    </div>
    <div class="grid">
      <CalculatorButton label="1" />
      <CalculatorButton label="2" />
      <CalculatorButton label="3" />
      <CalculatorButton label="＋" />
    </div>
    <div class="grid">
      <CalculatorButton label="0" double />
      <CalculatorButton label="00" />
      <CalculatorButton label="=" />
    </div>
  </div>
</template>
