<template>
  <div class="buttons">
    <button @click="$emit('refresh')">刷新</button>
    <button @click="$emit('random')" :disabled="gameOver">随机</button>
    <button @click="$emit('reveal')" :disabled="gameOver">揭晓</button>
    <button @click="$emit('help')">帮助</button>
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

<style scoped>
.buttons {
  margin: 8px 0;
  text-align: center;
}
button {
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 10px;
  background-color: rgb(107, 107, 244);
  color: #ffffff;
  border: none; /* Added */
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

@media screen and (max-width: 650px) {
  button {
    padding: 5px 10px;
  }
}
</style>
