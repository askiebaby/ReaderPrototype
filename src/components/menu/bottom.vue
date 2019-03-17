<template>
  <div>
    <ul>
      <li>
        <img :src="require('@/assets/menu/burger.svg')">
      </li>
      <li>
        <img :src="require('@/assets/menu/aa.png')">
      </li>
      <li>
        <img :src="require('@/assets/menu/group.svg')">
      </li>
      <li>
        <img :src="require('@/assets/menu/share.svg')">
      </li>
      <li>
        <img :src="require('@/assets/menu/square.svg')">
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
// #main {
//   height: 66px;
//   align-items: center;
// }
ul {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  list-style-type: none;
  align-items: center;
}
</style>

I