<template>
  <section class="notes">
    <complete-mission
      v-if="isShowComplete"
      :task-index="taskIndex"
    ></complete-mission>
    <div class="notes__background" @click="closeNotes"></div>
    <div class="notes__container">
      <nav class="notes__nav">
        <div class="notes__nav__close" @click="closeNotes">
          <img :src="require('@/assets/menu/back-white.svg')" alt="BACK" />
        </div>
        <div class="notes__nav__title">
          <h2>筆記庫</h2>
        </div>
      </nav>
      <div class="notes__all">
        <share v-if="isShowShare" :notes-index="notesIndex"></share>
        <comment
          v-if="isShowComment"
          :notes-index="notesIndex"
          @showComment="showComment($event.showComment)"
        ></comment>
        <tooltip
          v-if="isShowTooltip"
          :from-content="false"
          :notes-index="notesIndex"
          :tooltip-position="tooltipPosition"
          @afterDelete="afterDelete($event)"
          @changeColor="changeColor($event, notesIndex)"
          @showComment="showComment($event.showComment)"
          @isShowTooltip="isShowTooltip = $event"
        ></tooltip>
        <article v-for="(item, index) in getNotes" :key="index" class="note">
          <div class="note__highlight" :class="item.color"></div>
          <div
            class="note__record"
            @click="loadBookContent(item.chapterIndex, item.sectionIndex)"
          >
            <div class="note__sentence">
              {{ item.text }}
            </div>
            <div v-if="item.comment.length > 0" class="note__memo">
              {{ item.comment }}
            </div>
          </div>
          <div class="note__actionButton">
            <img
              :src="require('@/assets/menu/dropdown-doubleline.svg')"
              alt="More Actions"
              @click="e => selectedNote(e, index, item.color)"
            />
          </div>
        </article>
        <div
          class="notes__all__background"
          @click="isShowTooltip = false"
        ></div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/modules/_words-lines.scss';

.notes {
  position: relative;
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 100;
  &__background {
    background: rgba(155, 155, 155, 0.9);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
  &__all {
    position: relative;
    &__background {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }
  &__container {
    position: absolute;
    background: #f4f4f4;
    top: 0;
    right: 0;
    width: 658px;
    height: 100vh;
    overflow: hidden;
    > div {
      &:nth-child(2) {
        padding: 10px 0;
        overflow-y: scroll;
        height: calc(100vh - 63px);
      }
    }
  }
  &__nav {
    h2 {
      font-size: $indexSize;
    }
    > div {
      text-align: center;
    }
    background: $black-1;
    color: $white;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 18px 0 13px;
    text-align: center;
    &__close {
      flex-basis: 40px;
      margin-top: 5px;
      cursor: pointer;
    }
    &__title {
      flex-grow: 1;
    }
  }
}

.note {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px 5px;
  &__highlight {
    width: 13px;
    height: 119px;
    flex-shrink: 0;
  }
  &__record {
    flex-basis: calc(95% - 50px);
    text-align: justify;
  }
  &__actionButton {
    flex-basis: 50px;
    height: 50px;
    text-align: center;
    cursor: pointer;
  }
  &__sentence {
    @include lines(3);
    font-size: 14px;
    margin-bottom: 15px;
  }
  &__memo {
    @include lines(2);
    font-size: 12px;
    color: #2e2e2e;
    min-height: 37px;
    padding-left: 10px;
    border-left: 2px solid #8c8b8c;
    &:empty {
      min-height: 0;
    }
  }
}
.yellow-pen {
  background-color: $yellow-pen;
}
.red-pen {
  background-color: $red-pen;
}
.purple-pen {
  background-color: $purple-pen;
}
.green-pen {
  background-color: $green-pen;
}
.words-row {
  .notes {
    &__all {
      display: flex;
      flex-flow: row nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      height: 100%;
      direction: rtl;
      &__background {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }
  .note {
    position: relative;
    flex: 0 0 auto;
    width: 130px;
    flex-direction: column;
    padding: 10px;
    height: 90%;
    &__highlight {
      width: 119px;
      height: 13px;
    }
    &__record {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      flex-grow: 1;
      padding: 10px 5px;
      letter-spacing: 0.2em;
      text-align: left;
      width: 100%;
    }
    &__sentence,
    &__memo {
      display: flex;
      justify-content: flex-end;
      writing-mode: vertical-rl;
      overflow: auto;
      flex-shrink: 0;
      max-height: 700px;
      height: 100%;
      width: fit-content;
      writing-mode: vertical-rl;
      text-align: left;
    }
    &__sentence {
      margin: 0;
      max-width: 4.5em;
      font-weight: 600;
    }
    &__memo {
      margin-right: 13px;
      border-left: none;
      border-top: 2px solid #8c8b8c;
      padding-top: 13px;
      padding-left: 0;
      max-width: 3em;
      font-weight: 300;
    }
    &__actionButton {
      position: absolute;
      bottom: 20px;
      left: 0;
      width: 100%;
      padding-top: 20px;
    }
  }
}
</style>

<script>
import documentContent from '@/assets/document.json';
import tooltip from './tooltip.vue';
import completeMission from './lightBox/completeMission.vue';
import comment from './comment.vue';
import share from './share.vue';
export default {
  components: {
    tooltip,
    completeMission,
    share,
    comment
  },
  data() {
    return {
      documentContent,
      taskIndex: -1,
      notesIndex: -1,
      isShowComplete: false,
      isShowComment: false,
      isShowTooltip: false,
      isShowShare: false,
      tooltipPosition: {
        x: 0,
        y: 0
      }
    };
  },
  computed: {
    getNotes() {
      const Notes = this.$store.getters.getNotes;
      return Notes.map(item => {
        return {
          chapterIndex: item.chapterIndex,
          sectionIndex: item.sectionIndex,
          text: this.documentContent.books[item.chapterIndex].sections[
            item.sectionIndex
          ].content.slice(item.textStart, item.textEnd),
          color: item.color,
          comment: item.comment
        };
      });
    }
  },
  methods: {
    showComment(event) {
      this.isShowComment = event;
      this.isShowTooltip = !event;
    },
    loadBookContent(chapterIndex, sectionIndex) {
      // ?????
      this.closeNotes();

      // ?????????
      const location = {
        chapters: this.documentContent.books.length,
        chapterIndex: chapterIndex,
        sections: this.documentContent.books[chapterIndex].sections.length,
        sectionIndex: sectionIndex,
        pageIndex: 0
      };

      // ????????
      const bookContent = {
        chapter: this.documentContent.books[chapterIndex].chapter,
        h1title: this.documentContent.books[chapterIndex].title,
        h3title: this.documentContent.books[chapterIndex].sections[sectionIndex]
          .title,
        content: this.documentContent.books[chapterIndex].sections[sectionIndex]
          .content
      };

      // ?? VueX
      this.$store.commit('setBookLocation', location);
      this.$store.commit('setBookContent', bookContent);
    },
    afterDelete(e) {
      console.log('qwew', e);
      this.resetTooltip();
      this.notesIndex = e.index;
      if (e.taskIndex) {
        this.$emit('taskIndex', e.taskIndex);
        setTimeout(() => {
          this.taskIndex = e.taskIndex;
          this.isShowComplete = true;
        }, 3000);
      }
    },
    closeNotes() {
      this.$emit('switchShowNotes', false);
    },
    resetTooltip() {
      this.notesIndex = -1;
      this.isShowTooltip = false;
    },
    selectedNote(e, index, color) {
      const directions = this.$store.getters.getDirections;
      if (directions.words == 'column') {
        if (directions.functions == 'column') {
          this.tooltipPosition = {
            x: 303,
            y: e.target.getBoundingClientRect().top - 35
          };
        } else {
          let y = e.target.getBoundingClientRect().top + 70;
          if (index > 4) {
            y = e.target.getBoundingClientRect().top - 228;
          }
          this.tooltipPosition = {
            x: 400,
            y: y
          };
        }
      } else {
        if (directions.functions == 'column') {
          let x = e.target.getBoundingClientRect().left - 428;
          if (index > 2) {
            x = e.target.getBoundingClientRect().left - 129;
          }
          this.tooltipPosition = {
            x: x,
            y: 845
          };
        } else {
          this.tooltipPosition = {
            x: e.target.getBoundingClientRect().left - 327,
            y: 642
          };
        }
      }

      this.$store.commit('changeTooltipColor', color.split('-')[0]);
      if (this.notesIndex == index) {
        this.resetTooltip();
        return;
      }
      this.notesIndex = index;
      this.isShowTooltip = true;
    },
    changeColor(color, index) {
      this.resetTooltip();
      if (!color) {
        return;
      }
      this.$store.commit('changeNotesColor', {
        index: index,
        color: color
      });
      const task = this.$store.getters.getTask;
      const checkTask = this.$store.getters.getNotes[index].task;
      const step = this.$store.getters.getTarget[1].step[2];
      if (checkTask != 2) {
        return;
      }
      if (task.length <= 0) {
        return;
      }
      if (!task[1]) {
        return;
      }
      if (task[1].time.length != 3) {
        return;
      }
      if (color != step.css) {
        return;
      }
      this.$store.commit('setTask', 1);
      console.log('24564534', this.$store.getters.getTask);
    }
  }
};
</script>
