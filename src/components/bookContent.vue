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
          height: `${newContentHeight}`
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
    <div class="page">- {{ nowPage }} -</div>
    <div class="touch">
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
</style>

<script>
import documentContent from '@/assets/document.json';
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
      maxWordsCount: [1845, 1342, 1024, 791, 626, 447, 262, 188, 142, 96, 82],
      pagesDistance: [138, 115.5, 101, 89.5, 79, 105, 74, 42.75, 50, 37, 35],
      pageDistance: 0,
      scrollHeight: '',
      setting: {
        lineHeight: 1.75,
        fontSetting: 5,
        page: 0
      },
      fontSetting: [
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
      wholePage: 1,
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
      handler: function (val) {
        this.countPageHeight()
      },
      deep: true
    }
  },
  computed: {
    newContentHeight() {
      return this.$store.getters.getBookLocation.newContentHeight;
    },
    aLineHeight() {
      const lineHeight = this.setting.lineHeight;
      const fontSize = this.fontSetting[this.setting.fontSetting].fontSize
      const result = lineHeight * fontSize
      return result
    },
    containerHeight() {
      const line = this.fontSetting[this.setting.fontSetting].line;
      const viewport = this.aLineHeight * line
      return viewport
    },
    showTooltip() {
      return this.isShowTooltip;
    },
    nowPage () {
      this.bookLocation.nowPage = this.bookLocation.sectionPage + 1
      this.$store.commit('setBookLocation', this.bookLocation)
      return this.bookLocation.nowPage
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
      return this.$store.getters.getBookContent;
    },
    bookLocation() {
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
    positionContent_dont_use() {
      console.log('positionContent', this.addLocation.sectionPage);
      if (this.addLocation.sectionPage === 1) {
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
      console.log('positionContent', this.bookLocation.sectionPage);
      if (this.bookLocation.sectionPage === 1) {
        // this.pageDistance == 0 ;
      } else if (this.bookLocation.sectionPage > 1) {
        // if (this.nowWordsCount > this.maxWordsCount[this.sizeLevel]) {
          // 超過一頁
          // console.log(
          //   '',
          //   this.nowWordsCount,
          //   this.maxWordsCount[this.sizeLevel]
          // );
          // this.pageDistance ==
          //   {
          //     transform: `translateX(-${this.pagesDistance[this.sizeLevel]}em)`
          //   };
        // } else {
          // this.pageDistance == { transform: `translateX(0)` };
        // }
      }
      return this.pageDistance;
    }
  },
  mounted() {
    this.countPageHeight()
    this.$nextTick( () => {
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
          const scrollHeight = this.$refs.viewport.scrollHeight // 內容原長度
          const viewport = this.containerHeight // 容器顯示高度
          const lineHeight = this.aLineHeight // 單行的總高度
          const remain = scrollHeight % viewport
          let page = Math.floor(scrollHeight / viewport)

          this.$refs.viewport.scrollTop = 0 // 每次一切換章節就顯示第一頁
          this.bookLocation.totalPages = (remain >= (lineHeight * 3)) ? page +=1 : page
          this.bookLocation.newContentHeight = `${this.bookLocation.totalPages * viewport}px`
          this.$store.commit('setBookLocation', this.bookLocation);
          console.log(
            'countPageHeight called! \n',
            'scrollHeight: ', scrollHeight,
            'scrollTop: ', this.$refs.viewport.scrollTop,
            'viewport: ', viewport,
            'lineHeight: ', lineHeight,
            'remain: ', remain,
            'page: ', page,
            'totalPage: ', this.bookLocation.totalPages,
            'this.newContentHeight: ',this.newContentHeight
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

          this.bookLocation.sectionPage += 1
          this.$store.commit('setBookLocation', this.bookLocation)

          viewport.scrollTop =
            this.bookLocation.sectionPage * viewport.clientHeight

        } else if (action === 'prev') {
          if (this.bookLocation.sectionPage < 1) {
            return
          } else {
            this.bookLocation.sectionPage -= 1
            this.$store.commit('setBookLocation', this.bookLocation)
          }

          viewport.scrollTop =
          this.bookLocation.sectionPage * viewport.clientHeight
        }
        return
      })
    },
    toggleSection(action) {
      if (action === 'prev') {
        if (this.bookLocation.sectionPage === 0) {
          // 在該 section 第一頁了，切換上一個 section
        }
      }
      
      let chapters = this.bookLocation.bookChapters
      let chapterIndex = this.bookLocation.bookIndex

      let sections = this.bookLocation.sections
      let sectionIndex = this.bookLocation.sectionIndex
      
      let pages = this.bookLocation.totalPages
      let pageIndex = this.bookLocation.sectionPage
      let page = this.bookLocation.nowPage

      console.log(`
        chapters: ${chapters} \n
        chapterIndex: ${chapterIndex} \n
        sections: ${sections} \n
        sectionIndex: ${sectionIndex} \n
        pages: ${pages} \n
        pageIndex: ${pageIndex} \n
        page: ${page} \n
      `)

      if (action === 'next') {
        if (page === pages) {
          // 在該 section 最後一頁
          console.log(`最後一夜`)

          if (sectionIndex+1 < sections) {
             // 如果不是這個 chapter 最後一個 section，切換下一個 section
            // this.bookLocation.sectionIndex += 1
            // this.bookLocation.sectionPage = 0
            // this.$store.commit('setBookLocation', this.bookLocation);
            this.bookLocation.newContentHeight = ''
            this.$store.commit('setBookLocation', this.bookLocation)
            this.changeContent('nextSection');
            
            //  console.log(`不是這個 chapter 最後一個 section，切換下一個 section: ${sectionIndex}, ${action}`);
          } else if (sectionIndex+1 === sections) {
             // 如果是這個 chapter 最後一個 section
            if (chapterIndex < chapters) {
              // 檢查是不是最後一個 chapter
              // 不是最後一個 chapter，切換下一個 chapter 的 第一個 section
              // this.bookLocation.bookIndex += 1
              // this.bookLocation.sectionIndex = 0
              // this.bookLocation.sectionPage = 0
              // this.$store.commit('setBookLocation', this.bookLocation);
              this.bookLocation.newContentHeight = ''
              this.$store.commit('setBookLocation', this.bookLocation)
              this.changeContent('nextChapter');

            } else if (chapterIndex === chapters) {
              // 是最後一個 chapter 的話 return
              return
            }
          }
        }
      }
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
          this.addLocation.sectionPage = 1;
          this.$store.commit('setBookLocation', this.addLocation);
          
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
    changeContent(action) {
      let addContent = this.$store.getters.getBookContent;

      if (action === 'nextSection') {
        // 切換 section
        addContent = {
          chapter: addContent.chapter,
          h1title: addContent.h1title,
          h3title: this.documentContent.books[this.bookLocation.bookIndex]
            .sections[this.bookLocation.sectionIndex +1].title,
          content: this.documentContent.books[this.bookLocation.bookIndex]
            .sections[this.bookLocation.sectionIndex +1].content
        };

        this.bookLocation.sectionIndex += 1
        this.$store.commit('setBookContent', addContent);
        this.resetDefault('firstPage');
      } else if (action === 'nextChapter') {
        // 切換章節

        this.bookLocation.bookIndex += 1;
        addContent = {
          chapter: this.documentContent.books[this.bookLocation.bookIndex]
            .chapter,
          h1title: this.documentContent.books[this.bookLocation.bookIndex]
            .title,
          h3title: this.documentContent.books[this.bookLocation.bookIndex]
            .sections[0].title,
          content: this.documentContent.books[this.bookLocation.bookIndex]
            .sections[0].content
        };

        this.$store.commit('setBookContent', addContent);
        
        this.bookLocation.sectionIndex = 0;
        this.resetDefault('firstPage');
      } else if (action === 'prevSection') {
        addContent = {
          chapter: addContent.chapter,
          h1title: addContent.h1title,
          h3title: this.documentContent.books[this.bookLocation.bookIndex]
            .sections[this.bookLocation.sectionIndex].title,
          content: this.documentContent.books[this.bookLocation.bookIndex]
            .sections[this.bookLocation.sectionIndex].content
        };
        this.$store.commit('setBookContent', addContent);
        this.resetDefault('lastPage');
      } else if (action === 'prevChapter') {
        console.log('準備更新chap');
        addContent = {
          chapter: this.documentContent.books[this.bookLocation.bookIndex - 1]
            .chapter,
          h1title: this.documentContent.books[this.bookLocation.bookIndex - 1]
            .title,
          h3title: this.documentContent.books[this.bookLocation.bookIndex - 1]
            .sections[this.bookLocation.sections - 1].title,
          content: this.documentContent.books[this.bookLocation.bookIndex - 1]
            .sections[this.bookLocation.sections - 1].content
        };
        this.$store.commit('setBookContent', addContent);
        this.bookLocation.bookIndex -= 1;
        this.bookLocation.sectionIndex = this.bookLocation.sections;
        this.resetDefault('lastPage');
      }
      this.nowWordsCount = this.bookContent.content.length;
    },
    resetDefault(setting) {
      if (setting === 'firstPage') {
        // 定位 section 第一頁
        this.bookLocation.sectionPage = 0;
        this.$store.commit('setBookLocation', this.bookLocation);
        // this.pageDistance = {
        //   transform: `translateX(0)`
        // };
      }
      // } else if (setting === 'lastPage') {
        // 定位 section 最後一頁
        
        this.$store.commit('setBookLocation', this.bookLocation);
        // this.pageDistance = {
        //   transform: `translateX(-${this.pagesDistance[this.sizeLevel]}em)`
        // };
      // }
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
