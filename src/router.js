import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import login from "./components/login.vue";
import tasks from "./components/tasks.vue";
import taskDescription from "./components/taskDescription.vue";


Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login/:id/:gender",
      name: "login",
      component: login
    },
    {
      path: "/tasks",
      name: "tasks",
      component: tasks
    },
    {
      path: "/taskDescription",
      name: "taskDescription",
      component: taskDescription
    }
    // {
    // path: "/about",
    // name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});