<template>
  <div>
    <div class="background__male" v-if="finishTadk">
      <div id="resetPosition">
        <button class="button button__alert button__reset" @click="isShowligtBox">清除紀錄</button>
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
    <!-- 刷新紀錄 -->
    <div class="lightBox deleteRecord" v-if="restCheck">
      <div class="lightBox__background"></div>
      <div class="lightBox__bubble">
        <h3 class="lightBox__titleLarge">清除此編號
          <br>所有紀錄
        </h3>
        <p class="lightBox__subtitle">
          <span>編號：M1</span>
          <span>王小明</span>
        </p>
        <button class="button button__primary taskPage__button" @click="isShowligtBox">取消</button>
        <router-link
            tag="button"
            :to="{ name: 'home'}"
            class="button button__default taskPage__button"
          >清除記錄</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/scss/modules/_lightBox.scss";
@import "@/assets/scss/modules/_background.scss";
@import "@/assets/scss/modules/_input.scss";
@import "@/assets/scss/modules/_button.scss";
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
<script>
export default {
  data() {
    return {
      finishTadk: true,
      restCheck: false
    };
  },
  methods: {
    isShowligtBox() {
      this.finishTadk = !this.finishTadk;
      this.restCheck = !this.restCheck;
    }
  }
};
</script>
