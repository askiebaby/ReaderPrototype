<template>
  <div>
    <!-- 任務重新測試 -->
    <div class="lightBox missionCompleted">
      <div class="lightBox__background"></div>
      <div class="lightBox__bubble">
        <h3 class="lightBox__titleLarge">任務已完成</h3>
        <p class="lightBox__subtitle">
          <span>M2 王小明</span>
          <span>2019.02.26</span>
          <span>13:27</span>
        </p>
        <div class="lightBox__content">
          <p class="lightBox__subtitle">任務一完成時間/點擊次數</p>
          <p class="lightBox__taskDescription">（1-1）28.52秒/8次
            <br>（1-2）14.23秒/12次
            <br>（1-3）2.96秒/2次
          </p>
        </div>
        <button class="button button__primary taskPage__button">上一頁</button>
        <button class="button button__default taskPage__button">重新測試</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  
}
</script>

