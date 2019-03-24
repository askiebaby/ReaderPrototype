<template>
  <div>
    <!-- 完成任務 -->
    <div class="lightBox missionCompleted">
      <div class="lightBox__background"></div>
      <div class="lightBox__bubble">
        <h3 class="lightBox__titleMiddle">完成任務</h3>
        <p class="lightBox__subtitle">
          <span>{{id}} {{name}}</span>
          <span>{{formatFinishdate}}</span>
          <span>{{formatFinishTime}}</span>
        </p>
        <div class="lightBox__content">
          <p class="lightBox__subtitle">任務一完成時間/點擊次數</p>
          <p class="lightBox__taskDescription">
            （1-1）{{computedTime(0,1)}}秒/{{computedCounts(0,1)}}次
            <br>
            （1-2）{{computedTime(1,2)}}秒/{{computedCounts(1,2)}}次
            <br>
            （1-3）{{computedTime(2,3)}}秒/{{computedCounts(2,3)}}次
          </p>
        </div>
        <button class="button button__primary taskPage__button">確認，並下載此畫面</button>
        <button class="button button__default taskPage__button">重新測試</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/modules/_lightBox.scss";
@import "@/assets/scss/modules/_button.scss";
</style>

<script>
export default {
  data() {
    return {
      id: this.$store.getters.getID,
      name: this.$store.getters.getName,
      task: this.$store.getters.getTask,
      index: 0
    };
  },
  computed: {
    formatFinishdate() {
      return this.$moment(this.task[this.index].time[4]).format("YYYY/MM/DD");
    },
    formatFinishTime() {
      return this.$moment(this.task[this.index].time[4]).format("HH:mm");
    }
  },
  methods: {
    computedTime(startIndex, endIndex) {
      let startTime = this.$moment(this.task[this.index].time[startIndex]);
      // console.log(startTime);
      let endTime = this.$moment(this.task[this.index].time[endIndex]);
      // console.log(endTime);
      return this.$moment.duration(endTime.diff(startTime)).asSeconds();
    },
    computedCounts(startIndex, endIndex) {
      let startCount = this.task[this.index].counts[startIndex];
      // console.log(startCount);
      let endCount = this.task[this.index].counts[endIndex];
      // console.log(endCount);
      return endCount - startCount;
    }
  }
};
</script>
