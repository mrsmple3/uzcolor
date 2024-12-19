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
    <div class="news">
      <BlockTitle :sub="'Все посты'" :title="'Блог компании'"/>
      <div class="news__cards">
        <BlogCard/>
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
    label: "Блог",
  },
];
</script>

<style lang="scss" scoped>
.news {
  @include main-container();
  @include flex-col-start();
  gap: size(56px);
  padding-bottom: size(271px);
  @media screen and (max-width: 1050px) {
    gap: 53px;
    padding-bottom: 217px;
  }
}
</style>