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
    <div class="staff__container">
      <BlockTitle :sub="'Вам понравилось'" :title="'Избранное'"/>
      <div class="staff__list">
        <StaffComponent v-for="staffCard in staff" :email="staffCard.email" :name="staffCard.name"
                        :phone="staffCard.phone"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const staff = ref([
  {
    name: "Имя Фамилия Отчество",
    phone: "+7 XX XXX-XX-XX",
    email: "test@color.uz",
  },
  {
    name: "Имя Фамилия Отчество",
    phone: "+7 XX XXX-XX-XX",
    email: "test@color.uz",
  },
  {
    name: "Имя Фамилия Отчество",
    phone: "+7 XX XXX-XX-XX",
    email: "test@color.uz",
  },
  {
    name: "Имя Фамилия Отчество",
    phone: "+7 XX XXX-XX-XX",
    email: "test@color.uz",
  },
]);

const links = ref([
  {
    label: "Главная",
    to: "/",
  },
  {
    label: "Сотрудники",
  },
]);
</script>


<style lang="scss" scoped>
.staff__container {
  width: 100%;
  @include main-container();
  @include flex-col-start();
  gap: size(63px);
  margin-bottom: size(224px);
  @media screen and (max-width: 1050px) {
    gap: 46px;
    margin-bottom: 104px;
  }

  .staff__list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(size(300px), 1fr));
    gap: size(80px) size(20px);
    @media screen and (max-width: 1050px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 21px;
    }
  }
}
</style>