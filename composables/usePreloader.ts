import {ref} from 'vue';

const loader = ref({
    show: true,
    timeoutId: null as number | null,
});

function clearLoader() {
    loader.value.timeoutId = setTimeout(() => {
        console.log("clearTimeout", loader.value.timeoutId, loader.value.show);
        loader.value.show = false;
    }, 300);
}

function clearLoaderTimeout() {
    if (loader.value.timeoutId !== null) {
        console.log("clearLoaderTimeout", loader.value.timeoutId, loader.value.show);
        clearTimeout(loader.value.timeoutId);
        loader.value.timeoutId = null;
    }
}

export function usePreloader() {
    return {
        loader,
        clearLoader,
        clearLoaderTimeout,
    };
}