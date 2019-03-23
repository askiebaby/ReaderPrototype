<template>
  <div>
    <background-cover></background-cover>
    <div class="touch">
      <div class="touch__previous"></div>
      <div class="touch__navigation" @click="toggleNavigation"></div>
      <div class="touch__next" @click="loadIntroContent"></div>
    </div>
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
</style>

<script>
import menuTop from "@/components/menu/top.vue";
import menuBottom from "@/components/menu/bottom.vue";
import leaveMission from "@/components/lightBox/leaveMission.vue";
import setting from "@/components/setting.vue";
import backgroundCover from "@/components/backgroundCover.vue";
export default {

  methods: {
    toggleNavigation() {
      this.$emit("toggleNavigation")
    },
    addTask1() { // 設置測試者的姓名與id
      this.$store.commit("memberInfo", info);
    },
    loadIntroContent () {
      this.$emit("loadIntroContent")
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

