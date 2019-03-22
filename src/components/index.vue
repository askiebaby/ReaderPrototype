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
            <span>{{index.title}}</span>
          </span>
          <ul>
            <li
              v-for="section in index.sections"
              v-if="ShowSubTitle(index.chapter)"
              @click="emitContent(index.chapter,index.title,section.title,section.content)"
            >{{section.title}}</li>
          </ul>
        </li>
        <!-- <li>封面</li>
        <li @click="emitContentKey(1)">目錄</li>
        <li @click="emitContentKey(2, 1)">引言</li>
        <li class="index__chapter">
          <span @click="emitContentKey(3, 1)">第 1 章 <span>有目的的練習</span></span>
          <ul>
            <li @click="emitContentKey(3, 2, 0)">史蒂夫的超強記憶力</li>
            <li @click="emitContentKey(3, 2, 1)">各領域的傑出人物都靠大量練習</li>
            <li @click="emitContentKey(3, 2, 2)">從有目的的練習講起</li>
            <li @click="emitContentKey(3, 2, 3)">遇到瓶頸怎麼辦</li>
            <li @click="emitContentKey(3, 2, 4)">有目的的練習還不夠</li>
          </ul>
        </li>-->
        <!-- <li class="index__chapter">
          <span @click="emitContentKey(4, 1)">第 2 章 <span>大腦的適應力</span></span>
          <ul>
            <li @click="emitContentKey('倫敦計程車司機的大腦')">倫敦計程車司機的大腦</li>
            <li @click="emitContentKey('大腦擁有無限的適應能力')">大腦擁有無限的適應能力</li>
            <li @click="emitContentKey('走出舒適區的重要性')">走出舒適區的重要性</li>
            <li @click="emitContentKey('練習改變大腦結構')"></li>
            <li @click="emitContentKey('潛能可以被構築')">潛能可以被構築</li>
          </ul>
        </li>
        <li class="index__chapter">
          <span @click="emitContentKey(5, 1)">第 3 章 <span>心裡表徵</span></span>
          <ul>
            <li @click="emitContentKey('偶然的盲棋大師')">偶然的盲棋大師</li>
            <li @click="emitContentKey('大師比新手強在哪裡')">大師比新手強在哪裡</li>
            <li @click="emitContentKey('心裡表徵是什麼')">心裡表徵是什麼</li>
            <li @click="emitContentKey('心裡表徵有助於找出規律')">心裡表徵有助於找出規律</li>
            <li @click="emitContentKey('心理表徵有助於解釋資訊')">心理表徵有助於解釋資訊</li>
            <li @click="emitContentKey('心理表徵有助於組織資訊')">心理表徵有助於組織資訊</li>
            <li @click="emitContentKey('心理表徵有助於制訂計劃')">心理表徵有助於制訂計劃</li>
            <li @click="emitContentKey('心理表徵有助於高效學習')">心理表徵有助於高效學習</li>
          </ul>
        </li>-->
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
    emitContent(chapter,h1title,h3title,content) {
      // console.log(index, level, key)
      let data={
        chapter:chapter,
        h1title:h1title,
        h3title:h3title,
        content:content
      }
      this.$store.commit("setBook", data);
       console.log(this.$store.getters.getBookContent);
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
