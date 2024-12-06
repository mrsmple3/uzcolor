<template>
  <div v-if="popupActive" class="popup">
    <slot/>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgb(0, 0, 0, 0.2);
  @include flex-center();
  justify-content: center;
  z-index: 1000;
}

</style>