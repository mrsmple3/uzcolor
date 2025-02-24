<template>
  <NuxtLink v-if="product" :to="`/product/${product.id}`" class="product-card">
    <button :class="{ active: isLiked }" class="like" @click.prevent="saveProduct">
      <svg fill="none" height="19" viewBox="0 0 21 19" width="21" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M9.84856 3.17188L10.5 4.31377L11.1514 3.17188C11.562 2.4523 12.1626 1.84774 12.8949 1.42145C13.6213 0.998616 14.4507 0.766732 15.3005 0.750283C16.6716 0.81356 17.9575 1.39784 18.8814 2.3701C19.8095 3.34666 20.2976 4.63507 20.2463 5.95317L20.2458 5.96773V5.98231C20.2458 7.21934 19.7259 8.57054 18.8576 9.94816C17.9946 11.3174 16.8272 12.6501 15.6267 13.8346C13.2263 16.2031 10.7705 17.9045 10.5808 18.0348L10.5 18.0903L10.4209 18.036C10.4206 18.0358 10.4204 18.0356 10.4201 18.0354C10.2227 17.899 7.77038 16.199 5.37324 13.8339C4.17273 12.6495 3.00533 11.317 2.14236 9.9479C1.27409 8.57041 0.754234 7.21933 0.754234 5.98231V5.96773L0.753668 5.95317C0.702401 4.63507 1.19051 3.34666 2.11857 2.3701C3.04254 1.39784 4.32843 0.81356 5.69954 0.750283C6.54931 0.766732 7.3787 0.998616 8.10509 1.42145C8.83743 1.84774 9.43804 2.4523 9.84856 3.17188Z"
            fill="#fff"
            stroke="rgba(0, 0, 0, 0.30)"
            stroke-width="1.5"/>
      </svg>
    </button>
    <NuxtImg :src="currentImg" alt="" class="product-card__img"/>
    <div class="product-card__container">
      <h4 class="product-card__title">{{ product.name + ' ' + product.composition + ' ' + product.weight }}</h4>
      <p class="product-card__sub">Арт. {{ product.art }}</p>
    </div>
    <div class="swiper-replacer">
      <div :class="product.id" class="product__btn-prev">
        <UIcon class="bg-[#5761AD]" name="solar:alt-arrow-left-linear"/>
      </div>
      <Swiper
          :modules="[SwiperAutoplay, SwiperNavigation]"
          :navigation="{
					nextEl: '.product__btn-next.'+product.id,
					prevEl: '.product__btn-prev.'+product.id,
				}"
          :slides-per-view="5"
          :space-between="8"
          :speed="1300"
          class="slider">
        <SwiperSlide v-for="(material, index) in product.color" :key="index"
                     :class="['slider__item', { active: activeMaterial === index }]"
                     @click.prevent="changeMaterial(material, index)">
          <NuxtImg :src="material.img" class="slider__img"/>
        </SwiperSlide>
      </Swiper>
      <div :class="product.id" class="product__btn-next">
        <UIcon class="bg-[#5761AD]" name="solar:alt-arrow-right-linear"/>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>import {useUserStore} from "~/store/user.auth";

const productProp = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const isLiked = ref(false);
const popupStore = useState('popupState');
let currentImg = ref(productProp.product.color.length > 0 ? productProp.product.color[0].img : '/imgs/default-img.webp');
let activeMaterial = ref<number>(0);

const userStore = useUserStore();

function changeMaterial(material: String, index: number) {
  currentImg.value = material.img;
  activeMaterial.value = index;
}

const saveProduct = async () => {
  if (!userStore.isAuthenticated) {
    popupStore.value.autorisation.phone_or_email_autorisation = true;
    return false;
  }

  if (isLiked.value) {
    await userStore.deleteSavedProduct(userStore.userGetter.id, productProp.product.id).then(() => {
      isLiked.value = false;
    });
  } else {
    await userStore.saveProduct(userStore.userGetter.id, productProp.product.id).then(() => {
      isLiked.value = true;
    });
  }
};

onBeforeMount(async () => {
  const sliderItems = document.querySelectorAll('.slider__item');
  sliderItems.forEach(item => {
    const width = item.offsetWidth;
    item.style.height = `${width}px !important`;
  });
  if (userStore.isAuthenticated) {
    const favorites = userStore.savedProductsGetter;
    isLiked.value = favorites.some(favorite => favorite.productId === productProp.product.id);
  }
});
</script>

<style lang="scss">
.product-card__title {
  color: #404463;
  font-size: size(16px);
  font-weight: 400;
  word-wrap: break-word;
  margin-bottom: size(14px);
  @media screen and (max-width: 1050px) {
    font-size: 16px;
    margin-bottom: 14px;
  }
}

.product-card__sub {
  color: rgba(0, 0, 0, 0.3);
  font-size: size(13px);
  font-weight: 400;
  word-wrap: break-word;
  margin-bottom: size(15px);
  @media screen and (max-width: 1050px) {
    font-size: 13px;
    margin-bottom: 15px;
  }
}

.product-card {
  .product-card__img {
    width: 100%;
    height: size(190px);
    @media screen and (max-width: 1050px) {
      height: 190px;
    }
  }

  .product-card__container {
    width: 100%;
    padding: 0 size(20px);
    @media screen and (max-width: 1050px) {
      padding: 0 20px;
    }
  }


  .like {
    position: absolute;
    top: size(16px);
    right: size(16px);
    width: size(55px);
    height: size(55px);
    @include flex-center();
    justify-content: center;
    background: white;
    padding: size(19px) size(17px) size(17px);
    border-radius: 9999px;
    @media screen and (max-width: 1050px) {
      top: 16px;
      right: 16px;
      width: 55px;
      height: 55px;
      padding: 19px 17px 17px;
    }

    &.active {
      path {
        fill: $main-color;
        stroke: $main-color;
      }
    }

    svg {
      width: size(21px);
      height: size(19px);
      @media screen and (max-width: 1050px) {
        width: 21px;
        height: 19px;
      }
    }
  }


}
</style>
