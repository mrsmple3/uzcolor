<template>
  <div class="not-found">
    <img :src="notFound.img" alt="" class="not-found__img">
    <p v-if="notFound.title" class="sub">{{ notFound.title }}</p>
    <p v-if="notFound.sub" class="sub-secondary" v-html="notFound.sub"></p>
    <NuxtLink class="not-found__btn " to="javascript:history.back()">Вернуться к каталогу</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  notFound: {
    type: {
      img: String,
      title: String,
      sub: String,
    },
  },
});
</script>


<style lang="scss">
.not-found {
  width: 100%;
  @include flex-col-center();
  padding-top: size(102px);
  padding-bottom: size(177px);
  @media screen and (max-width: 1050px) {
    padding-top: 102px;
    padding-bottom: 177px;
  }

  .not-found__img {
    min-width: max-content;
    min-height: max-content;
    width: size(106px);
    height: size(106px);
    margin-bottom: size(40px);
    @media screen and (max-width: 1050px) {
      width: 106px;
      height: 106px;
      margin-bottom: 40px;
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
      margin-bottom: 58px;
    }
  }

  .sub-secondary {
    width: size(461px);
    text-align: center;
    color: #5761AD;
    font-size: size(18px);
    font-weight: 400;
    line-height: 150%;
    word-wrap: break-word;
    margin-bottom: size(58px);

    button {
      text-decoration: underline;
      color: #FF1616;
    }

    @media screen and (max-width: 1050px) {
      font-size: 18px;
    }
  }

  .not-found__btn {
    @include btn(16.5px, 46.5px, $primary, #fff);
    font-size: size(14px);
    @media screen and (max-width: 1050px) {
      font-size: 16px;
    }
  }
}
</style>