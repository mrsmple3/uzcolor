<template>
  <UICard class="flex flex-col justify-between">
    <UICardHeader>
      <UICardTitle>Категорий</UICardTitle>
    </UICardHeader>
    <UICardContent>
      <div class="grid items-center w-full gap-4">
        <div class="w-full relative">
          <NuxtImg v-if="!isChangedCategoryMode" :alt="category.photo"
                   :src="category.photo" class="w-full h-20"/>
          <UILabel v-else :for="'change-photo' + category.id"
                   class="flex items-center justify-center w-full h-20 border border-white rounded border-dashed"
                   @drop.prevent="handleDrop"
                   @dragover.prevent>
            <UIBadge class="w-max">Выберите файл</UIBadge>
            <UIInput :id="'change-photo' + category.id" class="hidden" type="file" @change="handleFileChange"/>
          </UILabel>
          <div v-if="isChangedCategoryMode && customCategory.photo !== ''"
               class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-20 z-[2]">
            <NuxtImg :src="customCategory.photo" alt="category" class="w-full h-full"/>
          </div>
        </div>
        <div class="flex flex-col space-y-1.5">
          <UILabel :for="'name'+category.name">Название</UILabel>
          <UIInput :id="'name'+category.name" v-model="category.name" :class="{'border-none': !isChangedCategoryMode}"
                   :readonly="!isChangedCategoryMode"
                   placeholder="Название категории"/>
        </div>
      </div>
    </UICardContent>
    <UICardFooter class="w-full flex justify-between px-6 pb-6 photo mt-auto">
      <UIButton variant="outline" @click="deleteCategory">
        Удалить
      </UIButton>
      <UIButton class="bg-blue-700 text-white" @click="toggleCategoryMode">
        {{ isChangedCategoryMode ? 'OK' : 'Изменить' }}
      </UIButton>
    </UICardFooter>
  </UICard>
</template>

<script lang="ts" setup>
import {useProductStore} from "~/store/product.store";

const isChangedCategoryMode = ref(false);

const customCategory = ref({
  photo: "",
});

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
});

const productStore = useProductStore();

const deleteCategory = async () => {
  try {
    await productStore.deleteCategory(props.category.id);
  } catch (e) {
    console.error(e);
  }
}

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files[0];
  if (file) {
    uploadFiles(file);
  }
}

const handleDrop = (event: DragEvent) => {
  const file = event.dataTransfer?.files[0];
  if (file) {
    uploadFiles(file);
  }
}

const toggleCategoryMode = async () => {
  if (isChangedCategoryMode.value) {
    if (customCategory.value.photo !== '') {
      props.category.photo = customCategory.value.photo;
    }
    await productStore.updateCategory(props.category).then(() => {
      isChangedCategoryMode.value = false;
    });
  } else {
    isChangedCategoryMode.value = true;
  }
}

const uploadFiles = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await $fetch("/api/media", {
      method: "POST",
      body: formData,
    });
    customCategory.value.photo = response.body.filePath;
  } catch (error) {
    console.error(error);
  }
}
</script>


<style lang="scss" scoped>
</style>