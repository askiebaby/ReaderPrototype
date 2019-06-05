<template>
  <section class="comment">
    <div class="comment__background"></div>
    <div class="comment__container">
      <form action>
        <h3>
          <span class="memo__submit" @click="updateComment">完成</span>
          註解
          <span class="memo__cancel" @click="showComment(false)">取消</span>
        </h3>
        <main>
          <p>{{ getNote.text }}</p>
          <div class="comment__textarea" @click="contentConsole">
            <div
              ref="noteComment"
              contenteditable="true"
              class="comment__textarea__realworld"
            >
              {{ getNote.comment }}
            </div>
          </div>
        </main>
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/modules/_words-lines.scss';
@import '@/assets/scss/modules/_font.scss';

.comment {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  display: flex;
  align-content: center;
  font-family: 'Noto Sans TC', sans-serif;
  height: 100vh;
  width: 100%;
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
    height: 424px;
    margin: 20% auto 0;
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
    padding: 13px;
    font-weight: 300;
    outline: none;
    text-align: justify;
    &__realworld {
      color: $black-1;
      font-size: $indexSize;
      outline: 0;
      height: 7.5em;
      overflow: hidden;
    }
  }
  .memo {
    &__cancel,
    &__submit {
      position: absolute;
      font-size: $indexSize;
      padding: 14px 20px;
      font-weight: 500;
      cursor: pointer;
    }
    &__cancel {
      color: $white;
      top: 3px;
      border-radius: 18px;
      left: 10px;
    }
    &__submit {
      color: $white;
      padding: 12px 20px;
      bottom: 1px;
      right: 10px;
    }
  }
  form {
    display: flex;
    flex-flow: row wrap;
  }
  main {
    display: flex;
    flex-flow: row wrap;
    padding: 18px 18px 50px;
    width: 100%;
  }
  h3 {
    position: relative;
    flex-basis: 100%;
    flex-direction: column;
    justify-content: center;
    background-color: $black-1;
    font-size: $titleSize;
    font-weight: 300;
    text-align: center;
    color: $white;
    border-radius: 18px 18px 0 0;
    padding: 10px;
  }
  p {
    margin-bottom: 1.5em;
    padding: 0 10px;
    min-height: 6em;
    font-weight: 500;
    color: $black-1;
    text-align: justify;
    @include lines(4);
  }
}
.words-row {
  .comment {
    &__container {
      width: 55%;
      max-width: 424px;
      min-height: 567px;
      display: flex;
      flex-grow: 1;
      direction: rtl;
      margin-top: 100px;
    }
    form {
      width: 100%;
    }
    main {
      position: relative;
      flex-direction: column;
      flex-wrap: nowrap;
      flex-grow: 1;
      writing-mode: tb-rl;
      direction: ltr;
      padding: 18px 12px;
      width: 300px;
    }
    h3 {
      display: flex;
      align-items: center;
      direction: rtl;
      flex-basis: 56px;
      border-radius: 0 18px 18px 0;
      height: 100%;
    }
    p,
    &__textarea {
      letter-spacing: 0.2em;
    }
    p {
      display: block;
      line-height: 1.75;
      padding: 15px 0 14px 0;
      margin-bottom: 0;
      max-height: 100%;
      max-width: 7em;
      min-width: auto;
      overflow: hidden;
      text-align: justify;
    }
    &__textarea {
      max-width: 173px;
      min-width: 173px;
      min-height: 531px;
      padding: 0 0 14px 15px;
      position: absolute;
      left: 50px;
      top: auto;
      &__realworld {
        width: 7.5em;
        margin-top: 15px;
        margin-right: 15px;
        height: 100%;
      }
    }
    .memo {
      &__cancel,
      &__submit {
        position: absolute;
        letter-spacing: 0.5em;
        padding: 0 5px;
        height: 6em;
        text-align: center;
        writing-mode: vertical-rl;
      }
      &__cancel {
        right: auto;
        left: 0;
      }
      &__submit {
        right: auto;
        left: 0;
      }
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
      if (!note) {
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
    contentConsole() {
      // 解決 contenteditable div 在 mobile 無法 focus 的問題
      const comment = this.$refs.noteComment;
      comment.focus();
      this.placeCaretAtEnd(this.$refs.noteComment);
    },
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
      if (!task[2]) {
        this.updateCommentFn(false);
        return;
      }
      if (task[2].time.length == 2) {
        if (comment.trim() == step3_2.comment) {
          this.$store.commit('setTask', 2);
          console.log('145949', this.$store.getters.getTask);
        }
        this.updateCommentFn(false);
        return;
      }
      if (task[2].time.length == 4) {
        if (comment.trim() == step3_4.comment) {
          this.$store.commit('setTask', 2);
          console.log('87777', this.$store.getters.getTask);
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
    },
    placeCaretAtEnd(el) {
      if (
        typeof window.getSelection != 'undefined' &&
        typeof document.createRange != 'undefined'
      ) {
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (typeof document.body.createTextRange != 'undefined') {
        const textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
      }
    }
  }
};
</script>
