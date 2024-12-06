<template>
  <div>
    <UBreadcrumb
        :links="links"
        :ui="{
          base: 'font-normal',
          ol: 'gap-4',
          li: '!text-[#4f4f4f] text-base gap-4',
          active: '!text-[#4f4f4f]/50',
          inactive: 'hover:!text-[#4f4f4f]/50'
			  }"
        class="breadcrumbs"
        divider="/"/>
    <div class="contact-page">
      <ContactForm :is-contact="false"/>
      <iframe
          class="map"
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A4c049e087c56651c6e32b34848c96f41b88f54f237a49388fe7de9bdbda5dfbe&amp;source=constructor"></iframe>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {definePageMeta} from "#imports";

definePageMeta({
  layout: "contact",
});

const links = [
  {
    label: "Главная",
    to: "/",
  },
  {
    label: "Контакты",
  },
];
</script>


<style lang="scss" scoped>
.contact-page {
  width: 100%;
  @include flex-col-start();

  .map {
    width: 100%;
    height: size(673px);
  }
}
</style>