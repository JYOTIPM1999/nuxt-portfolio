<template>
  <header class="header">
    <nav class="container mx-auto px-6">
      <div class="flex items-center justify-between w-full">
        <!-- Logo Area with SVG -->
        <div class="logo-container">
          <div class="logo-svg">
            <svg viewBox="0 0 100 100" class="w-10 h-10 md:w-12 md:h-12">
              <defs>
                <linearGradient
                  id="logoGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" style="stop-color: #3b82f6" />
                  <stop offset="100%" style="stop-color: #9333ea" />
                </linearGradient>
              </defs>
              <!-- Circular background -->
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="url(#logoGradient)"
                class="logo-circle"
              />
              <!-- JPM Text -->
              <text
                x="50"
                y="58"
                text-anchor="middle"
                fill="white"
                font-weight="bold"
                font-family="Arial, sans-serif"
                font-size="28"
                class="logo-text-svg"
              >
                JPM
              </text>
              <!-- Decorative ring -->
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="white"
                stroke-width="2"
                stroke-dasharray="8 4"
                class="logo-ring"
              />
            </svg>
          </div>
          <div class="logo-text">
            <span class="name">Jyoti Prakash</span>
            <span class="title">Frontend Developer</span>
          </div>
        </div>

        <!-- Desktop Navigation with increased gap -->
        <div class="hidden md:flex items-center space-x-12">
          <a
            v-for="section in sections"
            :key="section"
            @click="setActive(section)"
            class="nav-link"
            :class="{ 'nav-link-active': active === section }"
          >
            {{ section.charAt(0).toUpperCase() + section.slice(1) }}
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";

const active = ref("about");
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

  const element = document.querySelector(`#${section}`);
  const headerHeight = 64; // Reduced header height
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
    duration: 1000,
  });
};
</script>

<style scoped>
.header {
  @apply fixed top-0 left-0 right-0 z-50;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  height: 70px;
}

.header::before {
  content: "";
  @apply absolute inset-0;
  @apply bg-gradient-to-r from-blue-600/90 to-purple-600/90;
  @apply -z-10;
}

/* Logo Styling */
.logo-container {
  @apply flex items-center gap-4 flex-shrink-0;
  margin-right: 2rem; /* Add explicit margin */
}

.logo-svg {
  @apply transition-transform duration-300;
}

.logo-container:hover .logo-svg {
  @apply scale-110;
}

.logo-circle {
  transform-origin: center;
  animation: pulse 2s ease-in-out infinite;
}

.logo-text-svg {
  animation: fadeIn 1s ease-out forwards;
}

.logo-ring {
  transform-origin: center;
  animation: spin 10s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.logo-emoji {
  @apply text-2xl md:text-3xl animate-bounce;
  animation-duration: 2s;
}

.logo-text {
  @apply flex flex-col;
}

.name {
  @apply font-bold text-base md:text-lg text-white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  @apply text-xs md:text-sm text-white/80;
}

/* Navigation Links */
.nav-link {
  @apply text-white/90 hover:text-white;
  @apply text-base font-medium cursor-pointer; /* Adjusted text size */
  @apply relative py-2 px-1;
  @apply transition-all duration-300;
  white-space: nowrap; /* Prevent text wrapping */
}

.nav-link::before {
  content: "";
  @apply absolute -bottom-1 left-0 w-full h-0.5;
  @apply bg-gradient-to-r from-white/0 via-white to-white/0;
  @apply scale-x-0 opacity-0;
  @apply transition-all duration-300;
}

.nav-link:hover::before,
.nav-link-active::before {
  @apply scale-x-100 opacity-100;
}

.nav-link-active {
  @apply text-white font-semibold;
}

/* Container adjustments */
.container {
  @apply h-full flex items-center;
  @apply mx-auto;
  max-width: 1400px; /* Increased max-width */
}

/* Optional: Add subtle animation for active link */
.nav-link-active {
  @apply relative;
}

.nav-link-active::after {
  content: "";
  @apply absolute -bottom-1 left-1/2 w-1 h-1;
  @apply bg-white rounded-full;
  @apply transform -translate-x-1/2;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: translateX(-50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateX(-50%) scale(1.5);
    opacity: 0.5;
  }
  100% {
    transform: translateX(-50%) scale(1);
    opacity: 1;
  }
}
</style>
