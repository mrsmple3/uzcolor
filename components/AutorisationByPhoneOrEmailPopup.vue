<template>
  <div v-if="popupActive.autorisation.phone_or_email_autorisation" class="popup">
    <form class="popup__container" @submit="popupSubmit">
      <div class="w-full flex justify-between items-center title__container">
        <h3 class="title">Войти или зарегистрироваться</h3>
        <NuxtImg class="close__icon" src="/imgs/icons/close-icon-x.svg"
                 @click="popupActive.autorisation.phone_or_email_autorisation = false"/>
      </div>
      <div class="input__container">
        <label for="name">Телефон или почтовый адрес</label>
        <Field id="name" v-model="inputData" name="name"
               placeholder="Введите ваши данные" rules="required"
               type="text"/>
        <ErrorMessage class="text-red-600" name="name"/>
      </div>

      <button class="popup__btn" type="submit">Получить код</button>

      <div class="flex flex-col items-start gap-3">
        <span class="popup__span">Другой способ входа</span>
        <button class="link"
                @click="popupActive.autorisation.phone_or_email_autorisation = false, popupActive.autorisation.login_by_password = true">
          Войти с помощью пароля
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


const inputData = ref('')

const popupActive = useState('popupState');


const popupSubmit = handleSubmit(() => {
  if (inputData.value.includes('@')) {
    alert('Письмо отправлено на вашу почту');
  } else {
    alert('Сообщение отправлено на ваш телефон');
  }
});
</script>