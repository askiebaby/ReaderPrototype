<template>
  <section class="notes">
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
      <article
        v-for="(item, index) in getNotes"
        :key="index"
        class="note"
        style="position:relative"
      >
        <tooltip
          v-if="isShowTooltip(index)"
          style="position:absolute"
          @changeColor="changeColor($event, index)"
        ></tooltip>
        <div class="note__highlight" :class="item.color"></div>
        <div class="note__record">
          <div class="note__sentence">{{ item.text }}</div>
          <div v-if="item.comment.length > 0" class="note__memo">
            {{ item.comment }}
          </div>
        </div>
        <div class="note__actionButton" @click="selectedNote(index)">
          <img
            :src="require('@/assets/menu/dropdown-doubleline.svg')"
            alt="More Actions"
          />
        </div>
      </article>
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
</style>

<script>
import documentContent from '@/assets/document.json';
import tooltip from './tooltip.vue';
export default {
  components: {
    tooltip
  },
  data() {
    return {
      documentContent,
      notesIndex: -1
    };
  },
  computed: {
    getNotes() {
      const Notes = this.$store.getters.getNotes;
      return Notes.map(item => {
        return {
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
    closeNotes() {
      this.$store.commit('switchShowNotes');
    },
    isShowTooltip(index) {
      return this.notesIndex == index;
    },
    selectedNote(index) {
      if (this.notesIndex == index) {
        this.notesIndex = -1;
        return;
      }
      this.notesIndex = index;
    },
    changeColor(color, index) {
      this.$store.commit('changeNotesColor', {
        index: index,
        color: color
      });
    }
  }
};
</script>
