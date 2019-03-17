<template>
  <div>
    <div class="wrapper">
      <!-- 任務題目 -->
      <div class="lightBox taskName">
        <div class="lightBox__background"></div>
        <div class="lightBox__bubble">
          <h3 class="lightBox__titleMiddle">請依序完成指定任務</h3>
          <div class="lightBox__content">
            <p class="lightBox__subtitle">任務一：</p>
            <p class="lightBox__taskDescription">（1-1）翻到第一章 “有目的的練習” 。<br>
            （1-2）將字體設定成最大。<br>
            （1-3）將閱讀模式調成黑底白字的夜間模式。</p>
          </div>
          <button class="button button__primary taskPage__button">開始</button>
          <button class="button button__default taskPage__button">取消</button>
        </div>
      </div>
      <!-- 完成任務 -->
      <div class="lightBox missionCompleted">
        <div class="lightBox__background"></div>
        <div class="lightBox__bubble">
          <h3 class="lightBox__titleMiddle">完成任務</h3>
          <p class="lightBox__subtitle"><span>M2 王小明</span><span>2019.02.26</span><span>13:27</span></p>
          <div class="lightBox__content">
            <p class="lightBox__subtitle">任務一完成時間/點擊次數</p>
            <p class="lightBox__taskDescription">（1-1）28.52秒/8次<br>
          （1-2）14.23秒/12次<br>
          （1-3）2.96秒/2次</p>
          </div>
          <button class="button button__primary taskPage__button">確認，並下載此畫面</button>
          <button class="button button__default taskPage__button">重新測試</button>
        </div>
      </div>
      <!-- 刷新紀錄 -->
      <div class="lightBox deleteRecord">
        <div class="lightBox__background"></div>
        <div class="lightBox__bubble">
          <h3 class="lightBox__titleLarge">清除此編號<br>所有紀錄</h3>
          <p class="lightBox__subtitle"><span>編號：M1</span><span>王小明</span></p>
          <button class="button button__primary taskPage__button">取消</button>
          <button class="button button__default taskPage__button">清除記錄</button>
        </div>
      </div>
      <!-- 任務重新測試 -->
      <div class="lightBox missionCompleted">
        <div class="lightBox__background"></div>
        <div class="lightBox__bubble">
          <h3 class="lightBox__titleLarge">任務已完成</h3>
          <p class="lightBox__subtitle"><span>M2 王小明</span><span>2019.02.26</span><span>13:27</span></p>
          <div class="lightBox__content">
            <p class="lightBox__subtitle">任務一完成時間/點擊次數</p>
            <p class="lightBox__taskDescription">（1-1）28.52秒/8次<br>
          （1-2）14.23秒/12次<br>
          （1-3）2.96秒/2次</p>
          </div>
          <button class="button button__primary taskPage__button">上一頁</button>
          <button class="button button__default taskPage__button">重新測試</button>
        </div>
      </div>
      <!-- 離開任務 -->
      <div class="lightBox leaveMission">
        <div class="lightBox__background"></div>
        <div class="lightBox__bubble">
          <h3 class="lightBox__titleLarge">離開任務</h3>
          <button class="button button__primary taskPage__button">回到任務</button>
          <button class="button button__default taskPage__button">我要離開</button>
        </div>
      </div>
      <!-- 離開任務 確認 -->
      <div class="lightBox leaveMission">
        <div class="lightBox__background"></div>
        <div class="lightBox__bubble">
          <h3 class="lightBox__titleLarge">離開任務</h3>
          <button class="button button__primary taskPage__button">離開</button>
          <button class="button button__default taskPage__button">取消</button>
        </div>
      </div>

      <!-- 離開重新測試 確認 -->
      <div class="lightBox deleteRecordConfirm">
        <div class="lightBox__background"></div>
        <div class="lightBox__bubble">
          <h3 class="lightBox__titleLarge">清除此任務<br>紀錄</h3>
          <button class="button button__primary taskPage__button">確認</button>
          <button class="button button__default taskPage__button">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>
