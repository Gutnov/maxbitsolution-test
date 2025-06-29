<template>
  <div
    ref="container"
    class="image-container"
  >
    <img
      v-if="isVisible"
      :src="src"
      :alt="alt"
      :class="{ loaded: isLoaded }"
      @load="onLoad"
    >
    <div
      v-if="!isLoaded"
      class="spinner"
    />
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
  
const props = defineProps<{
  src: string
  alt?: string
}>()
  
const isVisible = ref(false)
const isLoaded = ref(false)
const container = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null
  
const onLoad = () => {
  isLoaded.value = true
}


const initObserver = () => {
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer?.disconnect()
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1
      }
    )
  
    if (container.value) {
      observer.observe(container.value)
    }
  } else {
    isVisible.value = true
  }
}

watch(() => props.src, () => {
  initObserver()
})
  
onMounted(() => {  
  initObserver()
})
  
onUnmounted(() => {
  observer?.disconnect()
})
</script>
  
  <style scoped>
  .image-container {
    position: relative;
    width: 100%;
    height: auto;
    min-height: 250px;
    background-color: #eee;
  }
  
  img {
    width: 100%;
    height: auto;
    opacity: 0;
    transition: opacity 0.5s ease-in;
    display: block;
    position: relative;
    z-index: 1;
    border-radius: 10px;
  }
  
  img.loaded {
    opacity: 1;
  }
  
  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 32px;
    height: 32px;
    margin: -16px 0 0 -16px;
    border: 4px solid #ccc;
    border-top-color: #333;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    z-index: 2;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  