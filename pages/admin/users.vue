<template>
  <div>
    <div v-if="userStore.usersGetter.length > 0" class="flex flex-1 flex-col gap-4 p-4">
      <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <UITabs default-value="user">
            <div class="flex items-center">
              <UITabsList class="max-w-[1000px] overflow-x-auto no-scroll">
                <UITabsTrigger value="user">Пользователи</UITabsTrigger>
                <UITabsTrigger value="orders">Заказы</UITabsTrigger>
              </UITabsList>
            </div>
            <UITabsContent class="w-full flex flex-col items-start gap-5" value="user">
              <UICard class="w-full">
                <UICardHeader>
                  <UICardTitle>Пользователи</UICardTitle>
                </UICardHeader>
                <UICardContent>
                  <UITable>
                    <UITableHeader>
                      <UITableRow>
                        <UITableHead>Название</UITableHead>
                        <UITableHead>Почта</UITableHead>
                        <UITableHead class="hidden md:table-cell">Телефон</UITableHead>
                        <UITableHead>Компания</UITableHead>
                        <UITableHead>Реквизыты</UITableHead>
                      </UITableRow>
                    </UITableHeader>
                    <UITableBody>
                      <UITableRow v-for="user in userStore.usersGetter" :key="user.id">
                        <UITableCell class="hidden sm:table-cell">
                          {{ user.name || 'Не указано' }}
                        </UITableCell>
                        <UITableCell class="font-medium">
                          {{ user.email || 'Не указано' }}
                        </UITableCell>
                        <UITableCell>
                          <UIBadge variant="outline">
                            {{ user.phone || 'Не указано' }}
                          </UIBadge>
                        </UITableCell>
                        <UITableCell class="font-medium">
                          {{ user.company || 'Не указано' }}
                        </UITableCell>
                        <UITableCell class="w-[200px] flex items-center gap-[6px] overflow-y-auto no-scroll">
                          <div
                              class="font-medium text-[13px] p-2 rounded bg-gray-800 max-w-[90px] overflow-hidden cursor-pointer">
                            <a v-for="file in user.files" :href="file"
                               class="text-nowrap overflow-hidden text-ellipsis" download
                               style="max-width: 100px;">
                              {{ file }}
                            </a>
                          </div>
                        </UITableCell>
                      </UITableRow>
                    </UITableBody>
                  </UITable>
                </UICardContent>
                <UICardFooter>
                  <div class="text-xs text-muted-foreground">
                    Showing <strong v-if="userStore.usersGetter.length > 10">1-10</strong> of
                    <strong>{{ userStore.usersGetter.length }}</strong>
                    users
                  </div>
                </UICardFooter>
              </UICard>
            </UITabsContent>

            <UITabsContent v-for="order in userStore.orderGetter" class="w-full flex flex-col items-start gap-5"
                           value="orders">
              <UICard class="w-full">
                <UICardHeader>
                  <UICardTitle>Заказы</UICardTitle>
                  <UICardDescription class="flex items-center gap-4">
                    {{ new Date(order.updatedAt).toLocaleDateString('ru-RU') }}
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
                        <UITableHead class="hidden md:table-cell"> Количесво, м</UITableHead>
                        <UITableHead class="hidden md:table-cell"> Цена</UITableHead>
                        <UITableHead class="hidden md:table-cell"> Статус</UITableHead>
                        <UITableHead>Пользователь</UITableHead>
                        <UITableHead class="hidden md:table-cell">Действия</UITableHead>
                      </UITableRow>
                    </UITableHeader>
                    <UITableBody>
                      <UITableRow v-for="orderItem in order.items" :key="orderItem.id"
                                  :class="{'opacity-80': orderItem.status === 'Заказ в обработке'}">
                        <UITableCell class="hidden sm:table-cell">
                          <img v-if="orderItem.color" :src="orderItem.color.img" alt="Product image"
                               class="aspect-square rounded-md object-cover w-24 h-16"/>
                        </UITableCell>
                        <UITableCell class="font-medium">
                          {{ orderItem.product.name }}
                        </UITableCell>
                        <UITableCell>
                          <UIBadge variant="outline">
                            {{ orderItem.quantity }}
                          </UIBadge>
                        </UITableCell>
                        <UITableCell class="hidden md:table-cell"> {{ orderItem.price }} сум</UITableCell>
                        <UITableCell class="hidden md:table-cell">
                          <UIBadge
                              :class="{'bg-red-700': orderItem.status === 'Отклонён', 'bg-green-700':  orderItem.status === 'Подтвержден'}"
                              variant="outline">
                            {{ orderItem.status }}
                          </UIBadge>
                        </UITableCell>
                        <UITableCell class="hidden md:table-cell">
                          {{ userStore.userNameById(order.userId) || 'Не указан' }}
                        </UITableCell>
                        <UITableCell class="hidden md:table-cell">
                          {{ userStore.userNameById(order.userId) || 'Не указан' }}
                        </UITableCell>
                        <UITableCell class="hidden md:table-cell">
                          <div
                              class="p-2 cursor-pointer flex items-center justify-center rounded border border-[#EDF0F1]"
                              @click="cancelOrder(orderItem)">
                            <Icon class="text-xl text-red-700" name="material-symbols:close-rounded"/>
                          </div>
                          <div
                              class="p-2  cursor-pointer flex items-center justify-center rounded border border-[#EDF0F1]"
                              @click="acceptOrder(orderItem)">
                            <Icon class="text-xl text-green-700" name="hugeicons:checkmark-circle-02"/>
                          </div>
                        </UITableCell>
                      </UITableRow>
                    </UITableBody>
                  </UITable>
                </UICardContent>
              </UICard>
            </UITabsContent>
          </UITabs>
        </main>
      </div>
    </div>
    <main v-else class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">Inventory</h1>
      </div>
      <div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div class="flex flex-col items-center gap-1 text-center">
          <h3 class="text-2xl font-bold tracking-tight">You have no products</h3>
          <p class="text-sm text-muted-foreground">You can start selling as soon as you add a product.</p>
          <UIButton class="mt-4" @click="addProduct"> Add Product</UIButton>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import {useUserStore} from "~/store/user.auth";

definePageMeta({
  layout: "admin",
});

const userStore = useUserStore();

const acceptOrder = async (orderItem: string) => {
  let order = orderItem;
  console.log(order)
  order.status = 'Подтвержден';
  await userStore.changeOrder(order);
};
const cancelOrder = async (orderItem: string) => {
  let order = orderItem;
  order.status = 'Отклонён';
  await userStore.changeOrder(order);
};
</script>

<style lang="scss" scoped>
</style>