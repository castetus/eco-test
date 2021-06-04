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
          @click="downloadDocument(document.id_document, document.doc_type)">
          Скачать
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import Api from '@/Api';

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
        const data = await new Api().getFile(file.hash);
        if (data === 404) {
          this.message('Файл отсутствует');
          return;
        }
        const doc = this.$store.getters.doc(id);
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${doc.doc_name}.${doc.file_ext}`);
        document.body.append(link);
        link.click();
        link.remove();
      } else {
        this.message('Файл не найден');
      }
    },
    message(text) {
      alert(text);
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
