<template>
  <div class="requisites">
    <h1 class="user__title">Загрузить реквизиты</h1>
    <div class="input__container last-child">
      <label for="file-upload">Реквизиты</label>
      <div class="input__replacer">
        <label class="custom-file-upload" for="file-upload">Прикрепить файлы</label>
        <Field id="file-upload" name="file-upload" placeholder="Введите адрес"
               rules="required" type="file"
               @change="handleFileUpload"/>
      </div>
      <ErrorMessage class="text-red-600" name="name"/>
    </div>
    <div v-if="inputData.files.length > 0" class="input__container">
      <label>Загруженные файлы</label>
      <div v-for="(file, index) in inputData.files" :key="index" class="show__files">
        {{ file }}
        <div class="flex items-center gap-4">
          <a :download="file" :href="file" class="download-file" target="_blank">Скачать</a>
          <button class="remove-file" @click="removeFile(index)">Удалить</button>
        </div>
      </div>
    </div>
    <button class="btn" @click="submit">Сохранить данные</button>
  </div>
</template>

<script lang="ts" setup>
import {ErrorMessage, Field} from "vee-validate";
import {type User, useUserStore} from "~/store/user.auth";

const authStore = useUserStore();

const inputData = ref<User>(authStore.userGetter);

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    for (let i = 0; i < target.files.length; i++) {
      const file = target.files[i];

      const formData = new FormData();
      formData.append("file", file);

      const response = await $fetch("/api/media/", {
        method: "POST",
        body: formData,
      });

      inputData.value.files.push(response.body.filePath);
    }
  }
};

const submit = async () => {
  await authStore.updateUser({
    id: inputData.value.id,
    files: inputData.value.files
  })
};

const removeFile = async (index: number) => {
  await $fetch("/api/media", {
    method: "DELETE",
    body: {filePath: inputData.value.files[index]},
  });
  inputData.value.files.splice(index, 1);
};
</script>

<style lang="scss" scoped>
.requisites {
  width: 100%;
  @include flex-col-start();
  gap: size(61px);

  .input__container {
    margin-bottom: size(20px);
    @media screen and (max-width: 1050px) {
      margin-bottom: 20px;
    }

    &.last-child {
      margin-bottom: size(40px);
      @media screen and (max-width: 1050px) {
        margin-bottom: 40px;
      }
    }

    input[type="file"] {
      display: none;
    }

    .custom-file-upload {
      display: inline-block;
      @include flex-center();
      gap: size(10px);
      padding: size(13px) size(21px);
      cursor: pointer;
      background: #AAAAAA;
      border-radius: 5px;
      color: white;
      font-size: size(13px);
      font-weight: 400;
      line-height: 140%;
      word-wrap: break-word;
      @media screen and (max-width: 1050px) {
        padding: 13px 21px;
        gap: 10px;
        font-size: 13px;
      }

      &::before {
        content: " ";
        width: size(17px);
        height: size(17px);
        background: url('/imgs/icons/file.svg') no-repeat;
        background-size: contain;
        @media screen and (max-width: 1050px) {
          width: 17px;
          height: 17px;
        }
      }
    }

    input {
      background: white;
    }
  }
}

.show__files {
  @include flex-col-start();
  gap: size(10px);
  padding: size(13px) size(20px);
  padding-right: size(90px);
  background: #F4F4F4;
  border-radius: 5px;
  color: rgba(0, 0, 0, 0.60);
  font-size: 13px;
  font-weight: 300;
  line-height: 18.20px;
  word-wrap: break-word;
}

.remove-file {
  @include flex-center();
  gap: size(5px);
  color: #FF1616;

  &::before {
    content: ' ';
    min-width: max-content;
    min-height: max-content;
    width: size(11px);
    height: size(11px);
    background: url("/imgs/icons/trash.svg") no-repeat;
    background-size: cover;
  }
}

.download-file {
  color: rgba(57.48, 131.75, 23.06, 0.70);
  @include flex-center();
  gap: size(5px);

  &::before {
    content: ' ';
    min-width: max-content;
    min-height: max-content;
    width: size(11px);
    height: size(11px);
    background: url("/imgs/icons/download.svg") no-repeat;
    background-size: cover;
  }
}

.btn {
  @include btn(22px, 120px, $primary, #fff);
}
</style>