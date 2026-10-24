<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  title: "Jyoti Prakash Mohapatra - Portfolio",
  icon: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "description", content: "My personal portfolio website" },
    { name: "keywords", content: "portfolio, web development, projects" },
  ],
});
</script>
