<template>
  <div class="index">
    <div class="index__backround"></div>
    <div class="index__container">
      <nav>
        <div @click="closeIndexStatus">
          <img :src="require('@/assets/menu/back.svg')">
          <span>返回</span>
        </div>
      </nav>
      <ul class="index__outline">
        <li class="index__chapter" v-for="index in document.indexs">
          <span>
            {{index.chapter}}
            <span
              @click="emitContent(index.chapter,index.title,'',index.content)"
            >{{index.title}}</span>
          </span>
          <ul>
            <li
              v-for="section in index.sections"
              v-if="ShowSubTitle(index.chapter)"
              @click="emitContent(index.chapter,index.title,section.title,section.content)"
            >{{section.title}}</li>
          </ul>
        </li>
      </ul>
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
    emitContent(chapter, h1title, h3title, content) {
      let data = {
        chapter: chapter,
        h1title: h1title,
        h3title: h3title,
        content: content
      };
      this.$store.commit("setBook", data);
      //  console.log(this.$store.getters.getBookContent);
      this.$emit("emitContentKey");
    },
    ShowSubTitle(chapter) {
      let show = true;
      if (chapter == "引言") {
        show = false;
      }
      return show;
    },
    finishTask() {
      let index = 0;
      this.$store.commit("setTask", index);
      console.log(this.$store.getters.getTask);
    }
  }
};
</script>
