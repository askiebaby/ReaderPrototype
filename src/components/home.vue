<template>
  <div>
    <div class="wrapper">
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
            <!-- <router-link
              tag="div"
              :to="{ name: 'login',params:{id:n}}"
              class="task"
              v-for="n in 5"
            >{{n}}</router-link>-->
            <div class="task" v-for="n in 5" @click="toLogin(n,'M')">{{n}}</div>
          </div>
          <div class="taskList__tasks-type2">
            <div class="task" v-for="n in 5"
            @click="toLogin(n,'F')">
              {{n}}
            </div>
          </div>
        </div>
        <div class="taskList">
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
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wholeTask {
  padding: 55px 31px;
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
  border-bottom: 0.1em solid $white;
}

.task + .task {
  margin-left: 8px;
}

.taskList {
  background: $gray-2;
  color: $white;
  border-radius: 0 30px 30px 0;
  padding: 18px 29px 17px 10px;
  display: flex;
  min-height: 222px;

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
    flex-grow: 1;
    display: flex;

    .task__completed {
      background: $gray-1;
    }
  }

  &__description {
    display: flex;
    flex-flow: column;
    justify-content: center;
    padding: 0 14px 0 7px;
  }
}

.taskList + .taskList {
  margin-top: 12px;
}
</style>


<script>
// @ is an alias to /src

export default {
  methods: {
    toLogin(id, gender) {
      this.$router.push({ name: "login", params: { id: id, gender: gender } });
    }
  }
};
</script>
