<script setup lang="ts">
import { IEntryDoc } from '../../domains/entry';

interface IProps {
  entry: IEntryDoc,
}

const props = defineProps<IProps>();
</script>

<template>
  <div>
    {{ props.entry.memo }}  {{ props.entry.amount }}
  </div>
</template>
