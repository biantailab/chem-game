<template>
  <div class="grid">
    <div class="row">
      <p class="titles-cell">化学式</p>
      <p class="state-cell">状态</p>
      <b class="weight-cell">MW</b>
      <b class="weight-cell">比较</b>
    </div>
    <div v-for="(row, rowIndex) in guesses" :key="rowIndex" class="row">
      <div v-for="(cell, colIndex) in row.elements" :key="colIndex" :class="['cell', cell.color]">
        {{ cell.value || '' }}
      </div>
      <div :class="['state-cell', row.stateColor]">
        {{ row.state || '' }}
      </div>
      <div class="weight-cell">
        {{ row.weight || '' }}
      </div>
      <div class="weight-cell">
        {{ row.weightIndicator || '' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    guesses: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
/* 从 Game.vue 移动相关样式 */
.grid {
  display: inline-block;
  margin: 10px 0;
}
.row {
  display: flex;
}
.titles-cell {
  width: 76%;
  height: 40px;
  border: 2px solid #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  border-radius: 10px;
  font-weight: bold;
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
.green {
  background-color: #4caf50;
  color: white;
}
.yellow {
  background-color: #ffff3b;
  color: rgb(0, 0, 0);
}
.gray {
  background-color: #d7d7d7;
  color: rgb(0, 0, 0);
}

@media screen and (max-width: 600px) {
  .titles-cell {
    font-size: 8px;
    width: 75.5%;
    height: 20px;
    border: 1px solid #000000;
    margin: 2px;
    border-radius: 5px;
  }
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
