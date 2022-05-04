<script>
export default {
  props: {
    inputErrors: Array,
  },
};
</script>

<template>
  <div v-if="inputErrors.length">
    <div v-for="error in inputErrors" :key="error">
      <span> * {{ error }} </span><br />
    </div>
  </div>
</template>

<style scoped>
span {
  color: red;
}
</style>
