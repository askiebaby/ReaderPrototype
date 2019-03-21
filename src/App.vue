<template>
  <div id="app" class="wrapper" @click="totalCounts">
    <!-- {{counter}} -->
    <router-view/>
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


