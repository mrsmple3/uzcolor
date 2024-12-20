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
    <div class="info-page">
      <BlockTitle :sub="'Заполнение брифа'" :title="'Бриф на размещение заказа'"/>
      <div class="info-page__container">
        <h3 class="title">Для размещения заказа, пожалуйста, выполните следующие шаги:</h3>
        <ul class="sub list mb-16">
          <li class="num">Скачайте бриф</li>
          <p>
            Для начала, скачайте бриф, который содержит все необходимые вопросы для
            правильного оформления
            заказа. Этот документ поможет нам лучше понять ваши требования и ожидания.
          </p>
          <li class="num">Заполните бриф</li>
          <p>
            Внимательно заполните все поля брифа, предоставив полную информацию о вашем
            заказе. Это важно
            для точного выполнения вашего заказа в срок.
          </p>
          <li class="num">Отправьте бриф нам</li>
          <p>
            После заполнения, отправьте бриф на наш электронный адрес:
            <a href="mailto: zakaz@uzcolor.ru">zakaz@uzcolor.ru</a>. Убедитесь, что
            вся информация указана корректно, чтобы мы могли оперативно приступить к обработке вашего заказа.
          </p>
        </ul>
        <div class="brief__files">
          <a class="word" href="/test.docx">
            <img alt="word" class="word__img" src="/imgs/word.png"/>
            <div class="flex flex-col items-start mr-24 max-[1050px]:mr-3">
              <p class="word__title">Бриф по контрактному пошиву</p>
              <span class="word__span">Word</span>
            </div>
            <img alt="download" class="word__download" src="/imgs/download.svg"/>
          </a>
          <label class="word" for="file-upload">
            <img alt="word" class="word__img" src="/imgs/mail.png"/>
            <div class="flex flex-col items-start mr-24 max-[1050px]:mr-3">
              <p class="word__title">Отправить заполненный бриф</p>
              <span class="word__span">zakaz@uzcolor.ru</span>
            </div>
            <img alt="download" class="word__download" src="/imgs/upload.svg"/>
          </label>
          <input id="file-upload" style="display: none;" type="file" @change="handleFileUpload"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    console.log('Загруженный файл:', file.name);
  }
};

const links = ref([
  {
    label: "Главная",
    to: "/",
  },
  {
    label: "Бриф на размещение заказа",
  },
]);
</script>

<style lang="scss" scoped>
.brief__files {
  width: 100%;
  @include flex-center();
  justify-content: flex-start;
  gap: size(20px);
  @media screen and (max-width: 1050px) {
    @include flex-col-start();
    gap: 20px;
  }
}

.word {
  @include flex-center();
  padding: size(13px) size(20px);
  background: #F4F4F4;
  border-radius: 5px;
  cursor: pointer;
  @media screen and (max-width: 1050px) {
    width: 100%;
    padding: 13px 20px;
  }

  .word__img {
    min-width: max-content;
    min-height: max-content;
    width: size(44px);
    height: size(41px);
    margin-right: size(21px);
    @media screen and (max-width: 1050px) {
      width: 44px;
      height: 41px;
      margin-right: 21px;
    }
  }

  .word__title {
    color: #242848;
    font-size: size(17px);
    font-weight: 400;
    line-height: 200%;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      font-size: 14px;
    }
  }

  .word__span {
    color: rgba(0, 0, 0, 0.30);
    font-size: size(13px);
    font-weight: 400;
    line-height: 180%;
    word-wrap: break-word;
    @media screen and (max-width: 1050px) {
      font-size: 13px;
    }
  }

  .word__download {
    width: size(25px);
    height: size(25px);
    @media screen and (max-width: 1050px) {
      width: 25px;
      height: 25px;
    }
  }
}

</style>