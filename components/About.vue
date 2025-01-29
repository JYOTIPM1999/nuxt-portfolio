<template>
  <div class="container mx-auto px-4 mt-24">
    <h2
      class="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in"
    >
      About Me
    </h2>

    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
      <div class="flex flex-col md:flex-row gap-8 items-center">
        <div class="w-48 h-48 rounded-full overflow-hidden shadow-lg">
          <img
            src="https://jyotipm1999.github.io/Image/self3.jpg"
            alt="Profile"
            class="w-full h-full object-cover"
            onError="this.src='https://via.placeholder.com/200x200'"
          />
        </div>

        <div class="flex-1 space-y-4">
          <h3
            class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Jyoti Prakash Mohapatra
          </h3>
          <p class="text-xl text-gray-600">Frontend Developer</p>

          <p class="text-gray-600 leading-relaxed">
            A passionate frontend developer with expertise in building modern
            web applications. Specialized in React, Vue, and other modern
            JavaScript frameworks. Committed to creating elegant, efficient, and
            user-friendly solutions.
          </p>

          <div class="flex gap-4">
            <a
              href="https://github.com/JYOTIPM1999"
              target="_blank"
              class="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/jyotiprakashmohapatra/"
              target="_blank"
              class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.container {
  @apply my-12 relative;
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
</style>
