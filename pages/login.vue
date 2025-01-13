<template>
  <div
      class="container relative hidden h-[800px] min-h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
    <div class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
      <div class="absolute inset-0 bg-zinc-900"/>
      <div class="relative z-20 flex items-center text-lg font-medium">
        <svg
            class="mr-2 h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/>
        </svg>
        ADMIN
      </div>
      <NuxtImg alt="Authentication" class="w-[80%] z-10 object-contain self-center" src="/imgs/logo-white.svg"/>
    </div>
    <div class="lg:p-8">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div class="flex flex-col space-y-2 text-center">
          <h1 class="text-2xl font-semibold tracking-tight">
            Войти
          </h1>
          <p class="text-sm text-muted-foreground">
            Войти в админ панель UZCOLOR
          </p>
        </div>
        <UseAuthForm/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
});

</script>
