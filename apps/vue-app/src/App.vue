<script setup>
import { TkInput, TkButton } from '@takeoff-ui/vue';
import { ref } from 'vue';

const value = ref('1');
</script>

<template>
  <div>
    <h1>{{ value }}</h1>
    <TkInput v-model="value"> </TkInput>
    <TkButton label="Click me" />
  </div>
</template>
