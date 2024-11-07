<template>
	<div :class="{ active: subActive }" class="catalog-component">
		<div v-for="submenu in submenus" class="catalog-component__item">
			<h4 class="catalog-component__item__title">{{ submenu.title }}</h4>
			<div class="flex flex-col items-start gap-3.5">
				<NuxtLink v-for="item in submenu.list" :to="item.link" class="catalog-component__item__sub">
					{{ item.title }}
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	defineProps({
		submenus: {
			type: Object,
			required: true,
		},
		subActive: {
			type: Boolean,
			default: true,
		},
	});
</script>

<style lang="scss" scoped>
	.catalog-component {
		width: 100%;
		@include flex-start();
		justify-content: space-between;
		gap: size(140px);
		background: inherit;
		transition: all 0.3s;
		@media screen and (max-width: 1050px) {
			flex-wrap: wrap;
			gap: 92px 34px;
		}

		.catalog-component__item {
			@include flex-col-start();
			gap: size(32px);
			@media screen and (max-width: 1050px) {
				gap: 32px;
			}
		}

		.catalog-component__item__title {
			color: #5761ad;
			font-size: size(16px);
			font-weight: 400;
			word-wrap: break-word;
			@media screen and (max-width: 1050px) {
				font-size: 16px;
			}
		}

		.catalog-component__item__sub {
			color: #646464;
			font-size: size(15px);
			font-weight: 400;
			word-wrap: break-word;
			@media screen and (max-width: 1050px) {
				font-size: 15px;
			}
		}
	}
</style>
