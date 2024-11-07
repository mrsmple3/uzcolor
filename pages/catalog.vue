<template>
  <div>
    <CatalogComponent :submenus="menu.submenu"/>
  </div>
</template>

<script lang="ts" setup>
const menu = ref(
    {
      submenu: [
        {
          title: 'Трикотажное полотно',
          list: [
            {
              title: 'Кулирная гладь',
              link: '/'
            },
            {
              title: 'Интрелок',
              link: '/'
            },
            {
              title: 'Рибана',
              link: '/'
            },
            {
              title: 'Пике',
              link: '/'
            },
            {
              title: 'Кашкорсе',
              link: '/'
            },
            {
              title: 'Футер-двухнитка',
              link: '/'
            },
            {
              title: 'Футер-рехнитка',
              link: '/'
            },
            {
              title: 'Махра',
              link: '/'
            },
            {
              title: 'Велюр',
              link: '/'
            },
            {
              title: 'Викоза',
              link: '/'
            },
          ]
        },
        {
          title: 'Трикотажные ткани',
          list: [
            {
              title: 'Саржа',
              link: '/'
            },
            {
              title: 'Поплин',
              link: '/'
            },
            {
              title: 'Сатин',
              link: '/'
            },
            {
              title: 'Страйп сатин',
              link: '/'
            },
            {
              title: 'Бязь',
              link: '/'
            },
            {
              title: 'Муслин',
              link: '/'
            },
            {
              title: 'Твил',
              link: '/'
            },
            {
              title: 'Габардин',
              link: '/'
            },
            {
              title: 'Джинса',
              link: '/'
            }
          ]
        },
        {
          title: 'Принтованые ткани',
          list: [
            {
              title: 'Чулочные',
              link: '/'
            },
            {
              title: 'Ротационные',
              link: '/'
            },
            {
              title: 'Цифровые',
              link: '/'
            },
          ]
        },
        {
          title: 'Фурнитура',
          list: [
            {
              title: 'Манжеты',
              link: '/'
            },
            {
              title: 'Вортники',
              link: '/'
            },
            {
              title: 'Шнуры',
              link: '/'
            },
          ]
        },
      ]
    },
);
</script>

<style lang="scss" scoped>

</style>