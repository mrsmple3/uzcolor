<template>
  <div class="header w-full flex flex-col">
    <header>
      <NuxtLink to="/">
        <NuxtImg class="logo" src="/logo.svg"/>
      </NuxtLink>
      <UInput
          v-model="searchRef"
          autocomplete="off"
          class="search"
          color="white"
          icon="i-heroicons-magnifying-glass-20-solid"
          placeholder="Поиск..."
          size="xl"
          variant="none"/>
      <div class="flex items-center gap-3.5">
        <NuxtLink class="social-media__item" to="/">
          <UIcon class="social-media-icon" name="ic:baseline-telegram"/>
        </NuxtLink>
        <NuxtLink class="social-media__item" to="/">
          <UIcon class="social-media-icon" name="entypo-social:vk-with-circle"/>
        </NuxtLink>
        <NuxtLink class="social-media__item" to="/">
          <UIcon class="social-media-icon" name="mage:whatsapp-filled"/>
        </NuxtLink>
      </div>
      <UDropdown :items="items" :popper="{ placement: 'bottom-start' }" class="lang">
        <UButton class="lang__btn" color="black" label="RU" trailing-icon="i-heroicons-chevron-down-20-solid"
                 variant="ghost">
          <template #leading>
            <NuxtImg
                class="w-6 h-6"
                src="https://api.iconify.design/emojione:flag-for-russia.svg"
            />
          </template>
        </UButton>
      </UDropdown>
      <div class="flex items-center gap-2.5">
        <NuxtImg alt="" class="w-6 h-6" src="/imgs/icons/phone.svg"/>
        <div class="flex flex-col items-start">
          <NuxtLink class="text-[#242848] text-base font-normal" to="tel:+998 90 999-99-99">
            +998 90 999-99-99
          </NuxtLink>
          <span class="text-[#727272] text-xs font-normal">Заказать звонок</span>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <NuxtLink class="actions" to="/">
          <NuxtImg src="/imgs/icons/profile.svg"/>
        </NuxtLink>
        <NuxtLink class="actions" to="/">
          <NuxtImg src="/imgs/icons/like.svg"/>
        </NuxtLink>
        <NuxtLink class="actions" to="/">
          <NuxtImg src="/imgs/icons/cart.svg"/>
        </NuxtLink>
      </div>
    </header>
    <div class="header__bottom">
      <div v-for="menuItem in menu">
        <div class="submenu__title" @click="subActive = !subActive">
          {{ menuItem.menu }}
          <UIcon class="ml-2.5" name="solar:alt-arrow-down-linear"/>
        </div>
        <div :class="{ active: subActive }" class="submenu">
          <div v-for="submenu in menuItem.submenu" class="submenu__item">
            <h4 class="submenu__item__title">{{ submenu.title }}</h4>
            <div class="flex flex-col items-start gap-3.5">
              <NuxtLink v-for="item in submenu.list" :to="item.link" class="submenu__item__sub">
                {{ item.title }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <NuxtLink class="submenu__title" to="/">
        Пошив изделий
        <UIcon class="ml-2.5" name="solar:alt-arrow-down-linear"/>
      </NuxtLink>
      <NuxtLink class="submenu__title" to="/">
        <UIcon class="mr-2.5" name="material-symbols-light:percent-rounded"/>
        Скидки и акции
      </NuxtLink>
      <NuxtLink class="submenu__title" to="/">
        О компании
        <UIcon class="ml-2.5" name="solar:alt-arrow-down-linear"/>
      </NuxtLink>
      <NuxtLink class="submenu__title" to="/">
        Блог
      </NuxtLink>
      <NuxtLink class="submenu__title" to="/">
        Прайс-лист / образцы
      </NuxtLink>
      <NuxtLink class="submenu__title" to="/">
        Контакты
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const searchRef = ref('');

const items = [
  [{
    label: 'RU',
    avatar: {
      src: 'https://api.iconify.design/emojione:flag-for-russia.svg'
    }
  }],
  [{
    label: 'UZ',
    avatar: {
      src: 'https://api.iconify.design/circle-flags:uz.svg'
    }
  }],
]

const subActive = ref(false);

const menu = ref([
  {
    menu: 'Каталог продукции',
    submenuActive: false,
    submenu: [
      {
        title: 'Трикотажное полотно',
        list: [
          {
            title: 'Кулирная гладь',
            link: '/'
          },
          {
            title: 'Интрелок',
            link: '/'
          },
          {
            title: 'Рибана',
            link: '/'
          },
          {
            title: 'Пике',
            link: '/'
          },
          {
            title: 'Кашкорсе',
            link: '/'
          },
          {
            title: 'Футер-двухнитка',
            link: '/'
          },
          {
            title: 'Футер-рехнитка',
            link: '/'
          },
          {
            title: 'Махра',
            link: '/'
          },
          {
            title: 'Велюр',
            link: '/'
          },
          {
            title: 'Викоза',
            link: '/'
          },
        ]
      },
      {
        title: 'Трикотажные ткани',
        list: [
          {
            title: 'Саржа',
            link: '/'
          },
          {
            title: 'Поплин',
            link: '/'
          },
          {
            title: 'Сатин',
            link: '/'
          },
          {
            title: 'Страйп сатин',
            link: '/'
          },
          {
            title: 'Бязь',
            link: '/'
          },
          {
            title: 'Муслин',
            link: '/'
          },
          {
            title: 'Твил',
            link: '/'
          },
          {
            title: 'Габардин',
            link: '/'
          },
          {
            title: 'Джинса',
            link: '/'
          }
        ]
      },
      {
        title: 'Принтованые ткани',
        list: [
          {
            title: 'Чулочные',
            link: '/'
          },
          {
            title: 'Ротационные',
            link: '/'
          },
          {
            title: 'Цифровые',
            link: '/'
          },
        ]
      },
      {
        title: 'Фурнитура',
        list: [
          {
            title: 'Манжеты',
            link: '/'
          },
          {
            title: 'Вортники',
            link: '/'
          },
          {
            title: 'Шнуры',
            link: '/'
          },
        ]
      },
    ]
  },
]);
</script>

<style lang="scss" scoped>
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

header {
  @include main-container();
  @include flex-center();
  gap: size(31px);
  background: #fff;
  padding-top: size(28px);
  padding-bottom: size(28px);
}

.logo {
  width: size(201px);
  height: size(26.61px);
}

.search {
  width: size(469px);
  height: size(44px);
  @include flex-center;
  border-radius: 100px;
  background: #F6F6F6;
  color: rgba(0, 0, 0, 0.40);
  font-size: size(14px);
  font-weight: 400;
  word-wrap: break-word;
}

.social-media__item {
  width: size(30px);
  height: size(30px);
}

.social-media-icon {
  width: 100%;
  height: 100%;
  color: $main-color;
}

.lang {
  color: $main-color;

  .lang__btn {
    padding: 0;

  }

  #headlessui-menu-items-v-0-1 {
    background: #fff;
  }
}

.submenu {
  position: absolute;
  top: 100%;
  left: 0;
  @include main-container();
  height: 0;
  width: 100vw;
  padding-top: 0;
  padding-bottom: 0;
  z-index: -1;
  @include flex-start();
  justify-content: flex-start;
  gap: size(140px);
  background: white;
  overflow: hidden;
  transition: all 0.3s;

  &.active {
    height: max-content;
    padding-top: size(50px);
    padding-bottom: size(110px);
    overflow: visible;
  }

  .submenu__item {
    @include flex-col-start();
    gap: size(32px);
  }

  .submenu__item__title {
    color: #5761AD;
    font-size: size(16px);
    font-weight: 400;
    word-wrap: break-word
  }

  .submenu__item__sub {
    color: #646464;
    font-size: size(15px);
    font-weight: 400;
    word-wrap: break-word
  }
}

.actions {
  width: size(23px);
  height: size(22px);
}

.header__bottom {
  position: relative;
  @include flex-center;
  background: #F9F9F9;

  .submenu__title {
    @include flex-center;
    padding: size(20px) size(46px);
    padding-rigth: 0;
    cursor: pointer;
    color: #242848;
    font-size: size(14px);
    font-weight: 400;
    word-wrap: break-word;

    &:first-child {
      padding-left: size(120px);
      background: linear-gradient(90deg, #242848 0%, #5761AE 100%);
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      color: white;
    }

    &:last-child {
      padding-right: size(120px);
    }
  }
}

</style>
