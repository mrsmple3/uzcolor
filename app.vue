<template>
  <div>
    <PreLoader v-if="loader.show"/>
    <NuxtLayout>
      <AutorisationByPhoneOrEmailPopup/>
      <LoginByPassword/>
      <NuxtPage/>
    </NuxtLayout>

    <UNotifications/>
  </div>
</template>

<script lang="ts" setup>
import {useUserStore} from "~/store/user.auth";

const popupState = useState('popupState', () => ({
  autorisation: {
    phone_or_email_autorisation: false,
    login_by_password: false,
  },
}));

const route = useRoute();
const router = useRouter();
const {loader} = usePreloader();

const userStore = useUserStore();

onBeforeMount(async () => {
  await userStore.initAuth().then(() => {
    if (route.name.includes('admin') && !userStore.isAdmin) {
      // router.push('/admin/login');
    }
  })

});
</script>

<style lang="scss" scoped></style>
