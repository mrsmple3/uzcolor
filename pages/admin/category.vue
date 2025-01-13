<template>
  <div class="grid grid-cols-4 gap-4 p-5">
    <UICard>
      <UICardHeader>
        <UICardTitle>Категории</UICardTitle>
        <UICardDescription>Создайте новую категорию</UICardDescription>
      </UICardHeader>
      <UICardContent>
        <div class="grid items-center w-full gap-4">
          <UILabel
              v-if="customCategory.photo === ''"
              class="w-full h-[100px] flex flex-col items-center justify-center space-y-1.5 border border-dashed border-white rounded"
              for="category-img-edit"
              @drop.prevent="handleDrop"
              @dragover.prevent
          >
            <UIBadge class="w-max">Выберите файл</UIBadge>
            <UIInput id="category-img-edit" class="hidden" type="file" @change="handleFileChange"/>
          </UILabel>
          <div v-else class="w-full">
            <NuxtImg :src="customCategory.photo" alt="category"/>
          </div>
          <div class="flex flex-col space-y-1.5">
            <UILabel for="name">Название</UILabel>
            <UIInput id="name" v-model="customCategory.name" placeholder="Введите название категории"/>
          </div>
        </div>
      </UICardContent>
      <UICardFooter class="flex justify-between px-6 pb-6">
        <UIButton variant="outline">
          Удалить
        </UIButton>
        <UIButton @click="createCategory">Создать</UIButton>
      </UICardFooter>
    </UICard>
    <AdminCategory v-for="categoryItem in productStore.categoryGetter" :category="categoryItem"/>
  </div>
</template>

<script lang="ts" setup>
import {useProductStore} from "~/store/product.store";

const productStore = useProductStore();

const customCategory = ref({
  name: "",
  photo: "",
});

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files[0];
  if (file) {
    uploadFiles(file);
  }
};

const handleDrop = (event: DragEvent) => {
  const file = event.dataTransfer?.files[0];
  if (file) {
    uploadFiles(file);
  }
};

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

const createCategory = async () => {
  try {
    await productStore.createCategory(customCategory.value).then(
        async () => {
          customCategory.value = {
            name: "",
            photo: "",
          };
          await productStore.getAllCategory();
        }
    )
  } catch (error) {
    console.error(error);
  }
}
</script>


<style lang="scss" scoped>

</style>