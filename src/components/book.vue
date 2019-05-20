<template>
  <div :class="[backgroundColor, wordsDirectionClass, functionsDirectionClass]">
    <menu-top
      v-show="isShowNavigation"
      @showLeaveBubble="isLeaveMission = $event"
    ></menu-top>
    <note v-if="isShowNotes" @switchShowNotes="isShowNotes = $event"></note>
    <bookContent
      :class="[fontFamilyClass, fontSizeClass]"
      :size-level="sizeLevel"
      @toggleNavigation="toggleNavigation"
      @toBookCover="toBookCover"
    ></bookContent>

    <index
      v-if="isShowIndex"
      @closeIndexStatus="isShowIndex = $event"
      @emitContent="findContent"
    ></index>

    <keep-alive>
      <setting
        v-show="isShowSetting"
        @hideSetting="isShowSetting = $event"
        @changeBackground="changebackgroundColor($event)"
        @changeFontFamily="fontFamilyClass = $event"
        @changeFontSize="changefontSizeClass($event)"
      ></setting>
    </keep-alive>

    <leave-mission
      v-show="isLeaveMission"
      @cancelLeaveBubble="isLeaveMission = $event"
    ></leave-mission>
    <complete-mission v-if="isShowComplete" :task-index="0"></complete-mission>
    <menu-bottom
      v-show="isShowNavigation"
      @showSettingBubble="isShowSetting = $event"
      @openIndexStatus="isShowIndex = $event"
      @switchShowNotes="isShowNotes = $event"
    ></menu-bottom>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/modules/_background.scss';
</style>

<script>
// components
import menuTop from './menu/top.vue';
import menuBottom from './menu/bottom.vue';
import leaveMission from './lightBox/leaveMission.vue';
import index from './index.vue';
import setting from './setting.vue';
import bookContent from './bookContent.vue';
import completeMission from './lightBox/completeMission.vue';
import note from './note.vue';
// data
import document from '@/assets/document.json';

export default {
  components: {
    leaveMission,
    menuTop,
    bookContent,
    menuBottom,
    setting,
    index,
    completeMission,
    note
  },
  data() {
    return {
      isLeaveMission: false,
      isShowNavigation: false,
      isShowSetting: false,
      isShowIndex: false,
      isShowComplete: false,
      isShowNotes: false,
      backgroundColor: 'background__change__white',
      fontFamilyClass: 'book__fontFamily__ming',
      fontSizeClass: 'fontSize__24px',
      sizeLevel: 5,
      document,
      chapterIndex: '',
      sectionIndex: '',
      contentKey: {},
      task: this.$store.getters.getTask,
      index: 0
    };
  },
  computed: {
    directions() {
      return this.$store.getters.getDirections;
    },
    wordsDirectionClass() {
      const wordsClassName = `words-${this.directions.words}`;
      return wordsClassName;
    },
    functionsDirectionClass() {
      const functionsClassName = `functions-${this.directions.functions}`;
      return functionsClassName;
    }
  },
  created() {
    this.loadIntroContent();
  },
  methods: {
    toggleNavigation() {
      this.isShowNavigation = this.isShowNavigation ? false : true;
    },
    showSetting() {
      this.isShowSetting = this.isShowNavigation ? false : true;
    },
    toBookCover() {
      let coverLocation = {
        chapters: this.document.books.length,
        chapterIndex: 0,
        sections: null,
        sectionIndex: null,
        pageIndex: 0, // for: scrollTop = pageIndex * viewport
        pages: 1
      };
      this.$store.commit('setBookLocation', coverLocation);
      this.$router.push({ name: 'bookCover' });
    },
    loadIntroContent() {
      let intro = {
        chapter: this.document.books[1].chapter,
        h1title: '',
        h3title: this.document.books[1].sections[0].title,
        content: this.document.books[1].sections[0].content
      };

      let introLocation = {
        chapters: this.document.books.length,
        chapterIndex: 1,
        sections: this.document.books[1].sections.length,
        sectionIndex: 0,
        pageIndex: 0, // for: scrollTop = pageIndex * viewport
        pages: 1
      };

      this.$store.commit('setBookContent', intro);
      this.$store.commit('setBookLocation', introLocation);
    },
    changefontFamilyClass(famliyClass) {
      this.fontFamilyClass = famliyClass;
    },
    changefontSizeClass(font) {
      this.fontSizeClass = font.fontSizeClass;
      this.sizeLevel = font.sizeLevel;
      console.log('sizeLevel: ', this.sizeLevel);
    },
    changebackgroundColor(color) {
      this.backgroundColor = color;
      if (this.task.length <= 0) {
        return;
      }
      if (this.task[0] == undefined) {
        return;
      }
      if (this.task[0].time.length != 3) {
        return;
      }
      const step = this.$store.getters.getTarget[0].step[2];
      if (color == step.color) {
        this.$store.commit('setTask', 0);
        console.log(this.task);
        setTimeout(() => {
          this.isShowComplete = true;
        }, 3000);
      }
    },
    findContent() {
      this.isShowContent = true;
      this.isShowIndex = false;
    }
  }
};
</script>
