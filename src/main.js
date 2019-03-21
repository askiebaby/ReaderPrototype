import Vue from "vue";
import App from "./App.vue";
import VueCookies from "vue-cookies";
import router from "./router";
import { store } from "./store/store";
import moment from "vue-moment";

Vue.config.productionTip = false;

Vue.use(moment);
new Vue({
  VueCookies,
  moment,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
