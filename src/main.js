import Vue from "vue";
import App from "./App.vue";
import cookies from "vue-cookies";
import router from "./router";
import { store } from "./store";
import moment from "vue-moment";
// import inobounce from "./inobounce";

Vue.config.productionTip = false;
cookies.config("90d");
Vue.use(moment);
// Vue.use(inobounce);

new Vue({
  cookies,
  moment,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
