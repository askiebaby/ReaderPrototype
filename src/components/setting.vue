<template>
  <!-- 任務題目 -->
  <div class="lightBox setting">
    <div class="lightBox__background" @click="hideSetting"></div>
    <div class="lightBox__bubbleLittle">
      <div class="lightBox__content">
        <div class="function function__lightness"></div>
        <div class="function function__fontSize">
          <span>Aa</span>
          <span>Aa</span>
        </div>
        <div class="function function__background">
          <span class="function__background__white"></span>
          <span class="function__background__black"></span>
          <span class="function__background__yellow"></span>
          <span class="function__background__green"></span>
        </div>
        <div class="function function__fontFamily">
          <select>
            <option>標楷體</option>
          </select>
        </div>
        <div class="function function__pageMode">
          <div class="function__pageMode__title">翻頁模式</div>
          <div class="function__pageMode__content">
            <span>捲動</span>
            <span class="active">翻頁-單欄</span>
            <span>翻頁-雙欄</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/modules/_lightBox.scss";
@import "@/assets/scss/modules/_button.scss";

.function {
  display: flex;
  justify-items: center;
  flex-flow: row nowrap;

  > span,
  > select {
    border: 1px solid $lightGray;
    border-radius: 6px;
    text-align: center;
    flex-grow: 1;
    padding: 8px 0;
    min-height: 34px;
    cursor: pointer;
  }

  select {
    text-align-last: center;
    font-size: $contentSize;
    padding: 20px 0;
    height: 40px;
    background: $white;
    font-weight: 300;
  }

  > span + span {
    margin-left: 10px;
  }

  &__fontSize {
    margin-bottom: 28px;
    span {
      background: $lightGray-2;
    }
  }

  &__background {
    margin-bottom: 24px;

    &__white {
      background: $white;
    }
    &__black {
      background: $black;
    }
    &__yellow {
      background: $yellow;
    }
    &__green {
      background: $green-2;
    }
  }

  &__fontFamily {
    margin-bottom: 25px;
  }

  &__pageMode {
    font-weight: 300;

    &__title {
      margin-right: 10px;
      padding: 3px 0;
      border: 1px solid transparent;
    }

    &__content {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      font-size: 15px;

      span {
        border: 1px solid $lightGray;
        flex-grow: 1;
        flex-basis: 33.33333%;
        font-size: 13px;
        padding: 3px 0;
        min-height: auto;
        cursor: pointer;
      }

      span:nth-child(1) {
        border-radius: 6px 0 0 6px;
        border-right-width: 0;
      }
      span:nth-child(2) {
        border-radius: 0;
        border-left-width: 0;
        border-right-width: 0;
      }
      span:nth-child(3) {
        border-left-width: 0;
        border-radius: 0 6px 6px 0;
      }

      .active {
        background: $lightGray;
        color: $white;
      }
    }
  }
}
</style>

<script>
export default {
  methods: {
    hideSetting () {
      console.log('4567')
      this.$emit("hideSetting", false)
    }
  }
};
</script>
