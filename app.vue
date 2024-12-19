<template>
  <div>
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

const userStore = useUserStore();

onBeforeMount(() => {
  userStore.initAuth();
});
</script>

<style lang="scss" scoped></style>
