<template>
  <div class="periodic-table-container">
    <img alt="元素周期表" :src="periodicTableImage" />
  </div>
</template>

<script>
// Import the image asset
import periodicTableImage from '@/assets/periodic-table.svg'

export default {
  data() {
    return {
      // Assign imported asset to data property
      periodicTableImage: periodicTableImage,
    }
  },
  // No logic needed beyond loading the image
}
</script>

<style scoped>
.periodic-table-container {
  margin: 20px 0; /* Add spacing */
  text-align: center;
  width: 100%; /* Explicitly set width */
}
img {
  max-width: 100%; /* Ensure image is responsive */
  height: auto;
}
</style>
