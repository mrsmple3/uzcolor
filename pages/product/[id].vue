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
    <div v-if="product" class="product">
      <h1 class="title">
        {{ product.name }}
        {{ product.composition }}
        {{ product.weight }}
      </h1>
      <div class="product__card">
        <div v-if="currentImg" class="left">
          <NuxtImg :src="currentImg.img" class="product__card__img"/>
        </div>
        <div class="right">
          <div class="w-full flex items-center justify-between mb-5 mobile-flex-col">
            <p class="art">Арт. {{ product.art }}</p>

            <div class="tabs">
              <button v-for="(tab, index) in tabs" :class="{ active: activeTab === index }" class="tab__item"
                      @click="activeTab = index">
                {{ tab.name }}
              </button>
            </div>
          </div>
          <h2 class="price">
            {{ computedPrice }}
            <span>сум/м</span></h2>
          <p class="product__type">{{ tabs[activeTab].name }}</p>
          <p class="sub">
            {{ product.shortDescription }}
          </p>
          <Swiper
              :modules="[SwiperAutoplay, SwiperNavigation]"
              :navigation="{
                nextEl: '.product__btn-next',
                prevEl: '.product__btn-prev',
              }"
              :slides-per-view="5"
              :space-between="8"
              :speed="1300"
              class="slider">
            <div class="product__btn-prev">
              <UIcon class="bg-[#5761AD]" name="solar:alt-arrow-left-linear"/>
            </div>
            <SwiperSlide
                v-for="(material, index) in productStore.$state.defineProduct.color"
                :key="index"
                :class="['slider__item', { active: activeMaterial === index }]"
                @click.prevent="changeMaterial(material, index)">
              <NuxtImg :src="material.img" class="slider__img"/>
            </SwiperSlide>
            <div class="product__btn-next">
              <UIcon class="bg-[#5761AD]" name="solar:alt-arrow-right-linear"/>
            </div>
          </Swiper>
          <div v-if="userStore.isAuthenticated" class="right__bottom">
            <div class="h-full flex-col-start justify-between">
              <span class="count__span">Количество, м</span>
              <div class="count">
                <NuxtImg class="count__btn" src="/imgs/icons/minus-circle.svg"
                         @click="decrease"/>
                <input :value="product.count" class="count__value" readonly/>
                <NuxtImg class="count__btn" src="/imgs/icons/plus-circle.svg" @click="increase"/>
              </div>
            </div>
            <button class="right__btn">Оформить заказ</button>
            <div class="flex-center">
              <button class="cart__btn" @click.prevent="toCartProduct">
                <NuxtImg :src="isActiveCart ? '/imgs/icons/active-cart.svg' : '/imgs/icons/shopping-cart-blue.svg'"/>
              </button>
              <button :class="{ active: isLiked }" class="like__btn" @click.prevent="saveProduct">
                <svg fill="none" height="19" viewBox="0 0 21 19" width="21" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M9.84856 3.17188L10.5 4.31377L11.1514 3.17188C11.562 2.4523 12.1626 1.84774 12.8949 1.42145C13.6213 0.998616 14.4507 0.766732 15.3005 0.750283C16.6716 0.81356 17.9575 1.39784 18.8814 2.3701C19.8095 3.34666 20.2976 4.63507 20.2463 5.95317L20.2458 5.96773V5.98231C20.2458 7.21934 19.7259 8.57054 18.8576 9.94816C17.9946 11.3174 16.8272 12.6501 15.6267 13.8346C13.2263 16.2031 10.7705 17.9045 10.5808 18.0348L10.5 18.0903L10.4209 18.036C10.4206 18.0358 10.4204 18.0356 10.4201 18.0354C10.2227 17.899 7.77038 16.199 5.37324 13.8339C4.17273 12.6495 3.00533 11.317 2.14236 9.9479C1.27409 8.57041 0.754234 7.21933 0.754234 5.98231V5.96773L0.753668 5.95317C0.702401 4.63507 1.19051 3.34666 2.11857 2.3701C3.04254 1.39784 4.32843 0.81356 5.69954 0.750283C6.54931 0.766732 7.3787 0.998616 8.10509 1.42145C8.83743 1.84774 9.43804 2.4523 9.84856 3.17188Z"
                      fill="#fff"
                      stroke="#5760AC"
                      stroke-width="2"/>
                </svg>
              </button>
            </div>
          </div>
          <p v-else class="not-authenticated">
            Для оформления заказа необходимо <span
              @click="popupState.autorisation.login_by_password = true">войти</span>
            в личный кабинет или <span @click="popupState.autorisation.phone_or_email_autorisation = true">зарегестрироваться</span>.
          </p>
        </div>
      </div>

      <div class="product__content">
        <div class="product__content__item">
          <h3 class="product__content__title">Описание</h3>
          <p class="sub">
            {{ product.description }}
          </p>
        </div>
        <div class="product__content__item">
          <h3 class="product__content__title">Характеристики</h3>
          <table>
            <tr v-for="param in product.params">
              <td>{{ param.title }}</td>
              <td>{{ param.param.name }}</td>
            </tr>
          </table>
        </div>
      </div>

      <div class="recommendation">
        <BlockTitle :sub="'Смотрите также'" :title="'Рекомендации'"/>
        <div class="slider__replacer">
          <div class="btn-prev">
            <UIcon class="bg-[#5761AD]" name="solar:alt-arrow-left-linear"/>
          </div>
          <Swiper
              :breakpoints="{
						1050: {
							slidesPerView: 4,
							spaceBetween: 18,
						},
					}"
              :modules="[SwiperAutoplay, SwiperNavigation]"
              :navigation="{
						nextEl: '.recommendation .btn-next',
						prevEl: '.recommendation .btn-prev',
					}"
              :slides-per-view="'auto'"
              :space-between="20"
              :speed="1300"
              class="product__container">
            <SwiperSlide v-for="item in productStore.$state.typeProducts.recommendation" class="product-card">
              <ProductCard :product="item"/>
            </SwiperSlide>
          </Swiper>
          <div class="btn-next">
            <UIcon class="bg-[#5761AD]" name="solar:alt-arrow-right-linear"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {type DefineProductState, useProductStore} from "~/store/product.store";
import {useUserStore} from "~/store/user.auth";

const route = useRoute();
const productStore = useProductStore();
const userStore = useUserStore();
const popupState = useState("popupState");

const isActiveCart = ref(false);

const productId = ref(route.params.id);

const product = ref<DefineProductState>(productStore.$state.defineProduct);

let activeMaterial = ref<number>(0);

const isLiked = ref(false);

const currentImg = ref<{ img: string, name: string }>(productStore.$state.defineProduct.color[0]);

const computedPrice = computed(() => {
  return product.value.price * product.value.count;
});

const increase = async () => {
  product.value.count++;
  if (isActiveCart.value) {
    await productStore.updateProductCount(product.value.id, product.value.count);
  }
}

const decrease = async () => {
  if (product.value.count > 1) {
    product.value.count--;
    if (isActiveCart.value) {
      await productStore.updateProductCount(product.value.id, product.value.count);
    }
  }
}

let activeTab = ref<number>(0);

const links = ref([
  {
    label: "Главная",
    to: "/",
  },
  {
    label: "Каталог",
    to: "/catalog",
  },
  {
    label: product.value.name
  },
]);

const tabs = [
  {
    name: "Мелкий опт",
  },
  {
    name: "Крупный опт",
  },
];

function changeMaterial(material: any, index: number) {
  currentImg.value = {...material};
  activeMaterial.value = index;
}

const toCartProduct = async () => {
  const cartItem = userStore.cart.items.find(item => item.productId === product.value.id);

  if (cartItem) {
    await userStore.deleteCartItem(userStore.userGetter.id, cartItem.id).then(() => {
      isActiveCart.value = false;
    });
  } else {
    await userStore.setCart(userStore.userGetter.id, product.value.id, product.value.count, currentImg.value, computedPrice.value)
        .then(async () => {
          isActiveCart.value = true;
          await productStore.updateProductCount(product.value.id, product.value.count);
        });
  }
};

const saveProduct = async () => {
  if (isLiked.value) {
    await userStore.deleteSavedProduct(userStore.userGetter.id, product.value.id).then(() => {
      isLiked.value = false;
    });
  } else {
    await userStore.saveProduct(userStore.userGetter.id, product.value.id).then(() => {
      isLiked.value = true;
    });
  }
};

onBeforeMount(async () => {
  await productStore.getProductById(productId.value as string).then(
      () => {
        product.value = productStore.$state.defineProduct;
        currentImg.value = productStore.$state.defineProduct.color[0];
      }
  ).then(async () => {
    if (userStore.isAuthenticated) {
      const favorites = userStore.savedProductsGetter;
      isLiked.value = favorites.some(favorite => favorite.productId === product.value.id);

      const cartItems = userStore.cart.items;
      isActiveCart.value = cartItems.some(cartItem => cartItem.productId === product.value.id);
    }
  });
  links.value[links.value.length - 1].label = product.value.name;
  await productStore.getProductByType("recommendation");
});
</script>

<style lang="scss" scoped>
.product {
  width: 100%;
  @include main-container();
  @include flex-col-start();
  padding-bottom: size(158px);
  @media screen and (max-width: 1050px) {
    padding: 0;
    padding-bottom: 60px;
  }
}

.title {
  color: #484848;
  font-size: size(28px);
  font-weight: 400;
  word-wrap: break-word;
  margin-bottom: size(50px);
  @media screen and (max-width: 1050px) {
    @include main-container();
    font-size: 23px;
    margin-bottom: 53px;
  }
}

.product__card {
  width: 100%;
  @include flex-start();
  justify-content: space-between;
  gap: size(19px);
  margin-bottom: size(76px);
  @media screen and (max-width: 1050px) {
    @include flex-col-start();
    gap: 19px;
    margin-bottom: 50px;
  }

  .left {
    width: 44%;
    @include flex-col-start();
    gap: size(12px);
    @media screen and (max-width: 1050px) {
      @include main-container();
      gap: 12px;
    }

    .product__card__img {
      width: 100%;
      height: size(483px);
      border-radius: 2px;
      @media screen and (max-width: 1050px) {
        height: 340px;
      }
    }
  }

  .right {
    width: 55%;
    @include flex-col-start();
    padding: size(37px) size(52px);
    border-radius: 5px;
    background: #f4f4f4;
    @media screen and (max-width: 1050px) {
      @include main-container();
      padding-top: 50px;
      padding-bottom: 50px;
    }
  }

  .art {
    color: #646464;
    font-size: size(14px);
    font-weight: 400;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      font-size: 14px;
    }
  }

  .tabs {
    @include flex-stretch();
    border-radius: 100px;
    overflow: hidden;
    background: #eaeaea;

    .tab__item {
      padding: size(13.5px) size(30.5px);
      background: transparent;
      color: #515151;
      font-size: size(13px);
      font-weight: 400;
      line-height: 110%;
      word-wrap: break-word;
      @media screen and (max-width: 1050px) {
        padding: 17px 40px;
        font-size: 15px;
      }

      &.active {
        background: #fff;
      }
    }
  }

  .price {
    color: black;
    font-size: size(36px);
    font-weight: 400;
    line-height: 150%;
    word-wrap: break-word;

    span {
      font-size: size(20px);
    }

    @media screen and (max-width: 1050px) {
      font-size: 36px;
      span {
        font-size: 20px;
      }
    }
  }

  .product__type {
    color: rgba(36, 40, 72, 0.7);
    font-size: size(13px);
    font-weight: 400;
    line-height: 110%;
    word-wrap: break-word;
    margin-bottom: size(30px);
    @media screen and (max-width: 1050px) {
      font-size: 13px;
      margin-bottom: 30px;
    }
  }

  .sub {
    width: 100%;
    color: #646464;
    font-size: size(14px);
    font-family: Aeonik TRIAL, sans-serif;
    font-weight: 400;
    line-height: 150%;
    word-wrap: break-word;
    margin-bottom: size(61px);
    @media screen and (max-width: 1050px) {
      font-size: 14px;
      margin-bottom: 53px;
    }
  }

  .slider {
    width: max-content;
    margin: 0;
    margin-bottom: size(42px);
    @media screen and (max-width: 1050px) {
      margin-bottom: 42px;
    }
  }

  .right__bottom {
    width: 100%;
    @include flex-end();
    justify-content: flex-start;
    @media screen and (max-width: 1050px) {
      @include flex-col-start();
    }

    .flex-col-start {
      margin-right: size(32px);
      @media screen and (max-width: 1050px) {
        margin-right: 0;
        margin-bottom: 32px;
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

    .right__btn {
      @include btn(21px, 66.5px, $primary, white);
      margin-right: size(21px);
      @media screen and (max-width: 1050px) {
        margin-right: 0;
        margin-bottom: 21px;
      }
    }

    .cart__btn,
    .like__btn {
      width: size(59px);
      height: size(59px);
      @include flex-center();
      justify-content: center;
      background: #fff;
      border-radius: 9999px;
      margin-right: size(12px);
      @media screen and (max-width: 1050px) {
        width: 59px;
        height: 59px;
        margin-right: 12px;
      }


      img {
        min-width: max-content;
        min-height: max-content;
        width: size(22px);
        height: size(22px);
        @media screen and (max-width: 1050px) {
          width: 22px;
          height: 22px;
        }
      }
    }

    .like__btn {
      margin-right: 0;

      &.active {
        path {
          fill: $main-color;
          stroke: $main-color;
        }
      }
    }
  }
}

.product__content {
  color: #000;
  @include flex-start();
  gap: size(26px);
  margin-bottom: size(89px);
  @media screen and (max-width: 1050px) {
    @include main-container();
    @include flex-col-start();
    gap: 59px;
    margin-bottom: 69px;
  }

  .product__content__item {
    width: 100%;
    @include flex-col-start();
    gap: size(37px);
    @media screen and (max-width: 1050px) {
      gap: 37px;
    }
  }

  .product__content__title {
    color: black;
    font-size: size(23px);
    font-weight: 400;
    line-height: 150%;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      font-size: 23px;
    }
  }

  table {
    width: 100%;
    @include flex-col-start();

    tr {
      width: 100%;
      @include flex-center();
      justify-content: space-between;
      background: #F5F5F5;
      padding: size(12.5px) size(20px);

      &:nth-child(even) {
        background: #fff;
        border: 1px #ECECEC solid;
      }
    }

    td {
      color: rgba(0, 0, 0, 0.60);
      font-size: size(14px);
      font-weight: 300;
      line-height: 160%;
      word-wrap: break-word;
      @media screen and (max-width: 1050px) {
        font-size: 14px;
      }
    }
  }

  .sub {
    color: #646464;
    font-size: size(14px);
    font-weight: 300;
    line-height: 180%;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      font-size: 15px;
    }
  }
}

.not-authenticated {
  color: #646464;
  font-size: size(15px);
  font-weight: 400;
  line-height: 150%;
  word-wrap: break-word;
  @media screen and (max-width: 1050px) {
    font-size: 15px;
  }

  span {
    color: #FF1616;
    text-decoration: underline;
  }
}

.recommendation {
  @include flex-col-start();
  gap: size(40px);
  @media screen and (max-width: 1050px) {
    @include main-container();
    gap: 42px;
  }
}

.mobile-flex-col {
  @media screen and (max-width: 1050px) {
    @include flex-col-start();
    flex-direction: column-reverse;
    gap: 46px;
  }
}
</style>
