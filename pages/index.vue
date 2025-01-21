<template>
  <Headers />
  <main class="main-content">
    <!-- Background decorative elements -->
    <div class="fixed-background">
      <div class="blob-bg blob-1">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M43.2,-68.1C57.2,-61.9,70.7,-52.4,76.3,-39.4C81.8,-26.4,79.4,-10,75.1,4.3C70.8,18.6,64.7,30.9,56.2,41.3C47.7,51.7,36.8,60.3,24.2,65.7C11.6,71,-2.7,73,-16.9,70.6C-31.1,68.1,-45.1,61.2,-56.2,50.8C-67.3,40.4,-75.5,26.4,-77.9,11.3C-80.3,-3.8,-77,-20,-68.6,-32.5C-60.2,-45,-46.8,-53.8,-33.7,-60.4C-20.6,-67,-10.3,-71.4,2.4,-75.1C15.1,-78.9,30.2,-82,43.2,-68.1Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
      <!-- New blobs -->
      <div class="blob-bg blob-2">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M47.7,-67.7C62.3,-59.6,74.9,-46.3,79.5,-30.2C84.1,-14.1,80.7,4.8,74.3,21.5C67.9,38.2,58.5,52.7,45.1,62.3C31.7,71.9,14.3,76.7,-2.5,80C-19.3,83.3,-35.9,75.1,-48.8,63.8C-61.7,52.5,-70.8,38.2,-76.2,22.2C-81.6,6.2,-83.3,-11.5,-77.6,-26.8C-71.9,-42.1,-58.9,-55,-44.2,-63.1C-29.5,-71.2,-13.1,-74.5,2.5,-78.1C18.1,-81.7,36.2,-85.6,47.7,-67.7Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
      <div class="blob-bg blob-3">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M34.6,-47.1C46.1,-34.6,57.6,-24.1,63.1,-10.1C68.6,3.9,68.1,21.3,59.7,33.8C51.3,46.3,35,53.8,17.8,58.9C0.6,64,-17.5,66.7,-33.1,61.1C-48.7,55.6,-61.8,41.8,-69.9,24.7C-77.9,7.6,-80.8,-12.8,-73.3,-28.1C-65.8,-43.4,-47.8,-53.6,-31.8,-64.1C-15.8,-74.6,-1.9,-85.4,6.8,-94.4C15.5,-103.4,28.9,-110.6,34.6,-47.1Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
      <div class="blob-bg blob-4">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M51.9,-58.9C66.4,-44.6,76.7,-25.5,77.8,-5.5C78.9,14.5,70.8,35.4,56.3,49.7C41.8,64,20.9,71.8,0.5,71.2C-19.9,70.6,-39.8,61.7,-54.2,47.3C-68.6,32.8,-77.5,12.8,-75.1,-5.2C-72.7,-23.2,-59,-39.2,-44.1,-53.5C-29.2,-67.8,-13.2,-80.4,3.2,-84.1C19.6,-87.8,39.2,-82.6,51.9,-58.9Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <section id="about" class="section-spacing container relative">
        <About />
      </section>

      <section id="experience" class="section-spacing container relative">
        <Experience />
      </section>

      <section id="skills" class="section-spacing container">
        <Skills />
      </section>

      <section id="projects" class="section-spacing container">
        <Projects />
      </section>

      <section id="stats" class="section-spacing container">
        <Stats />
      </section>

      <section id="contacts" class="section-spacing container relative">
        <ContactForm />
      </section>
    </div>
  </main>
</template>

<script></script>

<style scoped>
.main-content {
  @apply pt-12 md:pt-16 relative;
  z-index: 10;
}

.section-spacing {
  @apply mb-12 md:mb-24 relative;
  scroll-margin-top: 48px;
  @screen md {
    scroll-margin-top: 64px;
  }
}

.container {
  @apply w-full mx-auto;
  max-width: 1280px;
}

/* Background decorative elements */
.fixed-background {
  @apply fixed inset-0 w-full h-full pointer-events-none overflow-hidden;
  z-index: -1;
}

.blob-bg {
  @apply absolute opacity-5 text-primary-500 transition-transform duration-1000;
}

.blob-1 {
  @apply top-[10%] right-[5%] w-96 h-96;
  animation: float 15s infinite;
}

.blob-2 {
  @apply top-[40%] left-[5%] w-80 h-80;
  animation: float 18s infinite reverse;
}

.blob-3 {
  @apply bottom-[15%] right-[15%] w-72 h-72;
  animation: float 20s infinite;
}

.blob-4 {
  @apply top-[60%] left-[10%] w-64 h-64;
  animation: float 17s infinite reverse;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(5px, -5px) rotate(2deg);
  }
  50% {
    transform: translate(0, 10px) rotate(-2deg);
  }
  75% {
    transform: translate(-5px, -8px) rotate(1deg);
  }
}

@media (max-width: 768px) {
  .blob-1 {
    @apply w-64 h-64;
  }
  .blob-2 {
    @apply w-56 h-56;
  }
  .blob-3 {
    @apply w-48 h-48;
  }
  .blob-4 {
    @apply w-40 h-40;
  }
}
</style>
