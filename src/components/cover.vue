<template>
  <div>
    <menu-top @showLeaveBubble="isLeaveMission=$event" v-show="isShowNavigation"></menu-top>
    <background-cover></background-cover>
    <div class="touch">
      <!-- <button @click="test">555</button> -->
      <div class="touch__previous"></div>
      <div class="touch__navigation" @click="toggleNavigation"></div>
      <div class="touch__next"></div>
      <!-- <button @click="test111">599</button> -->
    </div>
    <setting v-show="isShowSetting" @hideSetting="isShowSetting=$event"></setting>
    <leave-mission v-show="isLeaveMission" @cancelLeaveBubble="isLeaveMission=$event"></leave-mission>
    <menu-bottom v-show="isShowNavigation" @showSettingBubble="isShowSetting=$event"></menu-bottom>
  </div>
</template>

<style lang="scss" scoped>
.cover {
  height: 100vh;
  overflow: hidden;
  text-align: center;
  &__img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: calc(100% - 80px);
  }
}

.touch {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  &__previous,
  &__next {
    background: rgba(0, 0, 0, 0.1);
    width: 25%;
    height: 100%;
  }
  // &__previous {}
  // &__next {}
  &__navigation {
    background: rgba(0, 0, 0, 0.2);
    width: 50%;
    height: 100%;
  }
}
</style>
    

<script>
import menuTop from "@/components/menu/top.vue";
import menuBottom from "@/components/menu/bottom.vue";
import leaveMission from "@/components/lightBox/leaveMission.vue";
import setting from "@/components/setting.vue";
import backgroundCover from "@/components/backgroundCover.vue";
export default {
  data() {
    return {
      isLeaveMission: false,
      isShowNavigation: false,
      isShowSetting: false
    };
  },
  methods: {
    // showLeaveBubble(fff) {
    //   console.log(fff);
    // },
    // test() {
    //   let index = 0;
    //   this.$store.commit("setTask", index);
    //   console.log(this.$store.getters.getTask);
    // },
    // test111() {
    //   // $cookies.set('1','555')
    //   // console.log($cookies.get('1'));
    //   // return;
    //   this.$store.commit("FinsihToCookie");
    //   console.log(this.$store.getters.getID);
    //   let user = $cookies.get(this.$store.getters.getID);
    //   console.log(user);
    // },
    toggleNavigation() {
      this.isShowNavigation = this.isShowNavigation ? false : true;
    },
    showSetting() {
      this.isShowSetting = this.isShowNavigation ? false : true;
    },
    addTask1() {
      this.$store.commit("memberInfo", info);
    }
  },
  components: {
    leaveMission,
    menuTop,
    backgroundCover,
    menuBottom,
    setting
  }
};
</script>

