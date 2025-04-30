<template>
  <div class="top-info">
    <h4 style="margin: 0">猜无机化合物游戏</h4>
    <div class="github-badge">
      <a href="https://github.com/biantailab/chem-game" target="_blank" rel="noopener noreferrer">
        <img
          src="https://img.shields.io/badge/biantailab/chem--game-informational?logo=github"
          alt="GitHub Repository"
          style="display: block"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  // No props or logic needed for this simple component
}
</script>

<style scoped>
.top-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px; /* Adjusted from Game.vue */
  padding: 10px 15px;
  box-sizing: border-box;
  background-color: #ff0000; /* Consider making this configurable if needed */
  border-radius: 5px;
}
.top-info h4 {
  /* Specificity increased slightly */
  color: #333; /* Changed from p tag in original */
  margin: 0;
}
.github-badge a img {
  vertical-align: middle;
  display: block; /* Ensure block display */
}
</style>
