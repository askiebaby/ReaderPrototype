<template>
  <div>
    <!-- 任務題目 -->
    <div class="cover">
      <img :src="require('@/assets/cover.png')" class="cover__img" />
    </div>
    <div class="lightBox taskName">
      <div class="lightBox__background"></div>
      <div class="lightBox__bubble">
        <h3 class="lightBox__titleMiddle">請依序完成指定任務</h3>
        <div class="lightBox__content">
          <p class="lightBox__subtitle">任務{{ showTask.chineseOrder }}：</p>
          <div class="lightBox__taskDescription">
            <p v-for="item in showTask.description" :key="item">
              {{ item }}
            </p>
          </div>
        </div>
        <router-link
          tag="button"
          :to="{ name: 'bookCover' }"
          class="button button__primary taskPage__button"
          @click.native="taskStart"
          >開始</router-link
        >
        <router-link
          tag="button"
          :to="{ name: 'tasks' }"
          class="button button__default taskPage__button"
          >取消</router-link
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '@/assets/scss/modules/_lightBox.scss';
@import '@/assets/scss/modules/_button.scss';
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
      order: this.$route.params.order - 1,
      target: this.$store.getters.getTarget,
      task: this.$store.getters.getTask
    };
  },
  computed: {
    showTask() {
      return this.target[this.order];
    }
  },
  methods: {
    taskStart() {
      if (this.task.length > 0) {
        this.$store.commit('setTask', this.order);
        console.log(this.$store.getters.getTask);
      }
    }
  }
};
</script>
