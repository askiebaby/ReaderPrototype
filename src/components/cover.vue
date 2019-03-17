<template>
  <div>
    <menu-top></menu-top>
    <div id="img">
      <img :src="require('@/assets/cover.png')">
    </div>
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
export default {
  components: {
    menuTop: top,
    menuBottom: bottom
  }
};
</script>

