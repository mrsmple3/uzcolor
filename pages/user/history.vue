<template>
  <div class="history">
    <h1 class="user__title">История заказов</h1>
    <div class="history__list">
      <HistoryComponent v-for="order in authStore.$state.orders" :order="order"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useUserStore} from "~/store/user.auth";

const authStore = useUserStore();

onBeforeMount(async () => {
  await authStore.getOrderByUserId(authStore.userGetter.id);
});
</script>

<style lang="scss" scoped>
.history {
  width: 100%;
  @include flex-col-start();
  gap: size(37px);

  .history__list {
    width: 100%;
    @include flex-col-start();
    gap: size(18px);
  }
}
</style>