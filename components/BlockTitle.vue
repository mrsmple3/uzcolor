<template>
  <div class="block-title">
    <h2 class="block-title__title" v-html="title"></h2>
    <span class="block-title__span">{{ sub }}</span>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  sub: {
    type: String,
  },
});
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1050px) {

}
</style>
