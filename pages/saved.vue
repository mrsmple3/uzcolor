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
    <div class="saved">
      <BlockTitle :sub="'Вам понравилось'" :title="'Избранное'"/>
      <div v-if="userStore.totalSavedProducts > 0" class="saved__list">
        <ProductCard v-for="savedProduct in userStore.savedProductsGetter" :key="savedProduct.id"
                     :product="savedProduct.product"/>
      </div>
      <NotFound v-if="!userStore.totalSavedProducts > 0"
                :not-found="{img: '/imgs/not-found.svg', title: 'Ваш список избранного пока пуст'}"/>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {useUserStore} from "~/store/user.auth";

const links = ref([
  {
    label: "Главная",
    to: "/",
  },
  {
    label: "Корзина",
  },
]);

const userStore = useUserStore();
</script>

<style lang="scss">
.saved {
  @include main-container();
}

.saved__list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(size(308px), 1fr));
  gap: size(56px);
  padding-top: size(66px);
  padding-bottom: size(246px);
  @media screen and (max-width: 1050px) {
    grid-template-columns: repeat(auto-fill, minmax(308px, 1fr));
    gap: 30px;
    padding-top: 66px;
    padding-bottom: 246px;
  }
  @media screen and (max-width: 690px) {
    grid-template-columns: 1fr;
  }
}
</style>