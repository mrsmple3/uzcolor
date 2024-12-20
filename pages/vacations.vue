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
    <div class="vacation">
      <BlockTitle :sub="'Все объявления'" :title="'Все вакансии'"/>
      <div class="vacation__list">
        <VacationCard :link="'/vacation-item'" :title="'Наименование вакансии'"/>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {useUserStore} from "~/store/user.auth";

definePageMeta({
  layout: "pages",
});

const links = ref([
  {
    label: "Главная",
    to: "/",
  },
  {
    label: "Все вакансии",
  },
]);

const userStore = useUserStore();
</script>

<style lang="scss">
.vacation {
  width: 100%;
  @include main-container();
  @include flex-col-start();
  gap: size(76px);
  @media screen and (max-width: 1050px) {
    gap: 46px;
  }

  .vacation__list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: size(24px);
    padding-bottom: size(211px);
    @media screen and (max-width: 1050px) {
      grid-template-columns: repeat(1, 1fr);
      gap: 30px;
    }
  }
}
</style>