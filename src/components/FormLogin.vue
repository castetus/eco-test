<template>
  <div class="form-login">
    <form class="form">
      <h2>Вход в личный кабинет</h2>
      <h4>Используйте логин и пароль из памятки</h4>
      <input
        v-model="username"
        class="form__input"
        type="text" name="username"
        id="username"
        placeholder="Имя пользователя"
        required>
      <input
        v-model="password"
        class="form__input"
        type="password"
        name="password"
        id="password"
        placeholder="Пароль"
        required>
      <button
        class="btn btn_submit"
        type="submit"
        @click.prevent="login">
        Войти
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  props: {

  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      const payload = {
        username: this.username,
        password: this.password,
      };
      const login = await this.$store.dispatch('sendLoginData', payload);
      if (login) {
        this.$router.push({ path: '/database' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .form{
    display: flex;
    flex-direction: column;
    width: 33%;
    min-width: 320px;
    &__input{
      margin-bottom: 20px;
      height: 34px;
      padding: 6px 12px;
      font-size: 14px;
      border: 1px solid #d9d9d9;
      border-radius: 2px;
    }
  }
</style>
