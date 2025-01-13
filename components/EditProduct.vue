<template>
  <UICard class="w-[600px] edit-popup shadow shadow-white" @click.stop>
    <UICardHeader>
      <UICardTitle>Продукт</UICardTitle>
    </UICardHeader>
    <UICardContent>
      <div class="grid items-center w-full gap-4">
        <div class="w-full flex items-start justify-between gap-4">
          <div class="w-[80%] flex flex-col space-y-1.5">
            <UILabel for="name">Название</UILabel>
            <UIInput id="name" v-model="customProduct.name" placeholder="Name of your project"/>
          </div>
          <div class="flex flex-col space-y-5">
            <UILabel for="show-mode">Показывать</UILabel>
            <UISwitch id="show-mode" :checked="customProduct.show"
                      @update:checked="customProduct.show = !customProduct.show"/>
          </div>
        </div>
        <div class="w-full flex items-start gap-8">
          <div class="w-[20%] flex flex-col space-y-1.5">
            <UILabel for="art">Art</UILabel>
            <UIInput id="art" v-model="customProduct.art" placeholder="Art"/>
          </div>
          <div class="flex flex-col space-y-1.5">
            <UILabel for="category">Категория</UILabel>
            <div class="category_dropdown">
              <div class="category_dropdown__current" @click="currentCategory.isActive = !currentCategory.isActive">
                {{ productStore.categoryByIdGetter(customProduct.categoryId).name }}
              </div>
              <div :class="{ active: currentCategory.isActive }" class="category_dropdown_container">
									<span
                      v-for="categoryItem in productStore.categoryGetter"
                      @click="(customProduct.categoryId = categoryItem.id), (currentCategory.isActive = false)"
                  >{{ categoryItem.name }}</span
                  >
              </div>
            </div>
          </div>
          <div class="w-[20%] flex flex-col space-y-1.5">
            <UILabel for="weight">Вес</UILabel>
            <UIInput id="weight" v-model="customProduct.weight" placeholder="Вес"/>
          </div>
        </div>
        <div class="flex flex-col space-y-1.5">
          <UILabel for="color">Цвета</UILabel>
          <div class="w-full relative hidden md:table-cell">
            <div class="flex items-end gap-6">
              <div class="flex items-end gap-3">
                <div
                    class="min-w-[50px] min-h-[50px] flex items-center justify-center rounded-full bg-gray-800 cursor-pointer">
                  <input id="color-img" class="hidden" type="file" @change="handleFileUpload"/>
                  <label class="cursor-pointer" for="color-img">
                    <UIcon name="hugeicons:cursor-add-selection-01"/>
                  </label>
                </div>
                <div class="flex flex-col items-start gap-1">
                  <span class="text-[10px] text-nowrap">{{ newColor.img.name }}</span>
                  <div class="flex items-center gap-2">
                    <input v-model="newColor.name" class="text-[10px] w-full bg-transparent" placeholder="название"/>
                    <UIcon class="text-[30px] cursor-pointer" name="material-symbols-light:add-to-photos-rounded"
                           @click="addColor"/>
                  </div>
                </div>
              </div>
              <div class="relative w-full flex items-start gap-4">
                <div :class="customProduct.id" class="custom product__btn-prev">
                  <UIcon class="bg-[#5761AD]" name="solar:alt-arrow-left-linear"/>
                </div>
                <Swiper
                    :modules="[SwiperAutoplay, SwiperNavigation]"
                    :navigation="{
											nextEl: '.custom.product__btn-next.' + customProduct.id,
											prevEl: '.custom.product__btn-prev.' + customProduct.id,
										}"
                    :slides-per-view="'auto'"
                    :space-between="8"
                    :speed="1300"
                    class="slider">
                  <SwiperSlide v-for="(material, index) in customProduct.color" :key="index"
                               class="realtive slider__item flex-col">
                    <UIcon
                        class="text-red-700 absolute -top-1 -right-1"
                        name="material-symbols:cancel-rounded"
                        @click="deleteColorFromProduct(material.img)"/>
                    <NuxtImg :src="material.img" class="slider__img cursor-auto"/>
                    <span class="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px]"> {{ material.name }}</span>
                  </SwiperSlide>
                </Swiper>
                <div :class="customProduct.id" class="custom product__btn-next">
                  <UIcon class="bg-[#5761AD]" name="solar:alt-arrow-right-linear"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full flex items-start gap-8">
          <div class="w-[20%] flex flex-col space-y-1.5">
            <UILabel for="type">Тип</UILabel>
            <UIInput id="type" v-model="customProduct.type" placeholder="Тип"/>
          </div>
          <div class="w-[30%] flex flex-col space-y-1.5">
            <UILabel for="composition">Состав</UILabel>
            <UIInput id="composition" v-model="customProduct.composition" placeholder="Состав"/>
          </div>
          <div class="w-[30%] flex flex-col space-y-1.5">
            <UILabel for="price">Цена</UILabel>
            <UIInput id="price" v-model="customProduct.price" placeholder="Цена"/>
          </div>
        </div>
        <div class="flex flex-col space-y-1.5">
          <UILabel for="shortDescription">Короткая описание</UILabel>
          <UTextarea id="shortDescription" v-model="customProduct.shortDescription" placeholder="Короткое описание"/>
        </div>
        <div class="flex flex-col space-y-1.5">
          <UILabel for="name">Описание</UILabel>
          <UTextarea id="name" v-model="customProduct.description" placeholder="Name of your project"/>
        </div>
        <div class="flex flex-col space-y-1.5">
          <UILabel>Характеристики</UILabel>
          <div v-for="(filter, index) in customProduct.params" class="w-full flex items-center justify-between gap-3">
            <h5 class="w-[20%] text-[14px]">{{ filter.title }}</h5>
            <div class="relative w-[70%]">
              <UIInput id="shortDescription" v-model="filter.param.name"
                       :class="{'bg-gray-700': isFilterChangedMode !== index}" :readonly="isFilterChangedMode !== index"
                       class="w-full"
                       placeholder="значение характеристики"/>
              <UIcon v-if="isFilterChangedMode === index" class="absolute -top-2 -right-2 text-red-700 cursor-pointer"
                     name="material-symbols:cancel" @click="deleteFromParams(index)"/>
            </div>
            <UIButton class="change-button" variant="outline" @click.prevent="changeFilterValue(filter, index)">
              <UIcon name="material-symbols:edit-outline"/>
            </UIButton>
          </div>
          <div class="w-full flex items-center justify-between gap-3">
            <UIInput v-model="newFilter.title" placeholder="Название характеристики"/>
            <UIInput id="shortDescription" v-model="newFilter.param.name"
                     placeholder="значение характеристики"/>
            <UIButton variant="ghost" @click.prevent="addFilter">
              <UIcon name="material-symbols:add-box"/>
            </UIButton>
          </div>
        </div>
      </div>
    </UICardContent>
    <UICardFooter class="flex justify-between px-6 pb-6">
      <UIButton variant="outline" @click="cancel"> Cancel</UIButton>
      <UIButton @click="updateProduct">Deploy</UIButton>
    </UICardFooter>
  </UICard>
</template>

<script lang="ts" setup>
import {type DefineProductState, useProductStore} from "~/store/product.store";

const popupState = useState("popupState");
const productStore = useProductStore();

const customProduct = ref<DefineProductState>(productStore.getCurrentProduct);

const newFilter = ref({title: "", param: {name: ""}});

const newColor = ref({name: "", img: ""});
const file = ref<File | null>(null);

const currentCategory = ref({
  isActive: false,
  id: customProduct.value.categoryId,
});

const isFilterChangedMode = ref<null | number>(null);

const updateProduct = async () => {
  try {
    await productStore
        .updateProduct({
          id: customProduct.value.id,
          name: customProduct.value.name,
          price: Number(customProduct.value.price),
          art: customProduct.value.art,
          weight: Number(customProduct.value.weight),
          color: customProduct.value.color,
          type: customProduct.value.type,
          composition: customProduct.value.composition,
          params: customProduct.value.params,
          categoryId: customProduct.value.categoryId,
          description: customProduct.value.description,
          shortDescription: customProduct.value.shortDescription,
          show: customProduct.value.show,
        })
        .then(async () => {
          await productStore.getAllProducts().then(() => {
            popupState.value.isEditProductPopup = false;
          });
        });
  } catch (e) {
    console.error(e);
  }
};

const addColor = async () => {
  if (newColor.value.name && file.value) {
    const formData = new FormData();
    formData.append("file", file.value);
    try {
      const response = await $fetch("/api/media", {
        method: "POST",
        body: formData,
      });
      if (Object.keys(customProduct.value.color).length) {
        customProduct.value.color.push({name: newColor.value.name, img: response.body.filePath});
      } else {
        customProduct.value.color = [{name: newColor.value.name, img: response.body.filePath}];
      }
      newColor.value = {name: "", img: ""};
      file.value = null;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }
};

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    file.value = target.files[0];
    newColor.value.img = file.value;
  }
};

const cancel = () => {
  customProduct.value = ref<DefineProductState>(productStore.getCurrentProduct);
  popupState.value.isEditProductPopup = false;
};
const deleteColorFromProduct = (img: string) => {
  customProduct.value.color = customProduct.value.color.filter((color) => color.img !== img);
};

const updateCategory = (categoryItem) => {
  customProduct.value.categoryId = categoryItem.id;
  console.log("updateCategory", customProduct.value.categoryId);
};

const addFilter = () => {
  if (newFilter.value.title && newFilter.value.param.name) {
    customProduct.value.params.push({
      title: newFilter.value.title,
      param: {name: newFilter.value.param.name},
    });
    newFilter.value = {title: "", param: {name: ""}};
  }
}

const changeFilterValue = (filter, index) => {
  if (isFilterChangedMode.value !== null) {
    customProduct.value.params = customProduct.value.params.map((item) => {
      if (item.title === filter.title) {
        item.param.name = filter.param.name;
      }
      return item;
    });
    isFilterChangedMode.value = null;
  } else {
    isFilterChangedMode.value = index;
  }
}
const deleteFromParams = (index) => {
  customProduct.value.params = customProduct.value.params.filter((item, index) => index !== isFilterChangedMode.value);
  isFilterChangedMode.value = null;
}
</script>

<style lang="scss" scoped>
.edit-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  background-color: #000;
}

.category_dropdown {
  position: relative;
  width: 180px;
  border-radius: 4px;
  font-size: 14px;
  border: 1px solid hsl(217.2, 32.6%, 17.5%);
  background-color: #000;

  .category_dropdown__current {
    width: 100%;
    padding: 10px;
    cursor: pointer;
  }

  .category_dropdown_container {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 0;
    overflow: hidden;
    border-top: none;
    background-color: #000;
    border-radius: 5px;
    z-index: 10;

    &.active {
      height: 170px;
      overflow-y: auto;
      border: 1px solid #ccc;
    }

    span {
      display: block;
      padding: 10px;
      cursor: pointer;

      &:hover {
        background-color: #2b2a32;
      }
    }
  }
}
</style>
