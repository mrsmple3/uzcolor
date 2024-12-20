<template>
  <div class="staff">
    <NuxtImg class="staff__img" src="/imgs/staff.png"/>
    <h2 class="staff__title">{{ name }}</h2>

    <div class="media">
      <div class="span">Номер телефона</div>
      <a :href="`tel:${phone}`" class="title">{{ phone }}</a>
    </div>

    <div class="media">
      <div class="span">Email</div>
      <a :href="`mail:${email}`" class="title">{{ email }}</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  name: String,
  phone: String,
  email: String,
});
</script>

<style lang="scss" scoped>
.staff {
  width: 100%;
  @include flex-col-start();

  .staff__img {
    width: 100%;
    height: size(306px);
    border-radius: 5px;
    margin-bottom: 30px;
    @media screen and (max-width: 1050px) {
      height: 183px;
      margin-bottom: 30px;
    }
  }

  .staff__title {
    color: #5761AD;
    font-size: size(20px);
    font-weight: 400;
    word-wrap: break-word;
    margin-bottom: size(20px);
    @media screen and (max-width: 1050px) {
      font-size: 15px;
      margin-bottom: 20px;
    }
  }

  .media {
    @include flex-col-start();
    gap: size(6px);

    &:not(:last-child) {
      margin-bottom: size(20px);
    }

    @media screen and (max-width: 1050px) {
      gap: 6px;
      margin-bottom: 20px;
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }

    .span {
      color: rgba(58, 65, 116, 0.50);
      font-size: size(14px);
      font-weight: 400;
      word-wrap: break-word;
      @media screen and (max-width: 1050px) {
        font-size: 14px;
      }
    }

    .title {
      color: #3A4174;
      font-size: size(18px);
      font-weight: 400;
      word-wrap: break-word;
      @media screen and (max-width: 1050px) {
        font-size: 16px;
      }
    }
  }
}
</style>