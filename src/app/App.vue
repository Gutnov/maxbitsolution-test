<template>
  <div
    id="app"
    class="app"
  >
    <RouterView />
  </div>
</template>
  
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
  
  <style lang="scss">
  .app {
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  </style>