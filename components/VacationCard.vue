<template>
  <NuxtLink :to="link" class="vacation__card">
    <div class="w-full flex items-center justify-between gap-8">
      <div class="flex flex-col gap-2.5">
        <span class="card__span">Актуальная вакансия</span>
        <h1 class="card__title">{{ title }}</h1>
      </div>
      <NuxtImg class="card__img" src="/imgs/icons/profile.svg"/>
    </div>

    <div class="card__btn">
      <UIcon class="!bg-white text-2xl font-black" name="solar:alt-arrow-right-linear"/>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  }
})
</script>


<style lang="scss" scoped>
.vacation__card {
  @include flex-col-start();
  width: 100%;
  justify-content: space-between;
  gap: size(32px);
  padding: size(35px) size(34px);
  background: #F4F4F4;
  border-radius: 5px;
  @media screen and (max-width: 1050px) {
    padding: 46px 34px;
    gap: 32px;
  }

  .card__span {
    color: #ABABAB;
    font-size: size(14px);
    font-weight: 300;
    line-height: 110%;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      font-size: 14px;
    }
  }

  .card__title {
    color: #637388;
    font-size: size(18px);
    font-weight: 400;
    line-height: 110%;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      font-size: 18px;
    }
  }

  .card__img {
    width: size(30px);
    height: size(30px);
    min-width: max-content;
    min-height: max-content;
    @media screen and (max-width: 1050px) {
      display: none;
    }
  }

  .card__btn {
    width: size(60px);
    height: size(60px);
    @include flex-center();
    justify-content: center;
    background: $primary;
    border-radius: 100px;

    @media screen and (max-width: 1050px) {
      width: 60px;
      height: 60px;
    }
  }
}
</style>