<template>
  <header
    class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg"
  >
    <nav class="container mx-auto">
      <div class="flex justify-between items-center">
        <button
          @click="toggleMenu"
          class="md:hidden hover:scale-105 transition-transform"
        >
          <span class="block w-6 h-0.5 bg-white mb-1.5 rounded-full"></span>
          <span class="block w-6 h-0.5 bg-white mb-1.5 rounded-full"></span>
          <span class="block w-6 h-0.5 bg-white rounded-full"></span>
        </button>
      </div>
      <div
        :class="[
          'md:flex',
          'justify-around',
          { hidden: !isMenuOpen, block: isMenuOpen },
        ]"
      >
        <a
          v-for="section in sections"
          :key="section"
          @click="setActive(section)"
          :class="[
            'px-4 py-2 text-lg transition-all duration-300 rounded-lg cursor-pointer',
            'hover:bg-white hover:bg-opacity-10 hover:scale-105',
            active === section
              ? 'text-white font-bold scale-105 bg-white bg-opacity-10'
              : 'text-gray-100',
          ]"
        >
          {{ section.charAt(0).toUpperCase() + section.slice(1) }}
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";

const active = ref("about");
const isMenuOpen = ref(false);
const sections = [
  "about",
  "experience",
  "skills",
  "projects",
  "stats",
  "contacts",
];

const setActive = (section) => {
  active.value = section;
  isMenuOpen.value = false;

  const element = document.querySelector(`#${section}`);
  const headerHeight = 80; // Approximate header height in pixels
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
    // Add custom smooth scroll duration
    options: {
      duration: 1000, // Increase duration to 1 second
      easing: "easeInOutQuad",
    },
  });
};

// Add custom easing function
const easeInOutQuad = (t) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};
</script>

<style scoped>
header {
  @apply flex flex-col items-center w-full fixed top-0 z-50 backdrop-blur-sm bg-opacity-95;
  height: 80px; /* Match the headerHeight value used in script */
}

nav {
  @apply w-full max-w-5xl;
}

@media (max-width: 768px) {
  nav a {
    @apply block w-full text-center my-2 transition-all duration-300;
  }

  .block {
    @apply animate-fadeDown;
  }
}

@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeDown {
  animation: fadeDown 0.3s ease-out;
}

/* Add padding to account for fixed header */
:global(section) {
  scroll-margin-top: 80px; /* Match the headerHeight value */
}
</style>
