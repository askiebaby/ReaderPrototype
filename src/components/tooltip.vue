<template>
  <div :style="{ top: topStyle, left: leftStyle }">
    <div class="tooltip" data-tooltip="">
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
              <img src="@/assets/images/icons/copy.svg" alt="" />
            </div>
            <div @click="showNotes">
              <img src="@/assets/images/icons/note.svg" alt="" />
            </div>
            <div><img src="@/assets/images/icons/share.svg" alt="" /></div>
            <div v-if="isShowIcon" class="tooltip__function__search">
              <img src="@/assets/images/icons/search.svg" alt="" />
            </div>
            <div v-else @click="deleteNotes">
              <img src="@/assets/images/icons/invalid-name.svg" alt="" />
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
  // margin: 10px;
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
      cursor: pointer;
    }
    &__search {
      img {
        max-width: 20px;
      }
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
  &__function {
    > div {
      padding: 5px 10px;
      display: flex;
      align-items: center;
    }
  }
}
</style>

<script>
export default {
  props: {
    tooltipPosition: {
      type: Object,
      default: () => {
        return {
          x: 0,
          y: 0
        };
      }
    },
    selectedToNotes: {
      type: Object,
      default: () => {}
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
    deleteNotes() {
      const task = this.$store.getters.getTask;
      const checkTask = this.$store.getters.getNotes[this.notesIndex].task;
      if (checkTask != 2) {
        return;
      }
      if (task.length <= 0) {
        return;
      }
      if (task[1] == undefined) {
        return;
      }
      if (task[1].time.length != 4) {
        return;
      }
      this.$store.commit('setTask', 1);
      // console.log('151681656', this.$store.getters.getTask);
      if (this.notesIndex != -1) {
        this.$store.commit('deleteNote', this.notesIndex);
      }
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
      this.$store.commit('changeTooltipColor', color);
      this.$emit('changeColor', color + '-pen');
    },
    showNotes() {
      this.$store.commit('switchShowNotes');
    }
  }
};
</script>
