<template>
  <div>
    <div class="topMenu">
      <div class="topMenu__back">
        <img :src="require('@/assets/menu/back.svg')" @click="backHome" />
      </div>
    </div>

    <div class="taskPage">
      <button
        v-for="n in 3"
        :key="n"
        class="button buttonBig taskPage__button"
        :class="{
          button__primary: !isFinish(n),
          button__completed: isFinish(n)
        }"
        @click="nextPage(n)"
      >
        Task {{ n }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/modules/_button.scss';
.topMenu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  padding: 33px 0 0 24px;
  &__back {
    display: flex;
    max-width: 768px;
    margin: auto;
    cursor: pointer;
  }
}
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
  data() {
    return {
      id: this.$store.getters.getID
    };
  },
  methods: {
    isFinish(n) {
      const cookiesArrary = JSON.parse(this.$cookies.get(this.id));
      if (!cookiesArrary) {
        return false;
      }
      if (cookiesArrary[n - 1]) {
        return true;
      }
      return false;
    },
    backHome() {
      this.$router.push({ name: 'home' });
    },
    nextPage(taskIndex) {
      if (this.isFinish(taskIndex)) {
        this.$router.push({ name: 'taskRecord', params: { taskIndex } });
      } else {
        this.$store.commit('taskDefault', taskIndex - 1);
        this.$router.push({ name: 'taskDescription', params: { taskIndex } });
        console.log(this.$store.getters.getTask);
      }
    }
  }
};
</script>
