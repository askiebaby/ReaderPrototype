<template>
  <section class="memo">
    <div class="memo__background"></div>
    <div class="memo__container">
      <form action="">
        <h3>註解 <input type="reset" value="取消" class="memo__cancel"></h3>
        <main>
          <p>你可以採用錄影的測量方法，或者簡單地每天照一照鏡子，感受一下你的進步。</p>
          <textarea class="memo__textarea" cols="30" rows="10">體內平衡</textarea>
          <div><input type="submit" value="完成" class="memo__submit"></div>
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
      margin: auto;
      background: $white-3;
      border-radius: 18px;
    }
    &__textarea {
      width: 100%;
      border: 1px solid $gray-3;
      border-radius: 18px;
      padding: 10px;
      color: $black-1;
      font-weight: 300;
      outline: none;
    }
    &__cancel {
      color: $white;
    }
    &__submit {
      color: $black-1;
    }
    &__cancel, &__submit {
      position: absolute;
      right: 10px;
      font-size: $indexSize;
      padding: 5px 20px;
      font-weight: 500;
    }
    main {
      padding: 20px 18px 47px;
    }
    h3 {
      position: relative;
      font-size: $titleSize;
      text-align: center;
      background-color: $black-1;
      color: $white;
      border-radius: 18px 18px 0 0;
      padding: 10px;
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
</style>

<script>
export default {
  
}
</script>
