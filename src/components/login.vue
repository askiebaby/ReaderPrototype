<template>
  <div class="input-center background__male">
    <div class="member_id">編號:{{gender}}{{id}}</div>
    <input type="text" placeholder="姓名:王小明">
    <div class="buttons">
      <router-link
        tag="button"
        :to="{ name: 'home'}"
        class="button button__space button__default2"
      >取消</router-link>
      <router-link
        tag="button"
        :to="{ name: 'tasks'}"
        class="button button__space button__callToAction"
      >開始</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>

@import '@/assets/scss/modules/_background.scss';
@import '@/assets/scss/modules/_input.scss';
@import '@/assets/scss/modules/_button.scss';

.input-center {
  padding: 356px 0 443px 0;
}
</style>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      gender: this.$route.params.gender
    };
  },
  created() {
    if ((this.gender = "M")) {
    }
  }
};
</script>

