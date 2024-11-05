<template>
  <div class="contact">
    <NuxtImg class="contact-img" src="/imgs/contact-img.jpg"/>
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
    <form>
      <h3 class="title">Форма обартной связи</h3>
      <div class="form__cards">
        <div class="flex flex-col items-start gap-3">
          <span class="input__span">ФИО</span>
          <input class="input" placeholder="Введите ваши данные" type="text">
        </div>
        <div class="flex flex-col items-start gap-3">
          <span class="input__span">Телефон</span>
          <input class="input" placeholder="Номер телефона" type="text">
        </div>
        <div class="flex flex-col items-start gap-3">
          <span class="input__span">Электронная почта</span>
          <input class="input" placeholder="Email" type="text">
        </div>
        <div class="flex flex-col items-start gap-3">
          <span class="input__span">Способ доставки</span>
          <input class="input" placeholder="Самовывоз со склада" type="text">
        </div>
      </div>
      <span class="form__span">Выберите необходимые материалы</span>
      <div class="form__material">
        <div v-for="item in formMaterials" class="form__material__item">
          <UCheckbox :model-value="item.checked"
                     inputClass="form__material__checkbox" @change="item.checked = !item.checked"/>
          <span>{{ item.name }}</span>
        </div>
      </div>
      <div class="flex-center gap-[30px]">
        <NuxtLink class="form__btn" to="/">
          Оставить заявку →
        </NuxtLink>
        <span class="form__sub">Нажимая на кнопку, вы соглашаетесь на обработку ваших персональных данных</span>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
const formMaterials = ref([
  {
    checked: false,
    name: 'Карта цветов'
  },
  {
    checked: false,
    name: 'Образцы тканей'
  },
  {
    checked: false,
    name: 'Прайс-лист'
  },
]);


</script>


<style lang="scss" scoped>
.contact {
  position: relative;
  @include main-container();
  @include flex-stretch();
  justify-content: space-between;
  padding-top: size(90px);
  padding-bottom: size(88px);
  background: #F4F4F4;

  .contact-img {
    position: absolute;
    top: 0;
    right: 0;
    width: size(537px);
    height: size(712px);
    z-index: 1;
  }

  .flex-col-start {
    width: size(508px);
    height: 100%;
  }

  .sub {
    color: rgba(36, 40, 72, 0.55);
    font-size: size(15px);
    font-weight: 400;
    line-height: 150%;
    word-wrap: break-word;
    margin-top: size(35px);
    margin-bottom: size(42px);
  }


}

.social-medias {
  width: 100%;
  @include flex-col-start();
  gap: size(28.5px);
  margin-bottom: size(42px);
}

.social-media {
  width: 100%;
  @include flex-col-start();
  gap: size(15px);

  .media__span {
    color: rgba(0, 0, 0, 0.30);
    font-size: size(14px);
    font-weight: 400;
    word-wrap: break-word
  }

  .media__icon {
    min-width: max-content;
    min-height: max-content;
    width: size(20px);
    height: size(20px);
  }

  .media__title {
    color: #25294A;
    font-size: size(24px);
    font-weight: 400;
    word-wrap: break-word
  }

  address {
    color: rgba(0, 0, 0, 0.80);
    font-size: size(14px);
    font-weight: 400;
    word-wrap: break-word;
    font-style: normal;
  }
}

.socmedia {
  @include flex-center();
  gap: size(10px);

  .socmedia__icon {
    min-width: max-content;
    min-height: max-content;
    width: size(34px);
    height: size(33px);
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

  .title {
    color: #292D51;
    font-size: size(18px);
    font-weight: 400;
    word-wrap: break-word;
    margin-bottom: size(42px);
  }

  .form__cards {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: size(20px);
    margin-bottom: size(40px);
  }

  .input__span {
    color: #5761AE;
    font-size: size(13px);
    font-weight: 300;
    line-height: 140%;
    word-wrap: break-word
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
    word-wrap: break-word
  }

  .form__material {
    @include flex-center();
    gap: size(37px);
    margin-bottom: size(48px);
  }

  .form__span {
    color: #292D51;
    font-size: size(14px);
    font-weight: 400;
    word-wrap: break-word;
    margin-bottom: size(22px);
  }

  .form__material__item {
    @include flex-center();
    gap: size(10px);

    span {
      color: rgba(0, 0, 0, 0.80);
      font-size: size(14px);
      font-weight: 300;
      line-height: 140%;
      word-wrap: break-word
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
    word-wrap: break-word
  }
}
</style>