<template>
  <div class="book">
    <div>
      <h2 class="book__chapter">{{bookContent.chapter}} {{bookContent.h1title}}</h2>
      <div class="book__content"
      :style="pageDistance">
        <h3 class="book__subtitle">
          {{bookContent.h3title}}
        </h3>
        <p>
          {{bookContent.content}}
        </p>
      </div>
    </div>
    <div class="page">-1-</div>
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
    max-height: 59.5em;
    left: 6em;
    width: 120em;
    column-gap: 16em;
    column-width: 30em;
    h3 {
      font-size: 12px;
    }
  }
}
.fontSize__14px {
  .book__content {
    font-size: 14px;
    max-height: 50.75em;
    left: 5.142em;
    width: 112em;
    column-gap: 23em;
    column-width: 30em;
    h3 {
      font-size: 14px;
    }
  }
}
.fontSize__16px {
  .book__content {
    font-size: 16px;
    max-height: 45.5em;
    left: 4.5em;
    width: 88em;
    column-gap: 10em;
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
    width: 96em;
    column-gap: 27em;
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
    width: 72em;
    column-gap: 10em;
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
    column-gap: 9em;
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
    width: 70em;
    column-gap: 4em;
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
    width: 45em;
    height: 22.75em;
    column-gap: 10em;
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
    column-gap: 10em;
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
    width: 33em;
    height: 22.75em;
    column-gap: 7em;
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
    column-gap: 6em;
    column-width: 10em;
    h3 {
      font-size: 52px;
    }
  }
}

.page {
  position: absolute;
  bottom: 16px;
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
      pagesDistance: [0, 0, 0, 0, 58.5, 35, 0, 27.5, 25, 20, 0],
      pageDistance: { transform: 'translate(0, 0)'}
    };
  },
  methods: {

    toggleNavigation() {
      this.$emit("toggleNavigation")
    },
    loadBookContent (action) {
      this.$emit("loadBookContent")
      this.nowWordsCount = this.bookContent.content.length
      this.togglePage(action)
      console.log(this.bookContent, this.nowWordsCount, 'sizeLevel: ')

    },
    togglePage (action) {
      if(action==='next'){
        if (this.nowWordsCount > this.maxWordsCount[this.sizeLevel]) {
          console.log('有第二頁', this.bookLocation)
          this.pageDistance = {transform: `translate(-${this.pagesDistance[this.sizeLevel]}em, 0)`}
        } else {
          console.log('只有第一頁')
          // 載入下一個章節
        }
      }else if (action==='prev') {
        if (this.nowWordsCount > this.maxWordsCount[this.sizeLevel]) {
          // console.log('只有第一頁')
            this.pageDistance = {transform: `translate(0, 0)`}
            console.log(this.bookLocation)
          // 載入上一個頁面
        } else {
          console.log('只有第一頁')
          console.log(this.bookLocation)

        }
      }
    }
  },
  computed: {
    bookContent () {
      return this.$store.getters.getBookContent
    },
    bookLocation () {
      return this.$store.getters.getBookLocation
      // bookIndex, bookChapters, sectionIndex, sections
    }
  }
  // created() {
  //   this.bookContent = this.$store.getters.getBookContent
  // }
};
</script>
