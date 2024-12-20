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
    <div class="info-page">
      <BlockTitle :sub="'Оплата и доставка'" :title="'Условия доставки'"/>
      <div class="info-page__container">
        <h3 class="title">Отгрузку мы производим только при наличии оригинала доверенности с синей печатью. (форма
          доверенности: 0315001)</h3>
        <h3 class="title">Вы можете забрать товар 3-мя методами:</h3>
        <ul class="sub !text-[#242848]">
          <li>
            1. Самовывоз с нашего склада
          </li>
          <li>АДРЕС: XXXXXXXX</li>
          <li>
            2. Мы отправляем товар любой транспортной компанией.
          </li>
          <li>При отправке компаниями: «Деловые Линии» и «Байкал Сервис», наша компания оплачивает забор груза.</li>
          <li>
            3. Доставка нашей компанией возможна по Москве и Московской области, стоимость не включена в счет, уточняйте
            у личного менеджера.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const links = ref([
  {
    label: "Главная",
    to: "/",
  },
  {
    label: "Условия доставки",
  },
]);
</script>
