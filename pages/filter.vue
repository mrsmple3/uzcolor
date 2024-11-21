<template>
  <div class="filter">
    <div class="filter__container">
      <div class="filter__content">
        <div v-if="currentCategory" class="dropdown">
          <input :value="currentCategory.name" class="dropdown__current" readonly
                 @click="isActiveDropDown = !isActiveDropDown"/>
          <div :class="{ active: isActiveDropDown }" class="dropdown__container">
            <input v-for="category in productStore.$state.category"
                   :key="category.id" :class="{active: currentCategory.id === category.id}" :value="category.name"
                   readonly @click="handleCategory(category.id)"/>
          </div>
        </div>

        <button class="not-desktop filter-mobile" @click="mobileFilter = true">
          <NuxtImg src="/imgs/icons/filter-icon.svg"/>
          <h4 class="title">Фильтр</h4>
        </button>

        <div :class="{active: mobileFilter}" class="filter__content__container">
          <div class="w-full flex items-center justify-between">
            <h4 class="title">Фильтр</h4>
            <button class="filter__btn" to="/" @click="handleFilter">Применить</button>
          </div>
          <div class="filter__content__container__list">
            <div v-for="filter in toFilter" :key="filter.id"
                 class="w-full flex flex-col items-start">
              <h6 class="list__title">{{ filter.name }}</h6>
              <div v-for="filterItem in filter.filters" :key="filterItem.name"
                   class="form__material__item">
                <UCheckbox :label="filterItem.name" :model-value="filterItem.checked"
                           :ui="{background: '!bg-white'}"
                           inputClass="form__material__checkbox"
                           @change="filterItem.checked = !filterItem.checked"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="filter__products">
        <ProductCard v-for="product in products" :key="product.id" :product="product"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {type CategoryState, type Filter, type ProductState, useProductStore} from "~/store/product.store";

definePageMeta({
  layout: "pages",
});
const productStore = useProductStore();

const mobileFilter = ref(false);

const route = useRoute();
const router = useRouter();

const products = ref<ProductState[]>(productStore.$state.categoryProducts);
const currentCategory = ref<CategoryState[]>(productStore.$state.category);
const toFilter = ref<Filter[]>([]);

onMounted(() => {
  productStore.getProductsByCategory(route.query.id);
  productStore.getAllCategory();
  productStore.getAllFilter();
});

const handleCategory = (id: string) => {
  isActiveDropDown.value = false;
  router.push({
    query: {
      id: id,
    },
  });
  productStore.getProductsByCategory(id);
};

const handleFilter = async () => {
  try {
    products.value = await $fetch('api/product/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filters: toFilter.value,
        products: productStore.$state.categoryProducts
      }),
    });
  } catch (error) {
    console.error('Error applying filters:', error);
  }
};

watch(
    () => [productStore.$state.categoryProducts, productStore.$state.category, productStore.$state.filter],
    ([categoryProducts, category, filter]) => {
      if (filter && categoryProducts) {
        products.value = categoryProducts;

        toFilter.value = filter.map((item) => ({
          name: item.name,
          filters: productStore.getCurrentFilters(item, products.value)
        }));
      }
      if (category) {
        currentCategory.value = productStore.categoryByIdGetter(route.query.id);
      }
    }
);

const isActiveDropDown = ref(false);

</script>

<style lang="scss" scoped>
.filter {
  position: relative;
  @include main-container();
  padding-bottom: size(196px);
  @media screen and (max-width: 1050px) {
    padding-bottom: 205px;
  }
}

.filter__container {
  width: 100%;
  @include flex-start();
  justify-content: space-between;
  gap: size(20px);
  @media screen and (max-width: 1050px) {
    flex-direction: column;
    gap: 40px;
  }
}

.filter-mobile {
  @include flex-center();
  gap: 20px;

  img {
    width: 26px;
    height: 26px;
  }

  .title {
    color: #5761AD;
    font-size: 18px;
    font-weight: 400;
    word-wrap: break-word;
  }
}

.filter__content {
  position: relative;
  width: 23%;
  @include flex-col-start();
  gap: size(11px);
  @media screen and (max-width: 1050px) {
    width: 100%;
    gap: 40px;
  }

  &::before {
    content: 'Категория';
    position: absolute;
    top: size(-25px);
    left: 0;
    color: rgba(0, 0, 0, 0.30);
    font-size: size(13px);
    font-weight: 400;
    word-wrap: break-word;
    z-index: 1;
    @media screen and (max-width: 1050px) {
      top: -25px;
      font-size: 13px;
    }
  }


  .filter__content__container {
    width: 100%;
    @include flex-col-start();
    gap: size(28px);
    padding: size(20px);
    border-radius: 5px;
    background: #f4f4f4;
    @media screen and (max-width: 1050px) {
      position: fixed;
      width: 80%;
      top: 0; //!
      left: -100%;
      gap: 28px;
      padding: 20px;
      z-index: 101;
      opacity: 0;
      transition: all .3s;
      &.active {
        left: 0;
        opacity: 1;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      }
    }

    .title {
      color: #5761AD;
      font-size: size(18px);
      font-weight: 400;
      word-wrap: break-word;
      @media screen and (max-width: 1050px) {
        font-size: 18px;
      }
    }

    .filter__btn {
      @include btn(12.5px, 21px, whtie, $main-color);
      border: 1px solid $main-color;
      border-radius: 100px;
    }

    .filter__content__container__list {
      @include flex-col-start();
      gap: size(38px);
      @media screen and (max-width: 1050px) {
        gap: 38px;
      }
    }

    .list__title {
      color: #646464;
      font-size: size(14px);
      font-weight: 300;
      word-wrap: break-word;
      margin-bottom: size(17px);
      @media screen and (max-width: 1050px) {
        font-size: 14px;
        margin-bottom: 17px;
      }
    }

    .form__material__item:not(:last-child) {
      margin-bottom: size(11px);
      @media screen and (max-width: 1050px) {
        margin-bottom: 11px;
      }
    }
  }
}

.dropdown {
  position: relative;
  width: 100%;

  input {
    width: 100%;
    background: white;
    border-radius: 5px;
    color: #484848;
    font-size: size(14px);
    font-weight: 400;
    word-wrap: break-word;
    border: 1px #DADADA solid;
    padding: size(21px) size(23px);
    cursor: pointer;
    @media screen and (max-width: 1050px) {
      font-size: 14px;
      padding: 21px 23px;
    }
  }

  .dropdown__container {
    position: absolute;
    top: 120%;
    left: 0;
    width: 100%;
    height: 0;
    @include flex-col-start();
    padding: 0 size(10px);
    background: white;
    border-radius: 5px;
    gap: size(13px);
    overflow: hidden;
    z-index: 3;
    transition: all .3s;
    @media screen and (max-width: 1050px) {
      padding: 0 10px;
      gap: 13px;
    }

    input {
      background: #f4f4f4;
      padding: size(9px) size(15px);
      @media screen and (max-width: 1050px) {
        padding: 9px 15px;
      }

      &:hover, &.active {
        background: #e6e6e6;
      }
    }

    &.active {
      height: size(165px);
      padding: size(10px);
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      overflow: auto;
      @media screen and (max-width: 1050px) {
        height: 165px;
        padding: 10px;
      }
    }
  }
}

.filter__products {
  width: calc(77% - size(20px));
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(size(308px), 1fr));
  gap: size(20px);
  @media screen and (max-width: 1050px) {
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(308px, 1fr));
    gap: 20px;
  }
}

</style>