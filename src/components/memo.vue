<template >
  <section class="memo">
    <div class="memo__background"></div>
    <div class="memo__container">
      <form action="">
        <h3>註解 <span class="memo__cancel">取消</span></h3>
        <main>
          <p>你可以採用錄影的測量方法，或者簡單地每天照一照鏡子，感受一下你的進步。</p>
          <div contenteditable class="memo__textarea">體內平衡</div>
          <span class="memo__submit">完成</span>
        </main>
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
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
      margin: auto auto 34.86%;
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
      padding: 10px;
      color: $black-1;
      font-weight: 300;
      outline: none;
    }
    &__cancel, &__submit {
      position: absolute;
      right: 10px;
      font-size: $indexSize;
      padding: 16px 20px;
      font-weight: 500;
      cursor: pointer;
    }
    &__cancel {
      color: $white;
      background-color: $black-1;
      top: 0;
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
      padding: 20px 18px 50px;
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
      display: inline-block;
      vertical-align: middle;
      min-height: 7.5em;
      line-height: 1.5;
      padding: 0 10px;
      font-weight: 500;
      color: $black-1;
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
        padding-bottom: 0;
      }
      h3 {
        display: flex;
        align-items: center;
        direction: rtl;
        flex-basis: 56px;
        border-radius: 0 18px 18px 0;
      }
      p, &__textarea {
        letter-spacing: .25em;
      }
      p {
        padding: 10px 0 0 3em;
        min-width: 120px;
        line-height: 1.75;
      }
      &__textarea {
        max-width: 173px;
        min-width: 173px;
        min-height: calc(100% - 20px);
        // letter-spacing: .25em;
        font-size: $indexSize;
      }
      &__cancel, &__submit {
        bottom: 5px;
        letter-spacing: .5em;
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
        right: unset;
        left: 0;
      }
    }
    
  }
</style>

<script>
export default {
  
}
</script>
