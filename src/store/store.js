import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    member: {
      num: "",
      gender: "",
      name: "",
      DoneAll: false,
      time: {
        begin: "",
        first: "",
        second: "",
        third: "",
      },
      counters: {
        first: "",
        second: "",
        third: "",
      }
    }
  },
  getters: {
    isDone: state => {
      return state.member.DoneAll;
    },
    getGender: state => {
      return state.member.gender;
    }
  },
  mutations: {
    memberInfo(state, payload) {
      state.member.num = payload.num;
      state.member.gender = payload.gender;
      state.member.name = payload.name;
    }
  }
})