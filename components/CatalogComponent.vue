<template>
  <div :class="{ active: subActive }" class="catalog-component">
    <div v-for="submenu in toFilter" class="catalog-component__item">
      <NuxtLink v-if="submenu && submenu.name"
                :to="{ path: '/filter', query: { id: productStore.getIdCategoryByNameCategory(submenu.name) } }"
                class="catalog-component__item__title">
        {{ submenu.name }}
      </NuxtLink>
      <div class="flex flex-col items-start gap-3.5">
        <NuxtLink v-for="item in submenu.filters"
                  :to="{ path: '/filter', query: { id:  productStore.getIdCategoryByNameCategory(submenu.name), product_name: item.name} }"
                  class="catalog-component__item__sub">
          {{ item.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useProductStore} from "~/store/product.store";

const prop = defineProps({
  subActive: {
    type: Boolean,
    default: true,
  },
  toFilter: {
    type: Array,
    default: [],
    required: true,
  }
});

const productStore = useProductStore();
</script>

<style lang="scss" scoped>
.catalog-component {
  width: 100%;
  @include flex-start();
  justify-content: space-between;
  gap: size(140px);
  background: inherit;
  transition: all 0.3s;
  @media screen and (max-width: 1050px) {
    flex-wrap: wrap;
    gap: 92px 34px;
  }

  .catalog-component__item {
    @include flex-col-start();
    gap: size(32px);
    @media screen and (max-width: 1050px) {
      gap: 32px;
    }
  }

  .catalog-component__item__title {
    color: #5761ad;
    font-size: size(16px);
    font-weight: 400;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      font-size: 16px;
    }
  }

  .catalog-component__item__sub {
    color: #646464;
    font-size: size(15px);
    font-weight: 400;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      font-size: 15px;
    }
  }
}
</style>
