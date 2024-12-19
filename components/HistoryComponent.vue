<template>
  <div class="history-card">
    <NuxtImg alt="" class="history-card__img" src="/imgs/product-1.jpg"/>
    <div class="history-card__content">
      <div class="flex flex-col items-start">
        <h2 class="product-card__title">Футер 3-Х Нитка ДИАГОНАЛЬ 85% ХБ 15% ПЭ 320гр</h2>
        <p class="product-card__sub">Арт. TER382942</p>
      </div>
      <div class="history-card__bottom">
        <div class="flex flex-col items-start">
          <span class="count__span">Количество, м</span>
          <input class="count__value" readonly value="10"/>
        </div>
        <div class="status">
          <div class="wait">
            <NuxtImg alt="" class="time-past" src="/imgs/icons/time-past.svg"/>
            Заказ в обработке
          </div>
          <button class="cancel">Отменить заказ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.history-card {
  width: 100%;
  @include flex-stretch();
  height: size(212px);
  background: #F4F4F4;
  border-radius: 5px;

  .history-card__img {
    width: size(212px);
    height: 100%;
    border-radius: 2px;
    border: 1px #E8E8E8 solid;
  }

  .history-card__content {
    width: 100%;
    @include flex-col-start();
    justify-content: space-between;
    padding: size(32px) size(32px) size(32px) size(56px);
  }

  .history-card__bottom {
    width: 100%;
    @include flex-end();
    justify-content: space-between;
  }

  .status {
    @include flex-center();
    gap: size(16px);
  }

  .wait {
    @include flex-center();
    gap: size(10px);
    color: rgba(36, 40, 72, 0.70);
    font-size: size(13px);
    font-weight: 400;
    line-height: 110%;
    word-wrap: break-word;
  }

  .time-past {
    width: size(15px);
    height: size(15px);
  }

  .success {
    color: rgba(57.48, 131.75, 23.06, 0.70);
    font-size: size(13px);
    font-weight: 400;
    line-height: 110%;
    word-wrap: break-word;
  }

  .cancel {
    color: #FF1616;
    font-size: size(13px);
    font-weight: 400;
    line-height: 110%;
    word-wrap: break-word;
  }
}
</style>