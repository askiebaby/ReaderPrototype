<template>
  <div>
    <!-- 任務重新測試 -->
    <div class="lightBox missionCompleted">
      <div class="lightBox__background"></div>
      <div class="lightBox__bubble">
        <h3 class="lightBox__titleLarge">任務已完成</h3>
        <p class="lightBox__subtitle">
          <span>{{ id }}{{ taskRecord.name }}</span>
          <span>{{ taskRecord.task.finishTime }}</span>
        </p>
        <div class="lightBox__content">
          <p class="lightBox__subtitle">
            任務{{ chineseOrder }}完成時間/點擊次數
          </p>
          <div class="lightBox__taskDescription">
            <p v-for="(item, index) in taskRecord.task.counts" :key="index">
              ({{ taskIndex + 1 }}-{{ index + 1 }}){{
                taskRecord.task.time[index]
              }}秒/{{ taskRecord.task.counts[index] }}次
            </p>
          </div>
        </div>
        <router-link
          tag="button"
          :to="{ name: 'tasks', params: { id } }"
          class="button button__primary taskPage__button"
          >上一頁</router-link
        >
        <button class="button button__default taskPage__button" @click="reset">
          重新測試
        </button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '@/assets/scss/modules/_lightBox.scss';
@import '@/assets/scss/modules/_button.scss';
</style>

<script>
export default {
  props: {
    taskIndex: {
      type: Number,
      default: -1
    },
    id: {
      type: String,
      default: ''
    }
  },
  computed: {
    chineseOrder() {
      return this.$store.getters.getChineseOrder[this.taskIndex];
    },
    taskRecord() {
      let cookiesArray = JSON.parse(this.$cookies.get(this.id));
      return cookiesArray[this.taskIndex];
    }
  },
  methods: {
    reset() {
      this.$emit('showConfirm');
    }
  }
};
</script>
