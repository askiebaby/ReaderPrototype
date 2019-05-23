<template>
  <section class="share">
    <div class="share__background" @click="closeShareBubble"></div>
    <div class="share__container">
      <h3>點一下來使用AirDrop分享</h3>
      <div class="share__flexRow">
        <div class="share__macbook">
          <div class="share__app"></div>
          <p>MacBook Pro</p>
        </div>
      </div>
      <div class="share__flexRow">
        <div class="share__app">
          <img
            class="share__app__icon"
            src="@/assets/images/icons/inbox@2x.png" />
          <p>訊息</p>
        </div>
        <div class="share__app">
          <img 
            class="share__app__icon"
            src="@/assets/images/icons/evernote@2x.png" />
          <p>Evernote</p>
        </div>
        <div class="share__app">
          <img 
            class="share__app__icon" 
            src="@/assets/images/icons/mail@2x.png" />
          <p>郵件</p>
        </div>
        <div class="share__app">
          <img 
            class="share__app__icon"
            src="@/assets/images/icons/memo@2x.png" />
          <p>加入到「備忘錄」</p>
        </div>
      </div>
      <div class="share__flexRow">
        <div class="share__app">
          <img 
            class="share__app__icon"
            src="@/assets/images/icons/copy-ios@2x.png" />
          <p>拷貝</p>
        </div>
        <div class="share__app">
          <img 
            class="share__app__icon"
            src="@/assets/images/icons/directory@2x.png" />
          <p>儲存到檔案</p>
        </div>
        <div class="share__app">
          <img 
            class="share__app__icon"
            src="@/assets/images/icons/more@2x.png" />
          <p>更多</p>
        </div>
      </div>
    </div>
    
  </section>
</template>

<style lang="scss" scoped>
.share {
  display: flex;
  align-content: center;
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 100;

  &__background {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
  }
  &__container {
    position: relative;
    width: 402px;
    margin: auto;
    background: $white-3;
    border-radius: 14px;
    padding: 7px 0 4px;
  }
  &__flexRow {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    padding: 20px 14px 15px;
  }

  &__flexRow + &__flexRow {
    border-top: 1px solid $gray-4;
  }
  &__macbook {
    flex-basis: 25%;
    text-align: center;
    .share__app {
      background: $gray-3;
      width: 76px;
      height: 76px;
      border-radius: 50%;
      margin: 0 auto;
    }
  }
  &__app {
    flex-basis: 25%;
    text-align: center;
    cursor: pointer;
    &__icon {
      max-width: 78px;
      margin-bottom: 5px;
    }
  }
  h3, p {
    font-size: 12px;
    color: $black-1;
    font-weight: light;
    text-align: center;
    font-family: 'Noto Sans TC', sans-serif;
  }
  p {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
  }
}
.functions-row {
  .share{
    &__container {
      width: 526px;
      transform: rotate(90deg);
      padding-top: 20px;
      h3 {
        writing-mode: vertical-rl;
        transform: rotate(-90deg);
        position: absolute;
        top: -15%;
        left: 40%;
        letter-spacing: .2em;
      }
    }
    &__flexRow {
      padding: 10px 13px;
    }
    &__app, &__macbook {
      transform: rotate(-90deg);
    }
    &__app {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      &__icon {
        margin-bottom: 10px;
      }
      p {
        flex-basis: 70px;
      }
    }
  }
  
}
</style>

<script>
export default {
  computed: {
    isShowShare() {
      return this.$store.getters.getShareBubbleStatus;
    },
  },
  methods: {
    closeShareBubble() {
      if (this.isShowShare) {
        this.$store.commit('toggleShareBubble', false);
      }
    }
  }
};
</script>
