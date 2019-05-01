<template>
  <div>
    <!-- 刷新紀錄 -->
    <div class="lightBox deleteRecord">
      <div class="lightBox__background"></div>
      <div class="lightBox__bubble">
        <h3 class="lightBox__titleLarge">清除此編號 <br />所有紀錄</h3>
        <p class="lightBox__subtitle">
          <span>編號：M1</span>
          <span>王小明</span>
        </p>
        <button class="button button__primary taskPage__button">取消</button>
        <button class="button button__default taskPage__button">
          清除記錄
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
export default {};
</script>
