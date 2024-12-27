<template>
  <div :style="{ paddingTop: `${headerHeight}px` }" class="layout">
    <HeaderComponent/>
    <slot/>
    <FooterComponent/>
  </div>
</template>

<script lang="ts" setup>

function updateHeaderHeight() {
  const headerElement = document.querySelector(".header");
  if (headerElement) {
    headerHeight.value = headerElement.clientHeight;
  }
}

const {loader, clearLoader, clearLoaderTimeout} = usePreloader();
const headerHeight = ref(0);

onBeforeMount(() => {
  clearLoaderTimeout();
});

onMounted(() => {
  updateHeaderHeight();
  window.addEventListener("resize", updateHeaderHeight);
  clearLoader();
});
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  width: 100%;
}
</style>
