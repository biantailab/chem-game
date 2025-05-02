<template>
  <div id="app" class="game-container">
    <game-header />
    <game-info />
    <game-controls
      :game-over="gameOver"
      @refresh="refreshGame"
      @random="showRandomHint"
      @reveal="revealAnswer"
      @help="goToHelp"
    />
    <guess-grid :guesses="guesses" />
    <guess-input
      v-model="currentGuess"
      :game-over="gameOver"
      :matched-compound="matchedCompound"
      @submit="submitGuess"
    />
    <periodic-table />
    <notification-message :message="message" :win="win" />

    <help-modal :is-visible="showHelpModal" @close="showHelpModal = false" />
  </div>
</template>

<script>
// Removed <script setup>, using Options API for Vue 2 compatibility
// import { ref, computed, onMounted } from 'vue'; // No longer needed

import GameHeader from './components/GameHeader.vue'
import GameInfo from './components/GameInfo.vue'
import GameControls from './components/GameControls.vue'
import GuessGrid from './components/GuessGrid.vue'
import GuessInput from './components/GuessInput.vue'
import PeriodicTable from './components/PeriodicTable.vue'
import NotificationMessage from './components/NotificationMessage.vue'
import HelpModal from './components/HelpModal.vue'

import compoundsData from './assets/compounds.json'

export default {
  name: 'App', // Good practice to name the component
  components: {
    // Register components
    GameHeader,
    GameInfo,
    GameControls,
    GuessGrid,
    GuessInput,
    PeriodicTable,
    NotificationMessage,
    HelpModal,
  },
  data() {
    // Use data() for reactive state in Vue 2
    return {
      compounds: compoundsData || [],
      answer: null,
      guesses: [],
      currentGuess: '',
      guessCount: 0,
      gameOver: false,
      win: false,
      message: '',
      messageTimeout: null,
      showHelpModal: false,
    }
  },
  computed: {
    // Use computed properties
    matchedCompound() {
      const name = this.currentGuess.trim().toLowerCase()
      return name ? this.compounds.find((c) => c.name.toLowerCase() === name) : null
    },
  },
  methods: {
    // Define methods
    resetGuessTemplate() {
      return {
        elements: Array(10)
          .fill()
          .map(() => ({ value: '', color: '' })),
        state: '',
        stateColor: '',
        weight: null,
        weightIndicator: '',
      }
    },
    resetGame() {
      // Access data properties using 'this'
      this.guesses = [this.resetGuessTemplate()]
      this.currentGuess = ''
      this.guessCount = 0
      this.gameOver = false
      this.win = false
      this.message = ''
      if (this.messageTimeout) clearTimeout(this.messageTimeout)
    },
    randomGame() {
      this.resetGame()
      if (this.compounds.length > 0) {
        this.answer = this.compounds[Math.floor(Math.random() * this.compounds.length)]
      } else {
        this.showMessage('化合物数据库为空！')
      }
    },
    showMessage(text, duration = 3000) {
      this.message = text
      if (this.messageTimeout) clearTimeout(this.messageTimeout)
      if (duration > 0) {
        this.messageTimeout = setTimeout(() => {
          this.message = ''
        }, duration)
      }
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

      const currentGuessIndex = this.guessCount
      const row = this.guesses[currentGuessIndex] // Get the specific row to update
      if (!row) return // Should not happen if initialized correctly

      const guessElements = compound.elements
      const answerElements = [...this.answer.elements] // Create a mutable copy

      // Reset colors before evaluation
      row.elements.forEach((el) => (el.color = ''))

      // First pass: check for green matches
      for (let i = 0; i < 10; i++) {
        row.elements[i].value = i < guessElements.length ? guessElements[i] : '' // Fill guess value or empty
        if (i < guessElements.length && guessElements[i] === this.answer.elements[i]) {
          row.elements[i].color = 'green'
          answerElements[i] = null // Mark as used for green match
        }
      }

      // Second pass: check for yellow matches
      for (let i = 0; i < guessElements.length; i++) {
        if (row.elements[i].color) continue // Already green

        const indexInAnswer = answerElements.indexOf(guessElements[i])
        if (indexInAnswer !== -1) {
          row.elements[i].color = 'yellow'
          answerElements[indexInAnswer] = null // Mark as used for yellow match
        } else {
          row.elements[i].color = 'gray'
        }
      }

      // Fill remaining cells with gray if they had a value but didn't match
      for (let i = 0; i < 10; i++) {
        if (row.elements[i].value && !row.elements[i].color) {
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
      } else {
        // Use strict equality check after assignment
        row.weightIndicator = '等于'
        // If weights are equal, but names are not, ensure state color is also green if states match
        if (compound.name !== this.answer.name && compound.state === this.answer.state) {
          row.stateColor = 'green' // Ensure state is green if weight is equal and state matches
        }
      }

      this.guessCount++
      this.currentGuess = '' // Clear input *after* processing

      if (compound.name.toLowerCase() === this.answer.name.toLowerCase()) {
        this.gameOver = true
        this.win = true
        this.showMessage('恭喜你，猜对了！', 0) // Show indefinitely
        // Ensure the final row reflects the perfect match
        row.stateColor = 'green'
        row.weightIndicator = '等于'
        row.elements.forEach((el, i) => {
          if (i < compound.elements.length) {
            el.value = compound.elements[i]
            el.color = 'green'
          } else {
            el.value = ''
            el.color = ''
          }
        })
      } else if (this.guessCount >= 20) {
        // Use config later?
        this.gameOver = true
        this.showMessage(`游戏结束，答案是 ${this.answer.name}`, 0) // Show indefinitely
      } else {
        // Add a new empty row for the next guess
        this.guesses.push(this.resetGuessTemplate())
      }
    },
    revealAnswer() {
      if (!this.answer || this.gameOver) return

      const currentGuessIndex = this.guessCount
      // Ensure there's a row to place the answer into
      if (this.guesses.length <= currentGuessIndex) {
        this.guesses.push(this.resetGuessTemplate())
      }
      const row = this.guesses[currentGuessIndex]

      const answerElements = this.answer.elements

      for (let i = 0; i < 10; i++) {
        if (i < answerElements.length) {
          row.elements[i].value = answerElements[i]
          row.elements[i].color = 'green'
        } else {
          row.elements[i].value = ''
          row.elements[i].color = '' // Ensure empty cells are cleared
        }
      }
      row.state = this.answer.state
      row.stateColor = 'green'
      row.weight = this.answer.molecularWeight
      row.weightIndicator = '等于'

      this.gameOver = true
      this.win = false // It's a reveal, not a win
      this.guessCount++ // Increment guess count as this uses a turn
      this.showMessage(`游戏结束，答案是 ${this.answer.name}`, 0) // Show indefinitely

      // If the grid was full, don't add another row
      // (Handled implicitly by checking guessCount >= maxGuesses before adding new rows)
    },
    showRandomHint() {
      if (!this.compounds.length || !this.answer || this.gameOver) return
      // Filter out the answer itself and previous guesses
      const previousGuesses = this.guesses
        .map((g) =>
          g.elements
            .map((e) => e.value)
            .join('')
            .toLowerCase()
        )
        .filter(Boolean)
      const possibleHints = this.compounds.filter(
        (c) =>
          c.name.toLowerCase() !== this.answer.name.toLowerCase() &&
          !previousGuesses.includes(c.name.toLowerCase())
      )

      if (possibleHints.length > 0) {
        const hintCompound = possibleHints[Math.floor(Math.random() * possibleHints.length)]
        this.currentGuess = hintCompound.name // Directly update data property
        // this.showMessage(`提示：试试 ${hintCompound.name}`, 3000); // Comment out or remove this line
      } else {
        const randomCompound = this.compounds[Math.floor(Math.random() * this.compounds.length)]
        this.currentGuess = randomCompound.name
        // this.showMessage(`提示：试试 ${randomCompound.name}`, 3000); // Comment out or remove this line
      }
    },
    refreshGame() {
      this.randomGame()
    },
    goToHelp() {
      this.showHelpModal = true
    },
  },
  mounted() {
    // Use mounted() lifecycle hook
    if (this.compounds.length === 0) {
      this.showMessage('数据库加载失败！请检查 compounds.json')
      return
    }
    this.randomGame()
  },
}
</script>

<style>
/* Global styles or styles for #app container */
#app {
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex; /* Use flexbox for layout */
  flex-direction: column; /* Stack components vertically */
  align-items: center; /* Center components horizontally */
  background-color: #f0f0f0;
  padding: 20px; /* Add padding */
  box-sizing: border-box;
}

.game-container {
  /* You might not need this class if #app is sufficient */
  width: 100%;
  max-width: 700px; /* Max width for the game area */
  margin: 0 auto; /* Center the container itself */
}

/* Add some basic spacing between components if needed */
.game-container > * {
  margin-bottom: 15px;
}
.game-container > *:last-child {
  margin-bottom: 0;
}

/* Ensure buttons component takes appropriate width */
.game-controls-container {
  /* Example if needed for specific layout */
  width: 100%;
  text-align: center;
}

/* Media query adjustments if needed at the App level */
@media screen and (max-width: 650px) {
  #app {
    padding: 10px;
  }
}
</style>
