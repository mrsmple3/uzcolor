<template>
  <div>
    <main>
      <Swiper
          :loop="true"
          :modules="[SwiperAutoplay, SwiperParallax, SwiperPagination, SwiperNavigation]"
          :navigation="{
					nextEl: '.btn-next',
					prevEl: '.btn-prev',
				}"
          :pagination="{
					el: '.main-slider__pagination',
					clickable: true,
				}"
          :parallax="true"
          :slides-per-view="1"
          :speed="1300"
          class="main-slider">
        <SwiperSlide class="main-slider__item">
          <!-- Применяем параллакс к изображению -->
          <NuxtImg class="main__slider__img" data-swiper-parallax="50%" src="/imgs/main-slider-1.jpg"/>
        </SwiperSlide>
        <SwiperSlide class="main-slider__item">
          <NuxtImg class="main__slider__img" data-swiper-parallax="50%" src="/imgs/main-slider-1.jpg"/>
        </SwiperSlide>
        <div class="main-slider__pagination"></div>
        <div class="btn-prev">
          <UIcon class="bg-[#5761AD]" name="solar:alt-arrow-left-linear"/>
        </div>
        <div class="btn-next">
          <UIcon class="bg-[#5761AD]" name="solar:alt-arrow-right-linear"/>
        </div>
      </Swiper>
    </main>

    <div class="catalog">
      <BlockTitle :sub="'Разделы'" :title="'Категории продукции'"/>
      <div class="catalog__container">
        <NuxtLink v-for="item in catalog" class="catalog__item" to="/">
          <NuxtImg :src="item.img" class="item__img"/>
          <span class="item__span">{{ item.span }}</span>
          <h3 class="item__title">{{ item.title }}</h3>
        </NuxtLink>
      </div>
    </div>

    <div class="xit">
      <BlockTitle :sub="'Популярное'" :title="'Хиты продаж'"/>
      <div class="slider__replacer">
        <div class="btn-prev">
          <UIcon class="bg-[#5761AD]" name="solar:alt-arrow-left-linear"/>
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
              nextEl: '.xit .btn-next',
              prevEl: '.xit .btn-prev',
					  }"
            :slides-per-view="auto"
            :space-between="20"
            :speed="1300"
            class="product__container">
          <SwiperSlide v-for="product in products" class="product-card">
            <ProductCard :product="product" @clicked="changeProductMaterial"/>
          </SwiperSlide>
        </Swiper>
        <div class="btn-next">
          <UIcon class="bg-[#5761AD]" name="solar:alt-arrow-right-linear"/>
        </div>
      </div>
    </div>

    <div class="new-product">
      <BlockTitle :sub="'Новая продукция'" :title="'Новинки'"/>
      <div class="slider__replacer">
        <div class="btn-prev">
          <UIcon class="bg-[#5761AD]" name="solar:alt-arrow-left-linear"/>
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
              nextEl: '.new-product .btn-next',
              prevEl: '.new-product .btn-prev',
            }"
            :slides-per-view="auto"
            :space-between="20"
            :speed="1300"
            class="product__container">
          <SwiperSlide v-for="product in products" class="product-card">
            <ProductCard :product="product" @clicked="changeProductMaterial"/>
          </SwiperSlide>
        </Swiper>
        <div class="btn-next">
          <UIcon class="bg-[#5761AD]" name="solar:alt-arrow-right-linear"/>
        </div>
      </div>
    </div>

    <div class="recommendation">
      <BlockTitle :sub="'Наши рекомендации'" :title="'Рекомендуем'"/>
      <div class="slider__replacer">
        <div class="btn-prev">
          <UIcon class="bg-[#5761AD]" name="solar:alt-arrow-left-linear"/>
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
            :slides-per-view="auto"
            :space-between="20"
            :speed="1300"
            class="product__container">
          <SwiperSlide v-for="product in products" class="product-card">
            <ProductCard :product="product" @clicked="changeProductMaterial"/>
          </SwiperSlide>
        </Swiper>
        <div class="btn-next">
          <UIcon class="bg-[#5761AD]" name="solar:alt-arrow-right-linear"/>
        </div>
      </div>
    </div>

    <div class="about">
      <div class="flex-center">
        <BlockTitle :sub="'О компании'" :title="'Почему именно <span> UZCOLOR </span>'" class="about__title"/>
        <div class="about__icon">
          <NuxtImg src="/imgs/icons/8.svg"/>
        </div>
      </div>
      <div class="flex-start">
        <p class="sub">
          Ведущий производитель высококачественных трикотажных полотен из хлопка и смесей для одежды, представленный
          на рынках Европы, СНГ и Российской
          Федерации.
          <br/><br/>
          Мы сочетаем традиции узбекского длинноволокнистого хлопка с современным европейским стандартом качества,
          обеспечивая надежность и инновации в каждом
          метре ткани.
        </p>
        <p class="sub">
          Наша миссия — предоставлять рынку высококачественные материалы, которые соответствуют международным
          стандартам и удовлетворяют потребности
          производителей одежды по всему миру.
          <br/><br/>
          Мы гордимся использованием экологически чистого и натурального сырья, выращенного на полях Узбекистана, что
          гарантирует экологичность и
          долговечность наших полотен.
        </p>
      </div>
      <NuxtLink class="about__btn" to="/">UZCOLOR TEXTILE</NuxtLink>
    </div>

    <div class="horse">
      <NuxtImg class="horse__img" src="/imgs/horse.png"/>
      <div class="horse__content">
        <NuxtImg class="horse__logo" src="/imgs/logo-white.svg"/>
      </div>
    </div>

    <div class="numbers">
      <Swiper
          :breakpoints="{
            1050: {
              slidesPerView: 4,
              spaceBetween: 18,
            },
          }"
          :modules="[SwiperAutoplay]"
          :slides-per-view="auto"
          :space-between="20"
          :speed="1300"
      >
        <SwiperSlide v-for="number in numbers" class="numbers__item">
          <h3 class="numbers__title">{{ number.title }}</h3>
          <div class="flex flex-col gap-2.5">
            <span class="numbers__span">{{ number.span }}</span>
            <p class="numbers__sub">{{ number.sub }}</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <div class="news">
      <div class="w-full flex flex-center justify-between">
        <BlockTitle :sub="'Новости'" :title="'Последние новости'"/>
        <NuxtLink class="news__btn not-mobile">
          Все публикации →
        </NuxtLink>
      </div>
      <div class="news__cards">
        <NewsCard/>
      </div>
      <NuxtLink class="news__btn not-desktop">
        Все публикации →
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
const catalog = ref([
  {span: "Категория", title: "Трикотажное полотно", img: "/imgs/catalog-1.jpg"},
  {span: "Категория", title: "Трикотажные ткани", img: "/imgs/catalog-2.jpg"},
  {span: "Категория", title: "Принтовые ткани", img: "/imgs/catalog-3.jpg"},
  {span: "Категория", title: "Фурнитура", img: "/imgs/catalog-4.jpg"},
]);

const products = ref([
  {
    id: 0,
    img: "/imgs/product-1.jpg",
    title: "Кулирная гладь 100% ХБ 250гр",
    sub: "Арт. TER382942",
    materials: [
      "/imgs/product-slide-2.png",
      "/imgs/product-slide-1.png",
      "/imgs/product-slide-3.png",
      "/imgs/product-slide-4.png",
      "/imgs/product-slide-5.png",
      "/imgs/product-slide-5.png",
    ],
  },
  {
    id: 1,
    img: "/imgs/product-1.jpg",
    title: "Кулирная гладь 100% ХБ 250гр",
    sub: "Арт. TER382942",
    materials: [
      "/imgs/product-slide-2.png",
      "/imgs/product-slide-1.png",
      "/imgs/product-slide-3.png",
      "/imgs/product-slide-4.png",
      "/imgs/product-slide-5.png",
      "/imgs/product-slide-5.png",
    ],
  },
  {
    id: 2,
    img: "/imgs/product-1.jpg",
    title: "Кулирная гладь 100% ХБ 250гр",
    sub: "Арт. TER382942",
    materials: [
      "/imgs/product-slide-2.png",
      "/imgs/product-slide-1.png",
      "/imgs/product-slide-3.png",
      "/imgs/product-slide-5.png",
      "/imgs/product-slide-4.png",
      "/imgs/product-slide-5.png",
    ],
  },
  {
    id: 3,
    img: "/imgs/product-1.jpg",
    title: "Кулирная гладь 100% ХБ 250гр",
    sub: "Арт. TER382942",
    materials: [
      "/imgs/product-slide-2.png",
      "/imgs/product-slide-1.png",
      "/imgs/product-slide-5.png",
      "/imgs/product-slide-3.png",
      "/imgs/product-slide-4.png",
      "/imgs/product-slide-5.png",
    ],
  },
  {
    id: 4,
    img: "/imgs/product-1.jpg",
    title: "Кулирная гладь 100% ХБ 250гр",
    sub: "Арт. TER382942",
    materials: [
      "/imgs/product-slide-2.png",
      "/imgs/product-slide-1.png",
      "/imgs/product-slide-5.png",
      "/imgs/product-slide-3.png",
      "/imgs/product-slide-4.png",
      "/imgs/product-slide-5.png",
    ],
  },
]);

const numbers = ref([
  {
    title: '120+',
    span: 'Команда профессионалов',
    sub: 'Высококвалифицированных специалистов и экспертов',
  },
  {
    title: '40+',
    span: 'Ассортимент продукции',
    sub: 'Видов трикотажных полотен разных размеров и составов',
  },
  {
    title: '10+',
    span: 'Опыт в производстве',
    sub: 'Лет успешного опыта в текстильной промышленности',
  },
  {
    title: '100%',
    span: 'Стандарты качества',
    sub: 'Каждый этап производства проходит контроль качества',
  }

])

function changeProductMaterial(material: string, id: number) {
  products.value.map(function (item: any) {
    if (item.id === id) {
      item.img = material;
    }
  });
}
</script>

<style lang="scss" scoped>
.catalog {
  @include main-container();
  @include flex-col-start();
  gap: size(60px);
  padding-top: size(160px);
  margin-bottom: size(110px);
  @media screen and (max-width: 1050px) {
    padding-top: 56px;
    margin-bottom: 67px;
    gap: 42px;
  }
}

.catalog__container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: size(20px);
  row-gap: size(24px);
  @media screen and (max-width: 1050px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 12px;
  }

  .catalog__item {
    position: relative;
    width: 100%;
    @include flex-col-start();
    justify-content: flex-end;
    gap: size(10px);
    padding: size(110px) size(30px) size(30px);
    border-radius: $border-radius;
    overflow: hidden;
    @media screen and (max-width: 1050px) {
      gap: 10px;
      padding: 104px 18px 18px;
    }

    .item__img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    .item__span {
      color: rgba(255, 255, 255, 0.6);
      font-size: size(14px);
      font-weight: 400;
      word-wrap: break-word;
      @media screen and (max-width: 1050px) {
        font-size: 14px;
      }
    }

    .item__title {
      color: white;
      font-size: size(20px);
      font-weight: 400;
      word-wrap: break-word;
      @media screen and (max-width: 1050px) {
        font-size: 20px;
      }
    }
  }
}

.xit,
.new-product,
.recommendation {
  @include main-container();
  @include flex-col-start();
  gap: size(40px);
  margin-bottom: size(110px);
  @media screen and (max-width: 1050px) {
    gap: 42px;
    margin-bottom: 87px;
  }
}

.slider__replacer {
  position: relative;
  width: 100%;

  .btn-next,
  .btn-prev {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: size(50px);
    height: size(50px);
    @include flex-center();
    justify-content: center;
    border-radius: 9999px;
    background: white;
    box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    transition: all 0.3s;
    @media screen and (max-width: 1050px) {
      display: none;
    }

    &.swiper-button-disabled {
      width: 0;
    }
  }

  .btn-prev {
    left: size(-80px);
  }

  .btn-next {
    right: size(-80px);
  }
}

.product__container {
  width: 100%;
  @include flex-start();
}

.about {
  @include main-container();
  @include flex-col-start();
  margin-bottom: size(47px);
  @media screen and (max-width: 1050px) {
    margin-bottom: 40px;
  }

  .flex-center {
    width: 100%;
    justify-content: space-between;
    margin-bottom: size(57px);
    @media screen and (max-width: 1050px) {
      margin-bottom: 54px;
    }
  }

  .about__title {
    width: 48%;
    @media screen and (max-width: 1050px) {
      width: 100%;
    }

  }

  .about__icon {
    width: 48%;
    @media screen and (max-width: 1050px) {
      display: none;
    }

    img {
      min-width: max-content;
      min-height: max-content;
      width: size(66px);
      height: size(20px);
      @media screen and (max-width: 1050px) {
        width: 174px;
        height: 23.04px;
      }
    }
  }

  .flex-start {
    width: 100%;
    justify-content: space-between;
    margin-bottom: size(47px);
    @media screen and (max-width: 1050px) {
      @include flex-col-start();
      gap: 40px;
      justify-content: flex-start;
      margin-bottom: 42px;
    }
  }

  .sub {
    width: 48%;
    color: #5c6185;
    font-size: size(16px);
    font-weight: 300;
    line-height: 150%;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      width: 100%;
      font-size: 16px;
    }
  }

  .about__btn {
    @include btn(12.5px, 32px, transparent, rgba(37, 41, 74, 0.70));
    border: 1px solid rgba(37, 41, 74, 0.70);
    border-radius: 100px;
  }
}

.horse {
  @include main-container();
  @include flex-stretch();
  margin-bottom: size(28px);
  @media screen and (max-width: 1050px) {
    @include flex-col-start();
    margin-bottom: 40px;
  }

  .horse__img {
    position: relative;
    width: 50%;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    @media screen and (max-width: 1050px) {
      width: 100%;
      height: 280px;
    }
  }

  .horse__content {
    width: 51%;
    margin-left: -1%;
    background: $primary;
    @include flex-center();
    justify-content: center;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    @media screen and (max-width: 1050px) {
      width: 100%;
      height: 230px;
      margin: -1% 0 0;
    }
  }

  .horse__logo {
    width: size(226.60px);
    height: size(30px);
  }
}

.numbers {
  @include main-container();
  @include flex-stretch();
  justify-content: space-between;
  margin-bottom: size(110px);
  overflow-x: hidden;
  @media screen and (max-width: 1050px) {
    margin-bottom: 87px;
  }

  .swiper-wrapper {
    justify-content: space-between;
  }

  .numbers__item {
    @include flex-col-start();
    justify-content: space-between;
    gap: size(100px);
    padding: size(32px) size(25px);
    border-radius: 5px;
    border: 1px #CFD4FF solid;
    @media screen and (max-width: 1050px) {
      width: 100%;
      max-width: 308px;
      gap: 100px;
      padding: 32px 25px;
    }

    &:last-child {
      margin: 0 !important;
    }
  }

  .numbers__title {
    background-image: linear-gradient(180deg, #4B5395 0%, #C7CCFB 100%);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    font-size: size(80px);
    font-weight: 300;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      font-size: 80px;
    }
  }

  .numbers__span {
    width: 100%;
    color: rgba(64, 71, 126, 0.40);
    font-size: size(14px);
    font-weight: 300;
    line-height: 150%;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      font-size: 14px;
    }
  }

  .numbers__sub {
    color: #40477E;
    font-size: size(16px);
    font-weight: 300;
    line-height: 130%;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      font-size: 16px
    }
  }
}

.news {
  @include main-container();
  @include flex-col-start();
  gap: size(50px);
  margin-bottom: size(120px);
  @media screen and (max-width: 1050px) {
    gap: 53px;
    margin-bottom: 106px;
  }

  .flex-center {
    @media screen and (max-width: 1050px) {
      @include flex-col-start();
    }

  }

  .news__btn {
    @include btn(20.5px, 53px, linear-gradient(90deg, #242848 0%, #5761AE 100%), #fff);
  }

  .news__cards {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: size(20px) size(28px);
    @media screen and (max-width: 1050px) {
      grid-template-columns: repeat(1, 1fr);
      gap: 22px;
    }
  }
}
</style>
