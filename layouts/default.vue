<template>
  <div :style="{ paddingTop: `${headerHeight}px` }" class="layout">
    <HeaderComponent/>
    <slot/>..
		
  </div>
</template>

<script lang="ts" setup>
function updateHeaderHeight() {
  const headerElement = document.querySelector('.header');
  if (headerElement) {
    headerHeight.value = headerElement.clientHeight;
  }
}

const headerHeight = ref(0);

onMounted(() => {
  updateHeaderHeight();
  window.addEventListener('resize', updateHeaderHeight);
});
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
}
</style>
