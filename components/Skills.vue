<template>
  <div class="container mx-auto px-4 mt-24 md:mt-24 mt-8">
    <h2
      class="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in"
    >
      Technical Skills
    </h2>

    <!-- Desktop Layout -->
    <div class="hidden md:grid md:grid-cols-12 gap-6">
      <!-- Categories Sidebar -->
      <div class="col-span-2">
        <div class="sticky top-24">
          <!-- <h3 class="text-lg font-semibold mb-4 text-gray-700">Categories</h3> -->
          <div class="space-y-2">
            <button
              v-for="category in categories"
              :key="category"
              @click="currentCategory = category"
              :class="[
                'w-full text-left px-4 py-3 rounded-lg transition-all duration-300',
                'text-sm font-medium',
                currentCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white hover:bg-gray-50 text-gray-700 hover:shadow',
              ]"
            >
              {{ category }}
            </button>
          </div>
        </div>
      </div>

      <!-- Skills Grid -->
      <div class="col-span-5">
        <div class="grid grid-cols-3 gap-4">
          <div
            v-for="skill in getSkillsByCategory(currentCategory)"
            :key="skill.name"
            @click="selectSkill(skill)"
            :class="[
              'skill-card group',
              selectedSkill?.name === skill.name
                ? 'ring-2 ring-blue-500 ring-offset-2'
                : '',
            ]"
          >
            <div
              class="relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 p-4"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <img
                :src="skill.icon"
                :alt="skill.name"
                class="w-16 h-16 mx-auto mb-3 transform group-hover:scale-110 transition-transform"
              />
              <h3 class="text-center font-semibold text-gray-800">
                {{ skill.name }}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Details Panel -->
      <div class="col-span-5 sticky top-24 h-fit">
        <Transition name="fade" mode="out-in">
          <div
            v-if="selectedSkill"
            class="bg-white rounded-xl shadow-xl p-8 border border-gray-100"
          >
            <div class="flex items-center mb-6">
              <img
                :src="selectedSkill.icon"
                :alt="selectedSkill.name"
                class="w-16 h-16 mr-6"
              />
              <div>
                <h3
                  class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  {{ selectedSkill.name }}
                </h3>
                <p class="text-gray-500">{{ selectedSkill.category }}</p>
              </div>
            </div>
            <p class="text-gray-600 mb-6 leading-relaxed">
              {{ selectedSkill.description }}
            </p>
            <div class="mb-6">
              <h4 class="font-semibold mb-3">Experience Level</h4>
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  class="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-1000"
                  :style="{ width: `${selectedSkill.experienceLevel}%` }"
                ></div>
              </div>
              <span class="text-sm text-gray-500 mt-1"
                >{{ selectedSkill.experienceLevel }}%</span
              >
            </div>
            <div>
              <h4 class="font-semibold mb-2">Projects Used In:</h4>
              <ul class="list-disc list-inside">
                <li
                  v-for="project in selectedSkill.projects"
                  :key="project"
                  class="text-gray-600"
                >
                  {{ project }}
                </li>
              </ul>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <!-- Mobile Layout -->
    <div class="md:hidden">
      <!-- Category Tabs for Mobile -->
      <div class="flex overflow-x-auto gap-2 mb-6 pb-2 snap-x">
        <button
          v-for="category in categories"
          :key="category"
          @click="currentCategory = category"
          :class="[
            'px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium snap-start',
            currentCategory === category
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
              : 'bg-gray-100 text-gray-700',
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- Skills Grid for Mobile -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div
          v-for="skill in getSkillsByCategory(currentCategory)"
          :key="skill.name"
          @click="selectSkill(skill)"
          class="skill-card-mobile p-4 active:scale-95"
        >
          <img
            :src="skill.icon"
            :alt="skill.name"
            class="w-12 h-12 mx-auto mb-3"
          />
          <h3 class="text-center text-xs sm:text-sm font-medium leading-tight">
            {{ skill.name }}
          </h3>
        </div>
      </div>

      <!-- Mobile Details Panel -->
      <Transition name="slide-up">
        <div
          v-if="selectedSkill"
          class="fixed inset-x-0 bottom-0 bg-white rounded-t-xl shadow-xl p-6 z-50 max-h-[80vh] overflow-y-auto"
        >
          <div class="flex justify-between items-start mb-4">
            <div class="flex items-center">
              <img
                :src="selectedSkill.icon"
                :alt="selectedSkill.name"
                class="w-12 h-12 mr-4"
              />
              <div>
                <h3 class="text-xl font-bold">{{ selectedSkill.name }}</h3>
                <p class="text-sm text-gray-500">
                  {{ selectedSkill.category }}
                </p>
              </div>
            </div>
            <button
              @click="selectedSkill = null"
              class="text-gray-500 hover:text-gray-700 p-2"
            >
              ✕
            </button>
          </div>
          <p class="text-gray-600 mb-4">{{ selectedSkill.description }}</p>
          <div class="mb-4">
            <h4 class="font-semibold mb-2">Experience Level:</h4>
            <div class="bg-gray-200 rounded-full h-2">
              <div
                class="bg-blue-600 h-2 rounded-full"
                :style="{ width: `${selectedSkill.experienceLevel}%` }"
              ></div>
            </div>
          </div>
          <div>
            <h4 class="font-semibold mb-2">Projects Used In:</h4>
            <ul class="list-disc list-inside">
              <li
                v-for="project in selectedSkill.projects"
                :key="project"
                class="text-gray-600"
              >
                {{ project }}
              </li>
            </ul>
          </div>
        </div>
      </Transition>

      <!-- Backdrop -->
      <Transition name="fade">
        <div
          v-if="selectedSkill"
          class="fixed inset-0 bg-black/50 z-40"
          @click="selectedSkill = null"
        ></div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, onUnmounted } from "vue";

const selectedSkill = ref(null);
const currentCategory = ref("Frontend");
const windowWidth = ref(0); // Initialize with 0
const isDesktop = computed(() => windowWidth.value >= 768);

// Handle window width only on client-side
onMounted(() => {
  // Set initial width
  windowWidth.value = window.innerWidth;

  // Create resize handler
  const handleResize = () => {
    windowWidth.value = window.innerWidth;
  };

  // Add event listener
  window.addEventListener("resize", handleResize);

  // Auto-select first skill only on desktop
  if (isDesktop.value) {
    const firstCategorySkills = getSkillsByCategory(currentCategory.value);
    if (firstCategorySkills.length > 0) {
      selectedSkill.value = firstCategorySkills[0];
    }
  }

  // Cleanup
  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });
});

const categories = [
  "Frontend",
  "Backend",
  "App Development",
  "Languages",
  "State Management",
  "Development Tools",
];

const skills = ref([
  // Frontend
  {
    name: "React",
    category: "Frontend",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    description:
      "Modern React development with hooks, context, and state management solutions like Redux and Zustand.",
    experienceLevel: 85,
    projects: ["E-commerce Platform", "Social Media Dashboard", "Admin Panel"],
  },
  {
    name: "Vue.js",
    category: "Frontend",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg",
    description:
      "Vue 3 composition API and advanced features including slots, suspense, and teleport.",
    experienceLevel: 90,
    projects: ["Portfolio Website", "Customer Management System"],
  },
  {
    name: "Nuxt.js",
    category: "Frontend",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nuxtjs/nuxtjs-original.svg",
    description:
      "Server-side rendering, static site generation, and dynamic routing with Nuxt 3.",
    experienceLevel: 85,
    projects: ["Personal Portfolio", "E-commerce Site"],
  },
  {
    name: "Next.js",
    category: "Frontend",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg",
    description:
      "Server-side rendering and static site generation with Next.js.",
    experienceLevel: 80,
    projects: ["Blog Platform", "E-learning Portal"],
  },
  {
    name: "HTML5",
    category: "Frontend",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
    description: "Semantic HTML, accessibility, and modern web standards.",
    experienceLevel: 95,
    projects: ["Various Web Applications", "Landing Pages"],
  },
  {
    name: "CSS3",
    category: "Frontend",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg",
    description: "Advanced CSS including Flexbox, Grid, and animations.",
    experienceLevel: 90,
    projects: ["Responsive Layouts", "Interactive UIs"],
  },

  // Backend
  {
    name: "Node.js",
    category: "Backend",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
    description: "Server-side JavaScript runtime environment.",
    experienceLevel: 85,
    projects: ["REST APIs", "Real-time Applications"],
  },
  {
    name: "Express.js",
    category: "Backend",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg",
    description:
      "Web application framework for Node.js with middleware architecture.",
    experienceLevel: 80,
    projects: ["RESTful APIs", "Authentication Systems"],
  },
  {
    name: "MongoDB",
    category: "Backend",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
    description: "NoSQL database design and optimization.",
    experienceLevel: 75,
    projects: ["User Management", "Content Management"],
  },

  // App Development
  {
    name: "React Native",
    category: "App Development",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    description: "Cross-platform mobile development with React Native.",
    experienceLevel: 75,
    projects: ["Mobile Apps", "Cross-platform Applications"],
  },
  {
    name: "Expo",
    category: "App Development",
    icon: "https://cdn.worldvectorlogo.com/logos/expo-1.svg", // New Expo icon URL
    description: "Framework and platform for universal React applications.",
    experienceLevel: 70,
    projects: ["Mobile Development", "Quick Prototypes"],
  },

  // Languages
  {
    name: "JavaScript",
    category: "Languages",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    description:
      "ES6+ features, async programming, and modern JavaScript concepts.",
    experienceLevel: 90,
    projects: ["Web Applications", "Server Development"],
  },
  {
    name: "TypeScript",
    category: "Languages",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    description: "Static typing, interfaces, and advanced TypeScript features.",
    experienceLevel: 85,
    projects: ["Enterprise Applications", "Type-safe Development"],
  },

  // State Management
  {
    name: "Redux",
    category: "State Management",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg",
    description:
      "State management with Redux, including Redux Toolkit and middleware.",
    experienceLevel: 80,
    projects: ["Large Scale Applications", "E-commerce Platforms"],
  },
  {
    name: "Pinia",
    category: "State Management",
    icon: "https://pinia.vuejs.org/logo.svg",
    description:
      "State management for Vue.js applications with composition API support.",
    experienceLevel: 85,
    projects: ["Vue.js Applications", "Nuxt.js Projects"],
  },

  // Development Tools
  {
    name: "NPM",
    category: "Development Tools",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/npm/npm-original-wordmark.svg",
    description: "Package management and build tools for JavaScript projects.",
    experienceLevel: 90,
    projects: ["Package Management", "Build Automation"],
  },
  {
    name: "Git",
    category: "Development Tools",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
    description: "Version control and collaboration using Git.",
    experienceLevel: 85,
    projects: ["Version Control", "Team Collaboration"],
  },
]);

const getSkillsByCategory = (category) => {
  return skills.value.filter((skill) => skill.category === category);
};

watch(currentCategory, (newCategory) => {
  if (isDesktop.value) {
    const categorySkills = getSkillsByCategory(newCategory);
    if (categorySkills.length > 0) {
      selectSkill(categorySkills[0]);
    }
  }
});

const selectSkill = (skill) => {
  selectedSkill.value = skill;
  // Optional: Scroll the skill into view on mobile
  if (!isDesktop.value) {
    setTimeout(() => {
      const element = document.querySelector(`[alt="${skill.name}"]`);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }
};
</script>

<style scoped>
.skill-card {
  @apply bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer;
  @apply transform hover:scale-105 hover:z-10 ring-offset-white;
}

.skill-card-mobile {
  @apply bg-white p-4 rounded-xl shadow-md flex-shrink-0 w-32 relative z-20;
  @apply min-h-[120px] flex flex-col justify-center items-center;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Hide scrollbar but keep functionality */
.overflow-x-auto {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.overflow-x-auto::-webkit-scrollbar {
  display: none;
}

/* Add these new styles */
@media (max-width: 768px) {
  .container > div {
    position: relative;
    z-index: 10;
  }
}

/* Mobile specific styles */
.skill-card-mobile {
  @apply bg-white rounded-xl shadow-sm transition-all duration-200;
  @apply active:shadow-inner cursor-pointer;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* Hide scrollbar */
.overflow-x-auto {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.overflow-x-auto::-webkit-scrollbar {
  display: none;
}

/* Prevent body scroll when modal is open */
:root {
  &:has(.fixed.inset-0) {
    overflow: hidden;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 1400px; /* Adjust based on your needs */
  }
}
</style>
