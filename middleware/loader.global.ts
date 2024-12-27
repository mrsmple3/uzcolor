export default defineNuxtRouteMiddleware((to, from) => {
    const preloader = usePreloader();
    preloader.loader.value.show = true;
    preloader.clearLoader();
});
