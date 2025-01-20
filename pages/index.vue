<template>
  <Headers />
  <main class="main-content">
    <!-- Background decorative elements -->
    <div class="fixed-background">
      <div class="wave-bg wave-1">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
      <div class="blob-bg blob-1">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M43.2,-68.1C57.2,-61.9,70.7,-52.4,76.3,-39.4C81.8,-26.4,79.4,-10,75.1,4.3C70.8,18.6,64.7,30.9,56.2,41.3C47.7,51.7,36.8,60.3,24.2,65.7C11.6,71,-2.7,73,-16.9,70.6C-31.1,68.1,-45.1,61.2,-56.2,50.8C-67.3,40.4,-75.5,26.4,-77.9,11.3C-80.3,-3.8,-77,-20,-68.6,-32.5C-60.2,-45,-46.8,-53.8,-33.7,-60.4C-20.6,-67,-10.3,-71.4,2.4,-75.1C15.1,-78.9,30.2,-82,43.2,-68.1Z"
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
  @apply fixed inset-0 w-full h-full pointer-events-none;
  z-index: -1;
}

.wave-bg {
  @apply absolute w-full overflow-hidden opacity-5;
}

.wave-1 {
  @apply top-[20%] left-0;
  height: 150px;
}

.wave-bg svg {
  @apply relative block w-full h-full text-primary-500;
}

.wave-bg .shape-fill {
  @apply fill-current;
}

.blob-bg {
  @apply absolute opacity-5 text-primary-500;
}

.blob-1 {
  @apply top-[60%] right-[5%] w-96 h-96;
}

/* Remove old wave and blob styles */
.wave-divider,
.blob-divider {
  display: none;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .wave-1 {
    height: 100px;
  }

  .blob-1 {
    @apply w-64 h-64;
  }
}
</style>
