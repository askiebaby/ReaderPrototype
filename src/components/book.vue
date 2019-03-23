<template>
  <div :class="backgroundColor">
    <menu-top 
      @showLeaveBubble="isLeaveMission=$event" v-show="isShowNavigation"
    ></menu-top>

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
        v-if="isShowSetting"
        @hideSetting="isShowSetting=$event"
        @changeBackground="backgroundColor=$event"
        @changeFontFamily="changefontFamilyClass($event)"
        @changeFontSize="changefontSizeClass($event)"
      ></setting>
    </keep-alive>

    <leave-mission v-if="isLeaveMission" @cancelLeaveBubble="isLeaveMission=$event"></leave-mission>

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
      backgroundColor: "background__change__white",
      fontFamilyClass: "book__fontFamily__ming",
      fontSizeClass: "fontSize__24px",
      sizeLevel: '5',
      document,
      chapterIndex: '',
      sectionIndex: ''
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
      }
      this.$store.commit("setBookContent", intro);
    },
    changefontFamilyClass(famliyClass) {
      this.fontFamilyClass = famliyClass;
    },
    changefontSizeClass(font) {
      this.fontSizeClass = font.fontSizeClass;
      this.sizeLevel = font.sizeLevel;
      console.log('sizeLevel: ', this.sizeLevel)
    },
    findContent() {
      // this.contentKey = arr;
      this.isShowCover = false;
      this.isShowContent = true;
      this.isShowIndex = false;
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
    index,
    cover
  }
};
</script>

