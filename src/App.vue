<template>
  <div id="app">
    <div id="nav">
      <img src="./assets/logo.png" alt="Эко безопасность">
      <div class="user" v-if="isLogin">
        <span class="user__id">Ваш логин: {{userId}}</span>
        <span class="user__name">{{userName}}</span>
        <button class="btn btn_exit" @click="logout">Выйти</button>
      </div>
    </div>
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

#nav {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 30px;
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
    background-image: require('@/assets/download.svg');
  }
}
</style>
