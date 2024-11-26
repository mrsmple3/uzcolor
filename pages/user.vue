<template>
	<div class="user">
		<BlockTitle :title="'Персональный кабинет'" :sub="'Аккаунт'" />
		<div class="user__container">
			<div class="user__sidebar">
				<NuxtLink v-for="item in sideBarList" :to="item.link" class="sidebar__item" :active-class="active">
					<NuxtImg :src="item.img" class="item__img" /> {{ item.title }}
				</NuxtLink>
			</div>
      <div class="user__content">
        <NuxtPage />
      </div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	definePageMeta({
		layout: "pages",
	});

	const sideBarList = ref([
		{
			title: "Личные данные",
			link: "/user",
			img: "/imgs/icons/user/user.svg",
		},
		{
			title: "История заказов",
			link: "/history",
			img: "/imgs/icons/user/time-past.svg",
		},
		{
			title: "Корзина",
			link: "/cart",
			img: "/imgs/icons/user/shopping-cart.svg",
		},
		{
			title: "Избранное",
			link: "/saved",
			img: "/imgs/icons/user/heart.svg",
		},
		{
			title: "Сменить пароль",
			link: "/password",
			img: "/imgs/icons/user/lock.svg",
		},
		{
			title: "Загрузить реквизиты",
			link: "/upload",
			img: "/imgs/icons/user/document.svg",
		},
		{
			title: "Контакты",
			link: "/contacts",
			img: "/imgs/icons/user/phone-guide.svg",
		},
		{
			title: "Выйти из аккаунта",
			link: "/exit",
			img: "/imgs/icons/user/exit.svg",
		},
	]);
</script>

<style lang="scss" scoped>
	.user {
		@include main-container();
		@include flex-col-start();
		gap: size(57px);
		padding-bottom: size(247px);
		@media screen and (max-width: 1050px) {
			gap: 30px;
			padding-bottom: 169px;
		}
		.user__container {
			width: 100%;
			@include flex-start();
			justify-content: space-between;
			gap: size(67px);
			@media screen and (max-width: 1050px) {
				@include flex-col-start();
				gap: 62px;
			}
			.user__sidebar {
				width: 30%;
				@include flex-col-start();
				gap: size(5px);
				@media screen and (max-width: 1050px) {
					width: 100%;
				}
				.sidebar__item {
					width: 100%;
					@include flex-center();
					justify-content: flex-start;
					gap: size(20px);
					color: rgba(36, 40, 72, 0.83);
					font-size: size(15px);
					font-weight: 400;
					word-wrap: break-word;
					background: #f4f4f4;
					padding: size(20px);
					border-radius: 5px;
					@media screen and (max-width: 1050px) {
						font-size: 15px;
						padding: 20px;
						gap: 20px;
					}
					&.active,
					&:hover {
						color: #fff;
						background: $primary;
					}
					.item__img {
						width: size(20px);
						height: size(20px);
						@media screen and (max-width: 1050px) {
							width: 20px;
							height: 20px;
						}
					}
				}
			}
      .user__content {
        width: 65%;
        @media screen and (max-width: 1050px) {
          width: 100%;
        }
      }
		}
	}
</style>
