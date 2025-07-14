<template>
  <transition name="fade">
    <div
      v-if="message"
      :class="[
        'fixed top-7 left-1/2 -translate-x-1/2 px-5 py-2 rounded shadow-lg z-[1000] text-white text-center',
        win ? 'bg-green-600' : 'bg-red-400',
      ]"
      style="min-width: 260px; white-space: nowrap"
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
