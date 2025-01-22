<template>
  <form class="sidebar" @submit="submitOrder">
    <h3 class="title">Общая стоимость</h3>
    <p class="sum">Сумма</p>
    <h4 class="price">{{ totalPrice }} <span>сум</span></h4>
    <h3 class="form__title">Оформление</h3>
    <div class="input__container">
      <UILabel for="name">ФИО</UILabel>
      <Field id="name" v-model="inputData.name" name="name" placeholder="Введите ваши данные"
             rules="required"
             type="text"/>
      <ErrorMessage class="text-red-600" name="name"/>
    </div>
    <div class="input__container">
      <UILabel for="company">Ваша компания</UILabel>
      <Field id="company" v-model="inputData.companyName" name="company" placeholder="Введите наименование"
             type="text"/>
      <ErrorMessage class="text-red-600" name="company"/>
    </div>
    <div class="input__container">
      <UILabel for="phone">Телефон</UILabel>
      <Field id="phone" v-model="inputData.phone" name="phone" placeholder="Номер телефона"
             rules="required"
             type="text"/>
      <ErrorMessage class="text-red-600" name="phone"/>
    </div>
    <div class="input__container">
      <UILabel for="email">Электронная почта</UILabel>
      <Field id="email" v-model="inputData.email" name="email" placeholder="Email"
             rules="required"
             type="text"/>
      <ErrorMessage class="text-red-600" name="email"/>
    </div>
    <div class="input__container">
      <UILabel for="address">Адрес</UILabel>
      <Field id="address" v-model="inputData.address" name="address" placeholder="Введите адрес"
             rules="required"
             type="text"/>
      <ErrorMessage class="text-red-600" name="address"/>
    </div>
    <div class="input__container last-child">
      <label for="file-upload">Реквизиты</label>
      <div class="input__replacer">
        <label class="custom-file-upload" for="file-upload">Прикрепить файлы</label>
        <Field id="file-upload" name="file-upload" placeholder="Введите адрес" type="file" @change="handleFileUpload"/>
      </div>
      <ErrorMessage class="text-red-600" name="file-upload"/>
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
    <div class="checkboxes">
      <UCheckbox :label="'Самовывоз со склада'" :model-value="statusOrder === 'Самовывоз со склада'"
                 :ui="{background: '!bg-[#fff]', label: 'font-light !text-black/80'}"
                 inputClass="form__material__checkbox" @change="statusOrder = 'Самовывоз со склада'"/>
      <UCheckbox :label="'Транспортная компания'" :model-value="statusOrder === 'Транспортная компания'"
                 :ui="{background: '!bg-[#fff]', label: 'font-light !text-black/80'}"
                 inputClass="form__material__checkbox" @change="statusOrder = 'Транспортная компания'"/>
    </div>
    <button class="btn" type="submit">Оформить заказ</button>
  </form>
</template>

<script lang="ts" setup>
import {type User, useUserStore} from "~/store/user.auth";
import {defineRule, ErrorMessage, Field, useForm} from "vee-validate";
import {required} from "@vee-validate/rules";
import {useProductStore} from "~/store/product.store";

const props = defineProps({
  totalPrice: {
    type: Number,
    required: true,
  },
});

const router = useRouter();

const toast = useToast();

const statusOrder = ref<string>("Самовывоз со склада");

const productStore = useProductStore();
const authStore = useUserStore();

const inputData = ref<User>(authStore.userGetter);

defineRule("required", required);

const {handleSubmit} = useForm();


const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    for (let i = 0; i < target.files.length; i++) {
      const file = target.files[i];

      const formData = new FormData();
      formData.append("file", file);

      const response = await $fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      inputData.value.files.push(response.body.filePath);
    }
  }
};

const orderSend = async () => {
  await authStore.updateUser({
    id: inputData.value.id,
    name: inputData.value.name,
    phone: inputData.value.phone,
    email: inputData.value.email,
    address: inputData.value.address,
    company: inputData.value.companyName,
    files: inputData.value.files
  }).then(async () => {
    await authStore.createOrder({
      userId: authStore.cartGetter.userId,
      totalAmount: authStore.cartGetter.items.length,
      totalPrice: props.totalPrice,
      type: statusOrder.value,
      items: authStore.cartGetter.items
    }).then(async () => {
      await authStore.deleteAllCartItemsOnUser(authStore.userGetter.id).then(() => {
        router.push("/");
        toast.add({title: "Заказ был совершон", type: "success"});
      })
    })
  })
}

const submitOrder = handleSubmit(orderSend);

const removeFile = async (index: number) => {
  await $fetch("/api/media", {
    method: "DELETE",
    body: {filePath: inputData.value.files[index]},
  });
  inputData.value.files.splice(index, 1);
};
</script>

<style lang="scss" scoped>
.sidebar {
  width: 100%;
  @include flex-col-start();
  background: #F4F4F4;
  border-radius: 5px;
  padding: 38px 30px 34px;

  .title {
    color: black;
    font-size: size(16px);
    font-weight: 400;
    word-wrap: break-word;
    margin-bottom: size(32px);
  }

  .form__title {
    color: #646464;
    font-size: size(14px);
    font-weight: 400;
    word-wrap: break-word;
    margin-bottom: size(24px);
    @media screen and (max-width: 1050px) {
      font-size: 14px;
      margin-bottom: 24px;
    }
  }

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

  .checkboxes {
    @include flex-col-start();
    gap: size(14px);
    margin-bottom: size(55px);
  }

  .show__files {
    width: 100%;
    @include flex-col-start();
    gap: size(10px);
    padding: size(13px) size(20px);
    background: white;
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

  .sum {
    color: #5761AE;
    font-size: size(13px);
    font-weight: 300;
    line-height: 140%;
    word-wrap: break-word;
    margin-bottom: size(-1px);
    @media screen and (max-width: 1050px) {
      font-size: 13px;
    }
  }

  .price {
    color: #5761AD;
    font-size: size(30px);
    font-weight: 400;
    line-height: 150%;
    word-wrap: break-word;
    margin-bottom: size(33px);

    span {
      font-size: 20px;
    }

    @media screen and (max-width: 1050px) {
      font-size: 30px;
      margin-bottom: 33px;
      span {
        font-size: 20px;
      }
    }
  }

  .btn {
    width: 100%;
    @include btn(22px, 120px, $primary, #fff);
  }
}
</style>