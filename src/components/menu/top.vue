<template>
  <div id="main">
    <img :src="require('@/assets/menu/back.svg')">
    <p>回到書櫃</p>
  </div>
</template>
<style lang="scss" scoped>
#main {
  display: flex;
  align-items: center;
  margin: 31px 0 0 24px;
}
img{
  margin-right: 24px;
}
p{
  color: $black-1;
}
</style>


