<template>
  <div class="container mx-auto px-4 mt-24">
    <h2
      class="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in"
    >
      GitHub Statistics
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="stats-card group">
        <div class="card-gradient"></div>
        <h3 class="text-xl font-semibold mb-6 flex items-center">
          <i class="fab fa-github mr-3 text-2xl"></i>
          Overview
        </h3>
        <div class="space-y-4">
          <div v-if="loading" class="animate-pulse space-y-4">
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div v-else class="grid grid-cols-2 gap-6">
            <div
              v-for="(stat, index) in statsArray"
              :key="stat.label"
              :class="['stat-item', `fade-in-delay-${index}`]"
            >
              <p class="text-gray-600 text-sm">{{ stat.label }}</p>
              <p class="text-2xl font-bold" :class="stat.color">
                {{ stat.value }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="stats-card group">
        <div class="card-gradient"></div>
        <h3 class="text-xl font-semibold mb-6 flex items-center">
          <i class="fas fa-code mr-3 text-2xl"></i>
          Top Languages
        </h3>
        <div v-if="loading" class="animate-pulse space-y-4">
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div v-else class="space-y-6">
          <div
            v-for="(percentage, language, index) in languageStats"
            :key="language"
            class="language-bar"
            :class="`fade-in-delay-${index}`"
          >
            <div class="flex justify-between mb-2">
              <span class="text-sm font-medium text-gray-700">{{
                language
              }}</span>
              <span class="text-sm font-medium text-gray-500"
                >{{ percentage }}%</span
              >
            </div>
            <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-1000 transform origin-left scale-x-0"
                :class="getLanguageColor(language)"
                :style="{ transform: `scaleX(${percentage / 100})` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="md:col-span-2 hidden md:block">
        <div class="stats-card group">
          <div class="card-gradient"></div>
          <h3 class="text-xl font-semibold mb-6 flex items-center">
            <i class="fas fa-calendar-alt mr-3 text-2xl"></i>
            Contribution Activity
          </h3>
          <div class="relative contribution-chart">
            <div
              v-if="loading"
              class="absolute inset-0 flex items-center justify-center bg-white/80 z-10"
            >
              <div
                class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
              ></div>
            </div>
            <img
              src="https://ghchart.rshah.org/JYOTIPM1999"
              alt="GitHub Contribution Chart"
              class="w-full h-full object-contain rounded-lg"
              @load="loading = false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const stats = ref({
  publicRepos: 0,
  followers: 0,
  following: 0,
});
const languageStats = ref({});
const totalContributions = ref(0);
const loading = ref(true);

const statsArray = computed(() => [
  {
    label: "Repositories",
    value: stats.value.publicRepos,
    color: "text-blue-600",
  },
  {
    label: "Followers",
    value: stats.value.followers,
    color: "text-purple-600",
  },
  { label: "Following", value: stats.value.following, color: "text-blue-600" },
  {
    label: "Contributions",
    value: totalContributions.value,
    color: "text-purple-600",
  },
]);

const getLanguageColor = (language) => {
  const colors = {
    JavaScript: "bg-gradient-to-r from-yellow-400 to-yellow-500",
    TypeScript: "bg-gradient-to-r from-blue-500 to-blue-600",
    Vue: "bg-gradient-to-r from-emerald-400 to-emerald-500",
    HTML: "bg-gradient-to-r from-orange-400 to-orange-500",
    CSS: "bg-gradient-to-r from-blue-400 to-blue-500",
    Python: "bg-gradient-to-r from-blue-500 to-indigo-500",
    Java: "bg-gradient-to-r from-red-500 to-red-600",
    default: "bg-gradient-to-r from-gray-400 to-gray-500",
  };
  return colors[language] || colors.default;
};

const fetchContributions = async () => {
  try {
    const response = await fetch(
      "https://github-contributions-api.jogruber.de/v4/JYOTIPM1999"
    );
    const data = await response.json();

    totalContributions.value = data.total?.sum || 0;
  } catch (error) {
    console.error("Error fetching contributions:", error);
    totalContributions.value = 0;
  }
};

const fetchGitHubStats = async () => {
  try {
    loading.value = true;

    await Promise.all([
      (async () => {
        const userResponse = await fetch(
          "https://api.github.com/users/JYOTIPM1999"
        );
        const userData = await userResponse.json();
        stats.value = {
          publicRepos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
        };
      })(),
      fetchContributions(),
      (async () => {
        const reposResponse = await fetch(
          "https://api.github.com/users/JYOTIPM1999/repos"
        );
        const reposData = await reposResponse.json();

        const languageCounts = {};
        let total = 0;

        reposData.forEach((repo) => {
          if (repo.language) {
            languageCounts[repo.language] =
              (languageCounts[repo.language] || 0) + 1;
            total++;
          }
        });

        Object.keys(languageCounts).forEach((language) => {
          languageStats.value[language] = Math.round(
            (languageCounts[language] / total) * 100
          );
        });

        const sortedStats = {};
        Object.entries(languageStats.value)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .forEach(([key, value]) => {
            sortedStats[key] = value;
          });
        languageStats.value = sortedStats;
      })(),
    ]);
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchGitHubStats();
});
</script>

<style scoped>
.stats-card {
  @apply bg-white rounded-xl shadow-lg p-8 relative overflow-hidden;
  @apply transform transition-all duration-300;
  @apply hover:shadow-xl hover:-translate-y-1;
}

.card-gradient {
  @apply absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0;
  @apply transition-opacity duration-300 pointer-events-none;
}

.stats-card:hover .card-gradient {
  @apply opacity-100;
}

.stat-item {
  @apply bg-gray-50 rounded-lg p-4 text-center transition-all duration-300;
  @apply transform hover:-translate-y-1 hover:shadow-md;
  @apply opacity-0 animate-fade-in;
}

.language-bar {
  @apply opacity-0 animate-fade-in;
}

.contribution-chart {
  @apply relative min-h-[200px] bg-white rounded-lg;
}

.contribution-chart img {
  @apply w-full p-2 transition-opacity duration-300;
}

.fade-in-delay-0 {
  animation-delay: 0.1s;
}
.fade-in-delay-1 {
  animation-delay: 0.2s;
}
.fade-in-delay-2 {
  animation-delay: 0.3s;
}
.fade-in-delay-3 {
  animation-delay: 0.4s;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

@media (max-width: 768px) {
  .stats-card {
    @apply p-6;
  }

  .stat-item {
    @apply p-3;
  }

  .contribution-chart {
    display: none;
  }
}

.stats-card {
  scrollbar-width: thin;
  scrollbar-color: rgba(99, 102, 241, 0.5) transparent;
}

.stats-card::-webkit-scrollbar {
  @apply w-2;
}

.stats-card::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.stats-card::-webkit-scrollbar-thumb {
  @apply bg-blue-500/50 rounded-full;
}

:root.dark .stats-card {
  @apply bg-gray-800;
}

.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(99, 102, 241, 0.5) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  @apply w-2;
}

.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-transparent rounded-full;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-blue-500/50 rounded-full hover:bg-blue-600/50;
}

.activity-item {
  @apply transition-all duration-300 hover:bg-gray-50 rounded-lg;
}

.stat-summary-item {
  @apply bg-gray-50 rounded-lg p-4 text-center transition-all duration-300;
  @apply transform hover:-translate-y-1 hover:shadow-md;
}

.contribution-chart {
  @apply relative min-h-[200px] bg-white rounded-lg;
}

.contribution-chart iframe {
  @apply opacity-100 transition-opacity duration-300;
}

.contribution-chart iframe.loading {
  @apply opacity-50;
}

:root.dark .contribution-chart {
  @apply bg-gray-800;
  filter: invert(0.8) hue-rotate(180deg);
}
</style>
