import Vue from "vue";
import Vuex from "vuex";
import moment from "vue-moment";
import VueCookies from "vue-cookies";
Vue.use(Vuex);
Vue.use(moment);
export const store = new Vuex.Store({
  state: {
    totalCounts: 0,
    id: "",
    name: "",
    task: [],
    bookContent: {
      chapter: "",
      h1title: "",
      h3title: "",
      content: ""
    },
    bookLocation: {
      bookIndex: 0,
      bookChapters: 0,
      sectionIndex: 0,
      sections: 0,
      page: 1
    }
  },
  getters: {
    getID: state => {
      return state.id;
    },
    getName: state => {
      return state.name;
    },
    getTask: state => {
      return state.task;
    },
    getNowCounts: state => {
      return state.totalCounts;
    },
    getBookContent: state => {
      return state.bookContent;
    },
    getBookLocation: state => {
      return state.bookLocation;
    }

  },
  mutations: {
    addTotalCounts(state) {
      state.totalCounts++;
    },
    setBookContent(state, payload) {
      state.bookContent.chapter = payload.chapter;
      state.bookContent.h1title = payload.h1title;
      state.bookContent.h3title = payload.h3title;
      state.bookContent.content = payload.content;
    },
    setBookLocation(state, payload) {
      state.bookLocation.bookIndex = payload.bookIndex;
      state.bookLocation.bookChapters = payload.bookChapters;
      state.bookLocation.sectionIndex = payload.sectionIndex;
      state.bookLocation.sections = payload.sections;
      state.bookLocation.page = payload.page;
    },
    memberInfo(state, payload) {
      state.id = payload.id;
      state.name = payload.name;
      // task: [{
      //   childTask: [false, false, false]
      // }]
      // task: [{
      //   time: [],
      //   counters: []
      // }]

      // Cookies.set(payload.id, state.member);
    },
    taskDefault(state, payload) {
      state.task[payload] = {
        time: [],
        counts: []
      };
    },
    setTask(state, index) {
      let counts = state.totalCounts;
      let time = Vue.moment();
      state.task[index].time.push(time);
      state.task[index].counts.push(counts);
    },
    FinsihToCookie(state) {
      let Obj = {
        name: state.name,
        task: state.task
      };
      VueCookies.set(state.id, Obj);
    }
  }
});