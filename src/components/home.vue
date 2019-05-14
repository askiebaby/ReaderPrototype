<template>
  <div class="wholeTask">
    <div class="taskList">
      <div class="taskList__description">
        <div class="taskList__description__word">文</div>
        <div class="taskList__description__word">橫</div>
        <div class="taskList__description__word">功</div>
        <div class="taskList__description__word">能</div>
        <div class="taskList__description__word">橫</div>
      </div>
      <div class="taskList__tasks-type1">
        <div
          v-for="n in 15"
          class="task"
          :class="{ task__completed: isFinish('M' + n) }"
          @click="nextPage('M' + n)"
        >
          <span>{{ n }}</span>
        </div>
      </div>
      <div class="taskList__tasks-type2">
        <div
          v-for="n in 15"
          class="task"
          :class="{ task__completed: isFinish('F' + n) }"
          @click="nextPage('F' + n)"
        >
          <span>{{ n }}</span>
        </div>
      </div>
    </div>
    <!-- <div class="taskList">
      <div class="taskList__description">
        <div class="taskList__description__word">文</div>
        <div class="taskList__description__word">橫</div>
        <div class="taskList__description__word">功</div>
        <div class="taskList__description__word">能</div>
        <div class="taskList__description__word">橫</div>
      </div>
      <div class="taskList__tasks-type1">
        <div class="task task__completed">
          <span>1</span>
        </div>
        <div class="task">
          <span>2</span>
        </div>
        <div class="task">
          <span>3</span>
        </div>
        <div class="task">
          <span>4</span>
        </div>
        <div class="task">
          <span>5</span>
        </div>
      </div>
      <div class="taskList__tasks-type2">
        <div class="task task__completed">1</div>
        <div class="task">
          <span>2</span>
        </div>
        <div class="task">
          <span>3</span>
        </div>
        <div class="task">
          <span>4</span>
        </div>
        <div class="task">
          <span>5</span>
        </div>
      </div>
    </div> -->
  </div>
</template>

<style lang="scss">
.wholeTask {
  padding: 55px 31px 55px 0;
  font-size: $contentSize;
}

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
// @ is an alias to /src

export default {
  data() {
    return {
      finishId: []
    };
  },
  methods: {
    isFinish(id) {
      let result = false;
      if ($cookies.get(id) !== null) {
        console.log($cookies.get(id));
        result = true;
      }
      return result;
    },
    nextPage(id) {
      let result = this.isFinish(id);
      if (result) {
        this.$router.push({ name: 'finishTask', params: { id } });
      } else {
        this.$router.push({ name: 'login', params: { id } });
      }
    }
  }
};
</script>
