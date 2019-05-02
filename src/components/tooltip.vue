<template>
  <div :style="{ top: topStyle, left: leftStyle }">
    <div class="tooltip" data-tooltip="">
      <div class="tooltip__wrapper">
        <div class="tooltip__top">
          <div class="tooltip__penColor">
            <div class="tooltip__penColor__yellow"></div>
            <div class="tooltip__penColor__red"></div>
            <div class="tooltip__penColor__blue"></div>
            <div class="tooltip__penColor__green"></div>
          </div>
          <div class="tooltip__function">
            <div><img src="@/assets/images/icons/copy.svg" alt="" /></div>
            <div><img src="@/assets/images/icons/note.svg" alt="" /></div>
            <div><img src="@/assets/images/icons/share.svg" alt="" /></div>
            <div><img src="@/assets/images/icons/search.png" alt="" /></div>
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
    box-shadow: 0 2px 15px -2px rgba(0, 0, 0, 0.75);
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
      bottom: -16px;
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
        box-shadow: 6px 5px 9px -9px $black, 5px 5px 7px -5px rgba(0, 0, 0, 0.6);
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
    &__blue {
      background-color: $blue-pen;
    }
    &__green {
      background-color: $green-pen;
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
      default: function() {
        return {
          x: 0,
          y: 0
        };
      }
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
  }
};
</script>
