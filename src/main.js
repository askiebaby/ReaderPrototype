import Vue from "vue";
import App from "./App.vue";
import cookies from "vue-cookies";
import router from "./router";
import { store } from "./store/store";
import moment from "vue-moment";

Vue.config.productionTip = false;

Vue.use(moment);
new Vue({
  cookies,
  moment,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
