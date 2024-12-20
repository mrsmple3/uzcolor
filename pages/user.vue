<template>
  <div>
    <UBreadcrumb
        :links="links"
        :ui="{
          base: 'font-normal',
          li: '!text-[#4f4f4f]',
          active: '!text-[#4f4f4f]/50',
          inactive: 'hover:!text-[#4f4f4f]/50'
     }"
        class="breadcrumbs"
        divider="/"/>
    <div class="user">
      <BlockTitle :sub="'Аккаунт'" :title="'Персональный кабинет'"/>
      <div class="user__container">
        <div class="user__sidebar">
          <div class="sidebar__item active not-mobile" @click="toggleDropdown">
            <NuxtImg :src="activeItem.img" class="item__img"/>
            {{ activeItem.title }}
          </div>
          <div :class="{active: dropdownOpen}" class="dropdown-menu">
            <NuxtLink v-for="item in sideBarList" :key="item.title" :to="item.link" class="sidebar__item"
                      exact-active-class="active" @click.prevent="selectItem(item)">
              <NuxtImg :src="item.img" class="item__img"/>
              {{ item.title }}
            </NuxtLink>
          </div>
        </div>
        <div class="user__content">
          <NuxtPage/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useUserStore} from "~/store/user.auth";

definePageMeta({
  layout: "pages",
});

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const toast = useToast();

const links = ref([
  {
    label: "Главная",
    to: "/",
  },
  {
    label: "Корзина",
  },
]);

const sideBarList = ref([
  {
    title: "Личные данные",
    link: "/user/login",
    img: "/imgs/icons/user/user.svg",
  },
  {
    title: "История заказов",
    link: "/user/history",
    img: "/imgs/icons/user/time-past.svg",
  },
  {
    title: "Корзина",
    link: "/cart",
    img: "/imgs/icons/user/shopping-cart.svg",
  },
  {
    title: "Избранное",
    link: "/saved",
    img: "/imgs/icons/user/heart.svg",
  },
  {
    title: "Сменить пароль",
    link: "/user/password",
    img: "/imgs/icons/user/lock.svg",
  },
  {
    title: "Загрузить реквизиты",
    link: "/user/requisites",
    img: "/imgs/icons/user/document.svg",
  },
  {
    title: "Контакты",
    link: "/user/contacts",
    img: "/imgs/icons/user/phone-guide.svg",
  },
  {
    title: "Выйти из аккаунта",
    link: "",
    img: "/imgs/icons/user/exit.svg",
    onClick() {
      userStore.logout();
      toast.add({title: "Вы успешно вышли из аккаунта ", type: "success"});
      router.push("/");
    }
  },
]);

const dropdownOpen = ref(false);

const activeItem = ref(sideBarList.value[0]);

onBeforeMount(() => {
  activeItem.value = sideBarList.value.find((item) => route.fullPath.includes(item.link)) || sideBarList.value[0];
});

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const selectItem = (item: { title: string, link: string, img: string }) => {
  activeItem.value = item;
  dropdownOpen.value = false;
  router.push(item.link);
};
</script>

<style lang="scss" scoped>
.user {
  @include main-container();
  @include flex-col-start();
  gap: size(57px);
  padding-bottom: size(247px);
  @media screen and (max-width: 1050px) {
    gap: 30px;
    padding-bottom: 169px;
  }

  .user__container {
    position: relative;
    width: 100%;
    @include flex-start();
    justify-content: space-between;
    gap: size(67px);
    @media screen and (max-width: 1050px) {
      @include flex-col-start();
      gap: 62px;
    }

    .user__sidebar {
      width: 30%;
      @include flex-col-start();
      gap: size(5px);
      @media screen and (max-width: 1050px) {
        width: 100%;
      }

      .sidebar__item {
        width: 100%;
        @include flex-center();
        justify-content: flex-start;
        gap: size(20px);
        color: rgba(36, 40, 72, 0.83);
        font-size: size(15px);
        font-weight: 400;
        word-wrap: break-word;
        background: #f4f4f4;
        padding: size(20px);
        border-radius: 5px;
        cursor: pointer;
        @media screen and (max-width: 1050px) {
          font-size: 15px;
          padding: 20px;
          gap: 20px;
        }

        &.active,
        &:hover {
          color: #fff;
          background: $primary;

          .item__img {
            filter: invert(10000%);
          }
        }

        .item__img {
          width: size(20px);
          height: size(20px);
          @media screen and (max-width: 1050px) {
            width: 20px;
            height: 20px;
          }
        }
      }

      .dropdown-menu {
        width: 100%;
        @include flex-col-start();
        gap: size(10px);
        transition: all 0.3s;
        @media screen and (max-width: 1050px) {
          height: 0;
          overflow: hidden;
        }

        &.active {
          height: 200px;
          overflow: auto;
        }
      }
    }

    .user__content {
      width: 65%;
      @media screen and (max-width: 1050px) {
        width: 100%;
      }
    }
  }
}
</style>