<template>
  <div>
    <menu-top @showLeaveBubble="isLeaveMission=$event" v-show="isShowNavigation"></menu-top>
    <background-cover></background-cover>
    <div class="touch">
      <div class="touch__previous"></div>
      <div class="touch__navigation" @click="toggleNavigation"></div>
      <div class="touch__next"></div>
    </div>
    <setting v-show="isShowSetting" @hideSetting="isShowSetting=$event"></setting>
    <leave-mission v-show="isLeaveMission" @cancelLeaveBubble="isLeaveMission=$event"></leave-mission>
    <menu-bottom v-show="isShowNavigation" @showSettingBubble="isShowSetting=$event"></menu-bottom>
  </div>
</template>

<style lang="scss" scoped>
.touch {
  width: 100%;
  max-width: 768px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: auto;
  right: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  &__previous,
  &__next {
    background: rgba(0, 0, 0, 0.1);
    width: 25%;
    height: 100%;
  }
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
    showLeaveBubble(fff) {
      console.log(fff);
    },
    toggleNavigation() {
      this.isShowNavigation = this.isShowNavigation ? false : true;
    },
    showSetting() {
      this.isShowSetting = this.isShowNavigation ? false : true;
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

