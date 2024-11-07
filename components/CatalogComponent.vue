<template>
  <div :class="{ active: subActive }" class="submenu">
    <div v-for="submenu in submenus" class="submenu__item">
      <h4 class="submenu__item__title">{{ submenu.title }}</h4>
      <div class="flex flex-col items-start gap-3.5">
        <NuxtLink v-for="item in submenu.list" :to="item.link" class="submenu__item__sub">
          {{ item.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  submenus: {
    type: Object,
    required: true,
  },
  subActive: {
    type: Boolean,
    default: true,
  }
});
</script>

<style lang="scss" scoped>

</style>