<template>
  <div>
    <div
      :class="['tooltip', { note__tooltip: !isShowIcon }]"
      data-tooltip
      :style="{ top: topStyle, left: leftStyle }"
    >
      <div class="tooltip__wrapper">
        <div class="tooltip__top">
          <div class="tooltip__penColor">
            <div
              v-for="item in color"
              :key="item"
              :class="showColor(item)"
              @click="changeColor(item)"
            ></div>
          </div>
          <div class="tooltip__function">
            <div v-if="isShowIcon">
              <img src="@/assets/images/icons/copy.svg" alt="複製" />
            </div>
            <div class="tooltip__function__comment" @click="showComment">
              <img src="@/assets/images/icons/comment.svg" alt="註解" />
            </div>
            <div
              class="tooltip__function__share"
              @click="$emit('showShareUI', true)"
            >
              <img src="@/assets/images/icons/share.svg" alt="分享" />
            </div>
            <div v-if="isShowIcon" class="tooltip__function__search">
              <img src="@/assets/images/icons/search.svg" alt="搜尋" />
            </div>
            <div v-else class="tooltip__function__delete" @click="deleteNotes">
              <img src="@/assets/images/icons/delete.svg" alt="刪除" />
            </div>
          </div>
        </div>
        <div class="tooltip__bottom">
          <div class="arrow"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
body {
  position: relative;
}
.colorSelected {
  position: relative;
  &::before,
  &::after {
    content: '';
    width: 20px;
    height: 1px;
    background: #999;
    position: absolute;
    top: 15px;
    left: 5px;
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(135deg);
  }
}
.tooltip {
  position: absolute;
  min-width: 393px;
  max-width: 393px;
  user-select: none;
  z-index: 1;

  &__wrapper {
    position: relative;
    background-color: $white;
    border-radius: 10px;
    box-shadow: 0 2px 15px -2px rgba(0, 0, 0, 0.9);
  }
  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__bottom,
  .arrow {
    &::after {
      background: $white;
    }
  }
  &__bottom {
    .arrow {
      position: absolute;
      left: 50%;
      bottom: -15px;
      width: 70px;
      height: 16px;
      margin-left: -35px;
      overflow: hidden;
      &::after {
        content: '';
        position: absolute;
        left: 20px;
        top: -20px;
        width: 27px;
        height: 27px;
        transform: rotate(45deg);
        box-shadow: 6px 5px 9px -9px $black,
          5px 5px 7px -5px rgba(0, 0, 0, 0.65);
      }
    }
  }
  &__penColor,
  &__function {
    display: flex;
    justify-content: space-around;
    flex-basis: 50%;
    > div {
      display: flex;
      align-items: flex-end;
      justify-content: flex-start;
      height: 30px;
      width: 30px;
      padding-left: 5px;
      padding-bottom: 5px;
      cursor: pointer;
    }
    &__search {
      img {
        max-width: 20px;
      }
    }
    &__share {
      margin-left: 5px;
    }
  }
  &__penColor {
    > div {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin: 6px 0;
    }
    &__yellow {
      background-color: $yellow-pen;
    }
    &__red {
      background-color: $red-pen;
    }
    &__purple {
      background-color: $purple-pen;
    }
    &__green {
      background-color: $green-pen;
    }
    &__blue {
      background-color: $blue-pen;
    }
  }
}

.functions-row {
  .tooltip {
    transform: rotate(-90deg);
    &__top {
      flex-direction: row-reverse;
    }
    &__penColor,
    &__function {
      flex-direction: row-reverse;
    }
    &__function {
      > div {
        transform: rotate(90deg);
        justify-content: center;
        padding-left: 0;
      }
      &__share {
        margin-left: 0;
      }
      .tooltip__function__comment {
        padding-left: 5px;
      }
    }
  }
  article {
    // 筆記庫中
    .tooltip {
      transform: rotate(-90deg);
      &__function {
        > div {
          transform: rotate(90deg);
        }
      }
    }
  }
}

.note__tooltip {
  min-width: 350px;
  max-width: 350px;
  .tooltip {
    &__penColor {
      flex-basis: 57.4%;
    }
    &__function {
      flex-basis: 42.6%;
      &__comment {
        img {
          width: 23px;
        }
      }
      &__share {
        img {
          width: 17px;
        }
      }
      &__delete {
        img {
          width: 16px;
        }
      }
    }
  }
}
</style>

<script>
export default {
  props: {
    isShowTooltip: {
      type: [Boolean, Function],
      default: false
    },
    tooltipPosition: {
      type: Object,
      default: () => {
        return {
          x: 0,
          y: 0
        };
      }
    },
    selectedColor: {
      type: String,
      default: ''
    },
    fromContent: {
      type: Boolean,
      default: true
    },
    notesIndex: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      color: ['yellow', 'red', 'purple', 'green']
    };
  },
  computed: {
    isShowShare() {
      return this.$store.getters.getShareBubbleStatus;
    },
    isShowIcon() {
      return this.fromContent;
    },
    leftStyle() {
      return this.tooltipPosition.x + 'px';
    },
    topStyle() {
      return this.tooltipPosition.y + 'px';
    },
    selected() {
      return this.$store.getters.getTooltipColor;
    }
  },
  methods: {
    showShareBubble() {
      if (!this.isShowShare) {
        if (this.isShowTooltip) this.$emit('closeTooltip', false);
        this.$store.commit('toggleShareBubble', true);
      }
    },
    deleteNotes() {
      const task = this.$store.getters.getTask;
      const checkTask = this.$store.getters.getNotes[this.notesIndex].task;
      // console.log('232', this.notesIndex);
      // debugger;
      if (this.notesIndex == -1) {
        return;
      }
      if (checkTask != 2) {
        this.finishTask2(false);
        return;
      }
      if (task.length <= 0) {
        this.finishTask2(false);
        return;
      }
      if (task[1] == undefined) {
        this.finishTask2(false);
        return;
      }
      if (task[1].time.length != 4) {
        this.finishTask2(false);
        return;
      }
      this.$store.commit('setTask', 1);
      this.finishTask2(true);
      console.log('151681656', this.$store.getters.getTask);
    },
    finishTask2(e) {
      const obj = {
        index: -1
      };
      if (e) {
        obj.showComplete = true;
      }
      this.$store.commit('deleteNote', this.notesIndex);
      this.$emit('finishTask2', obj);
    },
    showColor(item) {
      let arrary = [];
      arrary.push('tooltip__penColor__' + item);
      if (this.selected == item) {
        arrary.push('colorSelected');
      }
      return arrary;
    },
    changeColor(color) {
      if (this.selected == color) {
        this.$store.commit('deleteNote', this.notesIndex);
        this.$store.commit('changeTooltipColor', '');
        this.$emit('changeColor', '');
        return;
      }
      this.$store.commit('changeTooltipColor', color);
      this.$emit('changeColor', color + '-pen');
    },
    showComment() {
      this.$emit('showComment', { showComment: true });
    }
  }
};
</script>
