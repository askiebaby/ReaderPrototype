<template>
  <section class="notes">
    <div class="notes__container">
      <nav class="notes__nav">
        <div class="notes__nav__close"><img :src="require('@/assets/menu/back-white.svg')" alt="BACK"></div>
        <div class="notes__nav__title">
          <h2>筆記庫</h2>
        </div>
      </nav>
      <div class="">
        <article class="note">
          <div class="note__highlight note__highlight--pink"></div>
          <div class="note__record">
            <div class="note__sentence">你可以採用錄影的測量方法，或者簡單地每天照一照鏡子，感受一下你的進步。</div>
            <div class="note__memo"></div>
          </div>
          <div class="note__actionButton"><img :src="require('@/assets/menu/dropdown-doubleline.svg')" alt="More Actions"></div>
        </article>
        <article class="note">
          <div class="note__highlight note__highlight--blue"></div>
          <div  class="note__record">
            <div class="note__sentence">一旦某個人的表現達到了“可接受”的水平，並且可以做到自動化，那麼，再多“練習”幾年，也不會有什麼進步。甚至說，在本行業幹了20年的醫生、老師或司機，可能還稍稍比那些只幹了5年的人差一些，原因在於，如果沒有刻意地去提高，這些自…</div>
            <div class="note__memo">人們通常錯誤地理解這種現象，因為他們自以為，繼續開車、打網球或烘焙餅乾，就是一種形式的練習，如果不停地做下去，自己一定能夠更擅長，也許進步較為緩慢，但最終還是會更出色。</div>
          </div>
          <div class="note__actionButton"><img :src="require('@/assets/menu/dropdown-doubleline.svg')" alt="More Actions"></div>
        </article>
        <article class="note">
          <div class="note__highlight note__highlight--yellow"></div>
          <div class="note__record">
            <div class="note__sentence">人類的身體有一種偏愛穩定性的傾向。它保持穩定的內部溫度，保持穩定的血壓和心率，並使得血糖穩定、PH值（即酸鹼度水平）平衡。它使我們的體重日復一日地保持合理的一致。</div>
            <div class="note__memo"></div>
          </div>
          <div class="note__actionButton"><img :src="require('@/assets/menu/dropdown-doubleline.svg')" alt="More Actions"></div>
        </article>
        <article class="note">
          <div class="note__highlight note__highlight--green"></div>
          <div class="note__record">
            <div class="note__sentence">人類大腦和身體通過發展新的潛力以響應各種挑戰的事實，其背後潛藏的原理是有目的的練習和刻意練習的有效性。倫敦計程車司機、奧運會體操選手或者音樂節上小提琴演奏家等人的訓練，事實上是一種充分利用大腦和身體的適應能力發展和提升新…</div>
            <div class="note__memo">練習改變大腦結構</div>
          </div>
          <div class="note__actionButton"><img :src="require('@/assets/menu/dropdown-doubleline.svg')" alt="More Actions"></div>
        </article>
      </div>
    </div>
    
    
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/modules/_words-lines.scss';

.notes {
  position: relative;
  width: 100%;
  height: 100vh;
  background: rgba(155, 155, 155, 0.9);
  position: fixed;
  top: 0;
  z-index: 100;
  &__container {
    position: absolute;
    background: #f4f4f4;
    top: 0;
    right: 0;
    width: 658px;
    height: calc(100vh - 23px);
    overflow: hidden;
      > div {
      &:nth-child(2) {
        padding: 10px 0;
      }
    }
  }
  &__nav {
    h2 {
      font-size: $indexSize;
    }
    > div {
      text-align: center;
    }
    background: $black-1;
    color: $white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 18px 0 13px;
    text-align: center;
    &__close {
      flex-basis: 40px;
      margin-top: 5px;
    }
    &__title {
      flex-grow: 1;
    }
  }
}

.note {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px 5px;
  &__highlight {
    width: 13px;
    height: 119px;
    flex-shrink: 0;
    &--pink {
      background: $red-pen;
    }
    &--yellow {
      background: $yellow-pen;
    }
    &--purple {
      background: $purple-pen;
    }
    &--green {
      background: $green-pen;
    }
    &--blue {
      background: $blue-pen;
    }
  }
  &__record {
    flex-basis: calc(95% - 50px);
    text-align: justify;
  }
  &__actionButton {
    flex-basis: 50px;
    height: 50px;
    text-align: center;
    cursor: pointer;
  }
  &__sentence {
    @include lines (3);
    font-size: 14px;
    margin-bottom: 15px;
  }
  &__memo {
    @include lines (2);
    font-size: 12px;
    color: #2e2e2e;
    min-height: 37px;
    padding-left: 10px;
    border-left: 2px solid #8c8b8c;
    &:empty {
      min-height: 0;
    }
  }
}
</style>

<script>
export default {

};
</script>
