import Vue from 'vue';
import Router from 'vue-router';
import home from './components/home.vue';
import login from './components/login.vue';
import tasks from './components/tasks.vue';
import taskDescription from './components/taskDescription.vue';
import finishTask from './components/finishTask.vue';
import book from './components/book.vue';
import bookIndex from './components/index.vue';
import setting from './components/setting.vue';
import taskRecord from './components/taskRecord.vue';
import bookCover from './components/bookCover.vue';
import tooltip from './components/tooltip.vue';

Vue.use(Router);

export default new Router({
  // mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/login/:id',
      name: 'login',
      component: login
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: tasks
    },
    {
      path: '/taskDescription',
      name: 'taskDescription',
      component: taskDescription
    },
    {
      path: '/finishTask/:id',
      name: 'finishTask',
      component: finishTask
    },
    {
      path: '/bookCover',
      name: 'bookCover',
      component: bookCover
    },
    {
      path: '/book',
      name: 'book',
      component: book
    },
    {
      path: '/index',
      name: 'index',
      component: bookIndex
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    },
    {
      path: '/taskRecord',
      name: 'taskRecord',
      component: taskRecord
    },
    {
      path: '/tooltip',
      name: 'tooltip',
      component: tooltip
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
