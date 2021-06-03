<template>
  <div id="app">
    <header class="header">
      <img src="./assets/logo.png" alt="Эко безопасность">
      <div class="user" v-if="isLogin">
        <span class="user__info">Ваш логин: {{userId}}</span>
        <span class="user__info">{{userName}}</span>
        <button class="btn btn_exit" @click="logout">Выйти</button>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'isLogin',
      'userId',
      'userName',
    ]),
  },
  mounted() {
    this.$store.dispatch('getImei');
  },
  methods: {
    logout() {
      const logout = this.$store.dispatch('logout');
      if (logout) {
        this.$router.push({ path: '/' });
      }
    },
  },
};
</script>

<style lang="scss">
*{
  box-sizing: border-box;
}
li {
  list-style-type: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 30px;
}
.user{
  &__info{
    margin-right: 20px;
  }
}
.btn{
  padding: 20px 40px;
  color: #fff;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  &_submit{
    background-color: #3eaf7c;
  }
  &_exit{
    background-color: #3eaf7c;
  }
  &_download{
    background-color: #3eaf7c;
  }
}
</style>
