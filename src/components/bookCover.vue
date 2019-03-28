<template>
  <div @click="toNext">
    <background-cover></background-cover>
  </div>
</template>
<script>
import backgroundCover from "@/components/backgroundCover.vue";
export default {
  methods:{
    toNext(){
      this.$router.push({ name: "book" });
    }
  },
  components:{
    backgroundCover
  }
}
</script>
