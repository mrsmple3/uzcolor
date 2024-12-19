<template>
  <div v-if="cart" class="cart__card">
    <img :alt="cart.color.name" :src="cart.color.img" class="cart__card__img">
    <div class="w-full flex flex-col items-start">
      <h2 class="title">{{ cart.product.name }}</h2>
      <span class="art">Арт.{{ cart.product.art }}</span>
      <div class="w-full flex justify-between items-end mobile-bottom">
        <div class="flex-col-start items-start gap-4">
          <span class="count__span">Количество, м</span>
          <div class="count">
            <NuxtImg class="count__btn" src="/imgs/icons/minus-circle.svg"
                     @click="decreaseCount"/>
            <input :value="cart.product.count" class="count__value"/>
            <NuxtImg class="count__btn" src="/imgs/icons/plus-circle.svg" @click="increaseCount"/>
          </div>
        </div>
        <div class="flex items-start gap-2.5">
          <span class="price-span">Стоимость:</span><span class="price">{{ formattedPrice }} сум</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useProductStore} from "~/store/product.store";

const cartProp = defineProps({
  cart: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update-price']);

const productStore = useProductStore();

const formattedPrice = computed(() => {
  return cartProp.cart.product.price * cartProp.cart.count;
});

const decreaseCount = async () => {
  if (cartProp.cart.count > 1) {
    cartProp.cart.count--;
    cartProp.cart.product.count--;
    await productStore.updateProductCount(cartProp.cart.product.id, cartProp.cart.product.count);
    emit('update-price', cartProp.cart);
  }
};

const increaseCount = async () => {
  cartProp.cart.count++;
  cartProp.cart.product.count++;
  await productStore.updateProductCount(cartProp.cart.product.id, cartProp.cart.product.count);
  emit('update-price', cartProp.cart);
};
</script>

<style lang="scss" scoped>
.cart__card {
  width: 100%;
  @include flex-center();
  justify-content: flex-start;
  gap: size(56px);
  padding-right: size(35px);
  background: #F4F4F4;
  overflow: hidden;
  border-radius: 5px;
  @media screen and (max-width: 1050px) {
    @include flex-start();
    padding: 34px 17px;
  }

  .mobile-bottom {
    @media screen and (max-width: 1050px) {
      width: 100%;
      @include flex-col-start();
      gap: 35px;
    }
  }

  .cart__card__img {
    width: size(212px);
    height: size(212px);
    @media screen and (max-width: 1050px) {
      width: 48px;
      height: 48px;
      border-radius: 100px;
    }
  }

  .title {
    width: 100%;
    color: black;
    font-size: size(16px);
    font-weight: 300;
    line-height: 140%;
    word-wrap: break-word;
    margin-bottom: size(8px);
    @media screen and (max-width: 1050px) {
      font-size: 16px;
      margin-bottom: 8px;
    }
  }

  .art {
    width: 100%;
    color: rgba(99.88, 99.88, 99.88, 0.50);
    font-size: size(14px);
    font-weight: 400;
    word-wrap: break-word;
    margin-bottom: size(40px);
    @media screen and (max-width: 1050px) {
      font-size: 14px;
      margin-bottom: 30px;
    }
  }

  .price-span {
    color: rgba(36, 40, 72, 0.70);
    font-size: size(13px);
    font-weight: 400;
    line-height: 110%;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      font-size: 15px;
    }
  }

  .price {
    color: #5761AD;
    font-size: size(18px);
    font-weight: 400;
    line-height: 45%;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      font-size: 18px;
    }
  }


  .count {
    @include flex-center();
    gap: size(8px);
    @media screen and (max-width: 1050px) {
      gap: 8px;
    }

    .count__btn {
      width: size(23px);
      height: size(23px);
      cursor: pointer;
      @media screen and (max-width: 1050px) {
        width: 34px;
        height: 34px;
      }
    }
  }
}

</style>