<script setup lang="ts">
import Avatar from 'primevue/avatar';
import { computed } from 'vue';

interface IProps {
  icon?: string;
  color?: string;
}

const props = defineProps<IProps>();

const avatarIcon = computed(() => {
  const tag = props.icon ? props.icon : 'mdi-circle-off-outline';
  const kind = tag.slice(0, tag.indexOf('-'));
  return `${kind} ${tag}`;
});
const avatarColor = computed(() => (props.icon ? '#FFF' : 'transparent'));
</script>

<template>
  <Avatar
    :icon="avatarIcon"
    shape="circle"
    :style="{ 'color': avatarColor, 'background-color': props.color}"
  />
</template>
