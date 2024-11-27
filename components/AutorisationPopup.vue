<template>
  <div v-if="popupActive" class="popup">
    <form class="popup__container" @submit="popupSubmit">
      <div class="w-full flex justify-between items-center title__container">
        <h3 class="title">Войти или зарегистрироваться</h3>
        <NuxtImg class="close__icon" src="/imgs/icons/close-icon-x.svg" @click="popupActive = false"/>
      </div>
      <div class="input__container">
        <label for="name">Телефон или почтовый адрес</label>
        <Field id="name" v-model="inputData" name="name" placeholder="Введите ваши данные"
               rules="required"
               type="text"/>
        <ErrorMessage class="text-red-600" name="name"/>
      </div>

      <button class="popup__btn" type="submit">Получить код</button>

      <div class="flex flex-col items-start gap-3">
        <span class="popup__span">Другой способ входа</span>
        <NuxtLink class="link">Войти с помощью пароля</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {defineRule, ErrorMessage, Field, useForm} from "vee-validate";
import {required} from "@vee-validate/rules";

defineRule("required", required);

const {handleSubmit} = useForm();


const inputData = ref('')

const popupActive = useState('popup__active', () => true);

const popupSubmit = handleSubmit(() => {
  if (inputData.value.includes('@')) {
    console.log('email')
  } else {
    console.log('phone')
  }
})
onMounted(() => {
});
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgb(0, 0, 0, 0.2);
  @include flex-center();
  justify-content: center;
  z-index: 1000;
}

.popup__container {
  width: 100%;
  max-width: size(508px);
  background: white;
  padding: size(42px);
  border-radius: 6px;

  .title__container {
    margin-bottom: size(56px);
  }

  .title {
    color: #242848;
    font-size: size(23px);
    font-weight: 400;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      font-size: 23px;
    }
  }

  .input__container {
    margin-bottom: size(25px);
  }

  .close__icon {
    width: size(18.55px);
    height: size(18.55px);
  }

  .popup__span {
    color: #959595;
    font-size: size(13px);
    font-weight: 300;
    line-height: 18.20px;
    word-wrap: break-word;
  }

  .popup__btn {
    width: 100%;
    @include btn(22px, 143px, $primary, white);
    margin-bottom: size(31px);
  }

  .link {
    color: #5761AE;
    font-size: size(14px);
    font-weight: 300;
    line-height: 140%;
    word-wrap: break-word;
  }
}
</style>