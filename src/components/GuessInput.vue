<template>
  <div class="input-area">
    <div class="input-row">
      <button @click="handleSubmitInternal" :disabled="gameOver">提交</button>
      <input
        :value="value"
        @input="$emit('input', $event.target.value)"
        placeholder="输入分子式(不区分大小写)"
        @keyup.enter="handleSubmitInternal"
        :disabled="gameOver"
      />
      <button @click="handleSubmitInternal" :disabled="gameOver">提交</button>
    </div>
    <preview-row
      v-if="value.trim()"
      :current-guess="value"
      :preview-chars="previewChars"
      :matched-compound="matchedCompound"
    />
  </div>
</template>

<script>
import PreviewRow from './PreviewRow.vue'

export default {
  components: {
    PreviewRow,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    gameOver: {
      type: Boolean,
      required: true,
    },
    matchedCompound: {
      type: Object,
      default: null,
    },
  },
  computed: {
    previewChars() {
      return Array.from({ length: 10 }, (_, i) => this.value[i] || '')
    },
  },
  methods: {
    handleSubmitInternal() {
      if (this.value.trim() && !this.gameOver) {
        this.$emit('submit')
      }
    },
  },
}
</script>

<style scoped>
.input-area {
  margin: 4px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-row {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 5px;
}

input {
  width: 170px;
  height: 20px;
  padding: 8px;
  font-size: 14px;
  margin: 0 5px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input:disabled {
  background-color: #eee;
  cursor: not-allowed;
}

button {
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 10px;
  background-color: rgb(107, 107, 244);
  color: #ffffff;
  border: none;
  height: 38px;
  display: flex;
  align-items: center;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

@media screen and (max-width: 650px) {
  input {
    width: 106px;
    height: 8px;
    padding: 8px;
    font-size: 9px;
  }
  button {
    padding: 4px 8px;
    height: 26px;
  }
}
</style>
