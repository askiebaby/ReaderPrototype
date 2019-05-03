<template>
  <div class="book" @load="positionContent">
    <tooltip
      v-if="showTooltip"
      class="tooltip"
      :tooltip-position="tooltipPosition"
    ></tooltip>
    <h2 class="book__chapter">
      {{ checkFinishStep1 }} {{ bookContent.h1title }}
    </h2>
    <div
      ref="bookContainer"
      class="book__content"
      :style="{
        height: containerHeight
      }"
    >
      <h3 class="book__subtitle">{{ bookContent.h3title }}</h3>

      <p class="bookContainer" v-html="spanContent"></p>
    </div>
    <div class="page">- {{ wholePage }} -</div>
    <div class="touch" style=" pointer-events: none">
      <div class="touch__previous" @click="loadBookContent('prev')"></div>
      <div class="touch__navigation" @click="toggleNavigation"></div>
      <div class="touch__next" @click="loadBookContent('next')"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/modules/_background.scss';
@import url(https://fonts.googleapis.com/earlyaccess/cwtexming.css); // 明體
@import url(https://fonts.googleapis.com/earlyaccess/cwtexkai.css); // 楷體
@import url(https://fonts.googleapis.com/earlyaccess/notosanstc.css); // 黑體

.book {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-flow: row wrap;
  padding: 89px 72px 140px;
  max-width: 768px;
  margin: auto;
  position: relative;
  // max-height: 100vh;
  height: 1024px;
  &__fontFamily__ming > div {
    font-family: 'cwTeXMing', serif;
  }
  &__fontFamily__kai > div {
    font-family: 'cwTeXKai', serif;
  }
  &__fontFamily__noto > div {
    font-family: 'Noto Sans TC', sans-serif;
  }

  &__chapter {
    font-size: 36px;
    font-size: 2.25rem;
    // margin-bottom: 28px;
    // margin-bottom: 1.75rem;
    text-align: center;
  }
  &__content {
    overflow: hidden;
    // position: absolute;
    position: relative;
    // column-fill: auto;
    width: 100%;
    transform: translate(0, 0px);
    // top: 165px;
    * {
      font-weight: normal;
      line-height: 1.75em;
      text-align: justify;
    }
  }

  // &__subtitle {}

  p {
    line-height: 1.75em;
    text-indent: 1.5em;
    text-align: justify;
  }
}

.fontSize__12px {
  .book__content {
    font-size: 12px;
    height: 59.5em;
    // left: 6em;
    // width: 190em;
    // column-gap: 86em;
    // column-width: 30em;
    h3 {
      font-size: 12px;
    }
  }
}
.fontSize__14px {
  .book__content {
    font-size: 14px;
    height: 50.75em;
    // left: 5.142em;
    // width: 160em;
    // column-gap: 71em;
    // column-width: 30em;
    h3 {
      font-size: 14px;
    }
  }
}
.fontSize__16px {
  .book__content {
    font-size: 16px;
    height: 45.5em;
    // left: 4.5em;
    // width: 140em;
    // column-gap: 62em;
    // column-width: 30em;
    h3 {
      font-size: 16px;
    }
  }
}
.fontSize__18px {
  .book__content {
    font-size: 18px;
    height: 40.25em;
    // left: 4em;
    // width: 124em;
    // column-gap: 55em;
    // column-width: 30em;
    h3 {
      font-size: 18px;
    }
  }
}
.fontSize__20px {
  .book__content {
    font-size: 20px;
    height: 35em;
    // left: 3.6em;
    // width: 110em;
    // column-gap: 48em;
    // column-width: 30em;
    h3 {
      font-size: 20px;
    }
  }
}
.fontSize__24px {
  .book__content {
    font-size: 24px;
    height: 29.75em;
    // left: 3em;
    // width: 131em;
    // column-gap: 79em;
    // column-width: 23em;
    h3 {
      font-size: 24px;
    }
  }
}
.fontSize__30px {
  .book__content {
    font-size: 30px;
    height: 22.75em;
    // left: 2.4em;
    // width: 95em;
    // column-gap: 53em;
    // column-width: 20em;
    h3 {
      font-size: 30px;
    }
  }
}
.fontSize__36px {
  .book__content {
    font-size: 36px;
    max-height: 19.25em;
    // left: 2em;
    // width: 103em;
    // height: 22.75em;
    // column-gap: 25em;
    // column-width: 17em;
    h3 {
      font-size: 36px;
    }
  }
}
.fontSize__42px {
  .book__content {
    font-size: 42px;
    max-height: 15.75em;
    // left: 1.714em;
    // width: 65em;
    // height: 22.75em;
    // column-gap: 35em;
    // column-width: 12em;
    h3 {
      font-size: 42px;
    }
  }
}
.fontSize__48px {
  .book__content {
    font-size: 48px;
    max-height: 14em;
    // left: 1.5em;
    // width: 50em;
    // height: 22.75em;
    // column-gap: 24em;
    // column-width: 12em;
    h3 {
      font-size: 48px;
    }
  }
}
.fontSize__52px {
  .book__content {
    font-size: 52px;
    max-height: 14em;
    // left: 1.384em;
    // width: 82em;
    // column-gap: 24em;
    // column-width: 10em;
    h3 {
      font-size: 52px;
    }
  }
}
.page {
  position: absolute;
  bottom: 95px;
  color: $gray-3;
  font-size: 20px;
  line-height: 1.75;
}
.tooltip {
  position: absolute;
  z-index: 1;
}
</style>

<script>
import documentContent from '@/assets/document.json';
import tooltip from './tooltip.vue';
export default {
  components: {
    tooltip
  },
  props: ['sizeLevel'],
  data() {
    return {
      queries: [],
      documentContent,
      nowWordsCount: 0,
      maxWordsCount: [1845, 1342, 1024, 791, 626, 447, 262, 188, 142, 96, 82],
      pagesDistance: [138, 115.5, 101, 89.5, 79, 105, 74, 42.75, 50, 37, 35],
      pageDistance: { transform: 'translateX(0)' },
      setting: {
        lineHeight: 1.75,
        fontSetting: 5,
        page: 0
      },
      fontSetting: [
        {
          fontSize: '12px',
          line: '34'
        },
        {
          fontSize: '14px',
          line: '29'
        },
        {
          fontSize: '16px',
          line: '26'
        },
        {
          fontSize: '18px',
          line: '23'
        },
        {
          fontSize: '20px',
          line: '20'
        },
        {
          fontSize: '24px',
          line: '17'
        },
        {
          fontSize: '30px',
          line: '13'
        },
        {
          fontSize: '36px',
          line: '11'
        },
        {
          fontSize: '42px',
          line: '9'
        },
        {
          fontSize: '20px',
          line: '8'
        },
        {
          fontSize: '52px',
          line: '8'
        }
      ],
      task: this.$store.getters.getTask,
      index: 0,
      addLocation: '',
      wholePage: 1,
      isSelect: false,
      selected: {
        start: 0,
        end: 0
      },
      isShowTooltip: false,
      selectPosition: {
        start: {
          x: 0,
          y: 0
        },
        end: {
          x: 0,
          y: 0
        }
      },
      tooltipPosition: {
        x: 0,
        y: 0
      }
    };
  },
  computed: {
    containerHeight() {
      const lineHeight = this.setting.lineHeight;
      const line = this.fontSetting[this.setting.fontSetting].line;
      const fontSize = this.fontSetting[this.setting.fontSetting].fontSize;
      return `calc( ${lineHeight} * ${line} * ${fontSize})`;
    },
    showTooltip() {
      return this.isShowTooltip;
    },
    // pointerEvents() {
    //   let result = 'auto';
    //   if (this.isSelect == true) {
    //     result = 'none';
    //   }
    //   return result;
    // },
    spanContent() {
      return this.bookContent.content
        .split('')
        .map((dom, index) => {
          return `<span class='char' index='${index + 1}'>${dom}</span>`;
        })
        .join('');
    },
    bookContent() {
      return this.$store.getters.getBookContent;
    },
    bookLocation() {
      return this.$store.getters.getBookLocation;
      // bookIndex, bookChapters, sectionIndex, sections
    },
    checkFinishStep1() {
      if (this.bookContent.chapter == '第1章') {
        if (this.task.length > 0) {
          if (this.task[this.index].time.length === 1) {
            this.$store.commit('setTask', this.index);
            console.log(this.task);
          }
        }
      }
      return this.bookContent.chapter;
    },
    positionContent1() {
      console.log('positionContent', this.bookLocation.sectionPage);
      if (this.bookLocation.sectionPage === 1) {
        this.pageDistance == { transform: `translateX(0)` };
      } else if (this.bookLocation.sectionPage > 1) {
        if (this.nowWordsCount > this.maxWordsCount[this.sizeLevel]) {
          // 超過一頁
          console.log(
            'positionContent',
            this.nowWordsCount,
            this.maxWordsCount[this.sizeLevel]
          );
          this.pageDistance ==
            {
              transform: `translateX(-${this.pagesDistance[this.sizeLevel]}em)`
            };
        } else {
          this.pageDistance == { transform: `translateX(0)` };
        }
      }
      return this.pageDistance;
    },
    positionContent() {
      return 'positionContent' + this.pageDistance;
    }
  },
  created() {
    this.addLocation = this.$store.getters.getBookLocation;
  },
  mounted() {
    // console.log(this.MdContent);
    const el = document.querySelector('.bookContainer');
    el.addEventListener('touchstart', this.touchStart, false);
    el.addEventListener('touchmove', this.touchMove, false);
    el.addEventListener('touchend', this.touchEnd, false);
    el.addEventListener('touchcancel', this.clearSelected, false);
  },
  methods: {
    // switchSelect(arg) {
    //   this.isSelect = arg;
    //   console.log('123', this.isSelect);
    // },
    getSelection(allStr) {
      this.queries = allStr;
    },
    loadPageNumber() {
      console.log('loadPageNumber');
    },
    toggleNavigation() {
      this.$emit('toggleNavigation');
    },
    loadBookContent(action) {
      let bookContainer = this.$refs.bookContainer;
      this.nowWordsCount = this.bookContent.content.length;

      if (action === 'next') {
        if (
          bookContainer.scrollHeight - bookContainer.clientHeight <=
          bookContainer.scrollTop
        ) {
          // alert('hit bottom')
          return;
        }
        this.setting.page++;
        bookContainer.scrollTop =
          this.setting.page * bookContainer.clientHeight;
      } else if (action === 'prev') {
        if (this.setting.page <= 0) {
          // alert('hit head')
          return;
        }
        this.setting.page--;
        bookContainer.scrollTop =
          this.setting.page * bookContainer.clientHeight;
      }
      console.log(
        bookContainer.scrollHeight,
        bookContainer.clientHeight,
        bookContainer.scrollTop
      );
      // this.togglePage(action);
    },
    togglePage(action) {
      console.log(action);
    },
    togglePage1(action) {
      if (action === 'prev') {
        if (this.nowWordsCount > this.maxWordsCount[this.sizeLevel]) {
          // 超過一頁
          if (
            this.bookLocation.bookIndex === 1 &&
            this.bookLocation.sectionIndex === 0
          ) {
            this.$emit('toBookCover');
            this.addLocation.sectionPage = 1;
            this.$store.commit('setBookLocation', this.addLocation);
          } else if (this.addLocation.sectionPage === 1) {
            this.changeSection('prev');
          } else if (this.addLocation.sectionPage > 1) {
            this.addLocation.sectionPage -= 1;
            this.$store.commit('setBookLocation', this.addLocation);
            this.pageDistance = {
              transform: `translateX(0)`
            };

            // console.log(this.pageDistance, 'togglePage: prev')
          }
        } else {
          // 只有一頁
          // console.log("只有一頁")
          if (
            this.bookLocation.bookIndex === 1 &&
            this.bookLocation.sectionIndex === 0
          ) {
            this.$emit('toBookCover');
          } else {
            this.changeSection('prev');
          }
        }
      } else if (action === 'next') {
        if (this.nowWordsCount > this.maxWordsCount[this.sizeLevel]) {
          // 超過一頁
          this.addLocation.sectionPage += 1;
          this.$store.commit('setBookLocation', this.addLocation);

          if (this.addLocation.sectionPage > 2) {
            this.changeSection('next');
          } else {
            this.pageDistance = {
              transform: `translateX(-${this.pagesDistance[this.sizeLevel]}em)`
            };
          }
        } else {
          // 只有一頁
          console.log('只有一頁');
          this.changeSection('next');
        }
      }
    },
    changeSection1(action) {
      if (action === 'prev') {
        if (this.bookLocation.sectionIndex === 0) {
          console.log('changeSection: prev, first section');
          this.addLocation.sections = this.documentContent.books[
            this.bookLocation.bookIndex - 1
          ].sections.length;
          this.$store.commit('setBookLocation', this.addLocation);
          this.changeContent('prevChapter');
        } else {
          // 不是第一個 section
          console.log('changeSection: prev, 不是第一個 section');
          this.addLocation.sectionIndex -= 1;
          this.$store.commit('setBookLocation', this.addLocation);
          this.changeContent('prevSection');
        }
      } else if (action === 'next') {
        if (this.bookLocation.sectionIndex < this.bookLocation.sections - 1) {
          // 不是最後一個 section
          console.log('changeSection, 不是最後一個 section');
          this.addLocation.sectionIndex += 1;
          this.$store.commit('setBookLocation', this.addLocation);
          this.changeContent('nextSection');
        } else {
          // 當前 chapter 的最後一個 section
          // TODO 最後一章的最後一個 section 要 return
          this.addLocation.sections = this.documentContent.books[
            this.bookLocation.bookIndex + 1
          ].sections.length;
          this.$store.commit('setBookLocation', this.addLocation);
          this.changeContent('nextChapter');
          console.log('changeSection, 當前 chapter 的最後一個 section');
        }
      }
    },
    changeContent1(action) {
      let addContent = this.$store.getters.getBookContent;

      if (action === 'nextSection') {
        // 切換 section
        addContent = {
          chapter: addContent.chapter,
          h1title: addContent.h1title,
          h3title: this.documentContent.books[this.addLocation.bookIndex]
            .sections[this.addLocation.sectionIndex].title,
          content: this.documentContent.books[this.addLocation.bookIndex]
            .sections[this.addLocation.sectionIndex].content
        };
        this.$store.commit('setBookContent', addContent);
        this.resetDefault('firstPage');
      } else if (action === 'nextChapter') {
        // 切換章節
        console.log(this.addLocation.bookChapters);
        addContent = {
          chapter: this.documentContent.books[this.addLocation.bookIndex + 1]
            .chapter,
          h1title: this.documentContent.books[this.addLocation.bookIndex + 1]
            .title,
          h3title: this.documentContent.books[this.addLocation.bookIndex + 1]
            .sections[0].title,
          content: this.documentContent.books[this.addLocation.bookIndex + 1]
            .sections[0].content
        };
        this.$store.commit('setBookContent', addContent);
        this.addLocation.bookIndex += 1;
        this.addLocation.sectionIndex = 0;
        this.resetDefault('firstPage');
      } else if (action === 'prevSection') {
        addContent = {
          chapter: addContent.chapter,
          h1title: addContent.h1title,
          h3title: this.documentContent.books[this.addLocation.bookIndex]
            .sections[this.addLocation.sectionIndex].title,
          content: this.documentContent.books[this.addLocation.bookIndex]
            .sections[this.addLocation.sectionIndex].content
        };
        this.$store.commit('setBookContent', addContent);
        this.resetDefault('lastPage');
      } else if (action === 'prevChapter') {
        console.log('準備更新chap');
        addContent = {
          chapter: this.documentContent.books[this.addLocation.bookIndex - 1]
            .chapter,
          h1title: this.documentContent.books[this.addLocation.bookIndex - 1]
            .title,
          h3title: this.documentContent.books[this.addLocation.bookIndex - 1]
            .sections[this.addLocation.sections - 1].title,
          content: this.documentContent.books[this.addLocation.bookIndex - 1]
            .sections[this.addLocation.sections - 1].content
        };
        this.$store.commit('setBookContent', addContent);
        this.addLocation.bookIndex -= 1;
        this.addLocation.sectionIndex = this.addLocation.sections;
        this.resetDefault('lastPage');
      }
      this.nowWordsCount = this.bookContent.content.length;
    },
    resetDefault1(setting) {
      if (setting === 'firstPage') {
        // 定位 section 第一頁
        this.addLocation.sectionPage = 1;
        this.$store.commit('setBookLocation', this.addLocation);
        this.pageDistance = {
          transform: `translateX(0)`
        };
      } else if (setting === 'lastPage') {
        // 定位 section 最後一頁
        this.addLocation.sectionPage = 2;
        this.$store.commit('setBookLocation', this.addLocation);
        this.pageDistance = {
          transform: `translateX(-${this.pagesDistance[this.sizeLevel]}em)`
        };
      }
    },
    touchStart(e) {
      this.isSelect = false;
      this.isShowTooltip = false;
      if (
        e.target.classList.contains('char') &&
        !this.isBetween(parseInt(e.target.getAttribute('index')))
      ) {
        this.selected.start = parseInt(e.target.getAttribute('index'));

        this.selectPosition.start.x = e.target.getBoundingClientRect().left;
        this.selectPosition.start.y = e.target.getBoundingClientRect().top;
      } else {
        this.clearSelected();
      }
    },
    touchEnd() {
      const averageX =
        (this.selectPosition.start.x + this.selectPosition.end.x) / 2;
      const minY = Math.min(
        this.selectPosition.start.y,
        this.selectPosition.end.y
      );
      const fontSize = this.fontSetting[this.setting.fontSetting].fontSize;
      const numb = fontSize.match(/\d/g).join('');
      //扣除字體以及tooltip高度
      this.tooltipPosition.y = minY - numb - 42;
      //扣除tooltip一半的寬度
      this.tooltipPosition.x = averageX - 196;
      if (this.isSelect) {
        this.isShowTooltip = true;
        this.$store.commit('addNotes', this.selected);
        console.log(this.$store.getters.getNotes);
      }
    },
    touchMove(e) {
      let changedTouch = e.changedTouches[0];
      let target = document.elementFromPoint(
        changedTouch.clientX,
        changedTouch.clientY
      );
      if (target.classList.contains('char') && this.selected.start) {
        this.selected.end = parseInt(target.getAttribute('index'));
        this.setSelected();
        this.selectPosition.end.x = changedTouch.clientX;
        this.selectPosition.end.y = changedTouch.clientY;
      }
    },
    clearSelected() {
      this.isShowTooltip = false;
      this.selected.start = 0;
      this.selected.end = 0;
      document.querySelectorAll('.selected').forEach(obj => {
        obj.classList.remove('selected');
      });
    },
    setSelected() {
      document.querySelectorAll('.selected').forEach(obj => {
        obj.classList.remove('selected');
      });
      if (this.selected.start > this.selected.end) {
        this.isSelect = true;
        for (let i = this.selected.start - 1; i > this.selected.end - 2; i--) {
          document.querySelectorAll('.char')[i].classList.add('selected');
        }
      } else {
        this.isSelect = true;
        for (let i = this.selected.start - 1; i < this.selected.end; i++) {
          document.querySelectorAll('.char')[i].classList.add('selected');
        }
      }
    },
    isBetween(index) {
      let min = Math.min(this.selected.start, this.selected.end);
      let max = Math.max(this.selected.start, this.selected.end);
      return index >= min && index <= max;
    }
  }
};
</script>
