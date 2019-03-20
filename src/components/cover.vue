<template>
  <div>
    <menu-top @showLeaveBubble="isLeaveMission=$event" v-show="isShowNavigation"></menu-top>
    <div class="cover">
      <img :src="require('@/assets/cover.png')" class="cover__img">
    </div>
    <div class="touch">
      <div class="touch__previous"></div>
      <div class="touch__navigation" @click="toggleNavigation"></div>
      <div class="touch__next"></div>
    </div>
    <setting
    v-show="isShowSetting"
    @hideSetting="isShowSetting=$event"></setting>
    <leave-mission v-show="isLeaveMission"></leave-mission>
    <menu-bottom
    v-show="isShowNavigation"
    @showSettingBubble="isShowSetting=$event"></menu-bottom>
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

  &__previous, &__next {
    background: rgba(0,0,0,.1);
    width: 25%;
    height: 100%;
  }
  // &__previous {}
  // &__next {}
  &__navigation {
    background: rgba(0,0,0,.2);
    width: 50%;
    height: 100%;
  }
}

</style>

<script>
import top from "@/components/menu/top.vue";
import bottom from "@/components/menu/bottom.vue";
import leaveMission from "@/components/lightBox/leaveMission.vue";
import setting from "@/components/setting.vue";

export default {
  data () {
    return {
      isLeaveMission: false,
      isShowNavigation: false,
      isShowSetting: false
    }
  },
  methods:{
    showLeaveBubble (fff) {
      console.log(fff)
    },
    toggleNavigation () {
      this.isShowNavigation = (this.isShowNavigation) ? false : true;
    },
    showSetting () {
      this.isShowSetting = (this.isShowNavigation) ? false : true;
    }
  },
  components: {
    leaveMission: leaveMission,
    menuTop: top,
    menuBottom: bottom,
    setting: setting
  }
};
</script>

