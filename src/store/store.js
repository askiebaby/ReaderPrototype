import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    member: {}
  },
  getters: {
    getMember: state => {
      return state.member;
    }
  },
  mutations: {
    memberInfo(state, payload) {
      state.member[payload.id] = {
        name: payload.name,
        DoneAll: false,
        firstDone: false,
        secondDone: false,
        thirdDone: false
        // firstMassion:{
        //   time: {
        //     begin: "",
        //     first: "",
        //     second: "",
        //     third: ""
        //   },
        //   counters: {
        //     first: "",
        //     second: "",
        //     third: ""
        //   }
        // }

      };
    }
  }
});