<template>
	<div :class="{ active: isActiveHeader }" class="header w-full flex flex-col">
		<header>
			<div class="flex items-center">
				<div class="burger not-desktop" @click="toggleMobile">
					<div class="burger__replacer">
						<NuxtImg class="burger__open" src="/imgs/icons/burger.svg" />
						<NuxtImg class="burger__close" src="/imgs/icons/x.svg" />
					</div>
				</div>
				<NuxtLink to="/">
					<NuxtImg class="logo" src="/logo.svg" />
				</NuxtLink>
			</div>
			<UInput
				v-model="searchRef"
				autocomplete="off"
				class="search not-mobile"
				color="white"
				icon="i-heroicons-magnifying-glass-20-solid"
				placeholder="Поиск..."
				size="xl"
				variant="none" />
			<div class="flex items-center gap-3.5 not-mobile">
				<NuxtLink class="social-media__item" to="/">
					<UIcon class="social-media-icon" name="ic:baseline-telegram" />
				</NuxtLink>
				<NuxtLink class="social-media__item" to="/">
					<UIcon class="social-media-icon" name="entypo-social:vk-with-circle" />
				</NuxtLink>
				<NuxtLink class="social-media__item" to="/">
					<NuxtImg class="social-media-icon" src="/imgs/icons/socialmedia-maincolor-3.svg" />
				</NuxtLink>
			</div>
			<UDropdown :items="items" :popper="{ placement: 'bottom-start' }" class="lang not-mobile">
				<UButton class="lang__btn" color="black" label="RU" trailing-icon="i-heroicons-chevron-down-20-solid" variant="ghost">
					<template #leading>
						<NuxtImg class="w-6 h-6" src="https://api.iconify.design/emojione:flag-for-russia.svg" />
					</template>
				</UButton>
			</UDropdown>
			<div class="flex items-center gap-2.5 not-mobile">
				<NuxtImg alt="" class="w-6 h-6" src="/imgs/icons/phone.svg" />
				<div class="flex flex-col items-start">
					<NuxtLink class="phone" to="tel:+998 90 999-99-99"> +998 90 999-99-99 </NuxtLink>
					<span class="text-[#727272] text-xs font-normal">Заказать звонок</span>
				</div>
			</div>

			<div class="flex items-center gap-4">
				<NuxtLink class="actions" to="/">
					<NuxtImg src="/imgs/icons/profile.svg" />
				</NuxtLink>
				<UChip class="action__chip" color="red" position="bottom-right" size="2xl" text="1">
					<NuxtLink class="actions" to="/">
						<NuxtImg src="/imgs/icons/like.svg" />
					</NuxtLink>
				</UChip>
				<UChip class="action__chip" color="red" position="bottom-right" size="2xl" text="23">
					<NuxtLink class="actions" to="/">
						<NuxtImg src="/imgs/icons/cart.svg" />
					</NuxtLink>
				</UChip>
			</div>
		</header>
		<div class="header__bottom not-mobile">
			<div v-for="menuItem in menu">
				<div class="submenu__title" @click="subActive = !subActive">
					{{ menuItem.menu }}
					<UIcon class="ml-2.5" name="solar:alt-arrow-down-linear" />
				</div>
				<div class="submenu" :class="{ active: subActive }">
					<CatalogComponent :submenus="menuItem.submenu" />
				</div>
			</div>
			<NuxtLink class="submenu__title" to="/">
				Пошив изделий
				<UIcon class="ml-2.5" name="solar:alt-arrow-down-linear" />
			</NuxtLink>
			<NuxtLink class="submenu__title" to="/">
				<UIcon class="mr-2.5" name="material-symbols-light:percent-rounded" />
				Скидки и акции
			</NuxtLink>
			<NuxtLink class="submenu__title" to="/">
				О компании
				<UIcon class="ml-2.5" name="solar:alt-arrow-down-linear" />
			</NuxtLink>
			<NuxtLink class="submenu__title" to="/"> Блог </NuxtLink>
			<NuxtLink class="submenu__title" to="/"> Прайс-лист / образцы </NuxtLink>
			<NuxtLink class="submenu__title" to="/"> Контакты </NuxtLink>
		</div>
		<div class="mobile__mobile not-desktop">
			<UInput
				v-model="searchRef"
				autocomplete="off"
				class="search"
				color="white"
				icon="i-heroicons-magnifying-glass-20-solid"
				placeholder="Поиск..."
				size="xl"
				variant="none" />
			<UDropdown :items="items" :popper="{ placement: 'bottom-start' }" class="lang">
				<UButton class="lang__btn" color="black" label="RU" trailing-icon="i-heroicons-chevron-down-20-solid" variant="ghost">
					<template #leading>
						<NuxtImg class="w-6 h-6" src="https://api.iconify.design/emojione:flag-for-russia.svg" />
					</template>
				</UButton>
			</UDropdown>
		</div>
		<div class="mobile-menu not-desktop">
			<div class="social-medias">
				<div class="social-media">
					<span class="media__span"> Номер телефона </span>
					<div class="w-full flex items-center gap-5">
						<NuxtImg class="media__icon" src="/imgs/icons/phone-main-colo.svg" />
						<NuxtLink class="media__title" target="_blank" to="tel: +998 90 999-99-99">+998 90 999-99-99</NuxtLink>
					</div>
				</div>
				<div class="social-media">
					<span class="media__span"> Email </span>
					<div class="w-full flex items-center gap-5">
						<NuxtImg class="media__icon" src="/imgs/icons/mail.svg" />
						<NuxtLink class="media__title" target="_blank" to="mailto: info@uzcolor.uz">info@uzcolor.uz</NuxtLink>
					</div>
				</div>
				<div class="social-media">
					<span class="media__span"> Адрес </span>
					<div class="w-full flex items-center gap-5">
						<address>Тестовое поле адреса</address>
					</div>
				</div>
			</div>
			<div class="socmedia">
				<NuxtImg class="socmedia__icon" src="/imgs/icons/socialmedia-1.svg" />
				<NuxtImg class="socmedia__icon" src="/imgs/icons/socialmedia-2.svg" />
				<NuxtImg class="socmedia__icon" src="/imgs/icons/socialmedia-3.svg" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	const searchRef = ref("");

	const items = [
		[
			{
				label: "RU",
				avatar: {
					src: "https://api.iconify.design/emojione:flag-for-russia.svg",
				},
			},
		],
		[
			{
				label: "UZ",
				avatar: {
					src: "https://api.iconify.design/circle-flags:uz.svg",
				},
			},
		],
	];

	const subActive = ref(false);

	const menu = ref([
		{
			menu: "Каталог продукции",
			submenuActive: false,
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
		},
	]);

	const isActiveHeader = ref(false);

	function toggleMobile() {
		isActiveHeader.value = !isActiveHeader.value;
		document.querySelector("body").classList.toggle("overflow-hidden");
	}
</script>

<style lang="scss">
	@media screen and (max-width: 1050px) {
		.mobile__mobile {
			@include main-container();
			@include flex-center();
			background: white;
			padding-bottom: 30px;
			gap: 0;
			transition: all 0.3s;

			.search {
				width: 100%;
				height: 63px;
			}
			.lang {
				width: 0;
				overflow: hidden;
			}
		}

		.mobile-menu {
			position: relative;
			@include main-container();
			height: 0;
			padding-top: 0;
			padding-bottom: 0;
			overflow: hidden;
			transition: all 0.3s;

			.media__icon {
				filter: brightness(1000%) !important;
			}

			.media__title {
				color: white !important;
			}

			.media__span {
				color: rgba(255, 255, 255, 0.5) !important;
			}

			address {
				color: white !important;
			}
		}
	}

	.header {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 100;

		&::before {
			content: " ";
			position: absolute;
			inset: 0;
			width: 100vw;
			height: 100%;
			background: $primary;
			opacity: 0;
			z-index: 0;
			transition: all 0.3s;
		}

		&.active {
			&::before {
				opacity: 1;
			}

			.logo {
				filter: brightness(1000%);
			}

			.actions {
				filter: brightness(1000%);
			}

			.mobile-menu {
				height: max-content;
				padding-top: 20px;
				padding-bottom: 66px;
				overflow-y: auto;
			}

			.mobile__mobile {
				gap: 20px;
				.lang {
					width: max-content;
				}
			}

			.burger {
				.burger__open {
					transform: translate(-50%, -50%) scale(0);
				}

				.burger__close {
					transform: translate(-50%, -50%) scale(1);
				}
			}

			.lang__btn {
				color: white;
			}
		}
	}

	.phone {
		color: #242848;
		font-size: size(16px);
		font-weight: 400;
		word-wrap: break-word;
		white-space: nowrap;
	}

	header {
		position: relative;
		@include main-container();
		@include flex-center();
		gap: size(31px);
		background: #fff;
		padding-top: size(28px);
		padding-bottom: size(28px);
		border: none;
		transition: all 0.3s;
		@media screen and (max-width: 1050px) {
			padding-top: 23px;
			padding-bottom: 30px;
			background: transparent;
		}
	}

	.logo {
		min-width: max-content;
		min-height: max-content;
		width: size(201px);
		height: size(26.61px);
		@media screen and (max-width: 1050px) {
			width: 154px;
			height: 20.39px;
		}
	}

	.search {
		width: size(469px);
		height: size(44px);
		@include flex-center;
		border-radius: 100px;
		background: #f6f6f6;
		color: rgba(0, 0, 0, 0.4);
		font-size: size(14px);
		font-weight: 400;
		word-wrap: break-word;
		@media screen and (max-width: 1400px) {
			width: auto;
		}
	}

	.social-media__item {
		width: size(30px);
		height: size(30px);
	}

	.social-media-icon {
		width: 100%;
		height: 100%;
		color: $main-color;
	}

	.lang {
		color: $main-color;

		.lang__btn {
			padding: 0;
		}

		#headlessui-menu-items-v-0-1 {
			background: #fff;
		}
	}

	.burger {
		position: relative;
		margin-right: 25px;
	}

	.burger__replacer {
		width: 31px;
		height: 31px;

		img {
			position: absolute;
			top: 50%;
			left: 50%;
			width: 31px;
			height: 31px;
			transform: translate(-50%, -50%);
			transition: all 0.3s;
		}

		.burger__close {
			transform: translate(-50%, -50%) scale(0);
		}
	}

	.actions {
		width: size(23px);
		height: size(22px);

		@media screen and (max-width: 1050px) {
			width: 26px;
			height: 26px;
		}

		img {
			min-width: max-content;
			min-height: max-content;
		}
	}

	.header__bottom {
		position: relative;
		width: 100vw;
		@include flex-center;
		background: #f9f9f9;
		@media screen and (max-width: 1050px) {
		}

		.submenu {
			position: absolute;
			top: 100%;
			left: 0;
			z-index: -1;
			@include main-container();
			height: 0;
			width: 100vw;
			padding-top: 0;
			padding-bottom: 0;
			overflow: hidden;
			background: white;
			transition: all 0.3s;
			&.active {
				height: max-content;
				padding-top: size(50px);
				padding-bottom: size(110px);
				overflow: visible;
			}
		}

		.submenu__title {
			@include flex-center;
			padding: size(20px) size(46px);
			padding-right: 0;
			cursor: pointer;
			color: #242848;
			font-size: size(14px);
			font-weight: 400;
			word-wrap: break-word;
			white-space: nowrap;
			@media screen and (max-width: 1400px) {
				padding: size(20px) size(26px);
			}

			&:first-child {
				padding-left: size(120px);
				background: linear-gradient(90deg, #242848 0%, #5761ae 100%);
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
				color: white;
			}

			&:last-child {
				padding-right: size(120px);
			}
		}
	}
</style>
