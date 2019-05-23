<template>
  <div>
    <!-- 任務重新測試 -->
    <div class="lightBox missionCompleted">
      <div class="lightBox__background"></div>
      <div class="lightBox__bubble">
        <h3 class="lightBox__titleLarge">任務已完成</h3>
        <p class="lightBox__subtitle">
          <span>{{ id }} {{ member.name }}</span>
          <span>{{ member.task[0].finishTime }}</span>
        </p>
        <div class="lightBox__content">
          <p class="lightBox__subtitle">任務一完成時間/點擊次數</p>
          <p class="lightBox__taskDescription">
            （1-1）{{ member.task[0].time[0] }}秒/{{
              member.task[0].counts[0]
            }}次
            <br />
            （1-2）{{ member.task[0].time[1] }}秒/{{
              member.task[0].counts[1]
            }}次
            <br />
            （1-3）{{ member.task[0].time[2] }}秒/{{
              member.task[0].counts[2]
            }}次
          </p>
        </div>
        <router-link
          tag="button"
          :to="{ name: 'tasks' }"
          class="button button__primary taskPage__button"
          >上一頁</router-link
        >
        <!-- <button class="button button__primary taskPage__button">上一頁</button> -->
        <button class="button button__default taskPage__button" @click="rest">
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
  data() {
    return {
      id: this.$store.getters.getID,
      member: {}
    };
  },
  mounted() {
    console.log(this.$cookies.get(this.id));
    this.member = this.$cookies.get(this.id);
    console.log(this.member);
  },
  methods: {
    rest() {
      this.$emit('showConfirm');
    }
  }
};
</script>
