<template>
  <Headers />
  <main class="main-content">
    <!-- Add padding-top to account for fixed header -->
    <section id="about" class="section-spacing">
      <About />
    </section>
    <section id="experience" class="section-spacing">
      <Experience />
    </section>
    <section id="skills" class="section-spacing">
      <Skills />
    </section>
    <section id="projects" class="section-spacing">
      <Projects />
    </section>
    <section id="stats" class="section-spacing">
      <Stats />
    </section>
    <section id="contacts" class="section-spacing">
      <ContactForm />
    </section>
  </main>
</template>

<script></script>

<style scoped>
.main-content {
  @apply pt-12 md:pt-16 relative; /* Reduced padding to match smaller header */
  z-index: 10;
}

.section-spacing {
  @apply mb-8 md:mb-16 relative;
  scroll-margin-top: 48px; /* Match new mobile header height */
  @screen md {
    scroll-margin-top: 64px; /* Match new desktop header height */
  }
}
</style>
