<template>
  <div class="filter">
    <div class="filter__container">
      <div class="filter__content">
        <div class="dropdown">
          <input class="dropdown__current" readonly value="Трикотажное полотно"
                 @click="isActiveDropDown = !isActiveDropDown"/>
          <div :class="{ active: isActiveDropDown }" class="dropdown__container">
            <input class="dropdown__item" readonly value="1"/>
            <input class="dropdown__item" readonly value="2"/>
            <input class="dropdown__item" readonly value="3"/>
          </div>
        </div>
        <div class="filter__content__container">
          <div class="w-full flex items-center justify-between">
            <h4 class="title">Фильтр</h4>
            <NuxtLink class="filter__btn" to="/">Применить</NuxtLink>
          </div>
          <div class="filter__content__container__list">
            <div class="w-full flex flex-col items-start">
              <h6 class="list__title">Полотно</h6>
              <div v-for="item in formMaterials" class="form__material__item">
                <UCheckbox :label="item.name" :model-value="item.checked"
                           :ui="{background: '!bg-white'}"
                           inputClass="form__material__checkbox"
                           @change="item.checked = !item.checked"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "pages",
});
const formMaterials = ref([
  {
    checked: false,
    name: 'Карта цветов'
  },
  {
    checked: false,
    name: 'Образцы тканей'
  },
  {
    checked: false,
    name: 'Прайс-лист'
  },
]);

const isActiveDropDown = ref(false);
</script>

<style lang="scss" scoped>
.filter {
  position: relative;
  @include main-container();
  padding-bottom: size(196px);
}

.filter__container {
  width: 100%;
  @include flex-start();
  justify-content: space-between;
}

.filter__content {
  position: relative;
  width: size(308px);
  @include flex-col-start();
  gap: size(11px);

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
  }


  .filter__content__container {
    width: 100%;
    @include flex-col-start();
    gap: size(28px);
    padding: size(20px);
    border-radius: 5px;
    background: #f4f4f4;

    .title {
      color: #5761AD;
      font-size: size(18px);
      font-weight: 400;
      word-wrap: break-word;
    }

    .filter__btn {
      @include btn(12.5px, 21px, whtie, $main-color);
      border: 1px solid $main-color;
      border-radius: 100px;
    }

    .filter__content__container__list {
      @include flex-col-start();
      gap: size(38px);
    }

    .list__title {
      color: #646464;
      font-size: size(14px);
      font-weight: 300;
      word-wrap: break-word;
      margin-bottom: size(17px);
    }

    .form__material__item:not(:last-child) {
      margin-bottom: size(11px);
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

    input {
      background: #f4f4f4;
    }

    &.active {
      height: size(165px);
      padding: size(10px);
      overflow: auto;
    }
  }
}

</style>