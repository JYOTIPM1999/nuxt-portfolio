<template>
  <div class="container mx-auto px-4 mt-24">
    <h2
      class="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in"
    >
      Professional Experience
    </h2>

    <!-- Company selection buttons -->
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

    <!-- Experience Card Container (Relative with natural height) -->
    <div class="relative w-full max-w-3xl mx-auto">
      <Transition name="fade" mode="out-in">
        <div
          v-if="experiences[selectedExp]"
          :key="selectedExp"
          class="bg-white rounded-xl shadow-2xl p-8 transition-all duration-300 w-full"
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
    period: "Aug 2024 - July 2026",
    location: "Kolkata, India",
    description: [
      "Developed and managed a B2B procurement management platform, focusing on core admin modules for efficient inventory and order management workflows.",
      "Implemented Role-Based Access Control (RBAC) with fine-grained permissions and secure authentication using Auth0, enhancing security for enterprise-level dashboards.",
      "Architected scalable and reusable UI components utilizing Next.js (SSR), Vue.js/Nuxt.js, and Tailwind CSS, resulting in a 50-60% reduction in new feature build time.",
      "Created multi-step forms integrated with Zod validation, leading to a 70% decrease in form submission errors.",
      "Optimized initial page load time from 4.3 seconds to 2.6 seconds (LCP) by employing lazy loading, code splitting, and refined API calls.",
      "Automated recurring reporting workflows, significantly reducing manual reporting time from hours to mere minutes.",
      "Developed a subscription-based payment flow for an AI-powered news platform, integrating Razorpay for seamless transactions.",
      "Designed a modular Nuxt.js UI suite for an AI chatbot customization product, empowering non-technical users to configure chatbots without needing developer assistance.",
    ],
  },
  {
    company: "Web Reinvent Tech",
    position: "Software Developer",
    period: "Apr 2024 - July 2024",
    location: "Delhi, India",
    description: [
      "Built a shared library of 20+ reusable React components adopted by 10 feature teams, cutting average new feature build time by 35% and eliminating duplicate component code across the platform",
      "Increased development speed by 50% through systematic component reuse",
      "Implemented unit tests (70+ components), reducing recurring QA-reported issues by 40-50%",
      "Improved page render speed from 3.9s to 2.4s using code splitting and efficient rendering techniques",
    ],
  },
  {
    company: "PwC",
    position: "Specialist",
    period: "May 2023 - Jan 2024",
    location: "Gurugram, India",
    description: [
      "Delivered 10+ operational dashboards in React.js, integrating Chart.js for 20+ internal stakeholders",
      "Automated reporting workflows, reducing manual effort by 70%",
      "Converted complex datasets into interactive visual insights, improving reporting clarity for 5+ stakeholders",
    ],
  },
  {
    company: "SPP Associates",
    position: "Article Assistant",
    period: "Oct 2019 - Feb 2022",
    location: "Bhubaneswar, India",
    description: [
      "Assisted in the preparation of financial statements and reports for clients, ensuring accuracy and compliance with accounting standards.",
      "Conducted audits and internal reviews of client accounts, identifying discrepancies and recommending corrective actions.",
      "Collaborated with senior accountants to analyze financial data and provide insights for business decision-making.",
      "Prepared tax returns and ensured timely submission, while staying updated on changes in tax regulations.",
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
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-15px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slideIn 0.4s ease forwards;
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

@media (max-width: 768px) {
  .container {
    @apply px-4;
  }

  button {
    @apply w-full max-w-xs;
  }
}
</style>
