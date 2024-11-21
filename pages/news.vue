<template>
  <div class="news">
    <BlockTitle :sub="'Новости компании'" :title="'Все новости'"/>
    <div class="news__cards">
      <NewsCard/>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "pages",
});
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