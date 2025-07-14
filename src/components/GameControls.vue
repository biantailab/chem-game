<template>
  <div class="buttons text-center my-0">
    <button
      @click="$emit('refresh')"
      class="px-3 py-1.5 max-[600px]:px-3 max-[600px]:py-1.5 max-[600px]:text-xs max-[600px]:h-8 px-5 py-2 mx-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 transition-colors text-base h-10"
    >
      刷新
    </button>
    <button
      @click="$emit('random')"
      :disabled="gameOver"
      class="px-3 py-1.5 max-[600px]:px-3 max-[600px]:py-1.5 max-[600px]:text-xs max-[600px]:h-8 px-5 py-2 mx-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors text-base h-10"
    >
      随机
    </button>
    <button
      @click="$emit('reveal')"
      :disabled="gameOver"
      class="px-3 py-1.5 max-[600px]:px-3 max-[600px]:py-1.5 max-[600px]:text-xs max-[600px]:h-8 px-5 py-2 mx-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors text-base h-10"
    >
      揭晓
    </button>
    <button
      @click="$emit('help')"
      class="px-3 py-1.5 max-[600px]:px-3 max-[600px]:py-1.5 max-[600px]:text-xs max-[600px]:h-8 px-5 py-2 mx-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 transition-colors text-base h-10"
    >
      帮助
    </button>
  </div>
</template>

<script>
export default {
  props: {
    gameOver: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['refresh', 'random', 'reveal', 'help'],
}
</script>
