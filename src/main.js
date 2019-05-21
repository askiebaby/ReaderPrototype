import Vue from 'vue';
import App from './App.vue';
import cookies from 'vue-cookies';
import router from './router';
import { store } from './store';
import moment from 'vue-moment';
import Vue2TouchEvents from 'vue2-touch-events';
import disableRightClick from './disableRightClick';
// import inobounce from './inobounce';

Vue.config.productionTip = false;
cookies.config('90d');
Vue.use(moment);
Vue.use(Vue2TouchEvents, {
  longTapTimeInterval: 500
});

new Vue({
  disableRightClick,
  cookies,
  moment,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
