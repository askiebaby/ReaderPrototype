<template>
  <div>
    <!-- 離開重新測試 確認 -->
    <div class="lightBox deleteRecordConfirm">
      <div class="lightBox__background"></div>
      <div class="lightBox__bubble">
        <h3 class="lightBox__titleLarge">清除此任務 <br />紀錄</h3>
        <button
          class="button button__primary taskPage__button"
          @click="removeRecord"
        >
          確認
        </button>
        <button class="button button__default taskPage__button" @click="cancel">
          取消
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
export default {
  props: {
    taskIndex: {
      type: Number,
      default: -1
    },
    id: {
      type: String,
      default: ''
    }
  },
  methods: {
    removeRecord() {
      const cookiesArray = JSON.parse(this.$cookies.get(this.id));
      delete cookiesArray[this.taskIndex];
      this.$cookies.set(this.id, JSON.stringify(cookiesArray));
      this.$router.push({ name: 'tasks', params: { id: this.id } });
    },
    cancel() {
      this.$emit('backRecord');
    }
  }
};
</script>
