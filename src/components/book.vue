<template>
  <div :class="backgroundColor">
    <menu-top @showLeaveBubble="isLeaveMission=$event" v-show="isShowNavigation"></menu-top>

    <cover
      v-show="isShowCover"
      @toggleNavigation="toggleNavigation"
      @loadIntroContent="loadIntroContent"
    ></cover>

    <bookContent
      v-show="isShowContent"
      :class="[fontFamilyClass, fontSizeClass]"
      @toggleNavigation="toggleNavigation"
      :sizeLevel="sizeLevel"
    ></bookContent>

    <index
      v-if="isShowIndex"
      @closeIndexStatus="isShowIndex=$event"
      @emitContentKey="findContent()"
    ></index>

    <keep-alive>
      <setting
        v-show="isShowSetting"
        @hideSetting="isShowSetting=$event"
        @changeBackground="changebackgroundColor_chickFinish($event)"
        @changeFontFamily="fontFamilyClass=$event"
        @changeFontSize="changefontSizeClass($event)"
      ></setting>
    </keep-alive>

    <leave-mission v-show="isLeaveMission" @cancelLeaveBubble="isLeaveMission=$event"></leave-mission>
    <complete-mission v-if="isShowComplete"></complete-mission>
    <menu-bottom
      v-show="isShowNavigation"
      @showSettingBubble="isShowSetting=$event"
      @openIndexStatus="isShowIndex=$event"
    ></menu-bottom>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/modules/_background.scss";
</style>

<script>
// components
import menuTop from "@/components/menu/top.vue";
import menuBottom from "@/components/menu/bottom.vue";
import leaveMission from "@/components/lightBox/leaveMission.vue";
import index from "@/components/index.vue";
import setting from "@/components/setting.vue";
import backgroundCover from "@/components/backgroundCover.vue";
import cover from "@/components/cover.vue";
import bookContent from "@/components/bookContent.vue";
import completeMission from "@/components/lightBox/completeMission.vue";

// data
import document from "@/assets/document.json";

export default {
  data() {
    return {
      isLeaveMission: false,
      isShowNavigation: false,
      isShowSetting: false,
      isShowCover: true,
      isShowContent: false,
      isShowIndex: false,
      isShowComplete: false,
      backgroundColor: "background__change__white",
      fontFamilyClass: "book__fontFamily__ming",
      fontSizeClass: "fontSize__24px",
      sizeLevel: "5",
      document,
      chapterIndex: "",
      sectionIndex: "",
      contentKey: {},
      task: this.$store.getters.getTask,
      index: 0
    };
  },
  methods: {
    toggleNavigation() {
      this.isShowNavigation = this.isShowNavigation ? false : true;
    },
    showSetting() {
      this.isShowSetting = this.isShowNavigation ? false : true;
    },
    loadIntroContent() {
      this.isShowCover = false;
      this.isShowContent = true;
      let intro = {
        chapter: this.document.books[2].chapter,
        h1title: "",
        h3title: this.document.books[2].sections[0].title,
        content: this.document.books[2].sections[0].content
      };
      this.$store.commit("setBookContent", intro);
    },
    changefontFamilyClass(famliyClass) {
      this.fontFamilyClass = famliyClass;
    },
    changefontSizeClass(font) {
      this.fontSizeClass = font.fontSizeClass;
      this.sizeLevel = font.sizeLevel;
      console.log("sizeLevel: ", this.sizeLevel);
    },
    changebackgroundColor_chickFinish(color) {
      this.backgroundColor = color;
      if (color === "background__change__black") {
        if (this.task.length > 0) {
          if (this.task[this.index].time.length === 3) {
            this.$store.commit("setTask", this.index);
            setTimeout(() => {
              this.isShowComplete = true;
            }, 3000);
          }
        }
      }
    },
    findContent() {
      // this.contentKey = arr;
      this.isShowCover = false;
      this.isShowContent = true;
      this.isShowIndex = false;
      // console.log("findContent");
    }
  },
  components: {
    leaveMission,
    menuTop,
    // backgroundCover,
    bookContent,
    menuBottom,
    setting,
    index,
    cover,
    completeMission
  }
};
</script>

