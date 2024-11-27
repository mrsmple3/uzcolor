<template>
  <div :style="{ paddingTop: `${headerHeight}px` }" class="layout">
    <HeaderComponent/>
    <UBreadcrumb
        :links="links"
        :ui="{
				base: 'font-normal',
				li: 'text-[#505050]',
			}"
        class="breadcrumbs"
        divider="/">
      <template #default="{ link, isActive, index }">
        <NuxtLink :class="{ noactive: isActive }" class="breadcrumb__title"> {{ link.label }}</NuxtLink>
      </template>
    </UBreadcrumb>
    <slot/>
    <FooterComponent/>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();

const links = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Navigation",
  },
  {
    label: "Breadcrumb",
  },
];

function updateHeaderHeight() {
  const headerElement = document.querySelector(".header");
  if (headerElement) {
    headerHeight.value = headerElement.clientHeight;
  }
}

const headerHeight = ref(0);

onMounted(() => {
  updateHeaderHeight();
  window.addEventListener("resize", updateHeaderHeight);
});
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  width: 100%;
}

.breadcrumb__title {
  color: #505050;
  font-size: size(16px);
  font-weight: 400;
  word-wrap: break-word;
  @media screen and (max-width: 1050px) {
    font-size: 16px;
  }
}

.breadcrumbs {
  @include main-container();
  padding-top: size(51px);
  padding-bottom: size(51px);
  @media screen and (max-width: 1050px) {
    padding-top: 46px;
    padding-bottom: 46px;
  }

  .noactive {
    color: rgba(79.69, 79.69, 79.69, 0.5);
  }
}
</style>
