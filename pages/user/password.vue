<template>
  <Form class="login" @submit="submitForm">
    <h1 class="user__title">Сменить пароль</h1>
    <div class="user__inputs">
      <div class="input__container">
        <label for="currentPassword">Текущий пароль</label>
        <Field id="currentPassword" v-model="userData.currentPassword" name="currentPassword"
               placeholder="Введите текущий пароль"
               rules="required|min:3" type="password"/>
        <ErrorMessage class="text-red-600" name="currentPassword"/>
      </div>
      <div class="input__container">
        <label for="newPassword">Новый пароль</label>
        <Field id="newPassword" v-model="userData.newPassword" name="newPassword" placeholder="Введите новый пароль"
               rules="required|min:3" type="password"/>
        <ErrorMessage class="text-red-600" name="newPassword"/>
      </div>
      <div class="input__container">
        <label for="confirmPassword">Подтвердите новый пароль</label>
        <Field id="confirmPassword" v-model="userData.confirmPassword" name="confirmPassword"
               placeholder="Подтвердите новый пароль"
               rules="required|confirmed:@newPassword" type="password"/>
        <ErrorMessage class="text-red-600" name="confirmPassword"/>
      </div>
    </div>
    <button class="user__btn" type="submit">Сохранить данные</button>
  </Form>
</template>

<script lang="ts" setup>
import {confirmed, min, required} from "@vee-validate/rules";
import {defineRule, ErrorMessage, Field, Form, useForm} from "vee-validate";
import {ref} from "vue";
import {useUserStore} from "~/store/user.auth";

defineRule("required", required);
defineRule("min", min);
defineRule("confirmed", confirmed);

const userStore = useUserStore();
const toast = useToast();

const {handleSubmit} = useForm();

const userData = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const changePassword = async () => {
  try {
    await userStore.changePassword(userStore.userGetter.id, userData.value.currentPassword, userData.value.newPassword);
    toast.add({title: "Пароль успешно изменен", type: "success"});
  } catch (error) {
    toast.add({title: "Произошла ошибка " + error, type: "error"});
  }
};

const submitForm = handleSubmit(changePassword);
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