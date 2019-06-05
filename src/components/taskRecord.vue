<template>
  <div>
    <background-cover></background-cover>
    <mission-again
      v-if="showMissionAgain"
      :id="$route.params.id"
      :task-index="taskIndex"
      @showConfirm="changelight"
    ></mission-again>
    <leave-mission-again
      v-if="showleaveMissionAgain"
      :task-index="taskIndex"
      @backRecord="changelight"
    ></leave-mission-again>
  </div>
</template>
<script>
import backgroundCover from '@/components/backgroundCover.vue';
import missionAgain from '@/components/lightBox/missionAgain.vue';
import leaveMissionAgain from '@/components/lightBox/leaveMissionAgain.vue';
export default {
  components: {
    backgroundCover,
    missionAgain,
    leaveMissionAgain
  },
  data() {
    return {
      taskIndex: this.$route.params.taskIndex - 1,
      showMissionAgain: true,
      showleaveMissionAgain: false
    };
  },
  methods: {
    changelight() {
      this.showMissionAgain = !this.showMissionAgain;
      this.showleaveMissionAgain = !this.showleaveMissionAgain;
    }
  }
};
</script>
