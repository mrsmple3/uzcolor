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
      <BlockTitle :sub="'О компании'" :title="'О нас'"/>
      <div class="info-page__container">
        <p class="sub !text-[#242848]">Мы ищем ответственного и клиентоориентированного менеджера колл-центра, который
          станет
          частью
          нашей команды и будет работать на линии поддержки клиентов. Ваша основная задача — профессионально и
          оперативно отвечать на звонки, помогать клиентам в решении их вопросов и обеспечивать высокий уровень
          сервиса.</p>
        <h3 class="title">Обязанности:</h3>
        <ul class="sub !text-[#242848] list">
          <li>Прием входящих звонков и консультирование клиентов по продуктам и услугам компании</li>
          <li>Обработка запросов и обращений клиентов через телефон, почту или чат.</li>
          <li>Решение вопросов, связанных с заказами, доставкой и возвратом.</li>
          <li>Ведение записей о каждом клиентском обращении в CRM-системе.</li>
          <li>Соблюдение стандартов обслуживания и поддержание позитивного имиджа компании.</li>
          <li>Эффективная коммуникация с другими отделами для оперативного решения сложных вопросов.</li>
        </ul>
        <h3 class="title">Требования:</h3>
        <ul class="sub !text-[#242848] list">
          <li>Отличные навыки общения и умение находить общий язык с клиентами.</li>
          <li>Опыт работы в колл-центре или в сфере обслуживания будет преимуществом.</li>
          <li>Умение сохранять спокойствие и продуктивность в стрессовых ситуациях.</li>
          <li>Базовые навыки работы с ПК и опыт работы с CRM-системами.</li>
          <li>Готовность обучаться, принимать новые знания и следовать корпоративным стандартам.</li>
          <li>Владение иностранным языком будет преимуществом.</li>
        </ul>
        <h3 class="title">Мы предлагаем:</h3>
        <ul class="sub !text-[#242848] list">
          <li>Официальное трудоустройство и стабильный доход.</li>
          <li>Гибкий график работы (смены).</li>
          <li>Дружный и поддерживающий коллектив.</li>
          <li>Профессиональное обучение и возможность карьерного роста.</li>
          <li>Комфортные условия труда и современное рабочее оборудование.</li>
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
    label: "О нас",
  },
]);
</script>
