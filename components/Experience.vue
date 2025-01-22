<template>
  <div class="container mx-auto px-4 mt-24">
    <h2
      class="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in"
    >
      Professional Experience
    </h2>

    <div class="flex flex-wrap gap-4 justify-center mb-8">
      <button
        v-for="(exp, index) in experiences"
        :key="index"
        @click="selectedExp = index"
        :class="[
          'px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105',
          'text-sm md:text-base font-semibold shadow-lg',
          selectedExp === index
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-105'
            : 'bg-white hover:bg-gray-50 text-gray-700 hover:shadow-xl',
        ]"
      >
        {{ exp.company }}
      </button>
    </div>

    <div class="relative min-h-[500px] md:h-[500px]">
      <Transition name="fade" mode="out-in">
        <div
          v-if="experiences[selectedExp]"
          :key="selectedExp"
          class="bg-white rounded-xl shadow-2xl p-8 max-w-3xl mx-auto transition-all duration-300 md:absolute md:w-full md:left-0 md:right-0"
        >
          <div class="relative">
            <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {{ experiences[selectedExp].position }}
            </h3>
            <div
              class="flex flex-col md:flex-row md:justify-between text-gray-600 mb-6 space-y-2 md:space-y-0"
            >
              <span class="flex items-center">
                <i class="fas fa-calendar-alt mr-2"></i>
                {{ experiences[selectedExp].period }}
              </span>
              <span class="flex items-center">
                <i class="fas fa-map-marker-alt mr-2"></i>
                {{ experiences[selectedExp].location }}
              </span>
            </div>
            <ul class="space-y-3">
              <li
                v-for="(item, index) in experiences[selectedExp].description"
                :key="index"
                class="flex items-start space-x-2 animate-slide-in"
                :style="{ animationDelay: `${index * 100}ms` }"
              >
                <span class="text-blue-600 mt-1">•</span>
                <span class="text-gray-700">{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
const selectedExp = ref(0);

const experiences = ref([
  {
    company: "Web Spiders Group",
    position: "Associate Frontend Developer",
    period: "Aug 2024 - Present",
    location: "Kolkata, India",
    description: [
      "Led development of microservices architecture",
      "Managed team of 5 developers",
      "Improved system performance by 40%",
    ],
  },
  {
    company: "Web Reinvent Tech",
    position: "Software Developer",
    period: "Apr 2024 - July 2024",
    location: "Delhi, India",
    description: [
      "Developed and maintained client websites",
      "Implemented CI/CD pipelines",
      "Reduced deployment time by 60%",
    ],
  },
  {
    company: "PwC",
    position: "Specialist",
    period: "May 2023 - Jan 2024",
    location: "Gurugram, India",
    description: [
      "Built responsive web applications",
      "Optimized frontend performance",
      "Collaborated with UX team",
    ],
  },
  {
    company: "SPP Associates",
    position: "Article Assistant",
    period: "Oct 2019 - Feb 2022",
    location: "Bhubaneswar, India",
    description: [
      "Developed UI components",
      "Fixed bugs and improved features",
      "Participated in code reviews",
    ],
  },
]);
</script>

<style scoped>
.container {
  @apply my-12 relative;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slideIn 0.5s ease forwards;
}

.animate-fade-in {
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container {
    @apply px-4;
  }

  button {
    @apply w-full max-w-xs;
  }

  /* Remove fixed height for mobile */
  .relative {
    min-height: auto;
    height: auto;
    margin-bottom: 2rem;
  }
}
</style>
