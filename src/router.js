import Vue from "vue";
import Router from "vue-router";
import Home from "./components/home.vue";
import login from "./components/login.vue";
import tasks from "./components/tasks.vue";
import taskDescription from "./components/taskDescription.vue";
import finishTask from "./components/finishTask.vue";
import cover from "./components/cover.vue";
import bookIndex from "./components/index.vue";
import setting from "./components/setting.vue";


Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [{
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
    },
    {
      path: "/finishTask",
      name: "finishTask",
      component: finishTask
    },
    {
      path: "/cover",
      name: "cover",
      component: cover
    },
    {
      path: "/index",
      name: "index",
      component: bookIndex
    },
    {
      path: "/setting",
      name: "setting",
      component: setting
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