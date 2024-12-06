<template>
  <div class="not-found">
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
    <div class="not-found__container">
      <NuxtImg class="not-found__img" src="/imgs/not-found.svg"/>
      <h2 class="title">404</h2>
      <p class="sub">Запрашиваемой страницы не существует</p>
      <NuxtLink class="btn" to="/">Вернуться на главную</NuxtLink>
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
    label: "404",
  },
];
</script>

<style lang="scss" scoped>
.not-found__container {
  @include main-container();
  @include flex-col-center();
  padding-top: size(72px);
  padding-bottom: size(141px);
  text-align: center;

  .not-found__img {
    min-width: max-content;
    min-height: max-content;
    width: size(106px);
    height: size(106px);
    margin-bottom: size(40px);
    @media screen and (max-width: 1050px) {
      width: 106px;
      height: 106px;
      margin-bottom: 30px;
    }
  }

  .title {
    color: #5761AD;
    font-size: size(40px);
    font-weight: 400;
    word-wrap: break-word;
    margin-bottom: size(20px);
    @media screen and (max-width: 1050px) {
      font-size: 40px;
      margin-bottom: 30px;
    }
  }

  .sub {
    color: #5761AD;
    font-size: size(23px);
    font-weight: 400;
    word-wrap: break-word;
    margin-bottom: size(58px);
    @media screen and (max-width: 1050px) {
      font-size: 18px;
      margin-bottom: 45px;
    }
  }

  .btn {
    @include btn(16.5px, 43px, $primary, #fff);
    font-size: 14px;
    @media screen and (max-width: 1050px) {
      font-size: 14px;
    }
  }
}
</style>