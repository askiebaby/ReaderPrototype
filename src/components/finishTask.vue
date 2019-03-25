<template>
  <div>
    <div class="background__male" v-if="finishTadk">
      <div id="resetPosition">
        <button class="button button__alert button__reset" @click="isShowligtBox">清除紀錄</button>
      </div>
      <div class="input-center">
        <div class="member_id">編號:{{id}}</div>
        <input type="text" v-model="member.name">
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
        <h3 class="lightBox__titleLarge">
          清除此編號
          <br>所有紀錄
        </h3>
        <p class="lightBox__subtitle">
          <span>編號：{{id}}</span>
          <span>{{member.name}}</span>
        </p>
        <button class="button button__primary taskPage__button" @click="isShowligtBox">取消</button>
        <button class="button button__default taskPage__button" @click="restRecord">清除記錄</button>
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
      id: this.$route.params.id,
      finishTadk: true,
      restCheck: false,
      member: {}
    };
  },
  methods: {
    isShowligtBox() {
      this.finishTadk = !this.finishTadk;
      this.restCheck = !this.restCheck;
    },
    restRecord() {
      $cookies.remove(this.id);
      this.$router.push({ name: "home" });
    }
  },
  mounted() {
    this.member = $cookies.get(this.id);
    let info = {
      id: this.id,
      name: this.member.name
    };
    this.$store.commit("memberInfo", info);
  }
};
</script>
