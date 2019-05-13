<template>
  <div class="topMenu">
    <div class="topMenu__back" @click="changeLeaveStatus">
      <img :src="require('@/assets/menu/back.svg')" />
      <p>回到書櫃</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '@/assets/scss/modules/_font.scss';
@import '@/assets/scss/modules/_background.scss';
.topMenu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  padding: 33px 0 0 24px;
  &__back {
    display: flex;
    margin-right: auto;
    width: 150px;
    cursor: pointer;
  }
}
img {
  margin-right: 24px;
}
p {
  color: $black-1;
}
</style>

<script>
export default {
  methods: {
    changeLeaveStatus() {
      this.$emit('showLeaveBubble', true);
    }
    // backTask(){
    //   this.$router.push({ name: "tasks" });
    // }
  }
};
</script>
