<template>
  <div class="input-area">
    <div class="input-row">
      <button
        @click="handleSubmitInternal"
        :disabled="gameOver"
        class="px-3 py-1.5 max-[600px]:px-3 max-[600px]:py-1.5 max-[600px]:text-xs max-[600px]:h-8 px-5 py-2 mx-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors text-base h-10"
      >
        提交
      </button>
      <input
        :value="value"
        @input="$emit('input', $event.target.value)"
        placeholder="输入分子式(不区分大小写)"
        @keyup.enter="handleSubmitInternal"
        :disabled="gameOver"
        class="w-44 max-[600px]:w-32 h-10 max-[600px]:h-8 px-5 max-[600px]:px-2 text-[9px] mx-1 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-100 disabled:cursor-not-allowed placeholder:text-9px]"
      />
      <button
        @click="handleSubmitInternal"
        :disabled="gameOver"
        class="px-3 py-1.5 max-[600px]:px-3 max-[600px]:py-1.5 max-[600px]:text-xs max-[600px]:h-8 px-5 py-2 mx-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors text-base h-10"
      >
        提交
      </button>
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
</style>
