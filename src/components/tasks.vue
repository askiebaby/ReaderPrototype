<template>
  <div>
    <div class="wrapper">
      <div class="taskPage">
        <button class="button button__default taskPage__button">Task 1</button>
        <button class="button button__primary taskPage__button">Task 2</button>
        <button class="button button__primary taskPage__button">Task 3</button>        
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
  
}
</script>
