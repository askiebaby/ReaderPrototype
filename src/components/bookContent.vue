<template>
  <div class="book">
    <div>
      <h2 class="book__chapter">第 1 章　有目的的練習</h2>
      <div class="book__content">
        <!-- <h3 class="book__subtitle">史蒂夫的超強記憶力</h3> -->
        <p>{{loadContent}}</p>
      </div>
    </div>
    <div class="page">-1-</div>
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
    }
  }
  .fontSize__24px {
    .book__content {
      font-size: 24px;
      height: 29.75em;
      left: 3em;
      width: 96em;
      column-gap: 9em;
      column-width: 23em;
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
    }
  }
  .fontSize__48px {
    .book__content {
      font-size: 48px;
      max-height: 14em;
      left: 1.5em;
      // TODO
      width: 33em;
      height: 22.75em;
      column-gap: 7em;
      column-width: 12em;
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
import introJson from '@/assets/document.json';
export default {
  props: ['loadContent'],
  data() {
    return {
      introJson: introJson
    }
  },
  beforeMount() {
      console.log(this.introJson)
  }
}
</script>
