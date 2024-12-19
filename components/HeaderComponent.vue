<template>
  <div :class="{ active: isActiveHeader }" class="header w-full flex flex-col">
    <header>
      <div class="flex items-center">
        <div class="burger not-desktop" @click="toggleMobile">
          <div class="burger__replacer">
            <NuxtImg class="burger__open" src="/imgs/icons/burger.svg"/>
            <NuxtImg class="burger__close" src="/imgs/icons/x.svg"/>
          </div>
        </div>
        <NuxtLink to="/">
          <NuxtImg class="logo" src="/logo.svg"/>
        </NuxtLink>
      </div>
      <UInput
          v-model="searchRef"
          autocomplete="off"
          class="search not-mobile"
          color="white"
          icon="i-heroicons-magnifying-glass-20-solid"
          placeholder="Поиск..."
          size="xl"
          variant="none"/>
      <div class="flex items-center gap-3.5 not-mobile">
        <NuxtLink class="social-media__item" to="/">
          <NuxtImg class="social-media-icon" src="/imgs/icons/socialmedia-maincolor-1.svg"/>
        </NuxtLink>
        <NuxtLink class="social-media__item" to="/">
          <NuxtImg class="social-media-icon" src="/imgs/icons/socialmedia-maincolor-2.svg"/>
        </NuxtLink>
        <NuxtLink class="social-media__item" to="/">
          <NuxtImg class="social-media-icon" src="/imgs/icons/socialmedia-maincolor-3.svg"/>
        </NuxtLink>
      </div>
      <UDropdown :items="items" :popper="{ placement: 'bottom-start' }" class="lang not-mobile">
        <UButton class="lang__btn" color="black" label="RU" trailing-icon="i-heroicons-chevron-down-20-solid"
                 variant="ghost">
          <template #leading>
            <NuxtImg class="w-6 h-6" src="https://api.iconify.design/emojione:flag-for-russia.svg"/>
          </template>
        </UButton>
      </UDropdown>
      <div class="flex items-center gap-2.5 not-mobile">
        <NuxtImg alt="" class="w-6 h-6" src="/imgs/icons/phone.svg"/>
        <div class="flex flex-col items-start">
          <NuxtLink class="phone" to="tel:+998 90 999-99-99"> +998 90 999-99-99</NuxtLink>
          <span class="text-[#727272] text-xs font-normal">Заказать звонок</span>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <button class="actions" @click.prevent="withUserAccess('/user/login')">
          <NuxtImg src="/imgs/icons/profile.svg"/>
        </button>
        <UChip :show="userStore.totalSavedProducts > 0" :text="userStore.totalSavedProducts" class="action__chip"
               color="red"
               position="bottom-right"
               size="2xl">
          <button class="actions" @click.prevent="withUserAccess('/saved')">
            <NuxtImg src="/imgs/icons/like.svg"/>
          </button>
        </UChip>
        <UChip :show="userStore.totalCartItems > 0" :text="userStore.totalCartItems" class="action__chip" color="red"
               position="bottom-right"
               size="2xl">
          <button class="actions" @click.prevent="withUserAccess('/cart')">
            <NuxtImg src="/imgs/icons/cart.svg"/>
          </button>
        </UChip>
      </div>
    </header>
    <div class="header__bottom not-mobile">
      <div v-for="menuItem in menu">
        <div class="submenu__title" @click="subActive = !subActive">
          {{ menuItem.menu }}
          <UIcon class="ml-2.5" name="solar:alt-arrow-down-linear"/>
        </div>
        <div :class="{ active: subActive }" class="submenu">
          <CatalogComponent :to-filter="toFilter" @click="subActive = false"/>
        </div>
      </div>
      <NuxtLink v-for="(menuItem, index) in menuSecond" :key="index"
                :class="{active: activeSecondSubmenu === index && menuItem.submenu.length > 0}"
                :to="menuItem.link" class="submenu__title"
                @mouseenter="activeSecondSubmenu = index"
                @mouseleave="activeSecondSubmenu = null">
        <UIcon v-if="menuItem.icon" :name="menuItem.icon" class="mr-2.5"/>

        {{ menuItem.menu }}

        <UIcon v-if="menuItem.submenu.length > 0" class="ml-2.5" name="solar:alt-arrow-down-linear"/>

        <div class="submenu">
          <NuxtLink v-for="submenuItem in menuItem.submenu" :to="submenuItem.link" class="submenu__link"
                    @click="activeSecondSubmenu = null">
            {{ submenuItem.name }}
          </NuxtLink>
        </div>
      </NuxtLink>
    </div>
    <div class="mobile__mobile not-desktop">
      <UInput
          v-model="searchRef"
          autocomplete="off"
          class="search"
          color="white"
          icon="i-heroicons-magnifying-glass-20-solid"
          placeholder="Поиск..."
          size="xl"
          variant="none"/>
      <UDropdown :items="items" :popper="{ placement: 'bottom-start' }" class="lang">
        <UButton :ui="{size: 'xs'}" class="lang__btn" color="black" label="RU"
                 trailing-icon="i-heroicons-chevron-down-20-solid" variant="ghost">
          <template #leading>
            <NuxtImg class="w-6 h-6" src="https://api.iconify.design/emojione:flag-for-russia.svg"/>
          </template>
        </UButton>
      </UDropdown>
    </div>
    <div class="mobile-menu not-desktop">
      <div class="w-full flex flex-col items-start overflow-y-auto">
        <div class="mobile-navbar">
          <h4 class="navbar__title">Категории</h4>
          <div v-for="(menuItem, index) in toFilter" :key="index"
               :class="{active: activeMobileSubmenu === menuItem.name && menuItem.filters.length > 0}"
               class="navbar__container"
               @click="activeMobileSubmenu === menuItem.name ?  activeMobileSubmenu= null : activeMobileSubmenu = menuItem.name">
            <button class="navbar__link">
              <span>{{ menuItem.name }}</span>
              <UIcon v-if="menuItem.filters.length > 0" class="icon" name="ic:round-keyboard-arrow-down"/>
            </button>
            <div class="navbar__submenu">
              <NuxtLink v-for="submenuItem in menuItem.filters" class="navbar__submenu__item" to="/">
                {{ submenuItem.name }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="mobile-navbar">
          <h4 class="navbar__title">Навигация</h4>
          <div v-for="(menuItem, index) in menuSecond" :key="index"
               :class="{active: activeMobileSubmenu === menuItem.menu && menuItem.submenu.length > 0}"
               class="navbar__container"
               @click="activeMobileSubmenu === menuItem.menu ?  activeMobileSubmenu= null : activeMobileSubmenu = menuItem.menu">
            <button class="navbar__link">
              <span>{{ menuItem.menu }}</span>
              <UIcon v-if="menuItem.submenu.length > 0" class="icon" name="ic:round-keyboard-arrow-down"/>
            </button>
            <div class="navbar__submenu">
              <NuxtLink v-for="submenuItem in menuItem.submenu" :to="submenuItem.link" class="navbar__submenu__item">
                {{ submenuItem.name }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="social-medias">
          <div class="social-media">
            <span class="media__span"> Номер телефона </span>
            <div class="w-full flex items-center gap-5">
              <NuxtImg class="media__icon" src="/imgs/icons/phone-main-colo.svg"/>
              <NuxtLink class="media__title" target="_blank" to="tel: +998 90 999-99-99">+998 90 999-99-99</NuxtLink>
            </div>
          </div>
          <div class="social-media">
            <span class="media__span"> Email </span>
            <div class="w-full flex items-center gap-5">
              <NuxtImg class="media__icon" src="/imgs/icons/mail.svg"/>
              <NuxtLink class="media__title" target="_blank" to="mailto: info@uzcolor.uz">info@uzcolor.uz</NuxtLink>
            </div>
          </div>
          <div class="social-media">
            <span class="media__span"> Адрес </span>
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useUserStore} from "~/store/user.auth";
import {type Filter, useProductStore} from "~/store/product.store";

const searchRef = ref("");

const router = useRouter();

const popupState = useState("popupState");

const userStore = useUserStore();

const items = [
  [
    {
      label: "RU",
      avatar: {
        src: "https://api.iconify.design/emojione:flag-for-russia.svg",
      },
    },
  ],
  [
    {
      label: "UZ",
      avatar: {
        src: "https://api.iconify.design/circle-flags:uz.svg",
      },
    },
  ],
];

const subActive = ref(false);

const menu = ref([
  {
    menu: "Каталог продукции",
    submenuActive: false,
  },
]);

const productStore = useProductStore();

const toFilter = ref<Filter[]>([]);

onBeforeMount(async () => {
  if (productStore.categoryGetter.length === 0) {
    await productStore.getAllCategory();
  }

  const categories = productStore.categoryGetter;

  toFilter.value = await Promise.all(categories.map(async (category) => {
    const products = await productStore.getProductsByCategory(category.id);
    const filters = productStore.getCurrentFilters({name: 'Полотно'}, products);
    return {
      name: category.name,
      filters,
    };
  }));
});

const activeMobileSubmenu = ref<string | null>(null);

const activeSecondSubmenu = ref<number | null>(null);

const menuSecond = ref([
  {
    menu: "Пошив изделий",
    link: "",
    icon: null,
    submenu: [],
  },
  {
    menu: "Скидки и акции",
    link: "sell",
    icon: "/path/to/discount-icon.svg",
    submenu: [],
  },
  {
    menu: "О компании",
    link: "/about",
    icon: null,
    submenu: [
      {name: "Новости", link: "/news"},
      {name: "Вакансии", link: "/vacation"},
    ],
  },
  {
    menu: "Блог",
    link: "/blog",
    icon: null,
    submenu: [],
  },
  {
    menu: "Прайс-лист / образцы",
    link: "price",
    icon: null,
    submenu: [],
  },
  {
    menu: "Контакты",
    link: "contact",
    icon: null,
    submenu: [],
  },
]);

const isActiveHeader = ref(false);

const withUserAccess = (path: string) => {
  if (!userStore.isAuthenticated) {
    popupState.value.autorisation.phone_or_email_autorisation = true;
  } else {
    router.push(path);
  }
}

function toggleMobile() {
  isActiveHeader.value = !isActiveHeader.value;
  document.querySelector("body").classList.toggle("overflow-hidden");
}
</script>

<style lang="scss">
@media screen and (max-width: 1050px) {
  .mobile__mobile {
    @include main-container();
    @include flex-center();
    background: white;
    padding-bottom: 30px;
    gap: 0;
    transition: all 0.3s;

    .search {
      width: 100%;
      height: 63px;
    }

    .lang {
      width: 0;
      overflow: hidden;
    }
  }

  .mobile-menu {
    position: relative;
    @include main-container();
    height: 0;
    padding-top: 0;
    padding-bottom: 0;
    overflow-y: auto;
    transition: all 0.3s;

    .mobile-navbar {
      width: 100%;
      @include flex-col-start();
      gap: 36px;
      margin-bottom: 40px;

      .navbar__title {
        width: 100%;
        @include flex-center();
        gap: 15px;
        color: rgba(255, 255, 255, 0.50);
        font-size: 15px;
        font-weight: 400;
        word-wrap: break-word;

        &::after {
          content: ' ';
          width: 100%;
          height: 0px;
          border: 1px rgba(255, 255, 255, 0.20) solid;
        }
      }

      .navbar__container {
        width: 100%;
        @include flex-col-start();
        gap: 0;
        transition: all 0.3s;

        &.active {
          gap: 27px;

          .icon {
            transform: rotate(180deg);
          }

          .navbar__submenu {
            height: max-content;
            padding: 23px 30px;
            overflow: visible;
          }
        }
      }

      .navbar__link {
        width: 100%;
        @include flex-center();
        color: white;
        font-size: 18px;
        font-weight: 400;
        word-wrap: break-word;

        .icon {
          min-width: max-content;
          min-height: max-content;
          transition: all 0.3s;
        }


      }

      .navbar__submenu {
        width: 100%;
        @include flex-col-start();
        height: 0;
        gap: 15px;
        padding: 0 30px;
        overflow: hidden;
        transition: all 0.3s;

        .navbar__submenu__item {
          color: rgba(255, 255, 255, 0.80);
          font-size: 17px;
          font-weight: 400;
          word-wrap: break-word;
          text-decoration: none;
          position: relative;
          padding-left: 20px;

          &::before {
            content: '•';
            position: absolute;
            left: 0;
            color: rgba(255, 255, 255, 0.80);
          }
        }
      }
    }

    .media__icon {
      filter: brightness(1000%) !important;
    }

    .media__title {
      color: white !important;
    }

    .media__span {
      color: rgba(255, 255, 255, 0.5) !important;
    }

    address {
      color: white !important;
    }
  }
}

.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;

  &::before {
    content: " ";
    position: absolute;
    inset: 0;
    width: 100vw;
    height: 100%;
    background: $primary;
    opacity: 0;
    z-index: 0;
    transition: all 0.3s;
  }

  &.active {
    &::before {
      opacity: 1;
    }

    .logo {
      filter: brightness(1000%);
    }

    .actions {
      filter: brightness(1000%);
    }

    .mobile-menu {
      height: 82vh;
      padding-top: 20px;
      padding-bottom: 66px;
      overflow-y: auto;
    }

    .mobile__mobile {
      gap: 20px;

      .lang {
        width: max-content;
      }
    }

    .burger {
      .burger__open {
        transform: translate(-50%, -50%) scale(0);
      }

      .burger__close {
        transform: translate(-50%, -50%) scale(1);
      }
    }

    .lang__btn {
      color: white;
    }

    .search {
      width: 80%;
    }
  }
}

.phone {
  color: #242848;
  font-size: size(16px);
  font-weight: 400;
  word-wrap: break-word;
  white-space: nowrap;
}

header {
  position: relative;
  @include main-container();
  @include flex-center();
  gap: size(31px);
  background: #fff;
  padding-top: size(28px);
  padding-bottom: size(28px);
  border: none;
  transition: all 0.3s;
  @media screen and (max-width: 1050px) {
    padding-top: 23px;
    padding-bottom: 30px;
    background: transparent;
  }
}

.logo {
  min-width: max-content;
  min-height: max-content;
  width: size(201px);
  height: size(26.61px);
  @media screen and (max-width: 1050px) {
    width: 154px;
    height: 20.39px;
  }
}

.search {
  width: size(469px);
  height: size(44px);
  @include flex-center;
  border-radius: 100px;
  background: #f6f6f6;
  color: rgba(0, 0, 0, 0.4);
  font-size: size(14px);
  font-weight: 400;
  word-wrap: break-word;
  transition: all 0.3s;
  @media screen and (max-width: 1400px) {
    width: auto;
  }
}

.social-media__item {
  width: size(30px);
  height: size(30px);
}

.social-media-icon {
  min-width: max-content;
  min-height: max-content;
  width: 100%;
  height: 100%;
  color: $main-color;
}

.lang {
  color: $main-color;

  .lang__btn {
    padding: 0;
  }

  span {
    font-size: size(15px) !important;
    @media screen and (max-width: 1050px) {
      font-size: 20px !important;
    }
  }
}

.burger {
  position: relative;
  margin-right: 25px;
}

.burger__replacer {
  width: 31px;
  height: 31px;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 31px;
    height: 31px;
    transform: translate(-50%, -50%);
    transition: all 0.3s;
  }

  .burger__close {
    transform: translate(-50%, -50%) scale(0);
  }
}

.actions {
  width: size(23px);
  height: size(22px);

  @media screen and (max-width: 1050px) {
    width: 26px;
    height: 26px;
  }

  img {
    min-width: max-content;
    min-height: max-content;
  }
}

.header__bottom {
  position: relative;
  width: 100vw;
  @include flex-center;
  background: #f9f9f9;
  @media screen and (max-width: 1050px) {
  }

  .submenu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: -1;
    @include main-container();
    height: 0;
    width: 100vw;
    @include flex-col-start();
    gap: 10px;
    padding-top: 0;
    padding-bottom: 0;
    overflow: hidden;
    background: white;
    transition: all 0.3s;

    &.active {
      height: max-content;
      padding-top: size(50px);
      padding-bottom: size(110px);
      overflow: visible;
    }
  }

  .submenu__title {
    position: relative;
    @include flex-center;
    padding: size(20px) 0;
    cursor: pointer;
    color: #242848;
    font-size: size(14px);
    font-weight: 400;
    word-wrap: break-word;
    white-space: nowrap;

    &:first-child {
      padding-left: size(120px);
      padding-right: size(26px);
      background: linear-gradient(90deg, #242848 0%, #5761ae 100%);
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      color: white;
    }

    &:last-child {
      padding-right: size(120px);
    }

    &.active {
      .submenu {
        height: max-content;
        padding: 15px 20px;
        overflow: visible;
      }
    }

    .submenu {
      position: absolute;
      top: 100%;
      left: 0;
      width: size(160px);
      height: 0;
      padding: 0 20px;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: all 0.3s;

      .submenu__link {
        color: #242848;
        font-size: size(14px);
        font-weight: 400;
        line-height: 140%;
      }
    }
  }
}
</style>
