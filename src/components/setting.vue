<template>
  <!-- 任務題目 -->
  <div class="lightBox setting">
    <div class="lightBox__background" @click="hideSetting"></div>
    <div class="lightBox__bubbleLittle">
      <div class="lightBox__content">
        <div class="function function__lightness">
          <img src="@/assets/images/lightness.svg" alt="調整亮度" />
        </div>
        <div class="function function__fontSize">
          <span class="changeSize" @click="changeFontSize('small')">
            <span class="changeSize__content">Aa</span>
            <span class="small"></span>
          </span>
          <span class="changeSize" @click="changeFontSize('enlarge')">
            <span class="changeSize__content">Aa</span>
            <span class="enlarge"></span>
          </span>
        </div>
        <div class="function function__background">
          <span
            class="function__background__white"
            @click="changeBackground('background__change__white')"
          ></span>
          <span
            class="function__background__black"
            @click="changeBackground('background__change__black')"
          ></span>
          <span
            class="function__background__yellow"
            @click="changeBackground('background__change__yellow')"
          ></span>
          <span
            class="function__background__green"
            @click="changeBackground('background__change__green')"
          ></span>
        </div>
        <div class="function function__fontFamily">
          <select @change="changeFontFamily($event)">
            <option selected value="book__fontFamily__ming">明體</option>
            <option value="book__fontFamily__kai">楷體</option>
            <option value="book__fontFamily__noto">黑體</option>
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
@import '@/assets/scss/modules/_lightBox.scss';
@import '@/assets/scss/modules/_button.scss';

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
        border-radius: 5px 0 0 5px;
        border-right-width: 0;
      }
      span:nth-child(2) {
        border-radius: 0;
        border-left-width: 0;
        border-right-width: 0;
      }
      span:nth-child(3) {
        border-left-width: 0;
        border-radius: 0 5px 5px 0;
      }

      .active {
        background: $lightGray;
        color: $white;
      }
    }
  }

  &__fontSize {
    flex-basis: 50%;
    margin-bottom: 28px;
    .changeSize {
      background: $lightGray-2;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .small,
    .enlarge {
      position: relative;
      border: transparent 8px solid;
      display: inline-block;
      margin-left: 10px;
      border-left-width: 4px;
      border-right-width: 4px;
    }
    .small {
      border-top-color: #4394ff;
      top: 5px;
    }
    .enlarge {
      border-bottom-color: #4394ff;
      top: -3px;
    }
  }

  &__fontFamily {
    margin-bottom: 25px;
  }

  &__lightness {
    justify-content: center;
    margin-bottom: 20px;
  }
}
.functions-row {
  .function {
    &__fontSize {
      flex-direction: row-reverse;

      .changeSize + .changeSize {
        margin-left: auto;
        margin-right: 10px;
      }
      .changeSize {
        &:nth-child(1) {
          flex-direction: row;
        }
        &:nth-child(2) {
          flex-direction: row-reverse;
              
        }
        &__content {
          position: relative;
          writing-mode: vertical-lr;
          transform: rotate(180deg);
        }
      }
      .small,
      .enlarge {
        transform: rotate(-90deg);
        transform-origin: center;
        top: auto;
        // margin-left: 0;
        margin-bottom: 1px;
      }
      .small {
        margin-left: 15px;
        margin-right: 4px;
      }
      .enlarge {
        margin-right: 15px;
      }
    }
    &__pageMode {
      writing-mode: vertical-lr;
      transform: rotate(-90deg);
      transform-origin: bottom;
      position: absolute;
      bottom: 70px;
      right: -5px;
      height: 300px;

      &__content {
        height: 217px;
        flex-grow: 0;
        span {
          padding: 3px;
          &:nth-child(1) {
            border-radius: 5px 5px 0 0;
            border-right-width: 1px;
            border-bottom-width: 0;
          }
          &:nth-child(3) {
            border-radius: 0 0 5px 5px;
            border-left-width: 1px;
            border-top-width: 0;
          }
        }
      }
      &__title {
        margin-right: 0;
        margin-bottom: 2px;
      }
    }
    &__lightness {
      transform: rotate(180deg);
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      sizeLevel: 5,
      fontSizeLevel: [12, 14, 16, 18, 20, 24, 30, 36, 42, 48, 52],
      task: this.$store.getters.getTask
    };
  },
  methods: {
    hideSetting() {
      this.$emit('hideSetting', false);
    },
    changeBackground(color) {
      this.$emit('changeBackground', color);
    },
    changeFontFamily(event) {
      let family = event.target.value;
      this.$emit('changeFontFamily', family);
    },
    changeFontSize(action) {
      if (action === 'small') {
        if (this.sizeLevel > 0) {
          this.sizeLevel -= 1;
        }
      } else if (action === 'enlarge') {
        if (this.sizeLevel < this.fontSizeLevel.length - 1) {
          this.sizeLevel += 1;
          this.checkEnlargeFontSize();
        }
      }
      let fontSizeClass = `fontSize__${this.fontSizeLevel[this.sizeLevel]}px`;
      this.$emit('changeFontSize', {
        fontSizeClass: fontSizeClass,
        sizeLevel: this.sizeLevel
      });
    },
    checkEnlargeFontSize() {
      if (this.task.length <= 0) {
        return;
      }
      if (!this.task[0]) {
        return;
      }
      if (this.task[0].time.length != 2) {
        return;
      }
      const step = this.$store.getters.getTarget[0].step[1];
      if (this.fontSizeLevel[this.sizeLevel] == step.fontSizeLevel) {
        this.$store.commit('setTask', 0);
        // console.log(this.task);
      }
    }
  }
};
</script>
