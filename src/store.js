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
    tooltipColor: '',
    task: [],
    bookContent: {
      chapter: '',
      h1title: '',
      h3title: '',
      content: ''
    },
    chineseOrder: ['一', '二', '三'],
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
          '人們通常錯誤地理解這種現象，因為他們自以為，繼續開車、打網球或烘焙餅乾，就是一種形式的練習，如果不停地做下去，自己一定能夠更擅長，也許進步較為緩慢，但最終還是會更出色。',
        task: 0
      }
    ],
    target: [
      {
        description: [
          '翻到第一章 “有目的的練習” 。',
          '將字體設定成最大。',
          '將閱讀模式調成黑底白字的夜間模式。'
        ],
        step: [
          { chapterIndex: 2, sectionIndex: 0 },
          { fontSizeLevel: 52 },
          { color: 'background__change__black' }
        ]
      },
      {
        description: [
          '請翻到第2章節 “大腦的適應能力” 。找到文中："你可以採用錄影...感受一下你的進步"把這段劃為重點。',
          '在內文，將螢光筆改為綠色。',
          '請到筆記庫，將螢光筆改為粉紅色。',
          '將此段話於筆記庫內刪除。'
        ],
        step: [
          {
            chapterIndex: 3,
            sectionIndex: 0,
            textStart: 110,
            textEnd: 145,
            css: 'yellow-pen'
          },
          { task: 2, css: 'green-pen' },
          { task: 2, css: 'red-pen' },
          { task: 2 }
        ]
      },
      {
        description: [
          '請找到第2章節"走出舒適區的重要性"中的一段話："對於這種現象，技術上...行動的趨勢"。',
          '將此段話附上註解，註解內容為：體內平衡。',
          '用evernote分享此段落。',
          '請刪除“體內平衡”的註解。'
        ]
      }
    ],
    directions: {
      /*
        row 直，column 橫
      */
      words: 'column',
      functions: 'row'
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
    },
    getNotes: state => {
      return state.notes;
    },
    getDirections: state => {
      return state.directions;
    },
    getTooltipColor: state => {
      return state.tooltipColor;
    },
    getTarget: state => {
      return state.target;
    },
    getChineseOrder: state => {
      return state.chineseOrder;
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
        comment: payload.comment,
        task: payload.task
      });
    },
    setDirections(state, payload) {
      state.directions = payload;
    },
    changeNotesColor(state, payload) {
      state.notes[payload.index].color = payload.color;
    },
    changeTooltipColor(state, payload) {
      state.tooltipColor = payload;
    },
    deleteNote(state, payload) {
      state.notes.splice(payload, 1);
    }
  }
});
