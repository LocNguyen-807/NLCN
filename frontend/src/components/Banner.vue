<template>
  <div class="banner-container">
    <div class="banner-wrapper" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <img v-for="(banner, index) in banners" 
           :key="index"
           :src="banner"
           :alt="`Banner ${index + 1}`"
           class="banner-image">
    </div>
    
    <button class="nav-button prev" @click="prevSlide">
      <i class="fas fa-chevron-left"></i>
    </button>
    
    <button class="nav-button next" @click="nextSlide">
      <i class="fas fa-chevron-right"></i>
    </button>
    
    <div class="dots">
      <span v-for="(_, index) in banners" 
            :key="index" 
            :class="['dot', { active: currentIndex === index }]"
            @click="goToSlide(index)">
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const banners = [
  '../../public/banner1.webp',
  '../../public/banner2.webp',
  '../../public/banner3.webp',
]

const currentIndex = ref(0)
const timer = ref(null)

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % banners.length
}

const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 ? banners.length - 1 : currentIndex.value - 1
}

const goToSlide = (index) => {
  currentIndex.value = index
}

const startAutoSlide = () => {
  timer.value = setInterval(nextSlide, 5000) // Tự động chuyển slide sau 5 giây
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  if (timer.value) clearInterval(timer.value)
})
</script>

<style scoped>
.banner-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.banner-wrapper {
  display: flex;
  transition: transform 0.5s ease;
}

.banner-image {
  width: 100%;
  flex-shrink: 0;
  object-fit: cover;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 1rem;
  cursor: pointer;
  z-index: 1;
}

.prev {
  left: 1rem;
}

.next {
  right: 1rem;
}

.dots {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.dot.active {
  background: white;
}
</style>

