<template>
  <div>
    <!-- 完成任務 -->
    <div class="lightBox missionCompleted">
      <div class="lightBox__background"></div>
      <div class="lightBox__bubble">
        <h3 class="lightBox__titleMiddle">完成任務</h3>
        <p class="lightBox__subtitle">
          <span>{{ id }} {{ CookiesData.name }}</span>
          <span>{{ formatFinishdate }}</span>
          <span>{{ formatFinishTime }}</span>
        </p>
        <div class="lightBox__content">
          <p class="lightBox__subtitle">
            任務{{ chineseOrder }}完成時間/點擊次數
          </p>
          <div class="lightBox__taskDescription">
            <p v-for="(item, index) in CookiesData.task.counts" :key="index">
              ({{ taskIndex + 1 }}-{{ index + 1 }})
              {{ CookiesData.task.time[index] }}秒/{{
                CookiesData.task.counts[index]
              }}次
            </p>
          </div>
        </div>
        <button
          class="button button__primary taskPage__button"
          @click="backToTasks(true)"
        >
          確認，並下載此畫面
        </button>
        <button
          class="button button__default taskPage__button"
          @click="backToTasks(false)"
        >
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
    }
  },
  data() {
    return {
      task: this.$store.getters.getTask[this.taskIndex],
      id: this.$store.getters.getID,
      CookiesData: {
        name: this.$store.getters.getName,
        task: {
          time: [],
          counts: [],
          finishTime: ''
        }
      }
    };
  },
  computed: {
    chineseOrder() {
      return this.$store.getters.getChineseOrder[this.taskIndex];
    },
    formatFinishdate() {
      return this.$moment(this.task.time[this.task.time.length - 1]).format(
        'YYYY/MM/DD'
      );
    },
    formatFinishTime() {
      return this.$moment(this.task.time[this.task.time.length - 1]).format(
        'HH:mm'
      );
    }
  },
  mounted() {
    this.CookiesData.task.time = this.task.time
      .map((item, index) => {
        return this.$moment
          .duration(this.$moment(this.task.time[index + 1]).diff(item))
          .asSeconds();
      })
      .filter((value, index, array) => index + 1 != array.length);
    console.log(this.CookiesData.task.time);
    this.CookiesData.task.counts = this.task.counts
      .map((item, index) => {
        return this.task.counts[index + 1] - item;
      })
      .filter((value, index, array) => index + 1 != array.length);
    this.CookiesData.task.finishTime = this.$moment(
      this.task.time[this.task.time.length - 1]
    ).format('YYYY/MM/DD HH:mm');
    console.log(this.CookiesData.task.finishTime);
  },
  methods: {
    backToTasks(isFinish) {
      let cookiesArray = [];
      if (isFinish) {
        if (this.$cookies.get(this.id)) {
          cookiesArray = JSON.parse(this.$cookies.get(this.id));
        }
        // console.log('54654', cookiesArray);
        cookiesArray[this.taskIndex] = this.CookiesData;
        this.$cookies.set(this.id, JSON.stringify(cookiesArray));
      }
      this.$router.push({ name: 'tasks', params: { id: this.id } });
    }
  }
};
</script>
