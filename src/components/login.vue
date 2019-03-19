<template>
  <div class="input-center background__male">
    <div class="member_id">編號:{{gender}}{{id}}</div>
    <input type="text" placeholder="姓名:王小明" v-model="name">
    <div class="buttons">
      <router-link
        tag="button"
        :to="{ name: 'home'}"
        class="button button__space button__default2"
      >取消</router-link>
      <button class="button button__space button__callToAction" @click="missionStart">開始</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-center {
  padding: 356px 0 443px 0;
}
</style>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      gender: this.$route.params.gender,
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
        num: this.id,
        gender: this.gender,
        name: this.name
      };
      this.$store.commit("memberInfo", info);
      this.$router.push({ name: "tasks" });
    }
  }
  // computed: {
  //   isDone() {
  //     return this.$store.getters.isDone;
  //   }
  // }
  // created() {
  //   if ((this.gender = "M")) {
  //   }
  // }
};
</script>

