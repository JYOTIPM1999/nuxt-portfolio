<template>
  <div class="container mx-auto px-4 mt-24">
    <h2
      class="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in"
    >
      Featured Projects
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        class="project-card group"
        :class="`delay-${index}`"
        @click="selectedProject = project"
      >
        <div
          class="relative overflow-hidden rounded-xl bg-white p-4 project-content"
        >
          <div class="relative h-48 mb-4 overflow-hidden rounded-lg">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>

            <div
              class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <button
                class="bg-white/90 text-gray-900 px-6 py-2 rounded-full transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300"
              >
                View Details
              </button>
            </div>
          </div>

          <div
            class="transform group-hover:translate-y-[-8px] transition-transform duration-300"
          >
            <h3
              class="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              {{ project.title }}
            </h3>
            <p class="text-gray-600 line-clamp-2 mb-4">
              {{ project.description }}
            </p>

            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tech in project.techStack"
                :key="tech"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>

            <div
              v-if="project.github || project.live"
              class="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 sm:opacity-100 md:opacity-0 md:group-hover:opacity-100"
            >
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                class="project-link github-link"
              >
                <i class="fab fa-github mr-2"></i> GitHub
              </a>
              <a
                v-if="project.live"
                :href="project.live"
                target="_blank"
                class="project-link live-link"
              >
                <i class="fas fa-external-link-alt mr-2"></i> Live Demo
              </a>
            </div>

            <!-- Fallback badge for client/enterprise projects with proprietary code -->
            <div
              v-else
              class="mt-3 flex items-center text-xs font-semibold text-gray-500 tracking-wide uppercase"
            >
              <span
                class="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"
              ></span>
              Enterprise / Proprietary Project
            </div>
          </div>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="selectedProject"
        class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
        @click.self="selectedProject = null"
      >
        <div
          class="bg-white rounded-2xl max-w-2xl w-full max-h-[76vh] overflow-y-auto no-scrollbar p-6 shadow-2xl relative my-auto mt-20 md:mt-auto"
        >
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-2xl font-bold text-gray-800 pr-4">
              {{ selectedProject.title }}
            </h3>
            <button
              @click="selectedProject = null"
              class="text-gray-400 hover:text-gray-700 text-xl p-1 transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          <img
            :src="selectedProject.image"
            :alt="selectedProject.title"
            class="w-full h-56 sm:h-64 object-cover rounded-xl mb-5 shadow-sm"
          />

          <p class="text-gray-600 mb-5 leading-relaxed">
            {{ selectedProject.description }}
          </p>

          <div class="space-y-5">
            <div>
              <h4 class="font-semibold text-gray-800 mb-2">Tech Stack</h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in selectedProject.techStack"
                  :key="tech"
                  class="tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-gray-800 mb-2">Key Features</h4>
              <ul class="list-disc list-inside space-y-1.5 text-gray-600">
                <li v-for="feature in selectedProject.features" :key="feature">
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from "vue";

const selectedProject = ref(null);
const projects = ref([
  // --- Work Experience / Professional Projects ---
  {
    id: 1,
    title: "DevSphere - Social Platform Backend API",
    description:
      "A scalable RESTful backend service featuring dual-token JWT authentication, granular RBAC, and a 1:1 real-time chat engine built with Socket.io.",
    image: "https://picsum.photos/seed/devsphere/800/600",
    techStack: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "TypeScript",
      "Zod",
    ],
    github: "https://github.com/jyotipm1999/devsphere",
    live: "https://devsphere-f6bz.onrender.com",
    features: [
      "Dual-token JWT authentication stored in secure httpOnly cookies with granular RBAC",
      "Normalized MongoDB schemas with Mongoose and compound indexes for rapid feed queries",
      "Real-time 1:1 chat engine with JWT handshake authentication, live presence tracking, and chat history",
      "Strict payload validation using Zod and centralized error handling middleware",
      "Hardened backend security with Helmet, express-rate-limit, and express-mongo-sanitize",
    ],
  },
  {
    id: 2,
    title: "B2B Procurement Management Platform",
    description:
      "Enterprise procurement application with core admin modules, multi-step workflows, and fine-grained access control.",
    image: "https://picsum.photos/seed/procure/800/600",
    techStack: [
      "Next.js (SSR)",
      "Vue.js",
      "Nuxt.js",
      "Auth0",
      "Tailwind CSS",
      "Zod",
    ],
    features: [
      "Role-Based Access Control (RBAC) with fine-grained permissions and Auth0 authentication",
      "Reusable, scalable UI components cutting new-feature delivery time by 25-30%",
      "Complex multi-step forms with Zod schema validation reducing client-side payload mismatches by 70%",
      "Performance optimization reducing initial page load time (LCP) from 4.3s down to 2.6s",
      "Optimized inventory and order tracking administrative workflows",
    ],
  },
  {
    id: 3,
    title: "AI Chatbot Customization Suite",
    description:
      "Modular Nuxt.js UI suite enabling non-technical users to design, configure, and deploy AI chatbots without developer assistance.",
    image: "https://picsum.photos/seed/chatbot/800/600",
    techStack: ["Nuxt.js", "Vue.js", "Pinia", "Tailwind CSS", "TypeScript"],
    features: [
      "Interactive configuration dashboard for conversational agents",
      "Real-time UI component customizer tailored for non-technical users",
      "State-hydrated client controls built with Pinia and TypeScript",
      "Zero-code onboarding flow allowing direct deployment for operations teams",
    ],
  },
  {
    id: 4,
    title: "Enterprise Operational Analytics Dashboards",
    description:
      "A suite of 10+ operational dashboards converting high-volume datasets into interactive visual insights for 20+ internal stakeholders.",
    image: "https://picsum.photos/seed/dashboards/800/600",
    techStack: ["React.js", "Chart.js", "JavaScript", "CSS3", "REST APIs"],
    features: [
      "Delivered 10+ interactive operational dashboards with responsive Chart.js components",
      "Automated recurring reporting workflows, cutting manual reporting effort by 70%",
      "Transformed complex tabular data into visual trend lines, bar charts, and drill-down graphs",
      "Cross-functional stakeholder filtering with dynamic multi-metric data aggregations",
    ],
  },
  {
    id: 5,
    title: "AI News Platform Subscription & Checkout",
    description:
      "End-to-end subscription checkout experience for an AI-driven news portal, integrating secure payment processing.",
    image: "https://picsum.photos/seed/ainews/800/600",
    techStack: ["Next.js", "React.js", "Razorpay", "Tailwind CSS", "Node.js"],
    features: [
      "Integrated Razorpay payment gateway handling multi-tier subscriptions and billing cycles",
      "Secure payment modal handling, transaction verification, and billing state sync",
      "Responsive checkout funnel optimized for low drop-off rates",
      "Instant subscription entitlement synchronization and access unlock",
    ],
  },
  {
    id: 6,
    title: "Reusable Enterprise Component System",
    description:
      "Standardized UI component library built across 3 internal modules to accelerate feature rollout and eliminate code duplication.",
    image: "https://picsum.photos/seed/designsystem/800/600",
    techStack: [
      "React.js",
      "TypeScript",
      "Vitest",
      "Context API",
      "Tailwind CSS",
    ],
    features: [
      "Authored 15+ highly configurable React components with custom hooks and Context API",
      "Standardized UI patterns accelerating sprint feature delivery by 25%",
      "Implemented comprehensive unit test coverage (70+ components) reducing QA issues by 40-50%",
      "Reduced Largest Contentful Paint (LCP) from 3.9s to 2.4s via code splitting and optimized render paths",
    ],
  },

  // --- Existing Portfolio Projects ---
]);

// Disable background scrolling when modal is open
watch(selectedProject, (val) => {
  if (typeof document !== "undefined") {
    if (val) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
});

// Clean up if component unmounts while modal is open
onUnmounted(() => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = "";
  }
});
</script>

<style scoped>
.project-card {
  @apply bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer;
  @apply transform hover:-translate-y-1;
  @apply hover:shadow-2xl hover:shadow-blue-500/10;
  transform-style: preserve-3d;
  padding-bottom: 15px;
}

.tech-tag {
  @apply px-3 py-1 rounded-full text-sm font-medium;
  @apply bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700;
  @apply animate-fadeInUp;
  animation-fill-mode: both;
}

.project-link {
  @apply px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200;
  @apply flex items-center justify-center flex-1;
}

.github-link {
  @apply bg-gray-900 text-white hover:bg-gray-800;
}

.live-link {
  @apply bg-gradient-to-r from-blue-600 to-purple-600 text-white;
  @apply hover:shadow-lg hover:shadow-blue-500/25;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.5s ease-out;
}

.delay-0 {
  animation-delay: 0.1s;
}
.delay-1 {
  animation-delay: 0.2s;
}
.delay-2 {
  animation-delay: 0.3s;
}
.delay-3 {
  animation-delay: 0.4s;
}
.delay-4 {
  animation-delay: 0.5s;
}
.delay-5 {
  animation-delay: 0.6s;
}
.delay-6 {
  animation-delay: 0.7s;
}

.project-card {
  @apply opacity-0;
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slider-nav-btn,
.navigation-btn,
.side-nav-btn,
.pagination-dot,
.pagination-dot-active {
  display: none;
}
/* Hide scrollbar while keeping scroll functionality */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
