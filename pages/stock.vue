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
    <div class="stock">
      <BlockTitle :sub="'Акции компании'" :title="'Все акции'"/>
      <div class="stock__cards">
        <StockCard/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.stock {
  @include main-container();
  @include flex-col-start();
  gap: size(56px);
  padding-bottom: size(271px);
  @media screen and (max-width: 1050px) {
    gap: 53px;
    padding-bottom: 217px;
  }

  .stock__cards {
    width: 100%;
    @include flex-col-start();
    gap: size(56px);
    @media screen and (max-width: 1050px) {
      gap: 53px;
      @include flex-col-stretch();
    }
  }
}
</style>