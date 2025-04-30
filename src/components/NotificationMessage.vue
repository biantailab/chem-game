<template>
  <transition name="fade">
    <div v-if="message" class="notification" :class="{ success: win }">
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

<style scoped>
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
  z-index: 1000; /* Ensure it's on top */
}
.notification.success {
  background-color: #6aaa64;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, /* Updated class names for Vue 3 */
.fade-leave-to {
  opacity: 0;
}
</style>
