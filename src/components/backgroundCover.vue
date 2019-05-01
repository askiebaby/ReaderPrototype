<template>
  <div>
    <div class="cover">
      <img :src="require('@/assets/cover.png')" class="cover__img" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.cover {
  height: 100vh;
  overflow: hidden;
  text-align: center;
  &__img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: calc(100% - 80px);
  }
}
</style>
