import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/database',
    name: 'Database',
    component: () => import('../views/Database.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/database' && !store.state.login) {
    next({ path: '/' });
  } else {
    next();
  }
});

export default router;
