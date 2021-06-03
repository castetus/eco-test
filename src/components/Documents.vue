<template>
  <div class="documents">
    <ul class="documents__list">
      <li class="documents__item"
        v-for="(document, index) in documents"
        :key="index">
        <img src="" alt="" class="documents__icon">
        <p class="documents__text">
          {{document.doc_name}} от {{document.date_doc}}
        </p>
        <button
          class="btn btn_download documents__download">
          Скачать
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Documents',
  computed: {
    downloadIcon() {
      return require('@/assets/download.svg');
    },
    documents() {
      console.log(this.$store);
      return this.$store.getters.docsList;
    },
  },
};
</script>

<style lang="scss">
  .documents{
    height: 600px;
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
  }
</style>
