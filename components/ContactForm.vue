<template>
  <div class="contact">
    <NuxtImg v-if="isContact" class="contact-img" src="/imgs/contact-img.jpg"/>
    <div class="flex-col-start">
      <BlockTitle :sub="'Контакты'" :title="'Свяжитесь с нами'"/>
      <p class="sub">
        Если у вас возникли какие-либо вопросы или вам нужна дополнительная информация, мы всегда на связи.
        Оставьте заявку и наши специалисты свяжутся с вами в кратчайшие сроки.
      </p>
      <div class="social-medias">
        <div class="social-media">
          <span class="media__span">
          Номер телефона
          </span>
          <div class="w-full flex items-center gap-5">
            <NuxtImg class="media__icon" src="/imgs/icons/phone-main-colo.svg"/>
            <NuxtLink class="media__title" target="_blank" to="tel: +998 90 999-99-99">+998 90 999-99-99</NuxtLink>
          </div>
        </div>
        <div class="social-media">
          <span class="media__span">
          Email
          </span>
          <div class="w-full flex items-center gap-5">
            <NuxtImg class="media__icon" src="/imgs/icons/mail.svg"/>
            <NuxtLink class="media__title" target="_blank" to="mailto: info@uzcolor.uz">info@uzcolor.uz</NuxtLink>
          </div>
        </div>
        <div class="social-media">
          <span class="media__span">
            Адрес
          </span>
          <div class="w-full flex items-center gap-5">
            <address>Тестовое поле адреса</address>
          </div>
        </div>
      </div>
      <div class="socmedia">
        <NuxtImg class="socmedia__icon" src="/imgs/icons/socialmedia-1.svg"/>
        <NuxtImg class="socmedia__icon" src="/imgs/icons/socialmedia-2.svg"/>
        <NuxtImg class="socmedia__icon" src="/imgs/icons/socialmedia-3.svg"/>
      </div>
    </div>
    <Form @submit="submitForm">
      <h3 class="title">Форма обратной связи</h3>
      <div class="form__cards">
        <div class="flex flex-col items-start gap-3">
          <span class="input__span">ФИО</span>
          <Field id="name" v-model="userData.username" class="input" name="name"
                 placeholder="Введите ваши данные" rules="required"
                 type="text"/>
          <ErrorMessage class="text-red-600" name="name"/>
        </div>
        <div class="flex flex-col items-start gap-3">
          <span class="input__span">Телефон</span>
          <Field id="phone" v-model="userData.phone" v-mask="'+###(##) ###-##-##'" class="input"
                 name="phone" placeholder="Номер телефона" rules="required|min:10"
                 type="text"/>
          <ErrorMessage class="text-red-600" name="phone"/>
        </div>
        <div class="flex flex-col items-start gap-3">
          <span class="input__span">Электронная почта</span>
          <Field id="email" v-model="userData.email" class="input" name="email"
                 placeholder="Email" rules="required|email"
                 type="text"/>
          <ErrorMessage class="text-red-600" name="email"/>
        </div>
        <div class="flex flex-col items-start gap-3">
          <span class="input__span">Способ доставки</span>
          <Field id="delivery" v-model="userData.delivery" class="input" name="delivery"
                 placeholder="Самовывоз со склада"
                 rules="required" type="text"/>
          <ErrorMessage class="text-red-600" name="delivery"/>
        </div>
      </div>
      <span class="form__span">Выберите необходимые материалы</span>
      <div class="form__material">
        <div v-for="(item, index) in formMaterials" :key="index" class="form__material__item">
          <UCheckbox :id="'check'+ index"
                     :label="item.name" :model-value="item.checked"
                     :ui="{background: '!bg-[#f4f4f4]'}"
                     inputClass="form__material__checkbox" @change="item.checked = !item.checked"/>
        </div>
      </div>
      <div class="flex-center gap-[30px]">
        <button class="form__btn" type="submit">
          Оставить заявку →
        </button>
        <span class="form__sub">Нажимая на кнопку, вы соглашаетесь на обработку ваших персональных данных</span>
      </div>
    </Form>
  </div>
</template>

<script lang="ts" setup>
import {defineRule, ErrorMessage, Field, Form} from "vee-validate";
import {email, min, required} from "@vee-validate/rules";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);

const userData = ref({
  username: '',
  phone: '',
  email: '',
  delivery: ''
});

const formMaterials = ref([
  {checked: false, name: 'Карта цветов'},
  {checked: false, name: 'Образцы тканей'},
  {checked: false, name: 'Прайс-лист'},
]);

const submitForm = () => {
  // Логика отправки формы
  alert('Форма отправлена');
};

defineProps({
  isContact: {
    type: Boolean
  }
});
</script>


<style lang="scss" scoped>
.contact {
  position: relative;
  @include main-container();
  @include flex-stretch();
  justify-content: space-between;
  background: #F4F4F4;
  padding-top: size(90px);
  padding-bottom: size(88px);
  @media screen and (max-width: 1050px) {
    @include flex-col-start();
    padding: 0;
  }

  .contact-img {
    position: absolute;
    top: 0;
    right: 0;
    width: size(537px);
    height: size(712px);
    z-index: 1;
    @media screen and (max-width: 1050px) {
      display: none;
    }
  }

  .flex-col-start {
    position: relative;
    width: size(508px);
    height: 100%;
    z-index: 2;
    @media screen and (max-width: 1050px) {
      @include main-container();
      padding-top: 59px;
      padding-bottom: 68px;
    }
  }

  .sub {
    color: rgba(36, 40, 72, 0.55);
    font-size: size(15px);
    font-weight: 400;
    line-height: 150%;
    word-wrap: break-word;
    margin-top: size(35px);
    margin-bottom: size(42px);
    @media screen and (max-width: 1050px) {
      font-size: 15px;
      margin-top: 56px;
      margin-bottom: 42px;
    }
  }
}


form {
  position: relative;
  width: size(742px);
  height: 100%;
  @include flex-col-start();
  padding: size(47px) size(52px);
  background: white;
  border-radius: 5px;
  z-index: 2;
  @media screen and (max-width: 1050px) {
    @include main-container();
    padding-top: 56px;
    padding-bottom: 34px;
  }

  .title {
    color: #292D51;
    font-size: size(18px);
    font-weight: 400;
    word-wrap: break-word;
    margin-bottom: size(42px);
    @media screen and (max-width: 1050px) {
      font-size: 18px;
      margin-bottom: 52px;
    }
  }

  .form__cards {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: size(20px);
    margin-bottom: size(40px);
    @media screen and (max-width: 1050px) {
      grid-template-columns: repeat(1, 1fr);
      gap: 20px;
      margin-bottom: 50px;
    }
  }

  .input__span {
    color: #5761AE;
    font-size: size(13px);
    font-weight: 300;
    line-height: 140%;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      font-size: 13px;
    }
  }

  .input {
    width: 100%;
    padding: size(15px) size(18px);
    background: #F6F6F6;
    border-radius: 5px;
    color: rgba(0, 0, 0, 0.40);
    font-size: size(14px);
    font-weight: 300;
    line-height: 140%;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      padding: 15px 18px;
      font-size: 14px;
    }
  }

  .form__material {
    width: 100%;
    @include flex-center();
    gap: size(37px);
    margin-bottom: size(48px);
    @media screen and (max-width: 1050px) {
      width: 100%;
      flex-wrap: wrap;
      gap: 25px;
    }
  }


  .form__span {
    color: #292D51;
    font-size: size(14px);
    font-weight: 400;
    word-wrap: break-word;
    margin-bottom: size(22px);
    @media screen and (max-width: 1050px) {
      font-size: 16px;
      margin-bottom: 45px;
    }
  }

  .form__btn {
    @include btn(22px, 60px, $primary, white);
  }

  .form__sub {
    width: size(248px);
    color: rgba(129.62, 129.62, 129.62, 0.80);
    font-size: size(12px);
    font-weight: 400;
    line-height: 150%;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      width: 80%;
      font-size: 14px;
    }
  }

  .flex-center {
    width: 100%;
    @media screen and (max-width: 1050px) {
      @include flex-col-start();
    }
  }
}
</style>