<template>
  <div>
    <UBreadcrumb
        :links="links"
        :ui="{
          base: 'font-normal',
          li: '!text-[#4f4f4f]',
          active: '!text-[#4f4f4f]/50',
          inactive: 'hover:!text-[#4f4f4f]/50'
			  }"
        class="breadcrumbs"
        divider="/"/>
    <div class="catalog">
      <BlockTitle :sub="'Разделы'" :title="'Категории продукции'" class="catalog__title"/>
      <div class="catalog__list">
        <CatalogComponent :to-filter="toFilter"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {type Filter, useProductStore} from "~/store/product.store";

const links = [
  {
    label: "Главная",
    to: "/",
  },
  {
    label: "Каталог",
  },
];

const productStore = useProductStore();

const toFilter = ref<Filter[]>([]);

onBeforeMount(async () => {
  if (productStore.categoryGetter.length === 0) {
    await productStore.getAllCategory();
  }

  const categories = productStore.categoryGetter;

  toFilter.value = await Promise.all(categories.map(async (category) => {
    const products = await productStore.getProductsByCategory(category.id);
    const filters = productStore.getCurrentFilters({name: 'Полотно'}, products);
    return {
      name: category.name,
      filters,
    };
  }));
});
</script>

<style lang="scss" scoped>
.catalog {
  @include main-container();
  @include flex-col-start();
  padding-bottom: size(156px);
  @media screen and (max-width: 1050px) {
    padding: 0;
    padding-bottom: 49px;
  }

  .catalog__list {
    width: 100%;
    padding: size(60px);
    background-color: #f8f8f8;
    margin-top: size(60px);
    @media screen and (max-width: 1050px) {
      @include main-container();
      padding-top: 80px;
      padding-bottom: 80px;
      margin-top: 53px;
    }
  }

  .catalog__title {
    @media screen and (max-width: 1050px) {
      @include main-container();
    }
  }
}
</style>
