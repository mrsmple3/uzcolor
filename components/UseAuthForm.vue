<template>
  <div :class="cn('grid gap-6', $attrs.class ?? '')">
    <form @submit="onSubmit">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <UILabel class="sr-only" for="login">
            Логин
          </UILabel>
          <UIInput
              id="login"
              v-model="formData.login"
              :disabled="isLoading"
              auto-capitalize="none"
              auto-complete="login"
              auto-correct="off"
              placeholder="Логин"
              type="login"
          />
          <UILabel class="sr-only" for="password">
            Пароль
          </UILabel>
          <UIInput
              id="password"
              v-model="formData.password"
              :disabled="isLoading"
              auto-capitalize="none"
              auto-complete="email"
              auto-correct="off"
              placeholder="Пароль"
              type="password"
          />
        </div>
        <UIButton :disabled="isLoading">
          <UIcon v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" name="ant-design:loading-3-quarters-outlined"/>
          Войти
        </UIButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {cn} from '@/lib/utils'
import {useUserStore} from "~/store/user.auth";

const isLoading = ref(false)

const formData = ref({
  login: '',
  password: '',
});

const router = useRouter();

const userStore = useUserStore();

const toast = useToast();

async function onSubmit(event: Event) {
  event.preventDefault()
  isLoading.value = true;

  if (!formData.value.login || !formData.value.password) {
    isLoading.value = false;
    toast.add({title: "Заполните все поля", type: "error"});
    return;
  }

  try {
    await userStore.login(formData.value.login, formData.value.password, "ADMIN")
        .then(() => {
          isLoading.value = false;
          router.push("/admin/products");
          toast.add({title: "Вы успешно вошли ", type: "success"});
        });
  } catch (error) {
    isLoading.value = false;
    toast.add({title: "Что то пошло не так " + error.message, type: "error"});
  }
}
</script>