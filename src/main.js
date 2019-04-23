import Vue from "vue";
import App from "./App.vue";
import cookies from "vue-cookies";
import router from "./router";
import { store } from "./store";
import moment from "vue-moment";
import longpress from "./longPress";

Vue.config.productionTip = false;
cookies.config("90d");
Vue.use(moment);
Vue.use(longpress, { duration: 1000 });

new Vue({
  longpress,
  cookies,
  moment,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
