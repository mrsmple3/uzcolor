<template>
  <div class="preloader">
    <img alt="Preloader" class="preloader__gif" src="/preloader.gif"/>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.preloader {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  height: 100vh;
  width: 100vw;
  z-index: 100000;

  .preloader__gif {
    width: size(50px);
    height: size(50px);
    @media (max-width: 1050px) {
      width: 50px;
      height: 50px;
    }
  }
}
</style>