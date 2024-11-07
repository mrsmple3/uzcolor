<template>
	<div class="catalog">
		<BlockTitle :title="'Категории продукции'" :sub="'Разделы'" class="catalog__title" />
		<div class="catalog__list">
			<CatalogComponent :submenus="menu.submenu" />
		</div>
	</div>
</template>

<script lang="ts" setup>
	definePageMeta({
		layout: "pages",
	});

	const menu = ref({
		submenu: [
			{
				title: "Трикотажное полотно",
				list: [
					{
						title: "Кулирная гладь",
						link: "/",
					},
					{
						title: "Интрелок",
						link: "/",
					},
					{
						title: "Рибана",
						link: "/",
					},
					{
						title: "Пике",
						link: "/",
					},
					{
						title: "Кашкорсе",
						link: "/",
					},
					{
						title: "Футер-двухнитка",
						link: "/",
					},
					{
						title: "Футер-рехнитка",
						link: "/",
					},
					{
						title: "Махра",
						link: "/",
					},
					{
						title: "Велюр",
						link: "/",
					},
					{
						title: "Викоза",
						link: "/",
					},
				],
			},
			{
				title: "Трикотажные ткани",
				list: [
					{
						title: "Саржа",
						link: "/",
					},
					{
						title: "Поплин",
						link: "/",
					},
					{
						title: "Сатин",
						link: "/",
					},
					{
						title: "Страйп сатин",
						link: "/",
					},
					{
						title: "Бязь",
						link: "/",
					},
					{
						title: "Муслин",
						link: "/",
					},
					{
						title: "Твил",
						link: "/",
					},
					{
						title: "Габардин",
						link: "/",
					},
					{
						title: "Джинса",
						link: "/",
					},
				],
			},
			{
				title: "Принтованые ткани",
				list: [
					{
						title: "Чулочные",
						link: "/",
					},
					{
						title: "Ротационные",
						link: "/",
					},
					{
						title: "Цифровые",
						link: "/",
					},
				],
			},
			{
				title: "Фурнитура",
				list: [
					{
						title: "Манжеты",
						link: "/",
					},
					{
						title: "Вортники",
						link: "/",
					},
					{
						title: "Шнуры",
						link: "/",
					},
				],
			},
		],
	});
</script>

<style lang="scss" scoped>
	.catalog {
		@include main-container();
		@include flex-col-start();
		padding-bottom: size(156px);
		@media screen and (max-width: 1050px) {
			padding: 0;
			padding-bottom: 49px;
		}
		.catalog__list {
			width: 100%;
			padding: size(60px);
			background-color: #f8f8f8;
			margin-top: size(60px);
			@media screen and (max-width: 1050px) {
				@include main-container();
				padding-top: 80px;
				padding-bottom: 80px;
				margin-top: 53px;
			}
		}
		.catalog__title {
			@media screen and (max-width: 1050px) {
				@include main-container();
			}
		}
	}
</style>
