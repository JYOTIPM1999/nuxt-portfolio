<template>
  <header class="bg-gray-800 text-white p-4">
    <nav class="container mx-auto">
      <div class="flex justify-between items-center">
        <button @click="toggleMenu" class="md:hidden">
          <span class="block w-6 h-1 bg-white mb-1"></span>
          <span class="block w-6 h-1 bg-white mb-1"></span>
          <span class="block w-6 h-1 bg-white"></span>
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
          :class="{ 'text-yellow-500': active === 'experience' }"
          @click="setActive('experience')"
          >Experience</a
        >
        <a
          :class="{ 'text-yellow-500': active === 'skills' }"
          @click="setActive('skills')"
          >Skills</a
        >
        <a
          :class="{ 'text-yellow-500': active === 'projects' }"
          @click="setActive('projects')"
          >Projects</a
        >
        <a
          :class="{ 'text-yellow-500': active === 'stats' }"
          @click="setActive('stats')"
          >Stats</a
        >
        <a
          :class="{ 'text-yellow-500': active === 'contacts' }"
          @click="setActive('contacts')"
          >Contacts</a
        >
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";

const active = ref("experience");
const isMenuOpen = ref(false);

const setActive = (section) => {
  active.value = section;
  isMenuOpen.value = false;
  document.querySelector(`#${section}`).scrollIntoView({ behavior: "smooth" });
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
header {
  @apply flex flex-col items-center w-full fixed top-0 z-50;
}
nav {
  @apply w-full;
}
nav a {
  @apply px-4 py-2 text-lg block md:inline-block;
}
</style>
