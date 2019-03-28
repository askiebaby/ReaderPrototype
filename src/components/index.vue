<template>
  <div class="index">
    <div class="index__backround" @click="closeIndexStatus">
      <div class="index__container">
        <nav>
          <div @click="closeIndexStatus">
            <img :src="require('@/assets/menu/back.svg')">
            <span>返回</span>
          </div>
        </nav>
        <ul class="index__outline">
          <li class="index__chapter" v-for="(book, bookIndex) in document.books">
            <span v-if="ShowChapter(bookIndex)" @click="loadChapter(bookIndex,book)">
              {{book.chapter}}
              <span
                @click="emitContent(book.chapter,book.title,'',book.content)"
              >{{book.title}}</span>
            </span>
            <ul>
              <li
                v-for="(section, sectionIndex) in book.sections"
                v-if="ShowSubTitle(book.chapter)"
                @click="loadBookContent(book, bookIndex, section, sectionIndex)"
              >
                <span v-if="sectionIndex === 0" class="index__chapterName">{{book.chapter}}</span>
                <span>{{section.title}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100vh;
  background: rgba(155, 155, 155, 0.9);
  position: fixed;
  top: 0;
  z-index: 100;

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

  &__chapterName {
    position: absolute;
    left: 0;
  }

  &__outline {
    padding-left: 0;
    padding-bottom: 6em;
    overflow: auto;
    height: 100%;

    li {
      padding-left: 0;
      list-style: none;
      font-size: $indexSize;
      color: $black-2;
      line-height: 2.8rem;
      height: min-content;
      cursor: pointer;

      > span {
        line-height: 2.8em;
        > span {
          margin-left: 10px;
        }
      }

      > ul {
        // 章節名稱
        padding-left: 0;
        > li {
          position: relative;
          padding-left: 65px;
        }
      }
    }
    > li {
      padding-left: 34px;
    }
  }
}
</style>


<script>
import document from "@/assets/document.json";

export default {
  data() {
    return {
      // content,
      document
    };
  },
  methods: {
    closeIndexStatus() {
      this.$emit("closeIndexStatus", false);
    },
    loadBookContent(book, bookIndex, section, sectionIndex) {
      let bookContent = {
        chapter: book.chapter,
        h1title: book.title,
        h3title: section.title,
        content: section.content
      };

      let bookLocation = {
        bookChapters: this.document.books.length,
        bookIndex: bookIndex,
        sections: this.document.books[bookIndex].sections.length,
        sectionIndex: sectionIndex,
        page: 1
      };

      this.$store.commit("setBookContent", bookContent);
      this.$store.commit("setBookLocation", bookLocation);
      // console.log(this.$store.getters.getBookContent)

      console.log(
        book,
        bookIndex,
        book.length,
        section,
        section.length,
        sectionIndex
      );
      console.log(this.document.books.length);
      console.log(this.document.books[bookIndex].sections.length);
      this.$emit("emitContent");
    },
    emitContent(chapter, h1title, h3title, content) {
      let data = {
        chapter: chapter,
        h1title: h1title,
        h3title: h3title,
        content: content
      };
      this.$store.commit("setBookContent", data);
      //  console.log(this.$store.getters.getBookContent);
      this.$emit("emitContent");
    },
    ShowSubTitle(chapter) {
      let show = true;
      if (chapter == "引言") {
        show = false;
      }
      return show;
    },
    ShowChapter(bookIndex) {
      let show = true;
      if ((bookIndex == 2) | (bookIndex == 3)) {
        show = false;
      }
      return show;
    },
    loadChapter(bookIndex, book) {
      console.log(bookIndex, book);
      if (bookIndex == 0) {
        this.$router.push({ name: "bookCover" });
      } else if (bookIndex == 1) {
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
      this.$store.commit("setTask", index);
      console.log(this.$store.getters.getTask);
    }
  }
};
</script>
