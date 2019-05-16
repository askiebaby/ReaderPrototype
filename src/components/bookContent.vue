<template>
  <div>
    <tooltip
      v-if="showTooltip"
      class="tooltip"
      :tooltip-position="tooltipPosition"
      :selected-to-notes="selectedToNotes"
      @changeColor="changeColor($event)"
    ></tooltip>
    <div class="book" @click="changePage">
      <h2 class="book__chapter">
        {{ checkFinishStep1 }} {{ bookContent.h1title }}
      </h2>
      <div
        ref="viewport"
        class="book__content"
        :style="{
          height: `${containerHeight}px`
        }"
      >
        <div
          ref="bookContainer"
          :style="{
            height: `${bookLocation.newContentHeight}`
          }"
        >
          <h3 class="book__subtitle">{{ bookContent.h3title }}</h3>
          <p>
            <span
              v-for="(g, i) in groupsContent"
              :key="i"
              :class="g.hightLight"
              @click="e => selectedPart(e, g.notesIndex)"
            >
              <span
                v-for="(c, j) in g.textGroup"
                :key="j"
                v-touch:start="e => touchStart(e, g.boundary + j)"
                v-touch:moving="touchMove"
                v-touch:end="touchEnd"
                :index="g.boundary + j"
                :class="hightLight(g.boundary + j)"
                >{{ c }}</span
              ></span
            >
          </p>
        </div>
      </div>
      <div class="page">
        本節第{{ bookLocation.pageIndex + 1 }}頁/共{{ bookLocation.pages }}頁
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/modules/_background.scss';
// @import url(https://fonts.googleapis.com/earlyaccess/cwtexming.css); // 明體
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
    text-align: center;
  }
  &__content {
    overflow: hidden;
    position: relative;
    width: 100%;
    transform: translate(0, 0px);
    h3,
    p,
    span {
      line-height: 1.75em;
      text-align: justify;
    }
    span {
      font-weight: normal;
      padding: 0.25em 0;
    }
  }

  p {
    text-indent: 1.5em;
  }
}

.fontSize__12px {
  .book__content {
    font-size: 12px;
    height: 59.5em;
    h3 {
      font-size: 12px;
    }
  }
}
.fontSize__14px {
  .book__content {
    font-size: 14px;
    height: 50.75em;
    h3 {
      font-size: 14px;
    }
  }
}
.fontSize__16px {
  .book__content {
    font-size: 16px;
    height: 45.5em;
    h3 {
      font-size: 16px;
    }
  }
}
.fontSize__18px {
  .book__content {
    font-size: 18px;
    height: 40.25em;
    h3 {
      font-size: 18px;
    }
  }
}
.fontSize__20px {
  .book__content {
    font-size: 20px;
    height: 35em;
    h3 {
      font-size: 20px;
    }
  }
}
.fontSize__24px {
  .book__content {
    font-size: 24px;
    height: 29.75em;
    h3 {
      font-size: 24px;
    }
  }
}
.fontSize__30px {
  .book__content {
    font-size: 30px;
    height: 22.75em;
    h3 {
      font-size: 30px;
    }
  }
}
.fontSize__36px {
  .book__content {
    font-size: 36px;
    max-height: 19.25em;
    h3 {
      font-size: 36px;
    }
  }
}
.fontSize__42px {
  .book__content {
    font-size: 42px;
    max-height: 15.75em;
    h3 {
      font-size: 42px;
    }
  }
}
.fontSize__48px {
  .book__content {
    font-size: 48px;
    max-height: 14em;
    h3 {
      font-size: 48px;
    }
  }
}
.fontSize__52px {
  .book__content {
    font-size: 52px;
    max-height: 14em;
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
.selected {
  background-color: $blue-pen;
}
.yellow-pen {
  background-color: $yellow-pen;
}
.red-pen {
  background-color: $red-pen;
}
.purple-pen {
  background-color: $purple-pen;
}
.green-pen {
  background-color: $green-pen;
}
</style>

<script>
import documentContent from '@/assets/document.json';
import webFont from '@/assets/webfont.js';
import tooltip from './tooltip.vue';

export default {
  components: {
    tooltip
  },
  props: ['sizeLevel'],
  data() {
    return {
      documentContent,
      nowWordsCount: 0,
      scrollHeight: 0,
      setting: {
        lineHeight: 1.75,
        fontInitIndex: 5
      },
      fontLevels: [
        {
          fontSize: '12',
          line: '34'
        },
        {
          fontSize: '14',
          line: '29'
        },
        {
          fontSize: '16',
          line: '26'
        },
        {
          fontSize: '18',
          line: '23'
        },
        {
          fontSize: '20',
          line: '20'
        },
        {
          fontSize: '24',
          line: '17'
        },
        {
          fontSize: '30',
          line: '13'
        },
        {
          fontSize: '36',
          line: '11'
        },
        {
          fontSize: '42',
          line: '9'
        },
        {
          fontSize: '48',
          line: '8'
        },
        {
          fontSize: '52',
          line: '8'
        }
      ],
      togglePageAction: '',
      pages: '',
      task: this.$store.getters.getTask,
      index: 0,
      isSelect: true,
      selected: {
        start: -1,
        end: -1
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
      },
      notes: [],
      isSelectedPart: -1
    };
  },

  computed: {
    selectedToNotes() {
      let textStart = this.selected.start;
      let textEnd = this.selected.end;
      if (this.selected.start > this.selected.end) {
        textStart = this.selected.end;
        textEnd = this.selected.start;
      }
      return {
        chapterIndex: this.bookLocation.chapterIndex,
        sectionIndex: this.bookLocation.sectionIndex,
        textStart: textStart,
        textEnd: textEnd + 1
      };
    },
    groupsContent() {
      const range = [{ i: 0 }];
      const notes = this.$store.getters.getNotes;
      const currentChapter = this.bookLocation.chapterIndex;
      const currentSection = this.bookLocation.sectionIndex;
      const note = notes
        .map((item, i) => {
          return { ...item, notesIndex: i };
        })
        .filter(
          item =>
            item.chapterIndex == currentChapter &&
            item.sectionIndex == currentSection
        );
      if (note.length > 0) {
        const notesSort = note.sort((a, b) => a.textStart - b.textStart);
        for (const item of notesSort) {
          range.push({
            i: item.textStart,
            color: item.color,
            notesIndex: item.notesIndex
          });
          range.push({ i: item.textEnd });
        }
      }
      range.push({ i: this.bookContent.content.length });
      const group = [];
      for (let j = 0; j < range.length - 1; j++) {
        let Obj = {
          textGroup: this.bookContent.content.slice(range[j].i, range[j + 1].i),
          boundary: range[j].i
        };
        if (range[j].notesIndex != undefined && range[j].color != undefined) {
          Obj.hightLight = range[j].color;
          Obj.notesIndex = range[j].notesIndex;
        }
        group.push(Obj);
      }
      return group;
    },
    aLineHeight() {
      const lineHeight = this.setting.lineHeight;
      const fontSize = this.fontLevels[this.sizeLevel].fontSize;
      const result = lineHeight * fontSize;
      console.log(`${result} = ${lineHeight} * ${fontSize}`);
      return result;
    },
    containerHeight() {
      const line = this.fontLevels[this.sizeLevel].line;
      const viewport = Math.floor(this.aLineHeight) * line;
      console.log(
        `${viewport} = ${line} 行 x 』${Math.floor(this.aLineHeight)}`
      );
      return viewport;
    },
    showTooltip() {
      return this.isShowTooltip;
    },
    bookContent() {
      return this.$store.getters.getBookContent;
    },
    bookLocation() {
      console.log(this.$store.getters.getBookLocation);
      return this.$store.getters.getBookLocation;
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
    }
  },
  watch: {
    bookContent: {
      handler: function() {
        console.log('I watch!!!!!!!!!!!!!!!!!!');
        this.bookLocation.newContentHeight = '';
        this.$store.commit('setBookLocation', this.bookLocation);
        if (
          this.togglePageAction === 'prev' ||
          this.togglePageAction === 'next'
        ) {
          this.countPageHeight();
        } else {
          this.togglePageAction = 'default';
          this.countPageHeight();
        }
      },
      deep: true
    },
    sizeLevel() {
      // reset word container's height
      this.bookLocation.newContentHeight = '';
      this.$store.commit('setBookLocation', this.bookLocation);
      this.countPageHeight();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initContent();
    });
  },

  methods: {
    changePage(e) {
      // this.clearSelected();
      const x = e.target.getBoundingClientRect().left;
      let action = '';
      if (72 < x && x < 272) {
        action = 'prev';
      } else if (472 < x && x < 674) {
        action = 'next';
      }
      if (action.length > 0) {
        this.loadBookContent(action);
        return;
      }
      this.toggleNavigation();
    },
    selectedPart(e, notesIndex) {
      this.clearSelected();
      if (notesIndex != undefined) {
        this.isSelectedPart = notesIndex;
        const partPosition = e.target.parentElement.getBoundingClientRect();
        this.$store.commit(
          'changeTooltipColor',
          e.target.parentElement.className.split('-')[0]
        );
        if (partPosition.left < 196 && partPosition.width <= 392) {
          this.tooltipPosition.x = 72;
        } else if (partPosition.left + 392 > 695) {
          this.tooltipPosition.x = 695 - 392;
        } else {
          this.tooltipPosition.x =
            partPosition.left + partPosition.width / 2 - 196;
        }
        this.tooltipPosition.y =
          partPosition.top - 42 - this.fontLevels[this.sizeLevel].fontSize;
        this.isShowTooltip = true;
      } else {
        this.isSelectedPart = -1;
      }
    },
    changeColor(color) {
      if (this.isSelectedPart >= 0) {
        this.$store.commit('changeNotesColor', {
          index: this.isSelectedPart,
          color: color
        });
        return;
      }
      this.$store.commit('addNotes', {
        chapterIndex: this.selectedToNotes.chapterIndex,
        sectionIndex: this.selectedToNotes.sectionIndex,
        textStart: this.selectedToNotes.textStart,
        textEnd: this.selectedToNotes.textEnd,
        color: color,
        comment: ''
      });
      this.clearSelected();
      console.log(this.$store.getters.getNotes);
    },
    hightLight(i) {
      let css = '';
      if (
        (i >= this.selected.start && i <= this.selected.end) ||
        (i >= this.selected.end && i <= this.selected.start)
      ) {
        css = 'selected';
      }
      return css;
    },
    initContent() {
      WebFont.load({
        custom: {
          families: ['cwTeXMing'],
          urls: ['https://fonts.googleapis.com/earlyaccess/cwtexming.css']
        },
        fontactive: () => {
          console.log('WebFont called');
          this.countPageHeight();
        }
      });
    },
    toggleNavigation() {
      this.$emit('toggleNavigation');
    },
    countPageHeight() {
      this.$nextTick(() => {
        // 內容原長度
        this.scrollHeight = this.$refs.viewport.scrollHeight;

        // 頁數
        const remain = this.scrollHeight % this.containerHeight;
        this.pages = Math.floor(this.scrollHeight / this.containerHeight);
        this.bookLocation.pages =
          remain >= this.aLineHeight ? (this.pages += 1) : this.pages;

        // 算出應有的高度
        this.bookLocation.newContentHeight = `${this.bookLocation.pages *
          this.containerHeight}px`;
        this.$store.commit('setBookLocation', this.bookLocation);

        this.checkPagePosition();

        console.log(
          'countPageHeight called! \n',
          'scrollHeight: ',
          this.scrollHeight,
          'scrollTop: ',
          this.$refs.viewport.scrollTop,
          'viewport: ',
          this.containerHeight,
          'lineHeight: ',
          this.aLineHeight, // 單行的總高度
          'remain: ',
          remain,
          'page: ',
          this.pages,
          'totalPage: ',
          this.bookLocation.pages,
          'newContentHeight: ',
          this.bookLocation.newContentHeight
        );
      });
    },
    checkPagePosition() {
      if (this.togglePageAction === 'next' || 'default') {
        this.$refs.viewport.scrollTop = 0;
        this.bookLocation.pageIndex = 0;
        console.log(
          'next',
          this.$refs.viewport.scrollTop,
          this.bookLocation.pages,
          this.containerHeight
        );
      } else if (this.togglePageAction === 'prev') {
        this.$refs.viewport.scrollTop =
          (this.bookLocation.pages - 1) * this.containerHeight + 210;
        this.bookLocation.pageIndex = this.bookLocation.pages - 1;
        console.log(
          'prev',
          this.$refs.viewport.scrollTop,
          this.bookLocation.pages,
          this.containerHeight
        );
      } else {
        this.$refs.viewport.scrollTop = 0;
        this.bookLocation.pageIndex = 0;
      }

      this.$store.commit('setBookLocation', this.bookLocation);
      this.togglePageAction = '';
    },
    loadBookContent(action) {
      this.$nextTick(() => {
        console.log(this.$refs.viewport.scrollTop);
        let viewport = this.$refs.viewport;

        if (action === 'next') {
          if (
            viewport.scrollHeight - viewport.clientHeight <=
            viewport.scrollTop
          ) {
            this.toggleSection(action);
            return;
          }

          this.bookLocation.pageIndex += 1;
          this.$store.commit('setBookLocation', this.bookLocation);

          viewport.scrollTop =
            this.bookLocation.pageIndex * viewport.clientHeight;
        } else if (action === 'prev') {
          if (this.bookLocation.pageIndex < 1) {
            this.toggleSection(action);
            return;
          } else {
            this.bookLocation.pageIndex -= 1;
            this.$store.commit('setBookLocation', this.bookLocation);
          }

          viewport.scrollTop =
            this.bookLocation.pageIndex * viewport.clientHeight;
        }
        return;
      });
    },
    toggleSection(action) {
      let chapters = this.bookLocation.chapters;
      let chapterIndex = this.bookLocation.chapterIndex;

      let sections = this.bookLocation.sections;
      let sectionIndex = this.bookLocation.sectionIndex;

      let pages = this.bookLocation.pages;
      let pageIndex = this.bookLocation.pageIndex;
      let page = this.bookLocation.pageIndex + 1;

      console.log(`
        chapters: ${chapters} \n
        chapterIndex: ${chapterIndex} \n
        sections: ${sections} \n
        sectionIndex: ${sectionIndex} \n
        pages: ${pages} \n
        pageIndex: ${pageIndex} \n
        page: ${page} \n
      `);

      if (action === 'prev') {
        if (pageIndex === 0) {
          // 在該 section 第一頁了
          this.bookLocation.newContentHeight = '';
          this.$store.commit('setBookLocation', this.bookLocation);

          if (sectionIndex === 0) {
            // 如果是這個 chapter 第一個 section

            if (chapterIndex === 1) {
              // 檢查是不是第一個 chapter
              // 是第一個 chapter 的話 return
              return;
            } else if (chapterIndex > 0) {
              // 不是第一個 chapter，切換上一個 chapter 的最後一個 section
              this.changeContent('prevChapter');
            }
          } else if (sectionIndex > 0) {
            // 如果不是這個 chapter 第一個 section，切換上一個 section
            this.changeContent('prevSection');
          }
        }
      } else if (action === 'next') {
        if (page === pages) {
          // 在該 section 最後一頁
          this.bookLocation.newContentHeight = '';
          this.$store.commit('setBookLocation', this.bookLocation);

          if (sectionIndex + 1 < sections) {
            // 如果不是這個 chapter 最後一個 section，切換下一個 section
            console.log('nextSection');
            this.changeContent('nextSection');
          } else if (sectionIndex + 1 === sections) {
            // 如果是這個 chapter 最後一個 section
            if (chapterIndex + 1 < chapters) {
              // 檢查是不是最後一個 chapter
              // 不是最後一個 chapter，切換下一個 chapter 的 第一個 section
              console.log('nextChapter');
              this.changeContent('nextChapter');
            } else if (chapterIndex === chapters) {
              // 是最後一個 chapter 的話 return
              console.log('// 是最後一個 chapter 的話 return');
              return;
            }
          }
        }
      }
    },
    changeContent(action) {
      let addContent = this.$store.getters.getBookContent;

      if (action === 'prevSection') {
        this.togglePageAction = 'prev';

        addContent = {
          chapter: addContent.chapter,
          h1title: addContent.h1title,
          h3title: this.documentContent.books[this.bookLocation.chapterIndex]
            .sections[this.bookLocation.sectionIndex - 1].title,
          content: this.documentContent.books[this.bookLocation.chapterIndex]
            .sections[this.bookLocation.sectionIndex - 1].content
        };
        // debugger
        this.bookLocation.sectionIndex -= 1;
        this.$store.commit('setBookContent', addContent);
        this.$store.commit('setBookLocation', this.bookLocation);
      } else if (action === 'prevChapter') {
        this.togglePageAction = 'prev';
        let prevChapterIndex = this.bookLocation.chapterIndex - 1;
        let lastSectionIndex =
          this.documentContent.books[prevChapterIndex].sections.length - 1;

        addContent = {
          chapter: this.documentContent.books[prevChapterIndex].chapter,
          h1title: this.documentContent.books[prevChapterIndex].title,
          h3title: this.documentContent.books[prevChapterIndex].sections[
            lastSectionIndex
          ].title,
          content: this.documentContent.books[prevChapterIndex].sections[
            lastSectionIndex
          ].content
        };
        // debugger
        this.$store.commit('setBookContent', addContent);
        this.bookLocation.chapterIndex -= 1;
        this.bookLocation.sectionIndex =
          this.documentContent.books[prevChapterIndex].sections.length - 1;
        this.$store.commit('setBookLocation', this.bookLocation);
      } else if (action === 'nextSection') {
        this.togglePageAction = 'next';
        let nextChapterIndex = this.bookLocation.chapterIndex;
        let lastSectionIndex =
          this.documentContent.books[nextChapterIndex].sections.length - 1;

        // 切換 section
        addContent = {
          chapter: addContent.chapter,
          h1title: addContent.h1title,
          h3title: this.documentContent.books[nextChapterIndex].sections[
            this.bookLocation.sectionIndex + 1
          ].title,
          content: this.documentContent.books[nextChapterIndex].sections[
            this.bookLocation.sectionIndex + 1
          ].content
        };

        this.bookLocation.sectionIndex += 1;
        this.$store.commit('setBookContent', addContent);
        this.$store.commit('setBookLocation', this.bookLocation);
      } else if (action === 'nextChapter') {
        // 切換章節
        this.togglePageAction = 'next';
        this.bookLocation.chapterIndex += 1;
        addContent = {
          chapter: this.documentContent.books[this.bookLocation.chapterIndex]
            .chapter,
          h1title: this.documentContent.books[this.bookLocation.chapterIndex]
            .title,
          h3title: this.documentContent.books[this.bookLocation.chapterIndex]
            .sections[0].title,
          content: this.documentContent.books[this.bookLocation.chapterIndex]
            .sections[0].content
        };

        this.$store.commit('setBookContent', addContent);

        this.bookLocation.sectionIndex = 0;
        this.bookLocation.sections = this.documentContent.books[
          this.bookLocation.chapterIndex
        ].sections.length;
      }
      this.$store.commit('setBookLocation', this.bookLocation);
      this.nowWordsCount = this.bookContent.content.length;
    },
    touchStart(e, i) {
      if (e.target.parentElement.className.length > 0) {
        this.clearSelected();
        return;
      }
      if (!this.isBetween(i)) {
        this.selected.start = i;
        this.selected.end = i;
        this.selectPosition.start.x = e.target.getBoundingClientRect().left;
        this.selectPosition.start.y = e.target.getBoundingClientRect().top;
      }
    },
    touchEnd() {
      const averageX =
        (this.selectPosition.start.x + this.selectPosition.end.x) / 2;
      const minY = Math.min(
        this.selectPosition.start.y,
        this.selectPosition.end.y
      );
      //扣除字體以及tooltip高度
      this.tooltipPosition.y =
        minY - this.fontLevels[this.sizeLevel].fontSize - 42;
      //扣除tooltip一半的寬度
      if (averageX - 196 <= 0) {
        this.tooltipPosition.x = 72;
      } else if (averageX + 196 >= 695) {
        this.tooltipPosition.x = 695 - 392;
      } else {
        this.tooltipPosition.x = averageX - 196;
      }
      if (this.selected.start > 0 && this.selected.end > 0) {
        this.isSelectedPart = -1;
        this.$store.commit('changeTooltipColor');
        this.isShowTooltip = true;
      }
    },
    touchMove(e) {
      let changedTouch = e.changedTouches[0];
      let target = document.elementFromPoint(
        changedTouch.clientX,
        changedTouch.clientY
      );
      if (target.parentElement.className.length > 0) {
        this.clearSelected();
        return;
      }
      if (this.selected.start >= 0) {
        const charEnd = parseInt(target.getAttribute('index'));
        this.selected.end = charEnd;
        this.selectPosition.end.x = changedTouch.clientX;
        this.selectPosition.end.y = changedTouch.clientY;
      }
    },
    clearSelected() {
      this.isShowTooltip = false;
      this.selected.start = -1;
      this.selected.end = -1;
    },
    isBetween(index) {
      let min = Math.min(this.selected.start, this.selected.end);
      let max = Math.max(this.selected.start, this.selected.end);
      return index >= min && index <= max;
    }
  }
};
</script>
