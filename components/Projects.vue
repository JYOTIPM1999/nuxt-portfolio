<template>
  <div class="container mx-auto px-4 mt-24">
    <h2
      class="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in"
    >
      Featured Projects
    </h2>

    <!-- Projects Grid -->
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
          <!-- Project Image -->
          <div class="relative h-48 mb-4 overflow-hidden rounded-lg">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>

            <!-- View Details Button -->
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

          <!-- Project Info -->
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

            <!-- Tech Stack -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tech in project.techStack"
                :key="tech"
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>

            <!-- Links -->
            <div
              class="flex gap-3 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 sm:opacity-100 md:opacity-0 md:group-hover:opacity-100"
            >
              <a
                :href="project.github"
                target="_blank"
                class="project-link github-link"
              >
                <i class="fab fa-github mr-2"></i> GitHub
              </a>
              <a
                :href="project.live"
                target="_blank"
                class="project-link live-link"
              >
                <i class="fas fa-external-link-alt mr-2"></i> Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Details Modal -->
    <Transition name="fade">
      <div
        v-if="selectedProject"
        class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        @click.self="selectedProject = null"
      >
        <div
          class="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6"
        >
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-2xl font-bold">{{ selectedProject.title }}</h3>
            <button
              @click="selectedProject = null"
              class="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <img
            :src="selectedProject.image"
            :alt="selectedProject.title"
            class="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p class="text-gray-600 mb-4">{{ selectedProject.description }}</p>
          <div class="space-y-4">
            <div>
              <h4 class="font-semibold mb-2">Tech Stack</h4>
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
              <h4 class="font-semibold mb-2">Key Features</h4>
              <ul class="list-disc list-inside space-y-1">
                <li
                  v-for="feature in selectedProject.features"
                  :key="feature"
                  class="text-gray-600"
                >
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
import { ref } from "vue";

const selectedProject = ref(null);
const projects = ref([
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform with real-time cart updates, payment processing, and admin dashboard.",
    image: "https://picsum.photos/seed/ecom/800/600",
    techStack: ["Next.js", "Node.js", "MongoDB", "Stripe", "Redux"],
    github: "https://github.com/yourusername/ecommerce",
    live: "https://ecommerce-demo.com",
    features: [
      "User authentication and authorization",
      "Real-time cart updates",
      "Payment processing with Stripe",
      "Admin dashboard for product management",
      "Order tracking system",
    ],
  },
  {
    id: 2,
    title: "Social Media Dashboard",
    description:
      "Real-time social media analytics dashboard with data visualization and reporting features.",
    image: "https://picsum.photos/seed/social/800/600",
    techStack: ["Vue.js", "Express", "Socket.io", "Chart.js", "PostgreSQL"],
    github: "https://github.com/yourusername/social-dashboard",
    live: "https://social-dashboard-demo.com",
    features: [
      "Real-time data updates",
      "Interactive charts and graphs",
      "Custom reporting tools",
      "Multi-platform integration",
      "Export functionality",
    ],
  },
  {
    id: 3,
    title: "Task Management App",
    description:
      "Collaborative task management application with real-time updates and team features.",
    image: "https://picsum.photos/seed/task/800/600",
    techStack: ["React", "Firebase", "Material-UI", "Redux-Saga"],
    github: "https://github.com/yourusername/task-manager",
    live: "https://task-manager-demo.com",
    features: [
      "Team collaboration tools",
      "Real-time task updates",
      "File sharing system",
      "Progress tracking",
      "Calendar integration",
    ],
  },
  {
    id: 4,
    title: "AI Content Generator",
    description:
      "AI-powered content generation tool for marketing and social media content.",
    image: "https://picsum.photos/seed/ai/800/600",
    techStack: ["Python", "TensorFlow", "React", "FastAPI", "Redis"],
    github: "https://github.com/yourusername/ai-content",
    live: "https://ai-content-demo.com",
    features: [
      "AI text generation",
      "Image generation integration",
      "Content scheduling",
      "Template management",
      "Analytics dashboard",
    ],
  },
  {
    id: 5,
    title: "Fitness Tracking App",
    description:
      "Mobile-first fitness tracking application with workout plans and progress monitoring.",
    image: "https://picsum.photos/seed/fitness/800/600",
    techStack: ["React Native", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/yourusername/fitness-app",
    live: "https://fitness-app-demo.com",
    features: [
      "Workout planning",
      "Progress tracking",
      "Nutrition monitoring",
      "Social features",
      "Exercise library",
    ],
  },
  {
    id: 6,
    title: "Real Estate Platform",
    description:
      "Modern real estate platform with virtual tours and property management system.",
    image: "https://picsum.photos/seed/realestate/800/600",
    techStack: ["Vue.js", "Nuxt.js", "Node.js", "PostgreSQL"],
    github: "https://github.com/yourusername/real-estate",
    live: "https://real-estate-demo.com",
    features: [
      "Virtual property tours",
      "Advanced search filters",
      "Appointment scheduling",
      "Property comparison",
      "Agent dashboard",
    ],
  },
  {
    id: 7,
    title: "Learning Management System",
    description:
      "Comprehensive learning management system with course creation and student tracking.",
    image: "https://picsum.photos/seed/lms/800/600",
    techStack: ["React", "Django", "PostgreSQL", "Redis", "AWS"],
    github: "https://github.com/yourusername/lms",
    live: "https://lms-demo.com",
    features: [
      "Course management",
      "Student progress tracking",
      "Assignment system",
      "Video conferencing",
      "Resource library",
    ],
  },
]);
</script>

<style scoped>
/* Base styles */
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

/* Animations */
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

/* Animation delays for grid items */
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

/* FadeIn animation for cards */
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

/* Remove old slider styles */
.slider-nav-btn,
.navigation-btn,
.side-nav-btn,
.pagination-dot,
.pagination-dot-active {
  display: none;
}
</style>
