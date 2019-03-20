<template>
  <div class="taskPage">
    <router-link
      tag="button"
      :to="{ name: 'taskDescription'}"
      class="button buttonBig button__primary taskPage__button"
    >Task 1</router-link>
    <!-- <button class="button buttonBig button__primary taskPage__button">Task 1</button> -->
    <button class="button buttonBig button__primary taskPage__button">Task 2</button>
    <button class="button buttonBig button__primary taskPage__button">Task 3</button>
  </div>
</template>

<style lang="scss" scoped>

@import '@/assets/scss/modules/_button.scss';

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
  // computed: {
  //   getMember() {
  //     return this.$store.getters.getMember;
  //   }
  // }
};
</script>
