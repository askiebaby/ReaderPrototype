<template>
  <div class="book">
    <div>
      <h2 class="book__chapter">第 1 章　有目的的練習</h2>
      <div class="book__content">
        <!-- <h3 class="book__subtitle">史蒂夫的超強記憶力</h3> -->
        <p>我們剛剛進行到第四次練習，史蒂夫·法隆（Steve Faloon）似乎開始洩氣了。那是我做的一個實驗剛剛進行到第一個星期的星期三時的情形。我起初預計，實驗將持續兩三個月之久。但從史蒂夫對我說的話裡，我能感到這個實驗似乎沒什麼太大的意義進行下去了。他對我說：“我的極限似乎在8個數字或者9個數字。”我當時對他說的話錄了音，並且在我們每次上課的時候都會播放。他繼續說，“特別是9個數字，不管我採用什麼方法來記，都很難記住。你知道，我有我自己的方法。但無論我用什麼方法，似乎都不重要了——太難了。”史蒂夫是卡內基梅隆大學的學生，我在那裡教書的時候，曾聘請他參加這個實驗。他一星期和我見幾次面，任務很簡單：記住一串數字。我以大約每秒一個數字的速度，向他讀出一串數字，“7…4…0…1…1…9”，諸如此類，史蒂夫則努力記住所有那些數字，並在我念完之後，把數字背給我聽。實驗的目的是看一看史蒂夫能在多大程度上通過練習來提高記憶。現在，我們進行了四次練習，每次練習1小時，他能穩定地記住7個數字了，也就是說，能夠記住當地的一個電話號碼。通常情況下，他也可以記住8個數字，但如果是9個數字，就有些記住不了。他還根本沒去想記住10個數字組成的數字串。此刻，鑑於他在前幾次練習裡已經倍感失敗，他十分確定，他再也不可能有任何提高了。</p>
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
    // max-height: 100vh;
    height: 1024px;
    &__fontFamily__ming > div {
      font-family: 'cwTeXMing', serif;
    }
    &__fontFamily__kai > div {
      font-family: 'cwTeXKai', serif;
      // font-family: 'DFKai-sb', serif;
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
      * {
        font-weight: normal;
        line-height: 1.75em;
        text-align: justify;
      }
    }

    &__subtitle {}

    p {
      line-height: 1.75em;
      text-indent: 1.5em;
      text-align: justify;
    }
  }
  //10, 12, 14, 16, 18, 20, 24, 30, 36, 42, 48
  .fontSize__10px {
    .book__content {
      font-size: 10px;
      // max-height: 59.5em;
      max-height: 71.75em;
    }
  }
  .fontSize__12px {
    .book__content {
      font-size: 12px;
      max-height: 59.5em;
    }
  }
  .fontSize__14px {
    .book__content {
      font-size: 14px;
      max-height: 50.75em;
    }
  }
  .fontSize__16px {
    .book__content {
      font-size: 16px;
      max-height: 45.5em;
    }
  }
  .fontSize__18px {
    .book__content {
      font-size: 18px;
      max-height: 40.25em;
    }
  }
  .fontSize__20px {
    .book__content {
      font-size: 20px;
      max-height: 35em;
    }
  }
  .fontSize__24px {
    .book__content {
      font-size: 24px;
      max-height: 29.75em;
    }
  }
  .fontSize__30px {
    .book__content {
      font-size: 30px;
      max-height: 22.75em;
    }
  }
  .fontSize__36px {
    .book__content {
      font-size: 36px;
      max-height: 19.25em;
    }
  }
  .fontSize__42px {
    .book__content {
      font-size: 42px;
      max-height: 15.75em;
    }
  }
  .fontSize__48px {
    .book__content {
      font-size: 48px;
      max-height: 14em;
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
import testJson from '@/assets/json/intro.json';
export default {
  data() {
    return {
      
    }
  }
}
</script>
