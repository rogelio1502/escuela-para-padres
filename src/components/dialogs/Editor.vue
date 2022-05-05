<script setup>
import { VueEditor } from "vue3-editor";
</script>

<template>
  <VueEditor />
</template>

<script>
export default {
  props: {
    model: String,
  },
};
</script>
