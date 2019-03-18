<template>
  <div>
    <!-- 離開任務 -->
    <div class="lightBox leaveMission">
      <div class="lightBox__background"></div>
      <div class="lightBox__bubble">
        <h3 class="lightBox__titleLarge">離開任務</h3>
        <button class="button button__primary taskPage__button">回到任務</button>
        <button class="button button__default taskPage__button">我要離開</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '@/assets/scss/modules/_lightBox.scss';
@import '@/assets/scss/modules/_button.scss';
</style>

<script>
export default {};
</script>
