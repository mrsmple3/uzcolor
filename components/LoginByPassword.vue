<template>
  <div v-if="popupActive.autorisation.login_by_password" class="popup">
    <form class="popup__container" @submit="popupSubmit">
      <div class="w-full flex justify-between items-center title__container">
        <h3 class="title">← Войти с паролем</h3>
        <NuxtImg class="close__icon" src="/imgs/icons/close-icon-x.svg"
                 @click="popupActive.autorisation.login_by_password = false"/>
      </div>
      <div class="input__container">
        <label for="name">Телефон или почтовый адрес</label>
        <Field id="name" v-model="inputData.title" name="name" placeholder="Введите номер или email"
               rules="required"
               type="text"/>
        <ErrorMessage class="text-red-600" name="name"/>
      </div>
      <div class="input__container">
        <label for="password">Ваш пароль</label>
        <Field v-slot="{ field }" name="password" rules="required">
          <input id="password" v-model="inputData.password" placeholder="Введите пароль" type="password" v-bind="field">
        </Field>
        <ErrorMessage class="text-red-600" name="password"/>
      </div>

      <button class="popup__btn" type="submit">Войти</button>

      <div class="flex flex-col items-start gap-3">
        <button class="link"
                @click="popupActive.autorisation.phone_or_email_autorisation = false, popupActive.autorisation.login_by_password=true">
          Забыли пароль?
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "popup",
});
import {defineRule, ErrorMessage, Field, useForm} from "vee-validate";
import {required} from "@vee-validate/rules";
import {useUserStore} from "~/store/user.auth";

defineRule("required", required);

const {handleSubmit} = useForm();

const userStore = useUserStore();

const toast = useToast();

const inputData = ref({
  title: '',
  password: ''
})

const popupActive = useState('popupState');

const popupSubmit = handleSubmit(async () => {
  try {
    await userStore.login(inputData.value.title, inputData.value.password)
        .then(() => {
          popupActive.value.autorisation.login_by_password = false;
          toast.add({title: "Вы успешно вошли ", type: "success"});
        });
  } catch (error) {
    console.log(error);
    toast.add({title: "Что то пошло не так " + error, type: "error"});
  }
});
</script>