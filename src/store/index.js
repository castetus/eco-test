import Vue from 'vue';
import Vuex from 'vuex';
import Api from '@/Api';

const api = new Api();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nameApp: 'connect',
    IMEI: '',
    isLoginError: false,
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
      const json = JSON.stringify({
        login: loginData.username,
        password: loginData.password,
        IMEI: state.IMEI,
        Name_app: state.nameApp,
      });
      const userData = await api.sendRequest('api/client_login', json);
      if (userData) {
        if (userData[0].id_login !== 0) {
          commit('SET_USER_DATA', userData[0]);
          dispatch('requestDocsList');
          return userData[0].id_login;
        }
        return false;
      }
      return false;
    },
    async requestDocsList({ state, commit }) {
      const json = JSON.stringify({
        id_login: state.userData.id_login,
        id_people: state.userData.id_login,
        TK: state.userData.TK,
        IMEI: state.IMEI,
        Name_app: state.nameApp,
        Name_event: 'list_load',
      });
      const docsList = await api.sendRequest('api/test', json);
      if (docsList) {
        commit('SET_DOCS_LIST', docsList);
      }
    },
    logout({ commit }) {
      commit('LOGOUT');
    },
    async getDocument({ state }, data) {
      const json = JSON.stringify({
        id_login: state.userData.id_login,
        id_people: state.userData.id_login,
        TK: state.userData.TK,
        IMEI: state.IMEI,
        Name_app: state.nameApp,
        Name_event: 'get_pic_path',
        id_document: data.id,
        doc_type: data.type,
      });
      const docUrl = await api.sendRequest('api/test', json);
      if (docUrl) {
        return docUrl.body[0];
      }
      return false;
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
    doc: (state) => (id) => state.docsList.find((document) => document.id_document === id),
  },
});
