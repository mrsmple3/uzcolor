<template>
  <div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
    <div class="hidden border-r bg-muted/40 md:block">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a class="flex items-center gap-2 font-semibold" href="/public">
            <span class="">UZCOLOR</span>
          </a>
        </div>
        <div class="flex-1">
          <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
            <NuxtLink
                active-class="bg-muted text-primary"
                class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                to="/admin/category"
            >
              Категории
            </NuxtLink>
            <NuxtLink
                active-class="bg-muted text-primary"
                class="flex items-center gap-3 rounded-lg text-muted-foreground px-3 py-2 transition-all hover:text-primary"
                to="/admin/products"
            >
              Продукты
            </NuxtLink>
            <NuxtLink
                active-class="bg-muted text-primary"
                class="flex items-center gap-3 rounded-lg text-muted-foreground px-3 py-2 transition-all hover:text-primary"
                to="/admin/users"
            >
              Пользователи
            </NuxtLink>
            <NuxtLink
                active-class="bg-muted text-primary"
                class="flex items-center gap-3 rounded-lg text-muted-foreground px-3 py-2 transition-all hover:text-primary"
                to="/admin/content"
            >
              Контент
            </NuxtLink>
          </nav>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <UISheet>
          <UISheetTrigger as-child>
            <UIButton
                class="shrink-0 md:hidden"
                size="icon"
                variant="outline"
            >
              <UIcon class="h-5 w-5" name="iconamoon:menu-burger-horizontal"/>
              <span class="sr-only">Toggle navigation menu</span>
            </UIButton>
          </UISheetTrigger>
          <UISheetContent class="flex flex-col" side="left">
            <nav class="grid gap-2 text-lg font-medium">
              <a
                  class="flex items-center gap-2 text-lg font-semibold"
                  href="#"
              >
                <span class="sr-only">Acme Inc</span>
              </a>
              <a
                  class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  href="#"
              >
                Dashboard
              </a>
              <a
                  class="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                  href="#"
              >
                Orders
                <UIBadge class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </UIBadge>
              </a>
              <a
                  class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  href="#"
              >
                Products
              </a>
              <a
                  class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  href="#"
              >
                Customers
              </a>
              <a
                  class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                  href="#"
              >
                Analytics
              </a>
            </nav>
          </UISheetContent>
        </UISheet>
        <div class="w-full flex-1">
          <form>
            <div class="relative">
              <UIcon class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" name="iconamoon:search"/>
              <UIInput
                  v-model="searchQuery"
                  class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  placeholder="Search products..." type="search"
                  @input="debouncedSearch"
              />
            </div>
          </form>
        </div>
        <UIDropdownMenu>
          <UIDropdownMenuTrigger as-child>
            <UIButton class="rounded-full" size="icon" variant="secondary">
              <UIcon class="h-5 w-5" name="material-symbols:account-circle"/>
              <span class="sr-only">Toggle user menu</span>
            </UIButton>
          </UIDropdownMenuTrigger>
          <UIDropdownMenuContent align="end">
            <UIDropdownMenuLabel>My Account</UIDropdownMenuLabel>
            <UIDropdownMenuSeparator/>
            <UIDropdownMenuItem>Settings</UIDropdownMenuItem>
            <UIDropdownMenuItem>Support</UIDropdownMenuItem>
            <UIDropdownMenuSeparator/>
            <UIDropdownMenuItem @click="logout">Выйти</UIDropdownMenuItem>
          </UIDropdownMenuContent>
        </UIDropdownMenu>
      </header>
      <NuxtPage/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useProductStore} from "~/store/product.store";
import {useUserStore} from "~/store/user.auth";

definePageMeta({
  layout: 'admin',
});
const popupState = useState('popupState');
const searchQuery = ref('');
const router = useRouter();

const authStore = useUserStore();
const productStore = useProductStore();

onBeforeMount(async () => {
  await productStore.getAllProducts();
  await productStore.getAllCategory();
  await productStore.getAllFilter();
});

const logout = async () => {
  await authStore.logout().then(() => {
    router.push('/login')
  })
}


const searchProducts = async () => {

  try {
    await productStore.searchProducts(searchQuery.value).then(() => {
      router.push('/admin/products');
    })
  } catch (error: Error | any) {
    console.error('Ошибка при поиске продуктов:', error.message);
  }
};

// Используем debounce для задержки выполнения функции поиска
const debouncedSearch = useDebounce(searchProducts, 300);
</script>
