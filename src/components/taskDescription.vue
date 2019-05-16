<template>
  <div>
    <!-- 任務題目 -->
    <div class="cover">
      <img :src="require('@/assets/cover.png')" class="cover__img" />
    </div>
    <div class="lightBox taskName">
      <div class="lightBox__background"></div>
      <div class="lightBox__bubble">
        <h3 class="lightBox__titleMiddle">請依序完成指定任務</h3>
        <div class="lightBox__content">
          <p class="lightBox__subtitle">任務{{ showTask.task }}：</p>
          <div class="lightBox__taskDescription">
            <p v-for="item in showTask.description" :key="item">
              {{ item }}
            </p>
          </div>
        </div>
        <router-link
          tag="button"
          :to="{ name: 'bookCover' }"
          class="button button__primary taskPage__button"
          @click.native="taskStart"
          >開始</router-link
        >
        <router-link
          tag="button"
          :to="{ name: 'tasks' }"
          class="button button__default taskPage__button"
          >取消</router-link
        >
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '@/assets/scss/modules/_lightBox.scss';
@import '@/assets/scss/modules/_button.scss';
.cover {
  height: 100vh;
  overflow: hidden;
  text-align: center;
  &__img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: calc(100% - 80px);
  }
}
</style>

<script>
export default {
  data() {
    return {
      order: this.$route.params.order - 1,
      tasks: [
        {
          task: '一',
          description: [
            '（1-1）翻到第一章 “有目的的練習” 。',
            '（1-2）將字體設定成最大。',
            '（1-3）將閱讀模式調成黑底白字的夜間模式。'
          ]
        },
        {
          task: '二',
          description: [
            '（2-1）請翻到第2章節 “大腦的適應能力” 。找到文中："你可以採用錄影...感受一下你的進步"把這段劃為重點。',
            '（2-2）在內文，將螢光筆改為綠色。',
            '（2-3）請到筆記庫，將螢光筆改為粉紅色。',
            '（2-4）將此段話於筆記庫內刪除。'
          ]
        },
        {
          task: '三',
          description: [
            '（3-1）請找到第2章節"走出舒適區的重要性"中的一段話："對於這種現象，技術上...行動的趨勢"。',
            '（3-2）將此段話附上註解，註解內容為：體內平衡。',
            '（3-3）用evernote分享此段落。',
            '（3-4）請刪除“體內平衡”的註解。'
          ]
        }
      ],
      task: this.$store.getters.getTask
    };
  },
  computed: {
    showTask() {
      return this.tasks[this.order];
    }
  },
  methods: {
    taskStart() {
      let index = 0;
      if (this.task.length > 0) {
        this.$store.commit('setTask', index);
        console.log(this.$store.getters.getTask);
      }
    }
  }
};
</script>
