<template>
  <div class="row">
    <div v-for="(char, idx) in previewChars" :key="idx" class="cell">
      {{ char }}
    </div>
    <div class="state-cell">
      {{ matchedCompound ? matchedCompound.state : '' }}
    </div>
    <div class="weight-cell">
      {{ matchedCompound ? matchedCompound.molecularWeight : '' }}
    </div>
    <div class="weight-cell"></div>
  </div>
</template>

<script>
export default {
  props: {
    currentGuess: {
      type: String,
      required: true,
    },
    previewChars: {
      type: Array,
      required: true,
    },
    matchedCompound: {
      type: Object, // Can be null
      default: null,
    },
  },
}
</script>

<style scoped>
/* 从 Game.vue 移动相关样式 */
.row {
  display: flex;
}
.cell {
  width: 40px;
  height: 40px;
  border: 2px solid #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  border-radius: 10px;
  font-weight: bold;
}
.state-cell {
  width: 40px;
  height: 40px;
  border: 2px solid #ff0000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  border-radius: 10px;
  font-weight: bold;
}
.weight-cell {
  width: 40px;
  height: 40px;
  border: 2px solid #cfcc00;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  border-radius: 10px;
}

@media screen and (max-width: 600px) {
  .cell {
    width: 20px;
    height: 20px;
    border: 1px solid #000000;
    margin: 2px;
    font-size: 8px;
    border-radius: 5px;
  }
  .state-cell {
    font-size: 8px;
    width: 20px;
    height: 20px;
    border: 1px solid #ff0000;
    margin: 2px;
    border-radius: 5px;
  }
  .weight-cell {
    font-size: 8px;
    width: 20px;
    height: 20px;
    border: 1px solid #cfcc00;
    margin: 2px;
    border-radius: 5px;
  }
}
</style>
