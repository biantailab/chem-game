<template>
  <div class="game">
    <h1>猜无机化合物游戏</h1>
    <p>一款类Wordle猜无机化合物游戏</p>
    <div class="buttons">
      <button @click="refreshGame">刷新</button>
      <button @click="revealAnswer">揭晓</button>
      <button @click="$router.push('/help')">帮助</button>
    </div>
    <div class="grid">
      <div class="row">
        <p class="titles-cell">化学式</p>
        <p class="state-cell">常温状态</p>
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
    <div class="input">
      <input
        v-model="currentGuess"
        placeholder="输入分子式(区分大小写)"
        @keyup.enter="submitGuess"
        :disabled="gameOver"
      />
    </div>
    <div class="buttons">
      <button @click="submitGuess" :disabled="gameOver">提交</button>
      <img
        alt="元素周期表"
        src="https://ptable.com/image/%E5%85%83%E7%B4%A0%E5%91%A8%E6%9C%9F%E8%A1%A8.svg"
      />
    </div>
    <transition name="fade">
      <div v-if="message" class="notification" :class="{ success: win }">
        {{ message }}
      </div>
    </transition>
  </div>
</template>

<script>
import compounds from '../assets/compounds.json'

export default {
  data() {
    return {
      compounds: compounds || [],
      answer: null,
      guesses: [
        {
          elements: Array(10)
            .fill()
            .map(() => ({ value: '', color: '' })),
          state: '',
          stateColor: '',
          weight: null,
          weightIndicator: '',
        },
      ],
      currentGuess: '',
      guessCount: 0,
      gameOver: false,
      win: false,
      message: '',
    }
  },
  mounted() {
    if (this.compounds.length === 0) {
      this.showMessage('数据库加载失败！请检查 compounds.json')
      return
    }
    this.randomGame()
  },
  methods: {
    randomGame() {
      this.resetGame()
      if (this.compounds.length > 0) {
        this.answer = this.compounds[Math.floor(Math.random() * this.compounds.length)]
      }
    },
    refreshGame() {
      this.resetGame()
      this.randomGame()
    },
    resetGame() {
      this.guesses = [
        {
          elements: Array(10)
            .fill()
            .map(() => ({ value: '', color: '' })),
          state: '',
          stateColor: '',
          weight: null,
          weightIndicator: '',
        },
      ]
      this.currentGuess = ''
      this.guessCount = 0
      this.gameOver = false
      this.win = false
      this.message = ''
    },
    submitGuess() {
      if (this.gameOver || !this.currentGuess.trim() || !this.answer) {
        return
      }

      const compound = this.compounds.find(
        (c) => c.name.toLowerCase() === this.currentGuess.trim().toLowerCase()
      )
      if (!compound) {
        this.showMessage('无效的化合物或该化合物不在数据库')
        return
      }

      const row = this.guesses[this.guessCount]
      const guessElements = compound.elements
      const answerElements = [...this.answer.elements]

      for (let i = 0; i < 10; i++) {
        if (i < guessElements.length) {
          row.elements[i].value = guessElements[i]
          if (guessElements[i] === answerElements[i]) {
            row.elements[i].color = 'green'
            answerElements[i] = null
          }
        }
      }
      for (let i = 0; i < guessElements.length; i++) {
        if (row.elements[i].color) continue
        const index = answerElements.indexOf(guessElements[i])
        if (index !== -1) {
          row.elements[i].color = 'yellow'
          answerElements[index] = null
        } else {
          row.elements[i].color = 'gray'
        }
      }

      row.state = compound.state
      row.stateColor = compound.state === this.answer.state ? 'green' : 'gray'

      row.weight = compound.molecularWeight
      if (compound.molecularWeight < this.answer.molecularWeight) {
        row.weightIndicator = '小了'
      } else if (compound.molecularWeight > this.answer.molecularWeight) {
        row.weightIndicator = '大了'
      } else if ((compound.molecularWeight = this.answer.molecularWeight)) {
        row.weightIndicator = '等于'
      }
      this.guessCount++
      this.currentGuess = ''

      if (compound.name === this.answer.name) {
        this.gameOver = true
        this.win = true
        this.showMessage('恭喜你，猜对了！')
      } else if (this.guessCount >= 20) {
        this.gameOver = true
        this.showMessage(`游戏结束，答案是 ${this.answer.name}`)
      } else {
        this.guesses.push({
          elements: Array(10)
            .fill()
            .map(() => ({ value: '', color: '' })),
          state: '',
          stateColor: '',
          weight: null,
          weightIndicator: '',
        })
      }
    },
    revealAnswer() {
      if (!this.answer || this.gameOver) return

      const row = this.guesses[this.guessCount]
      const answerElements = [...this.answer.elements]

      for (let i = 0; i < 10; i++) {
        if (i < answerElements.length) {
          row.elements[i].value = answerElements[i]
          row.elements[i].color = 'green'
        }
      }
      row.state = this.answer.state
      row.stateColor = 'green'
      row.weight = this.answer.molecularWeight
      row.weightIndicator = ''

      this.gameOver = true
      this.guessCount++
      this.showMessage(`游戏结束，答案是 ${this.answer.name}`)

      if (this.guessCount < 10) {
        this.guesses.push({
          elements: Array(10)
            .fill()
            .map(() => ({ value: '', color: '' })),
          state: '',
          stateColor: '',
          weight: null,
          weightIndicator: '',
        })
      }
    },
    showMessage(text) {
      this.message = text
      setTimeout(() => {
        this.message = ''
      }, 3000)
    },
  },
}
</script>

<style scoped>
.game {
  text-align: center;
  font-family: Arial, sans-serif;
}
.grid {
  display: inline-block;
  margin: 20px 0;
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
.input {
  margin: 4px 0;
}
input {
  width: 170px;
  height: 20px;
  padding: 8px;
  font-size: 16px;
}
input:disabled {
  background-color: #eee;
  cursor: not-allowed;
}
.buttons {
  margin: 8px 0;
}
button {
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 10px;
  background-color: rgb(107, 107, 244);
  color: #ffffff;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff6b6b;
  color: white;
  padding: 10px 20px;
  border-radius: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
.notification.success {
  background-color: #6aaa64;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
@media screen and (max-width: 650px) {
  .titles-cell {
    font-size: 8px;
    width: 75%;
    height: 20px;
    border: 1px solid #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2px;
    border-radius: 5px;
    font-weight: bold;
  }
  .cell {
    width: 20px;
    height: 20px;
    border: 1px solid #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2px;
    font-size: 8px;
    border-radius: 5px;
  }
  .state-cell {
    font-size: 8px;
    width: 20px;
    height: 20px;
    border: 1px solid #ff0000;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2px;
    border-radius: 5px;
  }
  .weight-cell {
    font-size: 8px;
    width: 20px;
    height: 20px;
    border: 1px solid #cfcc00;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2px;
    border-radius: 5px;
  }
  .input {
    margin: 1px 0;
  }
  input {
    width: 106px;
    height: 8px;
    padding: 8px;
    font-size: 10px;
  }
  input:disabled {
    background-color: #eee;
    cursor: not-allowed;
  }
  .buttons {
    margin: 8px 0;
  }
  button {
    padding: 5px 10px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 10px;
    background-color: rgb(107, 107, 244);
    color: #ffffff;
  }
  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}
</style>
