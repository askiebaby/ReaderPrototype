<template>
  <!-- <div class="functions-row"> -->
  <section class="memo">
    <div class="memo__background"></div>
    <div class="memo__container">
      <form action="">
        <h3>
          註解
          <span class="memo__cancel" @click="showComment(false)">取消</span>
        </h3>
        <main>
          <p>
            {{ getNote.text }}
          </p>
          <div ref="noteComment" contenteditable class="memo__textarea">
            {{ getNote.comment }}
          </div>
          <span class="memo__submit" @click="updateComment">完成</span>
        </main>
      </form>
    </div>
  </section>
  <!-- </div> -->
</template>

<style lang="scss" scoped>
@import '@/assets/scss/modules/_words-lines.scss';

.memo {
  display: flex;
  align-content: center;
  height: 100vh;
  font-family: 'Noto Sans TC', sans-serif;
  &__background {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgba(234, 234, 234, 0.95);
  }
  &__container {
    position: relative;
    width: 567px;
    margin: auto auto 50%;
    background: $white;
    border-radius: 18px;
  }
  &__textarea {
    max-width: 100%;
    min-width: 100%;
    min-height: 173px;
    max-height: 173px;
    border: 1px solid $gray-3;
    border-radius: 18px;
    font-size: 14px;
    padding: 13px;
    color: $black-1;
    font-weight: 300;
    outline: none;
  }
  &__cancel,
  &__submit {
    position: absolute;
    right: 10px;
    font-size: $indexSize;
    padding: 14px 20px;
    font-weight: 500;
    cursor: pointer;
  }
  &__cancel {
    color: $white;
    top: 3px;
    border-radius: 18px;
  }
  &__submit {
    color: $black-1;
    background-color: $white;
    padding: 12px 20px;
    bottom: 1px;
  }
  form {
    display: flex;
    flex-flow: row wrap;
  }
  main {
    display: flex;
    flex-flow: row wrap;
    padding: 18px 18px 50px;
  }
  h3 {
    position: relative;
    font-size: $titleSize;
    text-align: center;
    background-color: $black-1;
    color: $white;
    border-radius: 18px 18px 0 0;
    padding: 10px;
    flex-basis: 100%;
    font-weight: 300;
  }
  p {
    margin-bottom: 1.5em;
    padding: 0 10px;
    min-height: 6em;
    font-weight: 500;
    color: $black-1;
    @include lines(4);
  }
}
.functions-row {
  .memo {
    &__container {
      width: 55%;
      max-width: 424px;
      min-height: 567px;
      display: flex;
      flex-grow: 1;
    }
    form {
      flex-basis: 100%;
      flex-direction: row-reverse;
    }
    main {
      flex-direction: column;
      flex-wrap: nowrap;
      flex-grow: 1;
      writing-mode: tb-rl;
      padding-bottom: 18px;
    }
    h3 {
      display: flex;
      align-items: center;
      direction: rtl;
      flex-basis: 56px;
      border-radius: 0 18px 18px 0;
    }
    p,
    &__textarea {
      letter-spacing: 0.2em;
    }
    p {
      padding: 15px 0 14px 3em;
      min-width: 120px;
      line-height: 1.75;
    }
    &__textarea {
      max-width: 173px;
      min-width: 173px;
      min-height: 100%;
      padding: 14px 15px;
    }
    &__cancel,
    &__submit {
      bottom: 5px;
      letter-spacing: 0.5em;
      padding: 0 5px;
      height: 6em;
      text-align: center;
      writing-mode: vertical-rl;
    }
    &__cancel {
      left: 0;
      right: auto;
    }
    &__submit {
      right: unset;
      left: 0;
    }
  }
}
</style>

<script>
import documentContent from '@/assets/document.json';

export default {
  props: {
    notesIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      documentContent
    };
  },
  computed: {
    getNote() {
      const note = this.$store.getters.getNotes[this.notesIndex];
      if (note == undefined) {
        return { text: '', comment: '' };
      }
      return {
        text: this.documentContent.books[note.chapterIndex].sections[
          note.sectionIndex
        ].content.slice(note.textStart, note.textEnd),
        comment: note.comment
      };
    }
  },
  methods: {
    showComment(showComplete) {
      this.$emit('showComment', {
        showComment: false,
        showComplete: showComplete
      });
    },
    updateComment() {
      const comment = this.$refs.noteComment.innerText;
      const task = this.$store.getters.getTask;
      const checkTask = this.$store.getters.getNotes[this.notesIndex].task;
      const step3_2 = this.$store.getters.getTarget[2].step[1];
      const step3_4 = this.$store.getters.getTarget[2].step[3];
      if (checkTask != step3_2.task) {
        this.updateCommentFn(false);
        return;
      }
      if (task.length <= 0) {
        this.updateCommentFn(false);
        return;
      }
      if (task[2] == undefined) {
        this.updateCommentFn(false);
        return;
      }
      if (task[2].time.length == 2) {
        if (comment.trim() == step3_2.comment) {
          this.$store.commit('setTask', 2);
          console.log('87777', this.$store.getters.getTask);
        }
        this.updateCommentFn(false);
        return;
      }
      if (task[2].time.length == 4) {
        if (comment.trim() == step3_4.comment) {
          this.$store.commit('setTask', 2);
          // console.log('87777', this.$store.getters.getTask);
          this.updateCommentFn(true);
          return;
        }
        this.updateCommentFn(false);
        return;
      }
    },
    updateCommentFn(showComplete) {
      this.$store.commit('changeNoteComment', {
        index: this.notesIndex,
        comment: this.$refs.noteComment.innerText
      });
      this.showComment(showComplete);
    }
  }
};
</script>
