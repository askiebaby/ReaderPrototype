<template>
  <div class="nav">
    <ul>
      <li @click="openIndexStatus">
        <img :src="require('@/assets/menu/burger.svg')">
      </li>
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
  left: auto;
  right: auto;
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
  max-width: 768px;
  margin: auto;

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
    },
    openIndexStatus () {
      this.$emit("openIndexStatus", true)
    }
  }
}
</script>
