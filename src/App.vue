<template>
  <div id="app" class="wrapper" @click="totalCounts">
    <div class="real">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  // computed: {
  //   counter() {
  //     return this.$store.state.totalCounter;
  //   }
  // },
  methods: {
    totalCounts() {
      this.$store.commit("addTotalCounts");
    }
  }
};
</script>


