<template>
  <div>
    <menu-top @showLeaveBubble="isLeaveMission=$event"></menu-top>
    <div id="img">
      <img :src="require('@/assets/cover.png')">
    </div>
    <leave-mission v-show="isLeaveMission"></leave-mission>
    <menu-bottom></menu-bottom>
  </div>
</template>
<style lang="scss" scoped>

#img {
  height: 907px;
  text-align: center;
}
img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>

<script>
import top from "@/components/menu/top.vue";
import bottom from "@/components/menu/bottom.vue";
import leaveMission from "@/components/lightBox/leaveMission.vue";
export default {
  data () {
    return {
      isLeaveMission: false
    }
  },
  methods:{
    showLeaveBubble(fff){
      console.log(fff)
      // this.isLeaveMission = true;
    }
  },
  components: {
    leaveMission: leaveMission,
    menuTop: top,
    menuBottom: bottom
  }
};
</script>

