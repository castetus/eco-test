import Vue from 'vue';
import Vuex from 'vuex';
import Api from '@/Api';

const api = new Api();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nameApp: 'connect',
    IMEI: '',
    login: false,
    userData: null,
    docsList: [],
  },
  mutations: {
    SET_IMEI(state, imei) {
      state.IMEI = imei;
    },
    SET_USER_DATA(state, data) {
      state.login = true;
      state.userData = data;
    },
    LOGOUT(state) {
      state.login = false;
      state.userData = null;
      state.docsList = [];
    },
    SET_DOCS_LIST(state, data) {
      state.docsList = data.body;
    },
  },
  actions: {
    async getImei({ commit }) {
      try {
        const imei = await api.getImei();
        return commit('SET_IMEI', imei);
      } catch (error) {
        throw new Error(error);
      }
    },
    async sendLoginData({ state, commit, dispatch }, loginData) {
      const loginJson = JSON.stringify({
        login: loginData.username,
        password: loginData.password,
        IMEI: state.IMEI,
        Name_app: state.nameApp,
      });
      const userData = await api.sendLoginData(loginJson);
      if (userData && userData.id_login !== 0) {
        commit('SET_USER_DATA', userData);
        dispatch('requestDocsList');
        return true;
      }
      return false;
    },
    async requestDocsList({ state, commit }) {
      const docsJson = JSON.stringify({
        id_login: state.userData.id_login,
        id_people: state.userData.id_login,
        TK: state.userData.TK,
        IMEI: state.IMEI,
        Name_app: state.nameApp,
        Name_event: 'list_load',
      });
      const docsList = await api.requestDocsList(docsJson);
      if (docsList) {
        commit('SET_DOCS_LIST', docsList);
      }
    },
    logout({ commit }) {
      commit('LOGOUT');
    },
  },
  getters: {
    isLogin(state) {
      return state.login;
    },
    userId(state) {
      if (!state.login) {
        return false;
      }
      return state.userData.id_login;
    },
    userName(state) {
      if (!state.login) {
        return false;
      }
      return state.userData.fio;
    },
    docsList(state) {
      return state.docsList;
    },
  },
});
