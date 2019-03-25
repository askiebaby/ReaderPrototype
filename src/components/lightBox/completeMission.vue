<template>
  <div>
    <!-- 完成任務 -->
    <div class="lightBox missionCompleted">
      <div class="lightBox__background"></div>
      <div class="lightBox__bubble">
        <h3 class="lightBox__titleMiddle">完成任務</h3>
        <p class="lightBox__subtitle">
          <span>{{id}} {{CookiesData.name}}</span>
          <span>{{formatFinishdate}}</span>
          <span>{{formatFinishTime}}</span>
        </p>
        <div class="lightBox__content">
          <p class="lightBox__subtitle">任務一完成時間/點擊次數</p>
          <p class="lightBox__taskDescription">
            （1-1）{{CookiesData.task[0].time[0]}}秒/{{CookiesData.task[0].counts[0]}}次
            <br>
            （1-2）{{CookiesData.task[0].time[1]}}秒/{{CookiesData.task[0].counts[1]}}次
            <br>
            （1-3）{{CookiesData.task[0].time[2]}}秒/{{CookiesData.task[0].counts[2]}}次
          </p>
        </div>
        <button class="button button__primary taskPage__button" @click="backToTasks(true)">確認，並下載此畫面</button>
        <button class="button button__default taskPage__button" @click="backToTasks( false)">重新測試</button>
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
      task: this.$store.getters.getTask,
      index: 0,
      id: this.$store.getters.getID,
      CookiesData: {
        name: this.$store.getters.getName,
        task: [
          {
            time: [],
            counts: [],
            finishTime: ""
          }
        ]
      }
    };
  },
  computed: {
    formatFinishdate() {
      return this.$moment(this.task[this.index].time[3]).format("YYYY/MM/DD");
    },
    formatFinishTime() {
      return this.$moment(this.task[this.index].time[3]).format("HH:mm");
    }
  },
  methods: {
    computedTime(startIndex, endIndex) {
      let startTime = this.$moment(this.task[this.index].time[startIndex]);
      // console.log(startTime);
      let endTime = this.$moment(this.task[this.index].time[endIndex]);
      // console.log(endTime);
      let spendTime = this.$moment
        .duration(endTime.diff(startTime))
        .asSeconds();

      return spendTime;
    },
    computedCounts(startIndex, endIndex) {
      let startCount = this.task[this.index].counts[startIndex];
      // console.log(startCount);
      let endCount = this.task[this.index].counts[endIndex];
      let spendCount = endCount - startCount;

      return spendCount;
    },
    backToTasks(isFinish) {
      if (isFinish === true) {
        $cookies.set(this.id, this.CookiesData);
      }
      this.$router.push({ name: "tasks" });
    }
  },
  mounted() {
    this.CookiesData.task[this.index].time.push(
      this.computedTime(0, 1),
      this.computedTime(1, 2),
      this.computedTime(2, 3)
    );
    this.CookiesData.task[this.index].counts.push(
      this.computedCounts(0, 1),
      this.computedCounts(1, 2),
      this.computedCounts(2, 3)
    );
    this.CookiesData.task[this.index].finishTime = this.$moment(
      this.task[this.index].time[3]
    ).format("YYYY/MM/DD HH:mm");
    console.log(this.CookiesData.task[this.index].finishTime);
  }
};
</script>
