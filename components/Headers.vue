<template>
  <header class="header">
    <nav class="container mx-auto px-6">
      <div class="flex items-center justify-between w-full">
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
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="url(#logoGradient)"
                class="logo-circle"
              />

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

        <!-- Desktop Menu -->
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

        <!-- Mobile Menu Button -->
        <button @click="toggleMenu" class="md:hidden text-white p-2">
          <svg
            class="w-6 h-6"
            :class="{ 'rotate-90': isMenuOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!isMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Mobile Menu Overlay -->
        <div v-show="isMenuOpen" class="mobile-menu" @click="closeMenu">
          <div class="mobile-menu-content" @click.stop>
            <div class="flex flex-col space-y-6">
              <a
                v-for="section in sections"
                :key="section"
                @click="setActiveAndClose(section)"
                class="mobile-nav-link"
                :class="{ 'mobile-nav-link-active': active === section }"
              >
                {{ section.charAt(0).toUpperCase() + section.slice(1) }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const active = ref("about");
const sections = [
  "about",
  "experience",
  "skills",
  "projects",
  "stats",
  "contacts",
];

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = "";
};

const setActiveAndClose = (section) => {
  setActive(section);
  closeMenu();
};

const checkActiveSection = () => {
  const sectionElements = sections.map((section) => ({
    id: section,
    element: document.querySelector(`#${section}`),
  }));

  const scrollPosition = window.scrollY + window.innerHeight / 3;

  for (const { id, element } of sectionElements) {
    if (element) {
      const { top, bottom } = element.getBoundingClientRect();
      const elementTop = top + window.pageYOffset;
      const elementBottom = bottom + window.pageYOffset;

      if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
        active.value = id;
        break;
      }
    }
  }
};

const setActive = (section) => {
  active.value = section;
  const element = document.querySelector(`#${section}`);
  if (element) {
    const headerHeight = 70;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

onMounted(() => {
  window.addEventListener("scroll", checkActiveSection);

  checkActiveSection();
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkActiveSection);
  document.body.style.overflow = "";
});
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

.logo-container {
  @apply flex items-center gap-4 flex-shrink-0;
  margin-right: 2rem;
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

.nav-link {
  @apply text-white/90 hover:text-white;
  @apply text-base font-medium cursor-pointer;
  @apply relative py-2 px-1;
  @apply transition-all duration-300;
  white-space: nowrap;
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

.container {
  @apply h-full flex items-center;
  @apply mx-auto;
  max-width: 1400px;
}

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

.mobile-menu {
  @apply fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden;
}

.mobile-menu-content {
  @apply fixed right-0 top-[70px] w-64 h-[calc(100vh-70px)];
  @apply bg-gradient-to-b from-blue-600/95 to-purple-600/95;
  @apply p-6 transform transition-transform duration-300 ease-in-out;
  animation: slideIn 0.3s ease-out;
}

.mobile-nav-link {
  @apply text-white/90 text-lg font-medium;
  @apply block w-full py-3 px-4 rounded-lg;
  @apply transition-all duration-200;
  @apply hover:bg-white/10 hover:text-white;
}

.mobile-nav-link-active {
  @apply bg-white/15 text-white font-semibold;
  @apply relative;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
