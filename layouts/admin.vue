<template>
  <div class="layout">
    <slot/>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: black;
}
</style>
