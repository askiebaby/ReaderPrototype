<template>
  <div>
    <!-- 任務題目 -->
    <div class="cover">
      <img :src="require('@/assets/cover.png')" class="cover__img">
    </div>
    <div class="lightBox taskName">
      <div class="lightBox__background"></div>
      <div class="lightBox__bubble">
        <h3 class="lightBox__titleMiddle">請依序完成指定任務</h3>
        <div class="lightBox__content">
          <p class="lightBox__subtitle">任務一：</p>
          <p class="lightBox__taskDescription">
            （1-1）翻到第一章 “有目的的練習” 。
            <br>（1-2）將字體設定成最大。
            <br>（1-3）將閱讀模式調成黑底白字的夜間模式。
          </p>
        </div>
        <router-link
          tag="button"
          :to="{ name: 'book'}"
          class="button button__primary taskPage__button"
          @click.native="taskStart"
        >開始</router-link>
        <router-link
          tag="button"
          :to="{ name: 'tasks'}"
          class="button button__default taskPage__button"
        >取消</router-link>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/modules/_lightBox.scss";
@import "@/assets/scss/modules/_button.scss";
.cover {
  height: 100vh;
  overflow: hidden;
  text-align: center;
  &__img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: calc(100% - 80px);
  }
}
</style>

<script>
export default {
  data() {
    return {
      task: this.$store.getters.getTask
    };
  },
  methods: {
    taskStart() {
      let index = 0;
      if (this.task.length > 0) {
        this.$store.commit("setTask", index);
        console.log(this.$store.getters.getTask);
      }
    }
  }
};
</script>
