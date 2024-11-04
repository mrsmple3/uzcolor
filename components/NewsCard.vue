<template>
  <NuxtLink class="news__card" to="/">
    <NuxtImg class="news__card__img" src="/imgs/news-1.jpg"/>
    <div class="news__card__content">
      <div class="flex flex-col items-start gap-6">
        <div class="news__card__date">15.10.2024</div>
        <h4 class="news__card__title">Новые виды трикотажных полотен в ассортименте</h4>
        <p class="news__card__sub">Расширили линейку продукции: добавлены новые смеси и фактуры для одежды.</p>
      </div>
      <span class="news__card__read">Читать →</span>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>

</script>


<style lang="scss" scoped>
.news__card {
  width: size(635px);
  height: size(330px);
  @include flex-center();
  background: #F4F4F4;
  border-right: 5px;
}

.news__card__img {
  width: size(245px);
  height: 100%;
}

.news__card__content {
  @include flex-col-start();
  justify-content: space-between;
  height: 100%;
  padding: size(37px);
}

.news__card__date {
  padding: size(12.5px) size(23.5px);
  background: white;
  border-radius: 100px;
  color: rgba(37, 41, 74, 0.70);
  font-size: size(12px);
  font-weight: 400;
  word-wrap: break-word;
}

.news__card__title {
  color: #4B4B4B;
  font-size: size(18px);
  font-weight: 300;
  line-height: 26px;
  word-wrap: break-word
}

.news__card__sub {
  color: #828282;
  font-size: size(14px);
  font-weight: 300;
  line-height: 150%;
  word-wrap: break-word
}

.news__card__read {
  color: #242848;
  font-size: size(14px);
  font-weight: 300;
  line-height: 150%;
  word-wrap: break-word;
}
</style>