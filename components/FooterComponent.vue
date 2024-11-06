<template>
  <div class="footer">
    <ContactForm/>
    <footer>
      <div class="footer__content">
        <div class="footer__item">
          <h5 class="item__title">Контакты</h5>
          <div class="item__list">
            <NuxtLink class="phone" to="tel:+998 90 999-99-99">+998 90 999-99-99</NuxtLink>
            <NuxtLink class="mail" to="mailto:info@uzcolor.uz">info@uzcolor.uz</NuxtLink>
            <NuxtLink class="list__item request" to="/">Оставить заявку</NuxtLink>
            <div class="social-media">
              <NuxtLink class="social-media__item" target="_blank" to="/">
                <NuxtImg src="/imgs/icons/socialmedia-white-1.svg"/>
              </NuxtLink>
              <NuxtLink class="social-media__item" target="_blank" to="/">
                <NuxtImg src="/imgs/icons/socialmedia-white-2.svg"/>
              </NuxtLink>
              <NuxtLink class="social-media__item" target="_blank" to="/">
                <NuxtImg src="/imgs/icons/socialmedia-white-3.svg"/>
              </NuxtLink>
            </div>
            <div class="address">
              <strong>Адрес: </strong>Тестовое поле адреса
            </div>
          </div>
        </div>
        <div v-for="navbarItem in navbar" class="footer__item">
          <h5 class="item__title">{{ navbarItem.title }}</h5>
          <div class="item__list">
            <NuxtLink v-for="link in navbarItem.links" :to="link.link" class="list__item">{{ link.title }}</NuxtLink>
          </div>
        </div>
        <div class="footer__item">
          <h5 class="item__title second">Запросить материалы</h5>
          <div class="item__list">
            <NuxtLink class="list__btn" to="/">Получить прайс-лист / образцы</NuxtLink>
            <NuxtLink class="list__btn" to="/">Бриф для контрактного пошива</NuxtLink>
          </div>
        </div>
      </div>
      <div class="footer__bottom">
        <NuxtLink class="icorp" target="_blank" to="https://icorp.uz">Разработано iCORP</NuxtLink>
        <div class="flex-col-end">
          <Nuxtlink class="footer__logo" to="/">
            <NuxtImg src="/imgs/logo-white.svg"/>
          </Nuxtlink>
          <p class="footer__bottom__sub">Ведущий производитель текстильной промышленности</p>
          <span class="copy">© 2024 | Все права защищены</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
const navbar = ref([
  {
    title: 'Компания',
    links: [
      {title: 'О нас', link: '/'},
      {title: 'Новостной блог', link: '/'},
      {title: 'Вакансии', link: '/'},
      {title: 'Политика', link: '/'},
      {title: 'Реквизиты', link: '/'},
    ]
  },
  {
    title: 'Каталог',
    links: [
      {title: 'Трикотажное полотно', link: '/'},
      {title: 'Трикотажные ткани', link: '/'},
      {title: 'Принтованые ткани', link: '/'},
      {title: 'Фурнитура', link: '/'},
      {title: 'Скидки и Акции', link: '/'},
    ]
  },
  {
    title: 'Услуги',
    links: [
      {title: 'Условия размещения заказов', link: '/'},
      {title: 'Бриф на размещение заказа', link: '/'},
      {title: 'Назначить переговоры', link: '/'},
    ]
  },
])
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
}

footer {
  @include main-container();
  @include flex-col-start();
  gap: size(32px);
  padding-top: size(106px);
  padding-bottom: size(30px);
  background: linear-gradient(180deg, #151723 0%, #2B2A32 100%);
  @media screen and (max-width: 1050px) {
    gap: 72px;
    padding-top: 66px;
    padding-bottom: 39px;
  }
}

.footer__content {
  width: 100%;
  @include flex-start();
  justify-content: space-between;
  gap: size(30px);
  @media screen and (max-width: 1050px) {
    @include flex-col-start();
    gap: 65px;
  }
}

.footer__item {
  @include flex-col-start();
  gap: size(24px);
  @media screen and (max-width: 1050px) {
    gap: 33px;
  }

  .phone {
    color: rgba(255, 255, 255, 0.90);
    font-size: size(20px);
    font-weight: 600;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      font-size: 20px;
    }
  }

  .mail {
    color: white;
    font-size: size(14px);
    font-weight: 500;
    line-height: 152%;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      font-size: 16px;
    }
  }
}

.item__title {
  color: rgba(255, 255, 255, 0.90);
  font-size: size(18px);
  font-weight: 500;
  line-height: 152%;
  word-wrap: break-word;
  @media screen and (max-width: 1050px) {
    font-size: 23px;
  }

  &.second {
    color: rgba(255, 255, 255, 0.60);
    font-size: size(13px);
    font-weight: 300;
    margin-bottom: size(9px);
    @media screen and (max-width: 1050px) {
      font-size: 16px;
    }
  }
}

.item__list {
  @include flex-col-start();
  gap: size(12px);
  @media screen and (max-width: 1050px) {
    gap: 12px;
  }

  .list__item {
    color: rgba(255, 255, 255, 0.70);
    font-size: size(14px);
    font-weight: 500;
    line-height: 150%;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      font-size: 16px;
    }

    &.request {
      margin-bottom: size(6px);
      @media screen and (max-width: 1050px) {
        margin-bottom: 6px;
      }
    }
  }

  .list__btn {
    @include btn(16.5px, 27px, transparent, #fff);
    border: 1px solid #fff;
    color: white;
    font-size: size(13px);
    @media screen and (max-width: 1050px) {
      font-size: 13px;
    }
  }
}

.social-media {
  @include flex-center();
  justify-content: flex-start;
  gap: size(10px);
  @media screen and (max-width: 1050px) {
    gap: 10px;
  }

  .social-media__item {
    min-width: max-content;
    min-height: max-content;
    width: size(30px);
    height: size(30px);
    @media screen and (max-width: 1050px) {
      width: 30px;
      height: 30px;
    }
  }

  .address {
    color: white;
    font-size: size(14px);
    font-weight: 400;
    line-height: 152%;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      font-size: 16px;
    }
  }
}

.footer__bottom {
  width: 100%;
  @include flex-end();
  @media screen and (max-width: 1050px) {
    @include flex-col-start();
    flex-direction: column-reverse;
    gap: 61px;
  }

  .flex-col-end {
    @include flex-col-start();
  }
}

.footer__logo {
  min-width: max-content;
  min-height: max-content;
  width: size(143px);
  height: size(18.93px);
  margin-bottom: size(30px);
  @media screen and (max-width: 1050px) {
    width: 143px;
    height: 18.93px;
    margin-bottom: 30px;
  }
}

.footer__bottom__sub {
  text-align: right;
  color: rgba(255, 255, 255, 0.80);
  font-size: size(13px);
  font-weight: 400;
  line-height: 152%;
  word-wrap: break-word;
  margin-bottom: size(6px);
  @media screen and (max-width: 1050px) {
    font-size: 13px;
    margin-bottom: 6px;
  }
}

.copy {
  color: white;
  font-size: size(14px);
  font-weight: 300;
  line-height: 160%;
  word-wrap: break-word;
  @media screen and (max-width: 1050px) {
    font-size: 14px;
  }
}
</style>