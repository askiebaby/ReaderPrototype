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
        :class="{ button__primary: !finish, button__completed: finish }"
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
      id: this.$store.getters.getID,
      finish: false
    };
  },
  mounted() {
    if ($cookies.get(this.id) !== null) {
      console.log($cookies.get(this.id));
      this.finish = true;
    }
  },
  methods: {
    backHome() {
      this.$router.push({ name: 'home' });
    },
    nextPage(order) {
      if (this.finish) {
        this.$router.push({ name: 'taskRecord' });
      } else {
        this.$store.commit('taskDefault', 0);
        this.$router.push({ name: 'taskDescription', params: { order } });
        console.log(this.$store.getters.getTask);
      }
    }
  }
};
</script>
