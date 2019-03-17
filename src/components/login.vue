<template>
  <div>
    <div class="wrapper login-main male-background">
      <div class="member_id">編號：{{gender}}{{id}}</div>
      <input type="text" class="name" placeholder="姓名：王小明">
      <div class="buttons">
        <button class="buttons_cancel">取消</button>
        <button class="buttons_start">開始</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-main {
  padding: 356px 0 443px 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.male-background {
  background-color: $blue;
}
.female-background {
  background-color: $red;
}
.member_id {
  color: $white;
  font-size: $titleSize;
  margin: 0 66px 19px 65px;
}
.name {
  width: 300px;
  height: 42px;
  border-radius: 8px;
  padding: 0;
  border: 0 none;
  background-color: $white;
  text-align: center;
  font-size: $contentSize;
  margin-bottom: 76px;
}
.buttons {
  &_cancel,
  &_start {
    width: 100px;
    height: 42px;
    padding: 0;
    border: 0 none;
    border-radius: 8px;
    font-size: $contentSize;
  }
  &_cancel {
    color: $gray-1;
    background-color: $white;
    margin-right: 35px;
    
  }
  &_start {
    color: $white;
    background-color: $green;
  }
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
  created(){
    if(gender='M'){

    }
  }
};
</script>

