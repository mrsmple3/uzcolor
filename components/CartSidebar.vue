<template>
  <div class="sidebar">
    <h3 class="title">Общая стоимость</h3>
    <p class="sum">Сумма</p>
    <h4 class="price">{{ totalPrice }} <span>сум</span></h4>
    <h3 class="form__title">Оформление</h3>
    <div class="input__container">
      <label for="name">ФИО</label>
      <Field id="name" v-model="inputData.name" name="name" placeholder="Введите ваши данные"
             rules="required"
             type="text"/>
      <ErrorMessage class="text-red-600" name="name"/>
    </div>
    <div class="input__container">
      <label for="company">Ваша компания</label>
      <Field id="company" v-model="inputData.name" name="company" placeholder="Введите наименование"
             rules="required"
             type="text"/>
      <ErrorMessage class="text-red-600" name="name"/>
    </div>
    <div class="input__container">
      <label for="phone">Телефон</label>
      <Field id="phone" v-model="inputData.name" name="phone" placeholder="Номер телефона"
             rules="required"
             type="text"/>
      <ErrorMessage class="text-red-600" name="name"/>
    </div>
    <div class="input__container">
      <label for="email">Электронная почта</label>
      <Field id="email" v-model="inputData.name" name="email" placeholder="Email"
             rules="required"
             type="text"/>
      <ErrorMessage class="text-red-600" name="name"/>
    </div>
    <div class="input__container">
      <label for="address">Адрес</label>
      <Field id="address" v-model="inputData.name" name="address" placeholder="Введите адрес"
             rules="required"
             type="text"/>
      <ErrorMessage class="text-red-600" name="name"/>
    </div>
    <div class="input__container last-child">
      <label for="file-upload">Реквизиты</label>
      <div class="input__replacer">
        <label class="custom-file-upload" for="file-upload">Прикрепить файлы</label>
        <Field id="file-upload" v-model="inputData.name" name="file-upload" placeholder="Введите адрес"
               rules="required"
               type="file"/>
      </div>
      <ErrorMessage class="text-red-600" name="name"/>
    </div>
    <button class="btn">Оформить заказ</button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  totalPrice: {
    type: Number,
    required: true,
  },
});

import {defineRule, ErrorMessage, Field, useForm} from "vee-validate";
import {required} from "@vee-validate/rules";

const inputData = ref({
  name: '',
  companyName: '',
  phone: '',
  email: '',
  address: ''
});

defineRule("required", required);

const {handleSubmit} = useForm();
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