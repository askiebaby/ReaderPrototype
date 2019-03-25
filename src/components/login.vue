<template>
  <div class="input-center background__male">
    <div class="member_id">編號:{{id}}</div>
    <input type="text" placeholder="姓名:王小明" v-model="name">
    <div class="buttons">
      <router-link
        tag="button"
        :to="{ name: 'home'}"
        class="button button__space button__cancel"
      >取消</router-link>
      <button class="button button__space button__callToAction" @click="missionStart">開始</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

@import '@/assets/scss/modules/_background.scss';
@import '@/assets/scss/modules/_input.scss';
@import '@/assets/scss/modules/_button.scss';

.input-center {
  min-height: 100vh;
}
</style>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      name: ""
    };
  },
  methods: {
    missionStart() {
      if (this.name == "") {
        alert("請輸入姓名！");
        return;
      }
      let info = {
        id: this.id,
        name: this.name
      };
      this.$store.commit("memberInfo", info);
      this.$router.push({ name: "tasks" });
    }
  }
};
</script>

