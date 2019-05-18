<template>
  <div class="index">
    <div class="index__background" @click="closeIndexStatus"></div>
    <div class="index__container">
      <nav>
        <div @click="closeIndexStatus">
          <img :src="require('@/assets/menu/back.svg')" />
          <span>返回</span>
        </div>
      </nav>
      <ul class="index__outline">
        <li
          v-for="(book, bookIndex) in document.books"
          :key="bookIndex"
          class="index__chapter"
        >
          <span
            v-if="showChapter(bookIndex)"
            class="index__chapterName"
            @click="loadChapter(bookIndex, book)"
          >
            {{ book.chapter }}
            <span
              @click="emitContent(book.chapter, book.title, '', book.content)"
              >{{ book.title }}</span
            >
          </span>
          <ul v-if="showSubTitle(book.chapter)" class="index__section">
            <li
              v-for="(section, sectionIndex) in book.sections"
              :key="sectionIndex"
              class="index__section__list"
              @click="loadBookContent(book, bookIndex, section, sectionIndex)"
            >
              <span
                v-if="sectionIndex === 0" class="index__chapterName"
                v-html="getTitleIndex(book.chapter)"
              >
              </span>
              <span class="index__sectionName">{{ section.title }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.index {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 100;
  &__background {
    height: 100vh;
    width: 100%;
    background: rgba(155, 155, 155, 0.9);
    position: fixed;
    top: 0;
  }

  &__container {
    position: relative;
    background: $white-2;
    top: 23px;
    width: 658px;
    height: calc(100vh - 23px);
    overflow: hidden;
  }

  nav {
    display: flex;
    padding-left: 20px;
    border-bottom: 2px solid $gray-3;
    line-height: 2.8em;
    img {
      margin-right: 24px;
    }
    > div {
      display: flex;
      justify-content: center;
      cursor: pointer;
    }
  }

  &__chapter {
    padding-left: 34px;
    > .index__chapterName {
      // 封面、引言避免絕對定位
      position: relative;
      height: 3rem;
    }
  }

  &__section {
    padding-left: 0;
    font-size: 16px;
    color: #595959;
    line-height: 2.8rem;
    height: min-content;
    cursor: pointer;
    .index__section__list {
      position: relative;
      padding-left: 65px;
    }
  }
  
  &__chapterName {
    position: absolute;
    left: 0;
    min-height: 2.8em;
  }
  &__chapterName,
  &__sectionName {
    color: $black-2;
    line-height: 2.8rem;
  }

  &__outline {
    display: flex;
    flex-flow: wrap;
    padding-left: 0;
    padding-bottom: 6em;
    overflow: auto;
    height: 100%;

    li {
      list-style: none;
      height: min-content;
      cursor: pointer;
      flex-basis: 100%;
    }
  }
}
.functions-row {
  .index {
    &__container {
      margin-left: auto;
    }
    &__outline {
      margin-top: 32px;
      padding-right: 10px;
      unicode-bidi: normal;
      direction: rtl;
      writing-mode: horizontal-tb;
      flex-flow: row nowrap;
      overflow-x: auto;
      overflow-y: hidden;  
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        display: none;
      }
    }

    &__chapter {
      position: relative;
      padding-left: 0;
      min-width: 2.8em;
      flex: 0 0 auto;
    }

    &__chapterName {
      min-height: auto;
      position: absolute;
      top: 0;
      right: 0;
      /deep/ .index__chapterName__index {
        writing-mode: initial;
        letter-spacing: 0;
        height: 2rem;
        line-height: 1.8;
      }
    }

    &__section {
      display: flex;
      padding-right: 0;
      .index__section__list {
        padding-left: 0;
        
        .index__sectionName {
          padding-top: 120px;
        }
      }
      &:empty {
        line-height: 0;
      }
    }

    &__chapterName,
    &__sectionName {
      writing-mode: vertical-rl;
      letter-spacing: 0.5em;
    }
  }
}
</style>

<script>
import document from '@/assets/document.json';

export default {
  data() {
    return {
      document
    };
  },
  methods: {
    getTitleIndex (chapterTitle) {
      const arr = chapterTitle.split('');
      const chapterIndex = chapterTitle.slice(1, -1);
      const finalChapterTitle = 
        `${arr[0]}<span class="index__chapterName__index">${chapterIndex}</span>${arr[arr.length-1]}`;
      return finalChapterTitle;
    },
    closeIndexStatus() {
      this.$emit('closeIndexStatus', false);
    },
    loadBookContent(book, chapterIndex, section, sectionIndex) {
      let bookContent = {
        chapter: book.chapter,
        h1title: book.title,
        h3title: section.title,
        content: section.content
      };

      let bookLocation = {
        chapters: this.document.books.length,
        chapterIndex: chapterIndex,
        sections: this.document.books[chapterIndex].sections.length,
        sectionIndex: sectionIndex,
        pageIndex: 0
      };

      this.$store.commit('setBookContent', bookContent);
      this.$store.commit('setBookLocation', bookLocation);

      console.log(
        book,
        chapterIndex,
        book.length,
        section,
        section.length,
        sectionIndex
      );
      this.$emit('emitContent');
    },
    emitContent(chapter, h1title, h3title, content) {
      let data = {
        chapter: chapter,
        h1title: h1title,
        h3title: h3title,
        content: content
      };
      this.$store.commit('setBookContent', data);
      //  console.log(this.$store.getters.getBookContent);
      this.$emit('emitContent');
    },
    showSubTitle(chapter) {
      let show = true;
      if (chapter == '引言') {
        show = false;
      }
      return show;
    },
    showChapter(chapterIndex) {
      let show = true;
      if (chapterIndex >= 2) {
        show = false;
      }
      return show;
    },
    loadChapter(chapterIndex, book) {
      console.log(chapterIndex, book);
      if (chapterIndex == 0) {
        this.$router.push({ name: 'bookCover' });
      } else if (chapterIndex == 1) {
        this.emitContent(
          book.chapter,
          book.title,
          book.sections[0].title,
          book.sections[0].content
        );
      }
    },
    finishTask() {
      let index = 0;
      this.$store.commit('setTask', index);
      console.log(this.$store.getters.getTask);
    }
  }
};
</script>
