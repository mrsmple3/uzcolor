<template>
  <Form class="login" @submit="submitForm">
    <h1 class="user__title">Личные данные</h1>
    <div class="user__inputs">
      <div class="input__container">
        <label for="name">ФИО</label>
        <Field id="name" v-model="userData.name" name="name" placeholder="Введите ваши данные"
               rules="required"
               type="text"/>
        <ErrorMessage class="text-red-600" name="name"/>
      </div>
      <div class="input__container">
        <label for="phone">Телефон</label>
        <Field id="phone" v-model="userData.phone" v-mask="'+###(##) ###-##-##'" name="phone"
               placeholder="Номер телефона"
               rules="required|min" type="text"/>
        <ErrorMessage class="text-red-600" name="phone"/>
      </div>
      <div class="input__container">
        <label for="email">Электронная почта</label>
        <Field id="email" v-model="userData.email" name="email" placeholder="Email" rules="required|email"
               type="text"/>
        <ErrorMessage class="text-red-600" name="email"/>
      </div>
    </div>
    <button class="user__btn" type="submit">Сохранить данные</button>
  </Form>
</template>

<script lang="ts" setup>
import {useProductStore} from "~/store/product.store";
import {email, required} from "@vee-validate/rules";
import {defineRule, ErrorMessage, Field, Form, useForm} from "vee-validate";

defineRule("required", required);
defineRule("email", email);
defineRule("min", (value: string) => value.length >= 6);

definePageMeta({
  layout: "pages",
});

const userStore = useProductStore();

const {handleSubmit} = useForm();

const userData = {
  name: "",
  phone: "",
  email: "",
};

const createUser = () => {
  userStore.createUser(userData);
  console.log('userData')
};

const submitForm = handleSubmit(createUser);
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  @include flex-col-start();
  gap: size(58px);
}

.user__btn {
  @include btn(22px, 89px, $primary, white);
}
</style>