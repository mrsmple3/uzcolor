<template>
  <div v-for="order in order.items" :key="order.id" class="history-card">
    <NuxtImg :alt="order.color.name" :src="order.color.img" class="history-card__img"/>
    <div class="history-card__content">
      <div class="flex flex-col items-start">
        <h2 class="product-card__title">
          {{ order.product.name + ' ' + order.product.composition + ' ' + order.product.weight + 'гр' }}
        </h2>
        <p class="product-card__sub">Арт. {{ order.product.art }}</p>
      </div>
      <div class="history-card__bottom">
        <div class="flex flex-col items-start">
          <span class="count__span">Количество, м</span>
          <input :value="order.quantity" class="count__value" readonly/>
        </div>
        <div class="status">
          <div class="wait">
            <NuxtImg alt="" class="time-past" src="/imgs/icons/time-past.svg"/>
            Заказ в обработке
          </div>
          <button class="cancel" @click="deleteOrderItem(order.id)">Отменить заказ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useUserStore} from "~/store/user.auth";

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});
const userStore = useUserStore();
const deleteOrderItem = async (id: string) => {
  await userStore.deleteOrderItem(id).then(async () => {
    await userStore.getOrderByUserId(userStore.userGetter.id);
  })
}
</script>

<style lang="scss" scoped>
.history-card {
  width: 100%;
  @include flex-stretch();
  height: size(212px);
  background: #F4F4F4;
  border-radius: 5px;
  @media screen and (max-width: 1050px) {
    height: auto;
    @include flex-col-start();

  }

  .history-card__img {
    width: size(212px);
    height: 100%;
    border-radius: 2px;
    border: 1px #E8E8E8 solid;
    @media screen and (max-width: 1050px) {
      width: 100%;
      height: 212px;
    }
  }

  .history-card__content {
    width: 100%;
    @include flex-col-start();
    justify-content: space-between;
    padding: size(32px) size(32px) size(32px) size(56px);
    @media screen and (max-width: 1050px) {
      padding: 20px;
    }
  }

  .history-card__bottom {
    width: 100%;
    @include flex-end();
    justify-content: space-between;
    @media screen and (max-width: 1050px) {
      @include flex-col-start();
      gap: 45px;
    }
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
    @media screen and (max-width: 1050px) {
      font-size: 13px;
      gap: 5px;
    }
  }

  .time-past {
    width: size(15px);
    height: size(15px);
    @media screen and (max-width: 1050px) {
      width: 15px;
      height: 15px;
    }
  }

  .success {
    color: rgba(57.48, 131.75, 23.06, 0.70);
    font-size: size(13px);
    font-weight: 400;
    line-height: 110%;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      font-size: 13px;
    }
  }

  .cancel {
    color: #FF1616;
    font-size: size(13px);
    font-weight: 400;
    line-height: 110%;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      font-size: 13px;
    }
  }
}
</style>