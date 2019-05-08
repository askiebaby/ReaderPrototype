<template>
  <div class="book">
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
        }
        ">
        <h3 class="book__subtitle">{{ bookContent.h3title }}</h3>
        <tooltip v-if="showTooltip"></tooltip>
        <p
          v-html="spanContent"
          class="bookContainer"
        ></p>
      </div>
    </div>
    <div class="page">- {{ bookLocation.pageIndex+1 }} -</div>
    <div class="touch">
      <div class="touch__previous" @click="loadBookContent('prev')"></div>
      <div class="touch__navigation" @click="toggleNavigation"></div>
      <div class="touch__next" @click="loadBookContent('next')"></div>
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
    * {
      font-weight: normal;
      line-height: 1.75em;
      text-align: justify;
    }
  }

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
</style>

<script>
import documentContent from '@/assets/document.json';
import webFont from '@/assets/webfont.js';
import tooltip from './tooltip.vue';
import { nextTick } from 'q';
import { setTimeout } from 'timers';
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
      scrollHeight: 0,
      setting: {
        lineHeight: 1.75,
        fontInitIndex: 5,
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
          fontSize: '20',
          line: '8'
        },
        {
          fontSize: '52',
          line: '8'
        }
      ],
      task: this.$store.getters.getTask,
      index: 0,
      isSelect: true,
      selected: {
        start: 0,
        end: 0
      },
      isShowTooltip: false
    };
  },
  watch: {
    bookContent: {
      handler: function () {
        this.countPageHeight()
      },
      deep: true
    },
    
  },
  computed: {
    aLineHeight() {
      const lineHeight = this.setting.lineHeight;
      const fontSize = this.fontLevels[this.setting.fontInitIndex].fontSize
      const result = lineHeight * fontSize
      return result
    },
    containerHeight() {
      const line = this.fontLevels[this.setting.fontInitIndex].line;
      const viewport = this.aLineHeight * line
      return viewport
    },
    showTooltip() {
      return this.isShowTooltip;
    },
    pointerEvents() {
      let result = 'auto';
      if (this.isSelect == true) {
        result = 'none';
      }
      return result;
    },
    spanContent() {
      return this.bookContent.content
        .split('')
        .map((dom, index) => {
          return `<span class='char' index='${index + 1}'>${dom}</span>`;
        })
        .join('');
    },
    bookContent() {
      console.log(this.$store.getters.getBookContent)
      return this.$store.getters.getBookContent;
    },
    bookLocation() {
      console.log(this.$store.getters.getBookLocation)
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
    },
  },
  mounted() {
    
    this.$nextTick( () => {
      WebFont.load({
        custom: {
          families: ['cwTeXMing'],
          urls: ['https://fonts.googleapis.com/earlyaccess/cwtexming.css']
        },
        fontactive: () => {
          this.countPageHeight()
        }
      })
      // listen touch event
      const el = document.querySelector('.bookContainer');
      el.addEventListener('touchstart', this.touchStart, false);
      el.addEventListener('touchmove', this.touchMove, false);
      el.addEventListener('touchend', this.touchEnd, false);
      el.addEventListener('touchcancel', this.clearSelected, false);
    })
  },
  methods: {
    switchSelect(arg) {
      this.isSelect = arg;
      console.log('123', this.isSelect);
    },
    getSelection(allStr) {
      this.queries = allStr;
    },
    toggleNavigation() {
      this.$emit('toggleNavigation');
    },
    countPageHeight() {
      this.$nextTick( () => {
           this.scrollHeight = this.$refs.viewport.scrollHeight // 內容原長度
        const remain = this.scrollHeight % this.containerHeight
        let pages = Math.floor(this.scrollHeight / this.containerHeight)

        this.$refs.viewport.scrollTop = 0 // 每次一切換章節就顯示第一頁
        this.bookLocation.pages = (remain >= this.aLineHeight) ? pages +=1 : pages;
        this.bookLocation.newContentHeight = `${this.bookLocation.pages * this.containerHeight}px`;
        this.$store.commit('setBookLocation', this.bookLocation);
        console.log(
          'countPageHeight called! \n',
          'scrollHeight: ', this.scrollHeight,
          'scrollTop: ', this.$refs.viewport.scrollTop,
          'viewport: ', this.containerHeight,
          'lineHeight: ', this.aLineHeight, // 單行的總高度
          'remain: ', remain,
          'page: ', pages,
          'totalPage: ', this.bookLocation.pages,
          'newContentHeight: ',this.bookLocation.newContentHeight
        )
      })
    },
    loadBookContent(action) {
      this.$nextTick( () => {
        let viewport = this.$refs.viewport

        if (action === 'next') {
          if (
            viewport.scrollHeight - viewport.clientHeight <=
            viewport.scrollTop
          ) {
            this.toggleSection(action);
            return
          }

          this.bookLocation.pageIndex += 1
          this.$store.commit('setBookLocation', this.bookLocation)

          viewport.scrollTop =
            this.bookLocation.pageIndex * viewport.clientHeight

        } else if (action === 'prev') {
          if (this.bookLocation.pageIndex < 1) {
            this.toggleSection(action);
            return
          } else {
            this.bookLocation.pageIndex -= 1
            this.$store.commit('setBookLocation', this.bookLocation)
          }

          viewport.scrollTop =
          this.bookLocation.pageIndex * viewport.clientHeight
        }
        return
      })
    },
    toggleSection(action) {
      let chapters = this.bookLocation.chapters
      let chapterIndex = this.bookLocation.chapterIndex

      let sections = this.bookLocation.sections
      let sectionIndex = this.bookLocation.sectionIndex
      
      let pages = this.bookLocation.pages
      let pageIndex = this.bookLocation.pageIndex
      let page = this.bookLocation.pageIndex +1

      console.log(`
        chapters: ${chapters} \n
        chapterIndex: ${chapterIndex} \n
        sections: ${sections} \n
        sectionIndex: ${sectionIndex} \n
        pages: ${pages} \n
        pageIndex: ${pageIndex} \n
        page: ${page} \n
      `)
      
      if (action === 'prev') {

        if (pageIndex === 0) {
          // 在該 section 第一頁了
          this.bookLocation.newContentHeight = ''
          this.$store.commit('setBookLocation', this.bookLocation)

          if (sectionIndex === 0) {
            // 如果是這個 chapter 第一個 section

            if (chapterIndex === 1) {
              // 檢查是不是第一個 chapter
              // 是第一個 chapter 的話 return
              return

            } else if (chapterIndex > 0) {
              // 不是第一個 chapter，切換上一個 chapter 的最後一個 section
              this.changeContent('prevChapter')
            }

          } else if(sectionIndex > 0){
            // 如果不是這個 chapter 第一個 section，切換上一個 section
            this.changeContent('prevSection')
          }
        }
      } else if (action === 'next') {

        if (page === pages) {

          // 在該 section 最後一頁
          this.bookLocation.newContentHeight = ''
          this.$store.commit('setBookLocation', this.bookLocation)

          if (sectionIndex +1 < sections) {

             // 如果不是這個 chapter 最後一個 section，切換下一個 section
            console.log('nextSection')
            this.changeContent('nextSection')

          } else if (sectionIndex +1 === sections) {

             // 如果是這個 chapter 最後一個 section
            if (chapterIndex +1 < chapters) {

            // 檢查是不是最後一個 chapter
              // 不是最後一個 chapter，切換下一個 chapter 的 第一個 section
              console.log('nextChapter')
              this.changeContent('nextChapter')

            } else if (chapterIndex === chapters) {
              // 是最後一個 chapter 的話 return
              console.log('// 是最後一個 chapter 的話 return')
              return
            }
          }
        }
      }
    },
    changeContent(action) {
      let addContent = this.$store.getters.getBookContent;

      if (action === 'prevSection') {
        addContent = {
          chapter: addContent.chapter,
          h1title: addContent.h1title,
          h3title: this.documentContent.books[this.bookLocation.chapterIndex]
            .sections[this.bookLocation.sectionIndex -1].title,
          content: this.documentContent.books[this.bookLocation.chapterIndex]
            .sections[this.bookLocation.sectionIndex -1].content
        };
        this.bookLocation.sectionIndex -= 1
        this.$store.commit('setBookContent', addContent);
        this.resetDefault('lastPage');
      } else if (action === 'prevChapter') {
        console.log('準備更新chap');
        addContent = {
          chapter: this.documentContent.books[this.bookLocation.chapterIndex - 1]
            .chapter,
          h1title: this.documentContent.books[this.bookLocation.chapterIndex - 1]
            .title,
          h3title: this.documentContent.books[this.bookLocation.chapterIndex - 1]
            .sections[this.bookLocation.sections - 1].title,
          content: this.documentContent.books[this.bookLocation.chapterIndex - 1]
            .sections[this.bookLocation.sections - 1].chapters
        };
        this.$store.commit('setBookContent', addContent);
        this.bookLocation.chapterIndex -= 1;
        this.bookLocation.sectionIndex = this.bookLocation.sections;
        this.resetDefault('lastPage');
      } else if (action === 'nextSection') {
        // 切換 section
        addContent = {
          chapter: addContent.chapter,
          h1title: addContent.h1title,
          h3title: this.documentContent.books[this.bookLocation.chapterIndex]
            .sections[this.bookLocation.sectionIndex +1].title,
          content: this.documentContent.books[this.bookLocation.chapterIndex]
            .sections[this.bookLocation.sectionIndex +1].content
        };

        this.bookLocation.sectionIndex += 1
        this.$store.commit('setBookContent', addContent)
        this.resetDefault('firstPage');
      } else if (action === 'nextChapter') {
        // 切換章節

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
        this.bookLocation.sections = this.documentContent.books[this.bookLocation.chapterIndex].sections.length,
        this.resetDefault('firstPage');
      }
      this.nowWordsCount = this.bookContent.content.length
    },
    resetDefault(setting) {
      if (setting === 'firstPage') {
        this.bookLocation.pageIndex = 0;
        this.$store.commit('setBookLocation', this.bookLocation);
      } else if (setting === 'lastPage') {
        this.bookLocation.pageIndex = pages -1
      }
      this.$store.commit('setBookLocation', this.bookLocation);
    },
    touchStart(e) {
      if (
        e.target.classList.contains('char') &&
        !this.isBetween(parseInt(e.target.getAttribute('index')))
      ) {
        this.selected.start = parseInt(e.target.getAttribute('index'));
      } else {
        this.clearSelected();
      }
    },
    touchEnd() {
      this.$store.commit('addNotes', this.selected);
      console.log(this.$store.getters.getNotes);
    },
    touchMove(e) {
      // console.log(e.target.getBoundingClientRect());
      let changedTouch = e.changedTouches[0];
      let target = document.elementFromPoint(
        changedTouch.clientX,
        changedTouch.clientY
      );
      if (target.classList.contains('char') && this.selected.start) {
        this.selected.end = parseInt(target.getAttribute('index'));
        this.setSelected();
      }
      this.isShowTooltip = true;
    },
    clearSelected() {
      this.selected.start = 0;
      this.selected.end = 0;
      document.querySelectorAll('.selected').forEach(obj => {
        obj.classList.remove('selected');
      });
      this.isShowTooltip = false;
    },
    setSelected() {
      document.querySelectorAll('.selected').forEach(obj => {
        obj.classList.remove('selected');
      });
      this.isShowTooltip = false;
      if (this.selected.start > this.selected.end) {
        for (let i = this.selected.start - 1; i > this.selected.end - 2; i--) {
          document.querySelectorAll('.char')[i].classList.add('selected');
        }
      } else {
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
