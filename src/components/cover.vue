<template>
  <div>
    <menu-top @showLeaveBubble="isLeaveMission=$event"></menu-top>
    <background-cover></background-cover>
    <menu-bottom></menu-bottom>
    <leave-mission v-if="isLeaveMission" @cancelLeaveBubble="isLeaveMission=$event"></leave-mission>
  </div>
</template>

<script>
import menuTop from "@/components/menu/top.vue";
import menuBottom from "@/components/menu/bottom.vue";
import leaveMission from "@/components/lightBox/leaveMission.vue";
import backgroundCover from "@/components/backgroundCover.vue";
export default {
  data() {
    return {
      isLeaveMission: false
    };
  },
  components: {
    leaveMission,
    menuTop,
    backgroundCover,
    menuBottom
  }
};
</script>

