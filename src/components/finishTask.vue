<template>
  <div class="background__male">
    <div id="resetPosition">
      <button class="button button__alert button__reset">清除紀錄</button>
    </div>
    <div class="input-center">
      <div class="member_id">編號:</div>
      <input type="text" value="王小明">
      <div class="buttons">
        <router-link
          tag="button"
          :to="{ name: 'home'}"
          class="button button__space button__default2"
        >上一頁</router-link>
        <router-link
          tag="button"
          :to="{ name: 'tasks'}"
          class="button button__space button__default2"
        >紀錄</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/modules/_font.scss';
#resetPosition {
  text-align: right;
  padding: 38px 37px 0 0;
}
.input-center {
  padding: 276px 0 443px 0;
}
.button__reset {
  width: 77px;
  height: 42px;
  font-size: $contentSize;
}
</style>