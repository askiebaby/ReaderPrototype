import Vue from 'vue';
import App from './App.vue';
import cookies from 'vue-cookies';
import router from './router';
import { store } from './store';
import moment from 'vue-moment';
import disableRightClick from './disableRightClick';
import inobounce from './inobounce';

Vue.config.productionTip = false;
cookies.config('90d');
Vue.use(cookies);
Vue.use(moment);

new Vue({
  disableRightClick,
  router,
  store,
  inobounce,
  render: h => h(App)
}).$mount('#app');
