<template>
  <div>
    <NuxtLayout>
      <AutorisationPopup/>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const popupActive = useState('popup__active');
onMounted(() => {
});
</script>

<style lang="scss" scoped></style>
