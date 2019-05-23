<template>
  <div class="wholeTask">
    <template v-for="(words, wordsIndex) in directions">
      <taskList
        v-for="(functions, funIndex) in directions"
        :key="`${wordsIndex}${funIndex}`"
        :directions="{ words: words, functions: functions }"
        :list-index="wordsIndex * directions.length + funIndex"
      ></taskList>
    </template>
  </div>
</template>

<style lang="scss">
.wholeTask {
  padding: 55px 31px 55px 0;
  font-size: $contentSize;
}
</style>

<script>
// @ is an alias to /src
import taskList from './taskList.vue';

export default {
  components: {
    taskList
  },
  data() {
    return {
      directions: ['column', 'row']
    };
  },
  methods: {}
};
</script>
