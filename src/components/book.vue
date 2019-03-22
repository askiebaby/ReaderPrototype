<template>
  <div :class="backgroundColor">
    <menu-top @showLeaveBubble="isLeaveMission=$event" v-show="isShowNavigation"></menu-top>

    <background-cover v-if="isShowCover"></background-cover>

    <bookContent
      v-if="isShowContent"
      :class="[fontFamilyClass, fontSizeClass]"
      :loadContent="contentKey"
    ></bookContent>

    <div class="touch">
      <div class="touch__previous"></div>
      <div class="touch__navigation" @click="toggleNavigation"></div>
      <div class="touch__next" @click="loadBookContent"></div>
    </div>
    <index
      v-if="isShowIndex"
      @closeIndexStatus="isShowIndex=$event"
      @emitContentKey="findContent()"
    ></index>
    <setting
      v-show="isShowSetting"
      @hideSetting="isShowSetting=$event"
      @changeBackground="backgroundColor=$event"
      @changeFontFamily="changefontFamilyClass($event)"
      @changeFontSize="changefontSizeClass($event)"
    ></setting>

    <leave-mission v-show="isLeaveMission" @cancelLeaveBubble="isLeaveMission=$event"></leave-mission>

    <menu-bottom
      v-show="isShowNavigation"
      @showSettingBubble="isShowSetting=$event"
      @openIndexStatus="isShowIndex=$event"
    ></menu-bottom>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/modules/_background.scss";

.touch {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: auto;
  right: auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  &__previous,
  &__next,
  &__navigation {
    width: 33.33333%;
    height: 100%;
  }
}
</style>

<script>
import menuTop from "@/components/menu/top.vue";
import menuBottom from "@/components/menu/bottom.vue";
import leaveMission from "@/components/lightBox/leaveMission.vue";
import index from "@/components/index.vue";
import setting from "@/components/setting.vue";
import backgroundCover from "@/components/backgroundCover.vue";
import bookContent from "@/components/bookContent.vue";

export default {
  data() {
    return {
      isLeaveMission: false,
      isShowNavigation: false,
      isShowSetting: false,
      isShowCover: true,
      isShowContent: false,
      isShowIndex: false,
      backgroundColor: "background__change__white",
      fontFamilyClass: "book__fontFamily__ming",
      fontSizeClass: "fontSize__24px",
      contentKey: {}
    };
  },
  methods: {
    toggleNavigation() {
      this.isShowNavigation = this.isShowNavigation ? false : true;
    },
    showSetting() {
      this.isShowSetting = this.isShowNavigation ? false : true;
    },
    loadBookContent() {
      this.isShowCover = false;
      this.isShowContent = true;
    },
    changefontFamilyClass(famliyClass) {
      this.fontFamilyClass = famliyClass;
    },
    changefontSizeClass(fontClass) {
      this.fontSizeClass = fontClass;
    },
    findContent() {
      // this.contentKey = arr;
      this.isShowCover = false;
      this.isShowContent = true;
      console.log("findContent");
    }
  },
  components: {
    leaveMission,
    menuTop,
    backgroundCover,
    bookContent,
    menuBottom,
    setting,
    index
  }
};
</script>

