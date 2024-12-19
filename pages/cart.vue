<template>
  <div>
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
    <div class="cart">
      <BlockTitle :sub="'Вы добавили'" :title="'Корзина'"/>
      <div v-if="userStore.cartGetter.items.length > 0" class="cart__container">
        <div class="cart__cards">
          <CartCard v-for="cartItem in userStore.cartGetter.items" :key="cartItem.id" :cart="cartItem"
                    @update-price="updateTotalPrice"/>
        </div>
        <CartSidebar :totalPrice="totalPrice"/>
      </div>
      <NotFound v-else
                :not-found="{img: '/imgs/not-found.svg', title: 'Вы пока не добавили ничего в корзину'}"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useUserStore} from "~/store/user.auth";

const userStore = useUserStore();
const totalPrice = ref(0);

const links = [
  {
    label: "Главная",
    to: "/",
  },
  {
    label: "Корзина",
  },
];

const updateTotalPrice = () => {
  totalPrice.value = userStore.cartGetter.items.reduce((sum, item) => {
    return sum + item.product.price * item.product.count;
  }, 0);
};

onBeforeMount(async () => {
  await userStore.getCarts(userStore.userGetter.id);
});
watch(() => userStore.cartGetter.items, () => {
  updateTotalPrice();
});
</script>

<style lang="scss" scoped>
.cart {
  @include main-container();
  @include flex-col-start();
  gap: size(50px);
  margin-bottom: size(174px);
  @media screen and (max-width: 1050px) {
    gap: 46px;
  }

  .cart__container {
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: size(20px);
    @media screen and (max-width: 1050px) {
      @include flex-col-start();
      gap: 14px;
    }
  }

  .cart__cards {
    width: 100%;
    @include flex-col-start();
    gap: size(18px);
    @media screen and (max-width: 1050px) {
      gap: 18px;
    }
  }
}
</style>