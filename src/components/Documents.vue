<template>
  <div class="documents">
    <ul class="documents__list">
      <li class="documents__item"
        v-for="(document, index) in documents"
        :key="index">
        <img
          src="../assets/pdf.svg"
          alt="Скачать документ"
          class="documents__icon">
        <p class="documents__text">
          {{document.doc_name}} от {{document.date_doc}}
        </p>
        <button
          class="btn btn_download documents__download"
          @click="downloadDocument(document.id_document, document.doc_name, document.doc_type)">
          Скачать
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { BASE_URL } from '@/Api';

export default {
  name: 'Documents',
  computed: {
    documents() {
      return this.$store.getters.docsList;
    },
  },
  methods: {
    async downloadDocument(id, type) {
      const file = await this.$store.dispatch('getDocument', { id, type });
      if (file) {
        this.getFile(file);
      } else {
        this.message();
      }
    },
    getFile(file) {
      const link = document.createElement('a');
      // link.setAttribute('download', `file${file.extension}`);
      link.setAttribute('download', true);
      link.setAttribute('href', BASE_URL + file.hash);
      console.log(link);
      link.click();
      link.remove();
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
    &__item{
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 20px;
      border-bottom: 1px solid grey;
      &:last-child{
        border-bottom: none;
      }
    }
    &__icon{
      width: 50px;
    }
  }
</style>
