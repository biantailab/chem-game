<template>
  <transition name="fade">
    <div
      v-if="message"
      :class="[
        'fixed top-5 left-1/2 -translate-x-1/2 px-5 py-2 rounded shadow-lg z-[1000] text-white',
        win ? 'bg-green-600' : 'bg-red-400',
      ]"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: '',
    },
    win: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
