<template>
  <div class="index">
    <div class="index__backround"></div>
    <div class="index__container">
      <nav>
        <img :src="require('@/assets/menu/back.svg')">
        <!-- <div class="back-direction"></div> -->
        <div>返回</div>
      </nav>
      <ul class="index__outline">
        <li>封面</li>
        <li>目錄</li>
        <li>引言</li>
        <li class="index__chapter">
          <span>第 1 章</span>
          <ul>
            <li>有目的的練習</li>
            <li>史蒂夫的超強記憶力</li>
            <li>各領域的傑出人物都靠大量練習</li>
            <li>從有目的的練習講起</li>
            <li>遇到瓶頸怎麼辦</li>
            <li>有目的的練習還不夠</li>
          </ul>
        </li>
        <li class="index__chapter">
          <span>第 2 章</span>
          <ul>
            <li>大腦的適應力</li>
            <li>倫敦計程車司機的大腦</li>
            <li>走出舒適區的重要性</li>
            <li>練習改變大腦結構</li>
            <li>潛能可以被構築</li>
          </ul>
        </li>
        <li class="index__chapter">
          <span>第 3 章</span>
          <ul>
            <li>心裡表徵</li>
            <li>偶然的盲棋大師</li>
            <li>大師比新手強在哪裡</li>
            <li>心裡表徵是什麼</li>
            <li>心裡表徵有助於找出規律</li>
            <li>心裡表徵</li>
            <li>偶然的盲棋大師</li>
            <li>大師比新手強在哪裡</li>
            <li>心裡表徵是什麼</li>
            <li>心裡表徵有助於找出規律</li>
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
  background: rgba(155, 155, 155, 0.9);
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
    // position: absolute;
    // top: 0;
    // left: 0;
    // width: 100%;
    img{
      margin-right: 24px;
    }
  }

  &__outline {
    margin-top: 50px;
    padding-left: 0;
    padding-bottom: 3em;
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
      }

      > ul {
        // 章節名稱
        position: relative;
        top: -2.75rem;
        padding-left: 65px;
      }
    }
    > li {
      padding-left: 34px;
    }
  }

  &__chapter + &__chapter {
    position: relative;
    margin-top: -2.75em;
  }
}
</style>


<script>
export default {};
</script>
