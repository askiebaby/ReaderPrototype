<template>
  <div class="taskList">
    <div class="taskList__description" v-html="titleTemplate"></div>
    <div class="taskList__tasks-type1">
      <div
        v-for="loopIndex in taskAmountInList"
        class="task"
        :key="`M${countTaskAmount(loopIndex)}`"
        :class="{ task__completed: isFinish('M' + countTaskAmount(loopIndex)) }"
        @click="commitDirectionsToVueX(directions, nextPage('M' + countTaskAmount(loopIndex)))"
      >
        <span>{{ countTaskAmount(loopIndex) }}</span>
      </div>
    </div>
    <div class="taskList__tasks-type2">
      <div
        v-for="loopIndex in taskAmountInList"
        class="task"
        :key="`F${countTaskAmount(loopIndex)}`"
        :class="{ task__completed: isFinish('F' + countTaskAmount(loopIndex)) }"
        @click="commitDirectionsToVueX(directions, nextPage('F' + countTaskAmount(loopIndex)))"
      >
        <span>{{ countTaskAmount(loopIndex) }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
%task {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.task {
  @extend %task;

  span {
    line-height: 1.15em;
  }
}

.task:nth-child(2n + 2) span {
  border-top: 0.1em solid transparent;
  border-bottom: 0.1em solid $white;
}

.task {
  margin-left: 8px;
  margin-bottom: 10px;
}

.taskList {
  background: $gray-2;
  color: $white;
  border-radius: 0 30px 30px 0;
  padding: 18px 29px 7px 15px;
  display: flex;
  min-height: 222px;
  max-width: 706px;
  margin: 0;

  &__tasks-type1 {
    .task {
      background: $normalColor;
    }
  }

  &__tasks-type2 {
    .task {
      background: $alertColor;
    }
  }

  &__tasks-type1,
  &__tasks-type2 {
    display: flex;
    flex-flow: row wrap;
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: calc((100% - 70px) / 2);
    max-width: 50%;

    .task__completed {
      background: $gray-1;
    }
  }

  &__description {
    display: flex;
    flex-flow: column;
    justify-content: center;
    padding-right: 10px;
  }
}

.taskList + .taskList {
  margin-top: 12px;
}
</style>

<script>
export default {
  props: {
    directions: {
      type: Object,
      default() {
        return { words: 'column', functions: 'column' };
      }
    },
    listIndex: {
      type: Number,
      default() {
        return 1;
      }
    }
  },
  data() {
    return {
      finishId: [],
      titleTemplate: '',
      taskAmountInList: 15
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.makeTitleTemplate(this.directions.words, this.directions.functions);
    });
  },
  methods: {
    makeTitleTemplate(directionWords, directionFunctions) {
      const titleString = `文${directionToString(directionWords)}功能${directionToString(directionFunctions)}`;

      this.titleTemplate = titleString
        .split('')
        .map(title => `<div class="taskList__description__word">${title}</div>`)
        .join('');

      function directionToString(dir) {
        return dir === 'row' ? '直' : '橫';
      }
    },
    countTaskAmount(loopIndex) {
      return loopIndex + this.listIndex * this.taskAmountInList;
    },
    isFinish(id) {
      let result = false;
      if ($cookies.get(id) !== null) {
        console.log($cookies.get(id));
        result = true;
      }
      return result;
    },
    commitDirectionsToVueX(directions, callback) {
      console.log('commitDirectionsToVueX', directions);
      callback();
      this.$store.commit('setDirections', directions);
    },
    nextPage(id) {
      return () => {
        const result = this.isFinish(id);
        let idToRouter = result ?{ name: 'finishTask', params: { id } } : { name: 'login', params: { id } };
        this.$router.push(idToRouter);
      };
    }
  }
};
</script>
