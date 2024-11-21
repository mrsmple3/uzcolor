<template>
	<div v-if="product" class="product">
		<h1 class="title">
			{{ product.name }}
			{{ product.composition }}
			{{ product.weight }}
		</h1>
		<div class="product__card">
			<div class="left">
				<NuxtImg :src="currentImg" class="product__card__img" />
			</div>
			<div class="right">
				<div class="w-full flex items-center justify-between mb-5">
					<p class="art">Арт. {{ product.art }}</p>

					<div class="tabs">
						<button v-for="(tab, index) in tabs" :class="{ active: activeTab === index }" class="tab__item" @click="activeTab = index">
							{{ tab.name }}
						</button>
					</div>
				</div>
				<h2 class="price">{{ product.price || "78 000" }} <span>сум/м</span></h2>
				<p class="product__type">{{ tabs[activeTab].name }}</p>
				<p class="sub">
					{{
						product.des ||
						`Отличается прочностью, мягкостью и хорошей воздухопроницаемостью, идеальна для пошива спортивной
          одежды, толстовок и костюмов.`
					}}
				</p>
				<Swiper
					:modules="[SwiperAutoplay, SwiperNavigation]"
					:navigation="{
						nextEl: '.product__btn-next',
						prevEl: '.product__btn-prev',
					}"
					:slides-per-view="5"
					:space-between="8"
					:speed="1300"
					class="slider">
					<div class="product__btn-prev">
						<UIcon class="bg-[#5761AD]" name="solar:alt-arrow-left-linear" />
					</div>
					<SwiperSlide
						v-for="(material, index) in productStore.$state.defineProduct.color"
						:key="index"
						:class="['slider__item', { active: activeMaterial === index }]"
						@click.prevent="changeMaterial(material, index)">
						<NuxtImg :src="material.img" class="slider__img" />
					</SwiperSlide>
					<div class="product__btn-next">
						<UIcon class="bg-[#5761AD]" name="solar:alt-arrow-right-linear" />
					</div>
				</Swiper>
				<div class="right__bottom">
					<div class="h-full flex-col-start justify-between">
						<span class="count__span">Количество, м</span>
						<div class="count">
							<NuxtImg class="count__btn" src="/imgs/icons/minus-circle.svg" @click="defaultCount > 1 && defaultCount--" />
							<input :value="product.count || defaultCount" class="count__value" />
							<NuxtImg class="count__btn" src="/imgs/icons/plus-circle.svg" @click="defaultCount++" />
						</div>
					</div>
					<button class="right__btn">Оформить заказ</button>
					<div class="flex-center">
						<button class="cart__btn">
							<NuxtImg src="/imgs/icons/shopping-cart-blue.svg" />
						</button>
						<button class="like__btn">
							<NuxtImg src="/imgs/icons/like-blue.svg" />
						</button>
					</div>
				</div>
			</div>
		</div>

		<div class="product__content">
			<div class="product__content__item">
				<h3 class="product__content__title">Описание</h3>
				<p class="sub">
					{{
						product.description ||
						`Изготавливается с использованием 85% натурального хлопка и 15% полиэстера, что обеспечивает
          оптимальный баланс между натуральными и синтетическими волокнами. Благодаря такому составу ткань сохраняет
          природную мягкость и воздухопроницаемость хлопка, а также обладает дополнительной устойчивостью к износу и
          деформации за счет добавления полиэстера.
          \n\n
          Футер имеет плотность 320 г/м², что делает его идеальным для пошива теплых и практичных изделий, таких как
          толстовки, спортивные костюмы, худи и другой повседневной одежды.`
					}}
				</p>
			</div>
			<div class="product__content__item">
				<h3 class="product__content__title">Характеристики</h3>
				<table>
					<tr v-for="param in product.params">
						<td>{{ param.title }}</td>
						<td>{{ param.param.name }}</td>
					</tr>
				</table>
			</div>
		</div>

		<div class="recommendation">
			<BlockTitle :sub="'Смотрите также'" :title="'Рекомендации'" />
			<div class="slider__replacer">
				<div class="btn-prev">
					<UIcon class="bg-[#5761AD]" name="solar:alt-arrow-left-linear" />
				</div>
				<Swiper
					:breakpoints="{
						1050: {
							slidesPerView: 4,
							spaceBetween: 18,
						},
					}"
					:modules="[SwiperAutoplay, SwiperNavigation]"
					:navigation="{
						nextEl: '.recommendation .btn-next',
						prevEl: '.recommendation .btn-prev',
					}"
					:slides-per-view="'auto'"
					:space-between="20"
					:speed="1300"
					class="product__container">
					<SwiperSlide v-for="item in productStore.$state.typeProducts.recommendation" class="product-card">
						<ProductCard :product="item" />
					</SwiperSlide>
				</Swiper>
				<div class="btn-next">
					<UIcon class="bg-[#5761AD]" name="solar:alt-arrow-right-linear" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { type DefineProductState, useProductStore } from "~/store/product.store";

	definePageMeta({
		layout: "pages",
	});

	const productStore = useProductStore();
	const route = useRoute();
	const productId = ref(route.params.id);

	const product = ref<DefineProductState>(productStore.$state.defineProduct);

	let activeMaterial = ref<number>(0);
	const currentImg = ref("");

	let activeTab = ref<number>(0);

	let defaultCount = ref<number>(10);

	const tabs = [
		{
			name: "Мелкий опт",
		},
		{
			name: "Крупный опт",
		},
	];

	function changeMaterial(material: any, index: number) {
		currentImg.value = material.img;
		activeMaterial.value = index;
	}

	onMounted(() => {
		productStore.getProductById(productId.value as string);
		productStore.getProductByType("recommendation");
	});

	watch(
		() => productStore.$state.defineProduct,
		(defineProduct: any) => {
			currentImg.value = defineProduct.color[0].img;
			product.value = defineProduct;
		},
		{ deep: true }
	);
</script>

<style lang="scss" scoped>
	.product {
		width: 100%;
		@include main-container();
		@include flex-col-start();
		padding-bottom: size(158px);
		@media screen and (max-width: 1050px) {
			padding: 0;
			padding-bottom: 60px;
		}
	}

	.title {
		color: #484848;
		font-size: size(28px);
		font-weight: 400;
		word-wrap: break-word;
		margin-bottom: size(50px);
		@media screen and (max-width: 1050px) {
			@include main-container();
			font-size: 23px;
			margin-bottom: 53px;
		}
	}

	.product__card {
		width: 100%;
		@include flex-start();
		justify-content: space-between;
		gap: size(19px);
		margin-bottom: size(76px);
		@media screen and (max-width: 1050px) {
			@include flex-col-start();
			gap: 19px;
			margin-bottom: 50px;
		}

		.left {
			width: 44%;
			@include flex-col-start();
			gap: size(12px);
			@media screen and (max-width: 1050px) {
				@include main-container();
				gap: 12px;
			}

			.product__card__img {
				width: 100%;
				height: size(483px);
				border-radius: 2px;
				@media screen and (max-width: 1050px) {
					height: 340px;
				}
			}
		}

		.right {
			width: 55%;
			@include flex-col-start();
			padding: size(37px) size(52px);
			border-radius: 5px;
			background: #f4f4f4;
			@media screen and (max-width: 1050px) {
				@include main-container();
				padding-top: 50px;
				padding-bottom: 50px;
			}
		}

		.art {
			color: #646464;
			font-size: size(14px);
			font-weight: 400;
			word-wrap: break-word;
			@media screen and (max-width: 1050px) {
				font-size: 14px;
			}
		}

		.tabs {
			@include flex-stretch();
			border-radius: 100px;
			overflow: hidden;
			background: #eaeaea;

			.tab__item {
				padding: size(13.5px) size(30.5px);
				background: transparent;
				color: #515151;
				font-size: size(13px);
				font-weight: 400;
				line-height: 110%;
				word-wrap: break-word;
				@media screen and (max-width: 1050px) {
					padding: 17px 40px;
					font-size: 15px;
				}

				&.active {
					background: #fff;
				}
			}
		}

		.price {
			color: black;
			font-size: size(36px);
			font-weight: 400;
			line-height: 150%;
			word-wrap: break-word;

			span {
				font-size: size(20px);
			}

			@media screen and (max-width: 1050px) {
				font-size: 36px;
				span {
					font-size: 20px;
				}
			}
		}

		.product__type {
			color: rgba(36, 40, 72, 0.7);
			font-size: size(13px);
			font-weight: 400;
			line-height: 110%;
			word-wrap: break-word;
			margin-bottom: size(30px);
			@media screen and (max-width: 1050px) {
				font-size: 13px;
				margin-bottom: 30px;
			}
		}

		.sub {
			width: 100%;
			color: #646464;
			font-size: size(14px);
			font-family: Aeonik TRIAL, sans-serif;
			font-weight: 400;
			line-height: 150%;
			word-wrap: break-word;
			margin-bottom: size(61px);
			@media screen and (max-width: 1050px) {
				font-size: 14px;
				margin-bottom: 53px;
			}
		}

		.slider {
			margin-bottom: size(42px);
			@media screen and (max-width: 1050px) {
				margin-bottom: 42px;
			}
		}

		.right__bottom {
			width: 100%;
			@include flex-center();
			justify-content: flex-start;
			@media screen and (max-width: 1050px) {
				@include flex-col-start();
			}

			.count__span {
				color: rgba(36, 40, 72, 0.7);
				font-size: size(13px);
				font-weight: 400;
				line-height: 110%;
				word-wrap: break-word;
				margin-bottom: size(17px);
				@media screen and (max-width: 1050px) {
					font-size: 13px;
					margin-bottom: 17px;
				}
			}

			.flex-col-start {
				margin-right: size(32px);
				@media screen and (max-width: 1050px) {
					margin-right: 0;
					margin-bottom: 32px;
				}
			}

			.count {
				@include flex-center();
				gap: size(8px);
				@media screen and (max-width: 1050px) {
					gap: 8px;
				}

				.count__btn {
					width: size(23px);
					height: size(23px);
					cursor: pointer;
					@media screen and (max-width: 1050px) {
						width: 34px;
						height: 34px;
					}
				}

				.count__value {
					width: size(53px);
					padding: size(8.5px) size(19px);
					background: white;
					border-right: 5px;
					color: black;
					font-size: size(16px);
					font-weight: 400;
					line-height: 110%;
					word-wrap: break-word;
					border-radius: 5px;
					white-space: nowrap;
					@media screen and (max-width: 1050px) {
						width: 82px;
						padding: 15px 30px;
						font-size: 23px;
					}
				}
			}

			.right__btn {
				@include btn(21px, 66.5px, $primary, white);
				margin-right: size(21px);
				@media screen and (max-width: 1050px) {
					margin-right: 0;
					margin-bottom: 21px;
				}
			}

			.cart__btn,
			.like__btn {
				width: size(59px);
				height: size(59px);
				@include flex-center();
				justify-content: center;
				background: #fff;
				border-radius: 9999px;
				margin-right: size(12px);
				@media screen and (max-width: 1050px) {
					width: 59px;
					height: 59px;
					margin-right: 12px;
				}

				img {
					min-width: max-content;
					min-height: max-content;
					width: size(22px);
					height: size(22px);
					@media screen and (max-width: 1050px) {
						width: 22px;
						height: 22px;
					}
				}
			}

			.like__btn {
				margin-right: 0;
			}
		}
	}

	.product__content {
		color: #000;
		@include flex-start();
		gap: size(26px);
		margin-bottom: size(89px);
		@media screen and (max-width: 1050px) {
			@include main-container();
			@include flex-col-start();
			gap: 59px;
			margin-bottom: 69px;
		}

		.product__content__item {
			width: 100%;
			@include flex-col-start();
			gap: size(37px);
			@media screen and (max-width: 1050px) {
				gap: 37px;
			}
		}

		.product__content__title {
			color: black;
			font-size: size(23px);
			font-weight: 400;
			line-height: 150%;
			word-wrap: break-word;
			@media screen and (max-width: 1050px) {
				font-size: 23px;
			}
		}

		.sub {
			color: #646464;
			font-size: size(14px);
			font-weight: 300;
			line-height: 180%;
			word-wrap: break-word;
			@media screen and (max-width: 1050px) {
				font-size: 15px;
			}
		}
	}

	.recommendation {
		@include flex-col-start();
		gap: size(40px);
		@media screen and (max-width: 1050px) {
			@include main-container();
			gap: 42px;
		}
	}
</style>
