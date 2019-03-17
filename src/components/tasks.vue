<template>
  <div>
    <div class="wrapper">
      <div class="taskPage">
        <button class="button button__secondary taskPage__button">Task 1</button>
        <button class="button button__primary taskPage__button">Task 2</button>
        <button class="button button__primary taskPage__button">Task 3</button>
      </div>
      <div class="lightBox">
        <div class="lightBox__background"></div>
        <div class="lightBox__bubble">
          <h3 class="lightBox__titleMiddle">請依序完成指定任務</h3>
          <p class="lightBox__subtitle">任務一：</p>
          <p>（1-1）翻到第一章 “有目的的練習” 。<br>
          （1-2）將字體設定成最大。<br>
          （1-3）將閱讀模式調成黑底白字的夜間模式。</p>
          <button class="button button__primary taskPage__button">開始</button>
          <button class="button button__default taskPage__button">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .taskPage {
    display: flex;
    justify-content: center;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    height: 100vh;
    &__button + &__button {
      margin-top: 52px;
    }
  }
</style>


<script>
export default {
  
}
</script>
