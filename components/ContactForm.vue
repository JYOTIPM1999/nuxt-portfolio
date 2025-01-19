<template>
  <form @submit.prevent="handleSubmit" class="max-w-lg mx-auto p-4">
    <div class="mb-4">
      <label for="name" class="block mb-2">Name</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        class="w-full p-2 border rounded"
        :class="{ 'border-red-500': errors.name }"
      />
      <span v-if="errors.name" class="text-red-500 text-sm">{{
        errors.name
      }}</span>
    </div>

    <div class="mb-4">
      <label for="email" class="block mb-2">Email</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        class="w-full p-2 border rounded"
        :class="{ 'border-red-500': errors.email }"
      />
      <span v-if="errors.email" class="text-red-500 text-sm">{{
        errors.email
      }}</span>
    </div>

    <div class="mb-4">
      <label for="message" class="block mb-2">Message</label>
      <textarea
        id="message"
        v-model="form.message"
        class="w-full p-2 border rounded"
        :class="{ 'border-red-500': errors.message }"
        rows="4"
      ></textarea>
      <span v-if="errors.message" class="text-red-500 text-sm">{{
        errors.message
      }}</span>
    </div>

    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
      Send Message
    </button>
  </form>
</template>

<script setup>
import { reactive, ref } from "vue";

const form = reactive({
  name: "",
  email: "",
  message: "",
});

const errors = reactive({
  name: "",
  email: "",
  message: "",
});

const validateForm = () => {
  let isValid = true;
  errors.name = "";
  errors.email = "";
  errors.message = "";

  if (!form.name.trim()) {
    errors.name = "Name is required";
    isValid = false;
  }

  if (!form.email.trim()) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email";
    isValid = false;
  }

  if (!form.message.trim()) {
    errors.message = "Message is required";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = () => {
  if (validateForm()) {
    // Handle form submission
    console.log("Form submitted:", form);
    // Reset form
    form.name = "";
    form.email = "";
    form.message = "";
  }
};
</script>
