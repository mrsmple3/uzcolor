<template>
  <div class="div">
    <div v-if="productStore.productsGetter" class="flex flex-1 flex-col gap-4 p-4">
      <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <UITabs default-value="all">
            <div class="flex items-center">
              <UITabsList>
                <UITabsTrigger value="all">
                  All
                </UITabsTrigger>
                <UITabsTrigger value="active">
                  Active
                </UITabsTrigger>
                <UITabsTrigger value="draft">
                  Draft
                </UITabsTrigger>
                <UITabsTrigger class="hidden sm:flex" value="archived">
                  Archived
                </UITabsTrigger>
              </UITabsList>
              <div class="ml-auto flex items-center gap-2">
                <UIDropdownMenu>
                  <UIDropdownMenuTrigger as-child>
                    <UIButton class="h-7 gap-1" size="sm" variant="outline">
                      <UIcon class="h-3.5 w-3.5" name="material-symbols:filter-alt"/>
                      <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Filter
                          </span>
                    </UIButton>
                  </UIDropdownMenuTrigger>
                  <UIDropdownMenuContent align="end">
                    <UIDropdownMenuLabel>Filter by</UIDropdownMenuLabel>
                    <UIDropdownMenuSeparator/>
                    <UIDropdownMenuItem checked>
                      Active
                    </UIDropdownMenuItem>
                    <UIDropdownMenuItem>Draft</UIDropdownMenuItem>
                    <UIDropdownMenuItem>
                      Archived
                    </UIDropdownMenuItem>
                  </UIDropdownMenuContent>
                </UIDropdownMenu>
                <UIButton class="h-7 gap-1" size="sm" variant="outline">
                  <UIcon class="h-3.5 w-3.5" name="fluent:arrow-export-up-16-filled"/>
                  <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Export
                      </span>
                </UIButton>
                <UIButton class="h-7 gap-1" size="sm" @click="addProduct">
                  <UIcon class="h-3.5 w-3.5" name="ic:baseline-plus"/>
                  <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Product
                      </span>
                </UIButton>
              </div>
            </div>
            <UITabsContent value="all">
              <UICard>
                <UICardHeader>
                  <UICardTitle>Продукты</UICardTitle>
                  <UICardDescription>
                    Управляйте своими продуктами и отслеживайте их продажи.
                  </UICardDescription>
                </UICardHeader>
                <UICardContent>
                  <UITable>
                    <UITableHeader>
                      <UITableRow>
                        <UITableHead class="hidden w-[100px] sm:table-cell">
                          <span class="sr-only">img</span>
                        </UITableHead>
                        <UITableHead>Название</UITableHead>
                        <UITableHead>Состав</UITableHead>
                        <UITableHead class="hidden md:table-cell">
                          Цена
                        </UITableHead>
                        <UITableHead class="hidden md:table-cell">
                          Арт
                        </UITableHead>
                        <UITableHead class="hidden md:table-cell">
                          Категории
                        </UITableHead>
                        <UITableHead>
                          <span class="sr-only">Actions</span>
                        </UITableHead>
                      </UITableRow>
                    </UITableHeader>
                    <UITableBody>
                      <UITableRow v-for="product in productStore.productsGetter" :key="product.id">
                        <UITableCell class="hidden sm:table-cell">
                          <img
                              :src="product.color[0].img"
                              alt="Product image"
                              class="aspect-square rounded-md object-cover"
                              height="64"
                              width="64"
                          >
                        </UITableCell>
                        <UITableCell class="font-medium">
                          {{ product.name }}
                        </UITableCell>
                        <UITableCell>
                          <UIBadge variant="outline">
                            {{ product.composition }}
                          </UIBadge>
                        </UITableCell>
                        <UITableCell class="hidden md:table-cell">
                          {{ product.price }} сум
                        </UITableCell>
                        <UITableCell class="hidden md:table-cell">
                          {{ product.art }}
                        </UITableCell>
                        <UITableCell v-if="productStore.categoryByIdGetter(product.categoryId)"
                                     class="max-w-[130px] relative hidden md:table-cell">
                          {{ productStore.categoryByIdGetter(product.categoryId).name }}
                        </UITableCell>
                        <UITableCell>
                          <UIDropdownMenu>
                            <UIDropdownMenuTrigger as-child>
                              <UIButton
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                              >
                                <UIcon class="w-5 h-5" name="material-symbols-light:format-list-bulleted"/>
                                <span class="sr-only">Toggle menu</span>
                              </UIButton>
                            </UIDropdownMenuTrigger>
                            <UIDropdownMenuContent align="end">
                              <UIDropdownMenuLabel>Actions</UIDropdownMenuLabel>
                              <UIDropdownMenuItem @click="editProductPopup(product.id)">Edit</UIDropdownMenuItem>
                              <UIDropdownMenuItem @click="deleteCurrentProduct(product.id)">Delete</UIDropdownMenuItem>
                            </UIDropdownMenuContent>
                          </UIDropdownMenu>
                        </UITableCell>
                      </UITableRow>
                    </UITableBody>
                  </UITable>
                </UICardContent>
                <UICardFooter>
                  <div class="text-xs text-muted-foreground">
                    Showing <strong v-if="productStore.productsGetter.length > 10">1-10</strong> of
                    <strong>{{ productStore.productsGetter.length }}</strong>
                    products
                  </div>
                </UICardFooter>
              </UICard>
            </UITabsContent>
          </UITabs>
        </main>
        <EditProduct v-if="popupState.isEditProductPopup"/>
      </div>
    </div>
    <main v-else class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">
          Inventory
        </h1>
      </div>
      <div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div class="flex flex-col items-center gap-1 text-center">
          <h3 class="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p class="text-sm text-muted-foreground">
            You can start selling as soon as you add a product.
          </p>
          <UIButton class="mt-4">
            Add Product
          </UIButton>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import {useProductStore} from "~/store/product.store";

definePageMeta({
  layout: 'admin',
});

const productStore = useProductStore();

const popupState = useState('popupState');

const toast = useToast();

const deleteCurrentProduct = async (id: string) => {
  try {
    await productStore.deleteProduct(id).then(async () => {
      await productStore.getAllProducts();
      toast.add({title: "Удалено ", type: "success"});
    });
  } catch (error) {
    toast.add({title: "Ошибка " + error.message, type: "error"});
  }
}

const editProductPopup = async (productId: string) => {
  try {
    await productStore.setCurrentProduct(productId).then(() => {
      popupState.value.isEditProductPopup = true;
    });
  } catch (error) {
    toast.add({title: "Ошибка " + error.message, type: "error"});
  }
}
const addProduct = async () => {
  
}
</script>

<style lang="scss" scoped>

</style>