import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'vue-moment';
import VueCookies from 'vue-cookies';
Vue.use(Vuex);
Vue.use(moment);
export const store = new Vuex.Store({
  state: {
    totalCounts: 0,
    id: '',
    name: '',
    showNotes: false,
    task: [],
    bookContent: {
      chapter: '',
      h1title: '',
      h3title: '',
      content: ''
    },
    bookLocation: {
      chapterIndex: 0,
      chapters: 0,
      sectionIndex: 0,
      sections: 0,
      pageIndex: 0,
      pages: 1,
      newContentHeight: ''
    },
    notes: [
      {
        chapterIndex: 2,
        sectionIndex: 3,
        textStart: 1655,
        textEnd: 1779,
        color: 'purple-pen',
        comment:
          '人們通常錯誤地理解這種現象，因為他們自以為，繼續開車、打網球或烘焙餅乾，就是一種形式的練習，如果不停地做下去，自己一定能夠更擅長，也許進步較為緩慢，但最終還是會更出色。'
      }
    ]
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
    },
    getNotes: state => {
      return state.notes;
    },
    getIsShowNotes: state => {
      return state.showNotes;
    }
  },
  mutations: {
    addTotalCounts(state) {
      state.totalCounts++;
    },
    switchShowNotes(state) {
      state.showNotes = !state.showNotes;
    },

    setBookContent(state, payload) {
      state.bookContent.chapter = payload.chapter;
      state.bookContent.h1title = payload.h1title;
      state.bookContent.h3title = payload.h3title;
      state.bookContent.content = payload.content;
    },
    setBookLocation(state, payload) {
      state.bookLocation.chapterIndex = payload.chapterIndex;
      state.bookLocation.chapters = payload.chapters;
      state.bookLocation.sectionIndex = payload.sectionIndex;
      state.bookLocation.sections = payload.sections;
      state.bookLocation.pageIndex = payload.pageIndex;
    },
    memberInfo(state, payload) {
      state.id = payload.id;
      state.name = payload.name;
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
    },
    addNotes(state, payload) {
      state.notes.unshift({
        chapterIndex: payload.chapterIndex,
        sectionIndex: payload.sectionIndex,
        textStart: payload.textStart,
        textEnd: payload.textEnd,
        color: payload.color,
        comment: payload.comment
      });
    },
    changeNotesColor(state, payload) {
      state.notes[payload.index].color = payload.color;
    }
  }
});
