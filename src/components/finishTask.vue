<template>
  <div>
    <div v-if="finishTask" class="background__male">
      <button
        class="button button__alert button__reset positionTopRight"
        @click="isShowligtBox"
      >
        清除紀錄
      </button>
      <div class="input-center">
        <div class="member_id">編號:{{ showInfo.id }}</div>
        <input v-model="showInfo.name" type="text" disabled />
        <div class="buttons">
          <button
            class="button button__space button__default"
            @click="backHome"
          >
            上一頁
          </button>
          <!-- <router-link
            tag="button"
            :to="{ name: 'home' }"
            class="button button__space button__default"
            >上一頁</router-link
          > -->
          <router-link
            tag="button"
            :to="{ name: 'tasks' }"
            class="button button__space button__default"
            >紀錄</router-link
          >
        </div>
      </div>
    </div>
    <!-- 刷新紀錄 -->
    <div v-if="resetCheck" class="lightBox deleteRecord">
      <div class="lightBox__background"></div>
      <div class="lightBox__bubble">
        <h3 class="lightBox__titleLarge">
          清除此編號
          <br />所有紀錄
        </h3>
        <p class="lightBox__subtitle">
          <span>編號：{{ showInfo.id }}</span>
          <span>{{ showInfo.name }}</span>
        </p>
        <button
          class="button button__primary taskPage__button"
          @click="isShowligtBox"
        >
          取消
        </button>
        <button
          class="button button__default taskPage__button"
          @click="resetRecord"
        >
          清除記錄
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/modules/_lightBox.scss';
@import '@/assets/scss/modules/_background.scss';
@import '@/assets/scss/modules/_input.scss';
@import '@/assets/scss/modules/_button.scss';

.positionTopRight {
  position: absolute;
  right: 37px;
  top: 38px;
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
      finishTask: true,
      resetCheck: false
    };
  },
  computed: {
    showInfo() {
      const obj = {
        id: this.$route.params.id,
        name: this.$store.getters.getName
      };
      const cookiesArray = JSON.parse(this.$cookies.get(obj.id));
      if (!cookiesArray) {
        return obj;
      }
      const cookiesFilter = cookiesArray.filter(n => n);
      if (cookiesFilter.length !== 0) {
        obj.name = cookiesFilter[0].name;
      }
      return obj;
    }
  },
  methods: {
    backHome() {
      this.$store.commit('memberInfo', { id: '', name: '' });
      this.$router.push({ name: 'home' });
    },
    isShowligtBox() {
      this.finishTask = !this.finishTask;
      this.resetCheck = !this.resetCheck;
    },
    resetRecord() {
      this.$cookies.remove(this.showInfo.id);
      this.backHome();
    }
  }
};
</script>
