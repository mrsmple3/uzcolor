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
        <CatalogComponent/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const links = [
  {
    label: "Главная",
    to: "/",
  },
  {
    label: "Каталог",
  },
];
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
