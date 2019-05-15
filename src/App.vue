<template>
  <div id="app" class="wrapper" @click="totalCounts">
    <div class="real">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    totalCounts() {
      this.$store.commit('addTotalCounts');
    }
  }
};
</script>
