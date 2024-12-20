<template>
  <div class="stock__card">
    <div class="news__card__content">
      <div class="flex flex-col items-start gap-6">
        <div class="news__card__date">15.10.2024 - 15.11.2024</div>
        <h4 class="news__card__title">Новые виды трикотажных полотен в ассортименте</h4>
        <p class="news__card__sub">Расширили линейку продукции: добавлены новые смеси и фактуры для одежды. Расширили
          линейку продукции: добавлены новые смеси и фактуры для одежды.Расширили линейку продукции: добавлены новые
          смеси и фактуры для одежды.Расширили линейку продукции: добавлены новые смеси и фактуры для одежды.</p>
      </div>
      <span class="news__card__read">Смотреть →</span>
    </div>
    <NuxtImg class="news__card__img" src="/imgs/stock-1.png"/>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.stock__card {
  width: 100%;
  height: size(330px);
  @include flex-center();
  border: 1px #C7C7C7 solid;
  border-radius: 5px;
  @media screen and (max-width: 1050px) {
    width: 100%;
    height: auto;
    @include flex-col-stretch();
  }

  .news__card__img {
    border-radius: 5px;
  }

  .news__card__date {
    background: #F4F4F4;
  }
}
</style>