<template>
  <div>
    <complete-mission v-if="isShowComplete" :task-index="2"></complete-mission>
    <comment
      v-if="isShowComment"
      :notes-index="selectedNoteIndex"
      @showComment="showComment($event)"
    ></comment>
    <tooltip
      v-if="isShowTooltip"
      :tooltip-position="tooltipPosition"
      :from-content="true"
      :notes-index="selectedNoteIndex"
      @changeColor="changeColor($event)"
      @showComment="showComment($event)"
      @showShareUI="showShareUI($event)"
    ></tooltip>
    <share v-if="isShowShare" :notes-index="selectedNoteIndex" @showShareUI="showShareUI($event)"></share>
    <div class="book" @click="changePage">
      <h2 class="book__chapter">{{ bookContent.chapter }} {{ bookContent.h1title }}</h2>
      <div ref="viewport" class="book__content">
        <div ref="bookContainer" class="book__content__realbook">
          <h3 class="book__subtitle">{{ bookContent.h3title }}</h3>
          <p>
            <span
              v-for="(g, i) in groupsContent"
              :key="i"
              v-touch:longtap="e => selectedPart(e, g.notesIndex)"
              :class="g.hightLight"
            >
              <span
                v-for="(c, j) in g.textGroup"
                :key="j"
                v-touch:start="e => touchStart(e, g.boundary + j)"
                v-touch:moving="touchMove"
                v-touch:end="touchEnd"
                :index="g.boundary + j"
                :class="hightLight(g.boundary + j)"
              >{{ c }}</span>
            </span>
          </p>
        </div>
      </div>
      <div class="page">本節第{{ bookLocation.pageIndex + 1 }}頁/共{{ bookLocation.pages }}頁</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '@/assets/scss/modules/_background.scss';
// @import url(https://fonts.googleapis.com/earlyaccess/cwtexming.css); // 明體
@import url(https://fonts.googleapis.com/earlyaccess/cwtexkai.css); // 楷體
@import url(https://fonts.googleapis.com/earlyaccess/notosanstc.css); // 黑體

.book {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-flow: row wrap;
  padding: 89px 72px 140px;
  max-width: 768px;
  margin: auto;
  position: relative;

  height: 1024px;
  &__fontFamily__ming > div {
    font-family: 'cwTeXMing', serif;
  }
  &__fontFamily__kai > div {
    font-family: 'cwTeXKai', serif;
  }
  &__fontFamily__noto > div {
    font-family: 'Noto Sans TC', sans-serif;
  }

  &__chapter {
    font-size: 36px;
    font-size: 2.25rem;
    text-align: center;
  }
  &__content {
    overflow: hidden;
    position: relative;
    width: 100%;
    transform: translate(0, 0px);
    h3,
    p,
    span {
      line-height: 1.75em;
      text-align: justify;
    }
    span {
      font-weight: normal;
      padding: 0.25em 0;
    }
  }

  p {
    text-indent: 1.5em;
  }
}

.fontSize__12px {
  .book__content {
    font-size: 12px;
    height: 59.5em;
    h3 {
      font-size: 12px;
    }
  }
}
.fontSize__14px {
  .book__content {
    font-size: 14px;
    height: 50.75em;
    h3 {
      font-size: 14px;
    }
  }
}
.fontSize__16px {
  .book__content {
    font-size: 16px;
    height: 45.5em;
    h3 {
      font-size: 16px;
    }
  }
}
.fontSize__18px {
  .book__content {
    font-size: 18px;
    height: 40.25em;
    h3 {
      font-size: 18px;
    }
  }
}
.fontSize__20px {
  .book__content {
    font-size: 20px;
    height: 35em;
    h3 {
      font-size: 20px;
    }
  }
}
.fontSize__24px {
  .book__content {
    font-size: 24px;
    height: 29.75em;
    h3 {
      font-size: 24px;
    }
  }
}
.fontSize__30px {
  .book__content {
    font-size: 30px;
    height: 22.75em;
    h3 {
      font-size: 30px;
    }
  }
}
.fontSize__36px {
  .book__content {
    font-size: 36px;
    max-height: 19.25em;
    h3 {
      font-size: 36px;
    }
  }
}
.fontSize__42px {
  .book__content {
    font-size: 42px;
    max-height: 15.75em;
    h3 {
      font-size: 42px;
    }
  }
}
.fontSize__48px {
  .book__content {
    font-size: 48px;
    max-height: 14em;
    h3 {
      font-size: 48px;
    }
  }
}
.fontSize__52px {
  .book__content {
    font-size: 52px;
    max-height: 14em;
    h3 {
      font-size: 52px;
    }
  }
}
.page {
  position: absolute;
  bottom: 95px;
  color: $gray-3;
  font-size: 20px;
  line-height: 1.75;
  font-family: Arial, Helvetica, sans-serif;
}
.tooltip {
  position: absolute;
  z-index: 1;
}
.selected {
  background-color: $blue-pen;
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
  .book {
    flex-direction: row-reverse;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: flex-start;
    &__content {
      direction: rtl;
      writing-mode: tb-rl;
      margin-right: 5px;
      height: 745px;
      &__realbook {
        direction: ltr;
      }
      h3 {
        letter-spacing: 0.2em;
      }
    }
    &__chapter {
      writing-mode: vertical-rl;
      letter-spacing: 0.2em;
    }
    .page {
      left: 0;
      right: 0;
    }
  }
  p {
    letter-spacing: 0.2em;
  }
  span {
    // 直排文字劃線的螢光筆粗細
    padding: 0 0.25em;
  }
}
</style>

<script>
import {
  detectScrollType,
  getNormalizedScrollLeft,
  setNormalizedScrollLeft
} from 'normalize-scroll-left';
import completeMission from './lightBox/completeMission.vue';
import documentContent from '@/assets/document.json';
import webFont from '@/assets/webfont.js';
import tooltip from './tooltip.vue';
import comment from './comment.vue';
import share from './share.vue';

export default {
  components: {
    tooltip,
    comment,
    share,
    completeMission
  },
  props: ['sizeLevel'],
  data() {
    return {
      documentContent,
      nowWordsCount: 0,
      scrollHeight: 0,
      scrollWidth: 0,
      isShowComplete: false,
      selectAlreadyNote: false,
      setting: {
        lineHeight: 1.75,
        fontInitIndex: 5
      },
      fontLevels: [
        {
          fontSize: '12',
          line: {
            column: '34',
            row: '27'
          }
        },
        {
          fontSize: '14',
          line: {
            column: '29',
            row: '24'
          }
        },
        {
          fontSize: '16',
          line: {
            column: '26',
            row: '20'
          }
        },
        {
          fontSize: '18',
          line: {
            column: '23',
            row: '18'
          }
        },
        {
          fontSize: '20',
          line: {
            column: '20',
            row: '16'
          }
        },
        {
          fontSize: '24',
          line: {
            column: '17',
            row: '13'
          }
        },
        {
          fontSize: '30',
          line: {
            column: '13',
            row: '11'
          }
        },
        {
          fontSize: '36',
          line: {
            column: '11',
            row: '9'
          }
        },
        {
          fontSize: '42',
          line: {
            column: '9',
            row: '8'
          }
        },
        {
          fontSize: '48',
          line: {
            column: '8',
            row: '7'
          }
        },
        {
          fontSize: '52',
          line: {
            column: '8',
            row: '6'
          }
        }
      ],
      togglePageAction: '',
      pages: '',
      task: this.$store.getters.getTask,
      isSelect: true,
      selected: {
        start: -1,
        end: -1
      },
      isShowTooltip: false,
      selectPosition: {
        start: {
          x: 0,
          y: 0
        },
        end: {
          x: 0,
          y: 0
        }
      },
      tooltipPosition: {
        x: 0,
        y: 0
      },
      notes: [],
      selectedNoteIndex: -1,
      isShowComment: false,
      selectedPartColor: '',
      isShowShare: false
    };
  },

  computed: {
    scrollType() {
      return detectScrollType();
    },
    selectedToNotes() {
      let textStart = this.selected.start;
      let textEnd = this.selected.end;
      if (this.selected.start > this.selected.end) {
        textStart = this.selected.end;
        textEnd = this.selected.start;
      }
      return {
        chapterIndex: this.bookLocation.chapterIndex,
        sectionIndex: this.bookLocation.sectionIndex,
        textStart: textStart,
        textEnd: textEnd + 1
      };
    },
    groupsContent() {
      const range = [{ i: 0 }];
      const notes = this.$store.getters.getNotes;
      const currentChapter = this.bookLocation.chapterIndex;
      const currentSection = this.bookLocation.sectionIndex;
      const note = notes
        .map((item, i) => {
          return { ...item, notesIndex: i };
        })
        .filter(
          item =>
            item.chapterIndex == currentChapter &&
            item.sectionIndex == currentSection
        );
      if (note.length > 0) {
        const notesSort = note.sort((a, b) => a.textStart - b.textStart);
        for (const item of notesSort) {
          range.push({
            i: item.textStart,
            color: item.color,
            notesIndex: item.notesIndex
          });
          range.push({ i: item.textEnd });
        }
      }
      range.push({ i: this.bookContent.content.length });
      const group = [];
      for (let j = 0; j < range.length - 1; j++) {
        let Obj = {
          textGroup: this.bookContent.content.slice(range[j].i, range[j + 1].i),
          boundary: range[j].i
        };
        if (range[j].notesIndex != undefined && range[j].color != undefined) {
          Obj.hightLight = range[j].color;
          Obj.notesIndex = range[j].notesIndex;
        }
        group.push(Obj);
      }
      this.checkFinishStep1();
      return group;
    },
    aLineHeight() {
      const lineHeight = this.setting.lineHeight;
      const fontSize = this.fontLevels[this.sizeLevel].fontSize;
      const result = lineHeight * fontSize;
      // console.log(`${result} = ${lineHeight} * ${fontSize}`);
      return result;
    },
    containerHeight() {
      const line = this.fontLevels[this.sizeLevel].line[
        this.$store.getters.getDirections.words
      ];
      const viewport = Math.floor(this.aLineHeight) * line;
      // console.log(`${viewport} = ${line} 行 x ${Math.floor(this.aLineHeight)}`);
      return viewport;
    },
    bookContent() {
      return this.$store.getters.getBookContent;
    },
    bookLocation() {
      return this.$store.getters.getBookLocation;
    }
  },
  watch: {
    bookContent: {
      handler: function() {
        // reset word container's height
        this.bookLocation.newContentHeight = 0;
        this.$store.commit('setBookLocation', this.bookLocation);

        // 拿到文字排列方向
        const wordsDirection = this.$store.getters.getDirections.words;

        // 內容改變時，也要初始化容器寬高一次
        this.resetContainerSize(wordsDirection);

        switch (this.togglePageAction) {
          case 'prev':
          case 'next':
            this.countPageWidthHeight();
            break;
          default:
            this.togglePageAction = 'default';
            this.countPageWidthHeight();
        }
      },
      deep: true
    },
    sizeLevel() {
      // reset word container's height
      this.bookLocation.newContentHeight = 0;
      this.$store.commit('setBookLocation', this.bookLocation);

      // 拿到文字排列方向
      const wordsDirection = this.$store.getters.getDirections.words;

      // 內容改變時，也要初始化容器寬高一次
      this.resetContainerSize(wordsDirection);

      this.countPageWidthHeight();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initContent();
    });
  },

  methods: {
    showShareUI(event) {
      this.clearSelected();
      this.isShowComment = this.isShowComment ? true : false;
      this.isShowShare = event;
    },
    async showComment(state) {
      if (this.selectedNoteIndex < 0) {
        await this.changeColor('yellow-pen');
      }
      this.clearSelected();
      this.isShowComment = state.showComment;
      if (state.showComplete) {
        setTimeout(() => {
          this.isShowComplete = true;
        }, 3000);
      }
    },
    checkFinishStep1() {
      if (this.task.length <= 0) {
        return;
      }
      if (!this.task[0]) {
        return;
      }
      if (this.task[0].time.length != 1) {
        return;
      }
      const step = this.$store.getters.getTarget[0].step[0];
      if (
        this.bookLocation.chapterIndex != step.chapterIndex ||
        this.bookLocation.sectionIndex != step.sectionIndex
      ) {
        return;
      }
      this.$store.commit('setTask', 0);
    },
    changePage(e) {
      this.clearSelected();
      // 全局橫向座標
      const xPosition = e.clientX;

      // 自適應書本寬度
      const bookWidth = document.querySelector('.book').getBoundingClientRect()
        .width;

      // 計算公式
      const xRatio = (xPosition / bookWidth).toFixed(3) * 100;

      // 文字方向
      const wordsDirection = this.$store.getters.getDirections.words;

      if (xRatio >= 0 && xRatio < 33.333) {
        // this.togglePageRules('prev');
        if (wordsDirection === 'column') this.togglePageRules('prev');
        if (wordsDirection === 'row') this.togglePageRules('next');
        return;
      } else if (xRatio >= 33.333 && xRatio < 66.666) {
        this.toggleNavigation();
        return;
      } else if (xRatio >= 66.666 && xRatio < 100) {
        // this.togglePageRules('next');
        if (wordsDirection === 'column') this.togglePageRules('next');
        if (wordsDirection === 'row') this.togglePageRules('prev');
        return;
      }
    },
    selectedPart(e, notesIndex) {
      if (notesIndex != undefined) {
        this.selectedNoteIndex = notesIndex;
        this.clearSelected();
        this.selectedPartColor = e.target.parentElement.className.split('-')[0];
        this.$store.commit('changeTooltipColor', this.selectedPartColor);
        const partStartX = e.target.parentElement.firstChild.getBoundingClientRect()
          .x;
        const partEndX = e.target.parentElement.lastChild.getBoundingClientRect()
          .x;
        const partStartY = e.target.parentElement.firstChild.getBoundingClientRect()
          .y;
        const partEndY = e.target.parentElement.lastChild.getBoundingClientRect()
          .y;
        const averageX = (partStartX + partEndX) / 2;
        const directions = this.$store.getters.getDirections;
        const fontSize = Number(this.fontLevels[this.sizeLevel].fontSize);
        if (directions.words == 'column') {
          if (directions.functions == 'column') {
            this.tooltipPosition.y = partStartY - 42 - fontSize;
            if (averageX - 196 <= 0) {
              this.tooltipPosition.x = 72;
            } else if (averageX + 196 >= 695) {
              this.tooltipPosition.x = 695 - 392;
            } else {
              this.tooltipPosition.x = averageX - 196;
            }
          } else {
            this.tooltipPosition.x = partEndX - 196 + 72;
            this.tooltipPositionY(partEndY, fontSize);
          }
        } else {
          if (directions.functions == 'column') {
            if (partEndX - 196 <= 0) {
              this.tooltipPosition.x = 112;
            } else if (partEndX + 196 >= 574) {
              this.tooltipPosition.x = 574 - 392 + 42;
            } else {
              this.tooltipPosition.x = partEndX - 196 + fontSize + fontSize / 2;
            }

            this.tooltipPosition.y = partEndY + 42;
          } else {
            this.tooltipPosition.x = partEndX - 196 - fontSize - fontSize / 2;
            this.tooltipPositionY(partEndY, fontSize);
          }
        }
        this.isShowTooltip = true;
      } else {
        this.selectedNoteIndex = -1;
      }
    },
    tooltipPositionY(partEndY, fontSize) {
      if (partEndY - 196 <= 0) {
        console.log('sscsc', partEndY);
        this.tooltipPosition.y = 112 + 196 - fontSize;
      } else if (partEndY + 196 > 822) {
        this.tooltipPosition.y = 822 - 196 + fontSize;
      } else {
        this.tooltipPosition.y = partEndY;
      }
    },
    changeColor(color) {
      if (!color) {
        this.clearSelected();
        return;
      }
      const step2_1 = this.$store.getters.getTarget[1].step[0];
      if (this.selectedNoteIndex >= 0) {
        this.clearSelected();
        this.$store.commit('changeNotesColor', {
          index: this.selectedNoteIndex,
          color: color
        });
        const checkTask = this.$store.getters.getNotes[this.selectedNoteIndex]
          .task;
        if (checkTask == 0) {
          return;
        }
        if (this.task.length <= 0) {
          return;
        }
        if (this.task[1]) {
          if (this.task[1].time.length == 1 && color == step2_1.css) {
            this.$store.commit('setTask', 1);
            // console.log('8522256', this.$store.getters.getTask);
            return;
          }
          const step2_2 = this.$store.getters.getTarget[1].step[1];
          if (this.task[1].time.length == 2 && color == step2_2.css) {
            this.$store.commit('setTask', 1);
            // console.log('855651', this.$store.getters.getTask);
            return;
          }
        }
        return;
      }
      const obj = {
        chapterIndex: this.selectedToNotes.chapterIndex,
        sectionIndex: this.selectedToNotes.sectionIndex,
        textStart: this.selectedToNotes.textStart,
        textEnd: this.selectedToNotes.textEnd,
        color: color,
        comment: '',
        task: 0
      };
      let addObj = this.checkFinishStep2_1(step2_1, obj, color);
      addObj = this.checkFinishStep3_1(obj);
      this.$store.commit('addNotes', addObj);
      this.clearSelected();
      this.selectedNoteIndex = 0;
    },
    checkFinishStep2_1(step, obj, color) {
      if (this.task.length <= 0) {
        return obj;
      }
      if (!this.task[1]) {
        return obj;
      }
      if (this.task[1].time.length != 1) {
        return obj;
      }
      if (
        this.selectedToNotes.chapterIndex == step.chapterIndex &&
        this.selectedToNotes.sectionIndex == step.sectionIndex &&
        this.selectedToNotes.textStart == step.textStart &&
        (this.selectedToNotes.textEnd == step.textEnd ||
          this.selectedToNotes.textEnd == step.textEnd - 1)
      ) {
        // 標記
        obj.task = 2;
        if (color == step.css) {
          this.$store.commit('setTask', 1);
          // console.log('581651', this.$store.getters.getTask);
        }
        return obj;
      }
      return obj;
    },
    checkFinishStep3_1(obj) {
      const step = this.$store.getters.getTarget[2].step[0];
      if (!this.task[2]) {
        return obj;
      }
      if (this.task[2].time.length != 1) {
        return obj;
      }
      if (
        this.selectedToNotes.chapterIndex == step.chapterIndex &&
        this.selectedToNotes.sectionIndex == step.sectionIndex &&
        this.selectedToNotes.textStart == step.textStart &&
        (this.selectedToNotes.textEnd == step.textEnd ||
          this.selectedToNotes.textEnd == step.textEnd - 1)
      ) {
        // 標記
        obj.task = 3;
        this.$store.commit('setTask', 2);
        // console.log('5555551', this.$store.getters.getTask);
        return obj;
      }
      return obj;
    },
    hightLight(i) {
      let css = '';
      if (
        (i >= this.selected.start && i <= this.selected.end) ||
        (i >= this.selected.end && i <= this.selected.start)
      ) {
        css = 'selected';
      }
      return css;
    },
    initContent() {
      WebFont.load({
        custom: {
          families: ['cwTeXMing'],
          urls: ['https://fonts.googleapis.com/earlyaccess/cwtexming.css']
        },
        fontactive: () => {
          this.countPageWidthHeight();
        }
      });
    },
    toggleNavigation() {
      this.$emit('toggleNavigation');
    },
    countPageWidthHeight() {
      this.$nextTick(() => {
        // 內容原高度、原寬度
        this.scrollHeight = this.$refs.viewport.scrollHeight;
        this.scrollWidth = this.$refs.viewport.scrollWidth;

        // 拿到文字排列方向
        const wordsDirection = this.$store.getters.getDirections.words;

        // 計算頁數。註記：column 橫排、row 直排
        const remain =
          wordsDirection === 'column'
            ? this.scrollHeight % this.containerHeight
            : this.scrollWidth % this.containerHeight;

        this.pages =
          wordsDirection === 'column'
            ? Math.floor(this.scrollHeight / this.containerHeight)
            : Math.floor(this.scrollWidth / this.containerHeight);
        this.bookLocation.pages =
          remain >= this.aLineHeight ? (this.pages += 1) : this.pages;

        // 計算應有的寬度或高度
        this.bookLocation.newContentHeight =
          this.bookLocation.pages * this.containerHeight;
        this.$store.commit('setBookLocation', this.bookLocation);

        // 更新文章內容或字級，要重新定位頁數位置
        this.resetPagePosition(wordsDirection, this.resetContainerSize);

        // console.warn(
        //   'countPageWidthHeight called!',
        //   '\n viewport: ',
        //   this.containerHeight,
        //   '\n 原本高度 scrollHeight: ',
        //   this.scrollHeight,
        //   '初始定位 scrollTop: ',
        //   this.$refs.viewport.scrollTop,
        //   '\n 原本寬度 scrollWidth: ',
        //   this.scrollWidth,
        //   '初始定位 scrollLeft',
        //   this.$refs.viewport.scrollLeft,
        //   '初始定位 RTL scrollLeft: ',
        //   getNormalizedScrollLeft(this.$refs.viewport, 'rtl'),
        //   '初始定位 LTR scrollLeft: ',
        //   getNormalizedScrollLeft(this.$refs.viewport, 'ltr'),
        //   '\n remain: ',
        //   remain,
        //   'lineHeight: ',
        //   this.aLineHeight, // 單行的總高度
        //   'page: ',
        //   this.pages,
        //   'totalPage: ',
        //   this.bookLocation.pages,
        //   '\n 真正容器應該要有的寬(直向)、高(橫向): ',
        //   this.bookLocation.newContentHeight
        // );
      });
    },
    resetContainerSize(wordsDirection) {
      switch (wordsDirection) {
        case 'column':
          this.$refs.viewport.style.height = `${this.containerHeight}px`;
          this.$refs.bookContainer.style.height = `${
            this.bookLocation.newContentHeight
          }px`;
          break;

        case 'row':
          this.$refs.viewport.style.width = `${this.containerHeight}px`;
          this.$refs.bookContainer.style.width = `${
            this.bookLocation.newContentHeight
          }px`;

          break;

        default:
          console.error(
            `Error, Please Check method "resetContainerSize", and your argument wordsDirection is ${wordsDirection}`
          );
      }
    },
    resetPagePosition(wordsDirection, callback) {
      // 設定viewport及bookContainer寬高
      callback(wordsDirection);

      // 更新內容，根據欄位確定動作，才定位
      if (wordsDirection === 'column') {
        // 文字橫向
        switch (this.togglePageAction) {
          case 'next':
          case 'default':
            this.$refs.viewport.scrollTop = 0;
            this.bookLocation.pageIndex = 0;
            this.$store.commit('setBookLocation', this.bookLocation);
            break;

          case 'prev':
            this.$refs.viewport.scrollTop =
              (this.bookLocation.pages - 1) * this.containerHeight + 210;
            this.bookLocation.pageIndex = this.bookLocation.pages - 1;
            this.$store.commit('setBookLocation', this.bookLocation);
            break;

          default:
            this.$refs.viewport.scrollTop = 0;
            this.bookLocation.pageIndex = 0;
            this.$store.commit('setBookLocation', this.bookLocation);
        }
      } else {
        // 文字直向

        switch (this.togglePageAction) {
          case 'next':
          case 'default':
            setNormalizedScrollLeft(
              this.$refs.viewport,
              (this.bookLocation.pages - 1) * this.containerHeight + 210,
              'rtl'
            );
            this.bookLocation.pageIndex = 0;
            this.$store.commit('setBookLocation', this.bookLocation);
            break;

          case 'prev':
            setNormalizedScrollLeft(this.$refs.viewport, 0, 'rtl');
            this.bookLocation.pageIndex = this.bookLocation.pages - 1;
            this.$store.commit('setBookLocation', this.bookLocation);
            break;

          default:
            setNormalizedScrollLeft(
              this.$refs.viewport,
              (this.bookLocation.pages - 1) * this.containerHeight + 210,
              'rtl'
            );
            this.bookLocation.pageIndex = 0;
            this.$store.commit('setBookLocation', this.bookLocation);
        }
      }

      // reset 操作動作
      this.togglePageAction = '';
    },
    togglePageRules(action) {
      this.$nextTick(() => {
        const viewport = this.$refs.viewport;
        const wordsDirection = this.$store.getters.getDirections.words;

        if (wordsDirection === 'column') {
          // 文字橫向

          switch (action) {
            case 'prev':
              if (this.bookLocation.pageIndex < 1) {
                this.toggleSection(action);
                return;
              } else {
                this.bookLocation.pageIndex -= 1;
                this.$store.commit('setBookLocation', this.bookLocation);
              }
              viewport.scrollTop =
                this.bookLocation.pageIndex * viewport.clientHeight;
              break;
            case 'next':
              if (
                viewport.scrollHeight - viewport.clientHeight <=
                viewport.scrollTop
              ) {
                this.toggleSection(action);
                return;
              }

              this.bookLocation.pageIndex += 1;
              this.$store.commit('setBookLocation', this.bookLocation);

              viewport.scrollTop =
                this.bookLocation.pageIndex * viewport.clientHeight;

              break;
          }
        } else {
          // 文字直向

          switch (action) {
            case 'prev':
              if (this.bookLocation.pageIndex < 1) {
                this.toggleSection(action);
                return;
              } else {
                this.bookLocation.pageIndex -= 1;
                this.$store.commit('setBookLocation', this.bookLocation);
              }
              // 總頁數 - (目前頁數：index) * viewport
              setNormalizedScrollLeft(
                viewport,
                (this.bookLocation.pages - this.bookLocation.pageIndex - 1) *
                  viewport.clientWidth,
                'rtl'
              );
              break;

            case 'next':
              if (
                viewport.scrollWidth -
                  getNormalizedScrollLeft(viewport, 'rtl') ===
                viewport.scrollWidth
              ) {
                this.toggleSection(action);
                return;
              }

              this.bookLocation.pageIndex += 1;
              this.$store.commit('setBookLocation', this.bookLocation);

              setNormalizedScrollLeft(
                viewport,
                (this.bookLocation.pages - this.bookLocation.pageIndex - 1) *
                  viewport.clientWidth,
                'rtl'
              );

              break;
          }
        }

        return;
      });
    },
    toggleSection(action) {
      let chapters = this.bookLocation.chapters;
      let chapterIndex = this.bookLocation.chapterIndex;

      let sections = this.bookLocation.sections;
      let sectionIndex = this.bookLocation.sectionIndex;

      let pages = this.bookLocation.pages;
      let pageIndex = this.bookLocation.pageIndex;
      let page = this.bookLocation.pageIndex + 1;

      if (action === 'prev') {
        if (pageIndex === 0) {
          // 在該 section 第一頁了
          // reset word container's height
          this.bookLocation.newContentHeight = 0;
          this.$store.commit('setBookLocation', this.bookLocation);

          if (sectionIndex === 0) {
            // 如果是這個 chapter 第一個 section

            if (chapterIndex === 1) {
              // 檢查是不是第一個 chapter
              // 是第一個 chapter 的話 return
              return;
            } else if (chapterIndex > 0) {
              // 不是第一個 chapter，切換上一個 chapter 的最後一個 section
              this.changeContent('prevChapter');
            }
          } else if (sectionIndex > 0) {
            // 如果不是這個 chapter 第一個 section，切換上一個 section
            this.changeContent('prevSection');
          }
        }
      } else if (action === 'next') {
        if (page === pages) {
          // 在該 section 最後一頁
          // reset word container's height
          this.bookLocation.newContentHeight = 0;
          this.$store.commit('setBookLocation', this.bookLocation);

          if (sectionIndex + 1 < sections) {
            // 如果不是這個 chapter 最後一個 section，切換下一個 section
            this.changeContent('nextSection');
          } else if (sectionIndex + 1 === sections) {
            // 如果是這個 chapter 最後一個 section
            if (chapterIndex + 1 < chapters) {
              // 檢查是不是最後一個 chapter
              // 不是最後一個 chapter，切換下一個 chapter 的 第一個 section
              this.changeContent('nextChapter');
            } else if (chapterIndex === chapters) {
              // 是最後一個 chapter 的話 return
              return;
            }
          }
        }
      }
    },
    changeContent(action) {
      let addContent = this.$store.getters.getBookContent;

      if (action === 'prevSection') {
        this.togglePageAction = 'prev';

        addContent = {
          chapter: addContent.chapter,
          h1title: addContent.h1title,
          h3title: this.documentContent.books[this.bookLocation.chapterIndex]
            .sections[this.bookLocation.sectionIndex - 1].title,
          content: this.documentContent.books[this.bookLocation.chapterIndex]
            .sections[this.bookLocation.sectionIndex - 1].content
        };
        this.bookLocation.sectionIndex -= 1;
        this.$store.commit('setBookContent', addContent);
        this.$store.commit('setBookLocation', this.bookLocation);
      } else if (action === 'prevChapter') {
        this.togglePageAction = 'prev';
        let prevChapterIndex = this.bookLocation.chapterIndex - 1;
        let lastSectionIndex =
          this.documentContent.books[prevChapterIndex].sections.length - 1;

        addContent = {
          chapter: this.documentContent.books[prevChapterIndex].chapter,
          h1title: this.documentContent.books[prevChapterIndex].title,
          h3title: this.documentContent.books[prevChapterIndex].sections[
            lastSectionIndex
          ].title,
          content: this.documentContent.books[prevChapterIndex].sections[
            lastSectionIndex
          ].content
        };
        this.$store.commit('setBookContent', addContent);

        this.bookLocation.chapterIndex -= 1;
        this.bookLocation.sectionIndex =
          this.documentContent.books[prevChapterIndex].sections.length - 1;
        this.$store.commit('setBookLocation', this.bookLocation);
      } else if (action === 'nextSection') {
        this.togglePageAction = 'next';
        let nextChapterIndex = this.bookLocation.chapterIndex;
        // let lastSectionIndex =
        //   this.documentContent.books[nextChapterIndex].sections.length - 1;

        // 切換 section
        addContent = {
          chapter: addContent.chapter,
          h1title: addContent.h1title,
          h3title: this.documentContent.books[nextChapterIndex].sections[
            this.bookLocation.sectionIndex + 1
          ].title,
          content: this.documentContent.books[nextChapterIndex].sections[
            this.bookLocation.sectionIndex + 1
          ].content
        };

        this.bookLocation.sectionIndex += 1;
        this.$store.commit('setBookContent', addContent);
        this.$store.commit('setBookLocation', this.bookLocation);
      } else if (action === 'nextChapter') {
        // 切換章節
        this.togglePageAction = 'next';
        this.bookLocation.chapterIndex += 1;
        addContent = {
          chapter: this.documentContent.books[this.bookLocation.chapterIndex]
            .chapter,
          h1title: this.documentContent.books[this.bookLocation.chapterIndex]
            .title,
          h3title: this.documentContent.books[this.bookLocation.chapterIndex]
            .sections[0].title,
          content: this.documentContent.books[this.bookLocation.chapterIndex]
            .sections[0].content
        };

        this.$store.commit('setBookContent', addContent);

        this.bookLocation.sectionIndex = 0;
        this.bookLocation.sections = this.documentContent.books[
          this.bookLocation.chapterIndex
        ].sections.length;
      }
      this.$store.commit('setBookLocation', this.bookLocation);
      this.nowWordsCount = this.bookContent.content.length;
    },
    touchStart(e, i) {
      this.clearSelected();
      // if (e.target.parentElement.className.length > 0) {
      //   this.clearSelected();
      //   return;
      // }
      if (!this.isBetween(i)) {
        this.selected.start = i;
        this.selected.end = i;
        this.selectPosition.start.x = e.target.getBoundingClientRect().left;
        this.selectPosition.start.y = e.target.getBoundingClientRect().top;
      }
    },
    touchEnd() {
      const directions = this.$store.getters.getDirections;
      const fontSize = this.fontLevels[this.sizeLevel].fontSize;
      const minX = Math.min(
        this.selectPosition.start.x,
        this.selectPosition.end.x
      );
      const maxX = Math.max(
        this.selectPosition.start.x,
        this.selectPosition.end.x
      );
      const minY = Math.min(
        this.selectPosition.start.y,
        this.selectPosition.end.y
      );
      const maxY = Math.max(
        this.selectPosition.start.y,
        this.selectPosition.end.y
      );
      if (directions.words == 'column') {
        if (directions.functions == 'column') {
          const averageX =
            (this.selectPosition.start.x + this.selectPosition.end.x) / 2;
          //扣除字體以及tooltip高度
          this.tooltipPosition.y = minY - fontSize - 42;
          //扣除tooltip一半的寬度
          if (averageX - 196 <= 0) {
            this.tooltipPosition.x = 72;
          } else if (averageX + 196 >= 695) {
            this.tooltipPosition.x = 695 - 392;
          } else {
            this.tooltipPosition.x = averageX - 196;
          }
        } else {
          if (maxX > 627) {
            this.tooltipPosition.x = 476;
          } else {
            this.tooltipPosition.x = maxX - 154;
          }
          if (maxY < 392) {
            this.tooltipPosition.y = 367;
          } else if (maxY > 650) {
            this.tooltipPosition.y = 650;
          } else {
            this.tooltipPosition.y = this.selectPosition.end.y + fontSize;
          }
        }
      } else {
        if (directions.functions == 'column') {
          if (minX < 196 - fontSize) {
            this.tooltipPosition.x = minX;
          } else {
            this.tooltipPosition.x = minX - 196 + fontSize / 2;
          }
          this.tooltipWordsRows(maxY);
        } else {
          this.tooltipPosition.x = minX - 196 - fontSize;
          this.tooltipWordsRows(maxY);
        }
      }

      if (this.selectAlreadyNote) {
        return;
      }
      if (this.selected.start > 0 && this.selected.end > 0) {
        this.selectedNoteIndex = -1;
        this.selectedPartColor = '';
        this.$store.commit('changeTooltipColor', this.selectedPartColor);
        this.isShowTooltip = true;
      }
    },
    touchMove(e) {
      let changedTouch = e.changedTouches[0];
      let target = document.elementFromPoint(
        changedTouch.clientX,
        changedTouch.clientY
      );
      if (
        target.parentElement.className &&
        target.parentElement.className != 'book__content__realbook'
      ) {
        this.selectAlreadyNote = true;
      }
      if (this.selected.start >= 0) {
        const charEnd = parseInt(target.getAttribute('index'));
        this.selected.end = charEnd;
        this.selectPosition.end.x = target.getBoundingClientRect().x;
        this.selectPosition.end.y = target.getBoundingClientRect().y;
      }
    },
    clearSelected() {
      this.selectAlreadyNote = false;
      this.isShowTooltip = false;
      this.selected.start = -1;
      this.selected.end = -1;
      this.tooltipPosition = { x: 0, y: 0 };
    },
    isBetween(index) {
      let min = Math.min(this.selected.start, this.selected.end);
      let max = Math.max(this.selected.start, this.selected.end);
      return index >= min && index <= max;
    },
    tooltipWordsRows(maxY) {
      if (this.selectPosition.start.x < this.selectPosition.end.x) {
        this.tooltipPosition.y = this.selectPosition.start.y;
      } else if ((this.selectPosition.start.x = this.selectPosition.end.x)) {
        this.tooltipPosition.y = maxY + 42;
      } else {
        this.tooltipPosition.y = this.selectPosition.end.y;
      }
    }
  }
};
</script>
