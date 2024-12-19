<template>
  <div class="history">
    <h1 class="user__title">История заказов</h1>
    <div class="history__list">
      <HistoryComponent/>
    </div>
  </div>
</template>

<script lang="ts" setup>
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