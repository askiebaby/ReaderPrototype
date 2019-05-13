<template>
  <div :style="{ top: topStyle, left: leftStyle }">
    <div class="tooltip" data-tooltip="">
      <div class="tooltip__wrapper">
        <div class="tooltip__top">
          <div class="tooltip__penColor">
            <div
              class="tooltip__penColor__yellow"
              @click="addNotes('yellow-pen')"
            ></div>
            <div
              class="tooltip__penColor__red"
              @click="addNotes('red-pen')"
            ></div>
            <div
              class="tooltip__penColor__purple colorSelected"
              @click="addNotes('purple-pen')"
            ></div>
            <div
              class="tooltip__penColor__green"
              @click="addNotes('green-pen')"
            ></div>
          </div>
          <div class="tooltip__function">
            <div><img src="@/assets/images/icons/copy.svg" alt="" /></div>
            <div @click="showNotes">
              <img src="@/assets/images/icons/note.svg" alt="" />
            </div>
            <div><img src="@/assets/images/icons/share.svg" alt="" /></div>
            <div class="tooltip__function__search"><img src="@/assets/images/icons/search@2x.png" alt="" /></div>
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
      default: () => {}
    },
    selectedToNotes: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  computed: {
    leftStyle() {
      return this.tooltipPosition.x + 'px';
    },
    topStyle() {
      let y = this.tooltipPosition.y;
      return y + 'px';
    }
  },
  methods: {
    addNotes(color) {
      this.$store.commit('addNotes', {
        chapterIndex: this.selectedToNotes.chapterIndex,
        sectionIndex: this.selectedToNotes.sectionIndex,
        textStart: this.selectedToNotes.textStart,
        textEnd: this.selectedToNotes.textEnd,
        color: color,
        comment: ''
      });
      console.log(this.$store.getters.getNotes);
    },
    showNotes() {
      this.$store.commit('switchShowNotes');
    }
  }
};
</script>
