<template>
  <div>
    <!-- 離開任務 -->
    <div class="lightBox leaveMission" v-if="leave">
      <div class="lightBox__background"></div>
      <div class="lightBox__bubble">
        <h3 class="lightBox__titleLarge">離開任務</h3>
        <div v-if="leaveTxt">
          <button class="button button__primary taskPage__button" @click="changeLeaveStatus">回到任務</button>
          <button class="button button__default taskPage__button" @click="leaveCheck">我要離開</button>
        </div>
        <div v-if="checkTxt">
          <button class="button button__primary taskPage__button" @click="leaveRest">離開</button>
          <button class="button button__default taskPage__button" @click="leaveCheck">取消</button>
        </div>
      </div>
    </div>
    <!-- 離開重新測試 確認 -->
    <div class="lightBox deleteRecordConfirm" v-if="rest">
      <div class="lightBox__background"></div>
      <div class="lightBox__bubble" @click="removeRecord">
        <h3 class="lightBox__titleLarge">
          清除此任務
          <br>紀錄
        </h3>
        <button class="button button__primary taskPage__button">確認</button>
        <button class="button button__default taskPage__button" @click="leaveRest">取消</button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/scss/modules/_lightBox.scss";
@import "@/assets/scss/modules/_button.scss";
</style>

<script>
export default {
  data() {
    return {
      id: this.$store.getters.getID,
      leaveTxt: true,
      checkTxt: false,
      leave: true,
      rest: false
    };
  },
  methods: {
    removeRecord() {
      $cookies.remove(this.id);
      this.$router.push({ name: "tasks" });
    },
    leaveCheck() {
      this.leaveTxt = !this.leaveTxt;
      this.checkTxt = !this.checkTxt;
    },
    leaveRest() {
      this.leave = !this.leave;
      this.rest = !this.rest;
    },
    changeLeaveStatus() {
      this.$emit("cancelLeaveBubble", false);
    }
  }
};
</script>
