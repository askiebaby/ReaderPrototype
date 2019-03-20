<template>
  <div class="nav">
    <ul>
      <router-link
        tag="li"
        :to="{name: 'index'}"
      ><img :src="require('@/assets/menu/burger.svg')"></router-link>
      <li @click="changeSettingStatus">
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
.nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid #eee;
  background: $white;
}

ul {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-evenly;
  list-style-type: none;
  align-items: center;

  img {
    padding: 20px 15px;
    cursor: pointer;
  }
}
</style>

<script>
export default {
  methods: {
    changeSettingStatus () {
      this.$emit("showSettingBubble", true)
    }
  }
}
</script>
