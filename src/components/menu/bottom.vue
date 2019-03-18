<template>
  <div>
    <ul>
      <router-link
        tag="li"
        :to="{ name: 'index'}"
      ><img :src="require('@/assets/menu/burger.svg')"></router-link>
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