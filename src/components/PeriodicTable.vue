<template>
  <div class="my-5 w-full text-center">
    <img alt="元素周期表" :src="periodicTableImage" class="max-w-full h-auto inline-block" />
  </div>
</template>

<script>
// Import the image asset
import periodicTableImage from '@/assets/imgs/periodic-table.svg'

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
