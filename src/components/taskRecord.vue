<template>
  <div>
    <background-cover></background-cover>
    <mission-again v-if="showMissionAgain" @showConfirm="changelight"></mission-again>
    <leave-mission-again v-if="showleaveMissionAgain" @backRecord="changelight"></leave-mission-again>
  </div>
</template>
<script>
import backgroundCover from "@/components/backgroundCover.vue";
import missionAgain from "@/components/lightBox/missionAgain.vue";
import leaveMissionAgain from "@/components/lightBox/leaveMissionAgain.vue";
export default {
  data() {
    return {
      showMissionAgain: true,
      showleaveMissionAgain: false
    };
  },
  methods: {
    changelight() {
      this.showMissionAgain = !this.showMissionAgain;
      this.showleaveMissionAgain = !this.showleaveMissionAgain;
    }
  },
  components: {
    backgroundCover,
    missionAgain,
    leaveMissionAgain
  }
};
</script>
