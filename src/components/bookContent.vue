<template>
  <div class="book" @laad="positionContent">
    <h2 class="book__chapter">{{checkFinishStep1}} {{bookContent.h1title}}</h2>
    <div class="book__content" :style="pageDistance">
      <!-- <h3 class="book__subtitle">{{(this.bookLocation.sectionIndex===1)?'' : bookContent.h3title}}</h3> -->
      <h3 class="book__subtitle">{{bookContent.h3title}}</h3>
      <p>{{bookContent.content}}</p>
    </div>
    <div class="page">- {{wholePage}} -</div>
    <div class="touch">
      <div class="touch__previous" @click="loadBookContent('prev')"></div>
      <div class="touch__navigation" @click="toggleNavigation"></div>
      <div class="touch__next" @click="loadBookContent('next')"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/modules/_background.scss";
@import url(https://fonts.googleapis.com/earlyaccess/cwtexming.css); // 明體
@import url(https://fonts.googleapis.com/earlyaccess/cwtexkai.css); // 楷體
@import url(https://fonts.googleapis.com/earlyaccess/notosanstc.css); // 黑體

.book {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-flow: row wrap;
  padding: 89px 72px;
  max-width: 768px;
  margin: auto;
  position: relative;
  // max-height: 100vh;
  height: 1024px;
  &__fontFamily__ming > div {
    font-family: "cwTeXMing", serif;
  }
  &__fontFamily__kai > div {
    font-family: "cwTeXKai", serif;
  }
  &__fontFamily__noto > div {
    font-family: "Noto Sans TC", sans-serif;
  }

  &__chapter {
    font-size: 36px;
    font-size: 2.25rem;
    margin-bottom: 28px;
    margin-bottom: 1.75rem;
    text-align: center;
  }
  &__content {
    overflow: hidden;
    position: absolute;
    column-fill: auto;
    transform: translate(0, 0px);
    top: 165px;
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
    left: 6em;
    width: 190em;
    column-gap: 86em;
    column-width: 30em;
    h3 {
      font-size: 12px;
    }
  }
}
.fontSize__14px {
  .book__content {
    font-size: 14px;
    height: 50.75em;
    left: 5.142em;
    width: 160em;
    column-gap: 71em;
    column-width: 30em;
    h3 {
      font-size: 14px;
    }
  }
}
.fontSize__16px {
  .book__content {
    font-size: 16px;
    height: 45.5em;
    left: 4.5em;
    width: 140em;
    column-gap: 62em;
    column-width: 30em;
    h3 {
      font-size: 16px;
    }
  }
}
.fontSize__18px {
  .book__content {
    font-size: 18px;
    height: 40.25em;
    left: 4em;
    width: 124em;
    column-gap: 55em;
    column-width: 30em;
    h3 {
      font-size: 18px;
    }
  }
}
.fontSize__20px {
  .book__content {
    font-size: 20px;
    left: 3.6em;
    height: 35em;
    width: 110em;
    column-gap: 48em;
    column-width: 30em;
    h3 {
      font-size: 20px;
    }
  }
}
.fontSize__24px {
  .book__content {
    font-size: 24px;
    height: 29.75em;
    left: 3em;
    width: 131em;
    column-gap: 79em;
    column-width: 23em;
    h3 {
      font-size: 24px;
    }
  }
}
.fontSize__30px {
  .book__content {
    font-size: 30px;
    height: 22.75em;
    left: 2.4em;
    width: 95em;
    column-gap: 53em;
    column-width: 20em;
    h3 {
      font-size: 30px;
    }
  }
}
.fontSize__36px {
  .book__content {
    font-size: 36px;
    max-height: 19.25em;
    left: 2em;
    width: 103em;
    height: 22.75em;
    column-gap: 25em;
    column-width: 17em;
    h3 {
      font-size: 36px;
    }
  }
}
.fontSize__42px {
  .book__content {
    font-size: 42px;
    max-height: 15.75em;
    left: 1.714em;
    width: 65em;
    height: 22.75em;
    column-gap: 35em;
    column-width: 12em;
    h3 {
      font-size: 42px;
    }
  }
}
.fontSize__48px {
  .book__content {
    font-size: 48px;
    max-height: 14em;
    left: 1.5em;
    width: 50em;
    height: 22.75em;
    column-gap: 24em;
    column-width: 12em;
    h3 {
      font-size: 48px;
    }
  }
}
.fontSize__52px {
  .book__content {
    font-size: 52px;
    max-height: 14em;
    left: 1.384em;
    width: 82em;
    column-gap: 24em;
    column-width: 10em;
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
import document from "@/assets/document.json";

export default {
  props: ["sizeLevel"],
  data() {
    return {
      document,
      nowWordsCount: 0,
      maxWordsCount: [1845, 1342, 1024, 791, 626, 447, 262, 188, 142, 96, 82],
      pagesDistance: [138, 115.5, 101, 89.5, 79, 105, 74, 42.75, 50, 37, 35],
      pageDistance: { transform: "translateX(0)" },
      // bookContent: {},
      task: this.$store.getters.getTask,
      index: 0,
      addLocation:"",
      wholePage: 1
    };
  },
  methods: {
    loadPageNumber () {
      console.log('loadPageNumber')
    },
    toggleNavigation() {
      this.$emit("toggleNavigation");
    },
    loadBookContent(action) {
      this.$emit("loadBookContent");
      this.nowWordsCount = this.bookContent.content.length;
      this.togglePage(action);
      // console.log(this.bookContent, this.nowWordsCount, "sizeLevel: ", this.sizeLevel);
      // console.log('bookContent: loadBookContent', this.sizeLevel)
    },
    togglePage(action) {

      if (action === 'prev') {
        if (this.nowWordsCount > this.maxWordsCount[this.sizeLevel]) {
          // 超過一頁
          if (this.bookLocation.bookIndex === 1 && this.bookLocation.sectionIndex === 0) {
            this.$emit("loadCoverContent")
            this.addLocation.sectionPage = 1
            this.$store.commit("setBookLocation", this.addLocation);
          } else if (this.addLocation.sectionPage === 1) {
            this.changeSection("prev")
          } else if (this.addLocation.sectionPage > 1) {
            this.addLocation.sectionPage -= 1
            this.$store.commit("setBookLocation", this.addLocation);
            this.pageDistance = {
              transform: `translateX(0)`
            };

            // console.log(this.pageDistance, 'togglePage: prev')
          }

        } else {
          // 只有一頁
          // console.log("只有一頁")
          if (this.bookLocation.bookIndex === 1 && this.bookLocation.sectionIndex === 0) {
            this.$emit("loadCoverContent")
          } else {
            this.changeSection("prev")
          }
        }
      } else if(action === 'next') {
        if (this.nowWordsCount > this.maxWordsCount[this.sizeLevel]) {
          // 超過一頁
          this.addLocation.sectionPage += 1
          this.$store.commit("setBookLocation", this.addLocation);
          
          if (this.addLocation.sectionPage > 2) {
            this.changeSection("next")
          } else {
            this.pageDistance = {
              transform: `translateX(-${this.pagesDistance[this.sizeLevel]}em)`
            };
          }

        } else {
          // 只有一頁
          console.log("只有一頁")
          this.changeSection("next")
        }
      }
    },
    changeSection(action){
      
      if (action==="prev") {
        if (this.bookLocation.sectionIndex === 0) {
          console.log("changeSection: prev, first section")
          this.addLocation.sections = this.document.books[this.bookLocation.bookIndex-1].sections.length
          this.$store.commit("setBookLocation", this.addLocation);
          this.changeContent("prevChapter")
        } else {
          // 不是第一個 section
          console.log("changeSection: prev, 不是第一個 section")
          this.addLocation.sectionIndex -= 1
          this.$store.commit("setBookLocation", this.addLocation);
          this.changeContent("prevSection")
        }
      } else if (action==="next") {
        if (this.bookLocation.sectionIndex < this.bookLocation.sections -1) {
          // 不是最後一個 section
          console.log("changeSection, 不是最後一個 section")
          this.addLocation.sectionIndex += 1
          this.$store.commit("setBookLocation", this.addLocation);
          this.changeContent("nextSection")
          
        } else {
          // 當前 chapter 的最後一個 section
          // TODO 最後一章的最後一個 section 要 return
            this.addLocation.sections = this.document.books[this.bookLocation.bookIndex+1].sections.length
            this.$store.commit("setBookLocation", this.addLocation);
            this.changeContent("nextChapter")
            console.log("changeSection, 當前 chapter 的最後一個 section")
          
        }
      }
      
    },
    changeContent (action) {

      let addContent = this.$store.getters.getBookContent;
      
      if (action === "nextSection"){
        // 切換 section
        addContent = {
          chapter: addContent.chapter,
          h1title: addContent.h1title,
          h3title: this.document.books[this.addLocation.bookIndex].sections[this.addLocation.sectionIndex].title,
          content: this.document.books[this.addLocation.bookIndex].sections[this.addLocation.sectionIndex].content
        }
        this.$store.commit("setBookContent", addContent);
        this.resetDefault('firstPage')
      } else if (action === "nextChapter") {
        // 切換章節
        console.log(this.addLocation.bookChapters);
        addContent = {
          chapter: this.document.books[this.addLocation.bookIndex+1].chapter,
          h1title: this.document.books[this.addLocation.bookIndex+1].title,
          h3title: this.document.books[this.addLocation.bookIndex+1].sections[0].title,
          content: this.document.books[this.addLocation.bookIndex+1].sections[0].content
        }
        this.$store.commit("setBookContent", addContent);
        this.addLocation.bookIndex += 1
        this.addLocation.sectionIndex = 0
        this.resetDefault('firstPage')
      } else if (action === "prevSection") {
        addContent = {
          chapter: addContent.chapter,
          h1title: addContent.h1title,
          h3title: this.document.books[this.addLocation.bookIndex].sections[this.addLocation.sectionIndex].title,
          content: this.document.books[this.addLocation.bookIndex].sections[this.addLocation.sectionIndex].content
        }
        this.$store.commit("setBookContent", addContent);
        this.resetDefault('lastPage')
      } else if (action === "prevChapter") {

        console.log("準備更新chap")
        addContent = {
          chapter: this.document.books[this.addLocation.bookIndex-1].chapter,
          h1title: this.document.books[this.addLocation.bookIndex-1].title,
          h3title: this.document.books[this.addLocation.bookIndex-1].sections[this.addLocation.sections-1].title,
          content: this.document.books[this.addLocation.bookIndex-1].sections[this.addLocation.sections-1].content
        }
        this.$store.commit("setBookContent", addContent);
        this.addLocation.bookIndex -= 1
        this.addLocation.sectionIndex = this.addLocation.sections
        this.resetDefault('lastPage')
      }
      this.nowWordsCount = this.bookContent.content.length;
      
    },
    resetDefault(setting) {
      
      if (setting === 'firstPage') {
        // 定位 section 第一頁
        this.addLocation.sectionPage = 1
        this.$store.commit("setBookLocation", this.addLocation);
        this.pageDistance = {
          transform: `translateX(0)`
        };
      } else if (setting === 'lastPage') {
        // 定位 section 最後一頁
        this.addLocation.sectionPage = 2
        this.$store.commit("setBookLocation", this.addLocation);
        this.pageDistance = {
          transform: `translateX(-${this.pagesDistance[this.sizeLevel]}em)`
        };
      }
      
      
    }
  },
  computed: {
    bookContent() {
      return this.$store.getters.getBookContent;
    },
    bookLocation() {
      return this.$store.getters.getBookLocation;
      // bookIndex, bookChapters, sectionIndex, sections
    },
    checkFinishStep1() {
      if (this.bookContent.chapter == "第1章") {
        if (this.task.length > 0) {
          if (this.task[this.index].time.length === 1) {
            this.$store.commit("setTask", this.index);
            console.log(this.task);
          }
        }
      }
      return this.bookContent.chapter;
    },
    positionContent () {
      console.log(this.bookLocation.sectionPage)
      if (this.bookLocation.sectionPage === 1) {
        this.pageDistance = { transform: `translateX(0)` }
      } else if (this.bookLocation.sectionPage > 1) {
        if (this.nowWordsCount > this.maxWordsCount[this.sizeLevel]) {
          // 超過一頁
          console.log('positionContent', this.nowWordsCount, this.maxWordsCount[this.sizeLevel])
          this.pageDistance = { transform: `translateX(-${this.pagesDistance[this.sizeLevel]}em)` }
        } else {
          this.pageDistance = { transform: `translateX(0)` }
        }
      }
      return this.pageDistance
    }
  },
  created() {
    this.addLocation = this.$store.getters.getBookLocation;
  }
};
</script>
