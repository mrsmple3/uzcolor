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
    <SwiperSlide v-for="product in productStore.$state.products" class="product-card">
      <ProductCard :product="product" @clicked="changeProductMaterial"/>
    </SwiperSlide>
  </Swiper>
  <div class="btn-next">
    <UIcon class="bg-[#5761AD]" name="solar:alt-arrow-right-linear"/>
  </div>
</div>
</div>
<script lang="ts" setup>

</script>

<style lang="scss" scoped>

</style>