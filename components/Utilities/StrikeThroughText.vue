<template>
  <div class="strike-through-text">
    <span>Comments</span>
  </div>
</template>

<style lang="scss" scoped>
.strike-through-text {
  text-align: center;
  position: relative;

  &::before {
    content: '';
    display: block;
    height: 1px;
    background-color: lightgray;
    width: 100%;
    top: 50%;
    position: absolute;
  }

  span {
    background-color: white;
    display: inline-block;
    position: relative;
    padding: 0 10px;
    margin-left: auto;
    color: lightgray;
    text-transform: uppercase;
    font-size: 0.7rem;
  }
}
</style>