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
          <h3
            class="text-center text-xs sm:text-sm font-medium leading-tight text-gray-800"
          >
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
                <h3
                  class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  {{ selectedSkill.name }}
                </h3>
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
  "Languages",
  "State Management",
  "Validation & Security",
  "Testing & Performance",
  "Development Tools",
];

const skills = ref([
  // ==========================================
  // FRONTEND
  // ==========================================
  {
    name: "React.js",
    category: "Frontend",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    description:
      "Enterprise React application development utilizing hooks, Context API, reusable component architectures, and performance optimization.",
    experienceLevel: 90,
    projects: [
      "Operational Dashboards (PwC)",
      "Internal Feature Modules (Webreinvent)",
      "DevSphere Demo Client",
    ],
  },
  {
    name: "Next.js",
    category: "Frontend",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg",
    description:
      "Server-side rendering (SSR), static generation, and scalable UI component architecture for high-performance enterprise applications.",
    experienceLevel: 85,
    projects: [
      "B2B Procurement Management Platform",
      "AI-Powered News Platform",
    ],
  },
  {
    name: "Vue.js",
    category: "Frontend",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg",
    description:
      "Modern Vue.js development leveraging the Composition API, reactive state management, and reusable UI structures.",
    experienceLevel: 85,
    projects: ["Client Enterprise Dashboards", "B2B Procurement Platform"],
  },
  {
    name: "Nuxt.js",
    category: "Frontend",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nuxtjs/nuxtjs-original.svg",
    description:
      "Full-stack SSR framework development, building modular UI suites and dynamic routing solutions.",
    experienceLevel: 85,
    projects: ["AI Chatbot Customization Suite", "Enterprise Web Applications"],
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg",
    description:
      "Utility-first styling, rapid responsive design implementation, custom theme setups, and fluid interface animations.",
    experienceLevel: 90,
    projects: [
      "B2B Procurement Management Platform",
      "AI Chatbot Customization Suite",
      "Portfolio Website",
    ],
  },
  {
    name: "Chart.js",
    category: "Frontend",
    icon: "https://www.chartjs.org/img/chartjs-logo.svg",
    description:
      "Data visualization engine used to transform complex datasets into responsive, interactive visual charts and analytics dashboards.",
    experienceLevel: 85,
    projects: [
      "Operational Stakeholder Dashboards (PwC)",
      "Automated Reporting Workflows",
    ],
  },
  {
    name: "HTML5 & CSS3",
    category: "Frontend",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
    description:
      "Semantic markup, modern layout techniques (Flexbox, CSS Grid), responsive design standards, and accessibility.",
    experienceLevel: 95,
    projects: [
      "Enterprise Client Products",
      "Operational Dashboards",
      "Interactive Web UIs",
    ],
  },

  // ==========================================
  // BACKEND & APIS
  // ==========================================
  {
    name: "Node.js",
    category: "Backend",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
    description:
      "Asynchronous server-side runtime for building scalable RESTful microservices, API layers, and real-time backend engines.",
    experienceLevel: 80,
    projects: ["DevSphere Backend System", "Custom Server Endpoints"],
  },
  {
    name: "Express.js",
    category: "Backend",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg",
    description:
      "Robust web routing framework with centralized error-handling middlewares, request sanitization, and enterprise security policies.",
    experienceLevel: 85,
    projects: [
      "DevSphere Social Platform API",
      "Enterprise Middleware Architectures",
    ],
  },
  {
    name: "MongoDB & Mongoose",
    category: "Backend",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
    description:
      "NoSQL schema modeling, validation, aggregation pipelines, and compound index optimization for rapid data retrieval.",
    experienceLevel: 80,
    projects: ["DevSphere Social Platform API", "Feed & Messaging Data Models"],
  },
  {
    name: "Socket.io",
    category: "Backend",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/socketio/socketio-original.svg",
    description:
      "Event-driven real-time bi-directional communication, online presence detection, JWT handshakes, and chat history persistence.",
    experienceLevel: 80,
    projects: ["DevSphere 1:1 Real-Time Chat Engine", "Live Presence Tracker"],
  },
  {
    name: "RESTful APIs",
    category: "Backend",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg",
    description:
      "Architecture of end-to-end REST endpoints with strict HTTP status handling, payload filtering, and rate limiting.",
    experienceLevel: 85,
    projects: ["DevSphere Backend System", "B2B Procurement Integrations"],
  },

  // ==========================================
  // LANGUAGES
  // ==========================================
  {
    name: "TypeScript",
    category: "Languages",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    description:
      "Static typing, structural typing interfaces, generics, and compile-time verification across frontend and backend codebases.",
    experienceLevel: 85,
    projects: [
      "Enterprise Frontend Dashboards",
      "Scalable Component Libraries",
      "DevSphere System",
    ],
  },
  {
    name: "JavaScript (ES6+)",
    category: "Languages",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    description:
      "Modern JavaScript standards, asynchronous event loops, closures, promises, modular imports, and functional programming.",
    experienceLevel: 90,
    projects: [
      "Webspiders Client Products",
      "Webreinvent Modules",
      "PwC Dashboards",
    ],
  },

  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  {
    name: "Redux & Zustand",
    category: "State Management",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg",
    description:
      "Centralized immutable state management for complex React single-page applications and streamlined lightweight store slices.",
    experienceLevel: 85,
    projects: ["Enterprise Web Applications", "Multi-Module UI Architectures"],
  },
  {
    name: "Pinia",
    category: "State Management",
    icon: "https://pinia.vuejs.org/logo.svg",
    description:
      "Intuitive Vue 3 modular store architecture with full TypeScript support and reactive state hydration.",
    experienceLevel: 80,
    projects: ["Nuxt.js Chatbot UI Suite", "Vue Enterprise Dashboards"],
  },

  // ==========================================
  // VALIDATION & SECURITY
  // ==========================================
  {
    name: "Zod",
    category: "Validation & Security",
    icon: "https://raw.githubusercontent.com/colinhacks/zod/master/logo.svg",
    description:
      "TypeScript-first schema validation with static type inference, handling multi-step forms and backend API payload boundaries.",
    experienceLevel: 85,
    projects: [
      "B2B Procurement Multi-Step Forms",
      "DevSphere Request Validation Middleware",
    ],
  },
  {
    name: "Auth0 & JWT (RBAC)",
    category: "Validation & Security",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/oauth/oauth-original.svg",
    description:
      "Role-Based Access Control, dual-token JWT auth using httpOnly cookies, and enterprise single sign-on (SSO) integrations.",
    experienceLevel: 85,
    projects: [
      "B2B Procurement Dashboards (Auth0)",
      "DevSphere Private Endpoint Guard (Dual-Token JWT)",
    ],
  },
  {
    name: "Razorpay",
    category: "Validation & Security",
    icon: "https://avatars.githubusercontent.com/u/7713209?s=200&v=4",
    description:
      "Payment gateway integration handling recurring subscription billing flows, checkout modal lifecycle, and webhook verification.",
    experienceLevel: 80,
    projects: ["AI-Powered News Platform Subscription Flow"],
  },

  // ==========================================
  // TESTING & PERFORMANCE
  // ==========================================
  {
    name: "Unit & Integration Testing",
    category: "Testing & Performance",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vitest/vitest-original.svg",
    description:
      "Vitest and unit testing practices for UI components, reducing recurring production bugs and ensuring reliable sprint releases.",
    experienceLevel: 80,
    projects: [
      "70+ Reusable Components (Webreinvent)",
      "Critical Enterprise Flows",
    ],
  },
  {
    name: "Core Web Vitals & Optimization",
    category: "Testing & Performance",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/chrome/chrome-original.svg",
    description:
      "Frontend performance engineering optimizing LCP, FCP, INP, code splitting, lazy loading, and Lighthouse audit scores.",
    experienceLevel: 85,
    projects: [
      "Webspiders LCP Optimization (4.3s to 2.6s)",
      "Webreinvent Render Speed (3.9s to 2.4s)",
    ],
  },

  // ==========================================
  // DEVELOPMENT TOOLS
  // ==========================================
  {
    name: "Git & GitHub / GitLab",
    category: "Development Tools",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
    description:
      "Distributed version control, feature-branch workflows, collaborative code reviews, PR management, and issue tracking.",
    experienceLevel: 90,
    projects: [
      "Multi-Repository Enterprise Teams",
      "DevSphere Open-Source Architecture",
    ],
  },
  {
    name: "Postman",
    category: "Development Tools",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postman/postman-original.svg",
    description:
      "API testing, request collection structuring, automated environment variables, and authentication flow validation.",
    experienceLevel: 85,
    projects: [
      "DevSphere API Testing Suite",
      "B2B Procurement Integration Verification",
    ],
  },
  {
    name: "Jira",
    category: "Development Tools",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jira/jira-original.svg",
    description:
      "Agile and Scrum sprint tracking, backlog grooming, ticket estimation, and cross-functional team delivery.",
    experienceLevel: 85,
    projects: ["Sprint Deliveries across Webspiders & Webreinvent"],
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
  @apply bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200;
  @apply min-h-[120px] flex flex-col justify-center items-center cursor-pointer;
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

.overflow-x-auto {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.overflow-x-auto::-webkit-scrollbar {
  display: none;
}

@media (max-width: 768px) {
  .container > div {
    position: relative;
    z-index: 10;
  }
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

.overflow-x-auto {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.overflow-x-auto::-webkit-scrollbar {
  display: none;
}

:root {
  &:has(.fixed.inset-0) {
    overflow: hidden;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 1400px;
  }
}
</style>
