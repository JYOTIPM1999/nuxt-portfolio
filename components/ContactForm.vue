<template>
  <div class="container mx-auto px-4 mt-24 md:mt-24 mt-8">
    <h2
      class="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fade-in"
    >
      Get In Touch
    </h2>

    <div class="max-w-4xl mx-auto">
      <div
        class="bg-white rounded-2xl shadow-xl p-6 md:p-8 relative overflow-hidden"
      >
        <!-- Decorative background elements -->
        <div
          class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full -translate-y-1/2 translate-x-1/2"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-600/10 to-blue-600/10 rounded-full translate-y-1/2 -translate-x-1/2"
        ></div>

        <form @submit.prevent="handleSubmit" class="space-y-6 relative">
          <div class="grid md:grid-cols-3 gap-6">
            <!-- Name Input -->
            <div class="form-group">
              <label for="name" class="form-label">Name</label>
              <div class="relative">
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  class="form-input"
                  :class="{ 'border-red-500': errors.name }"
                  placeholder="Your name"
                />
                <Transition name="fade">
                  <span v-if="errors.name" class="error-message">{{
                    errors.name
                  }}</span>
                </Transition>
              </div>
            </div>

            <!-- Phone Input -->
            <div class="form-group">
              <label for="phone" class="form-label">Phone</label>
              <div class="relative">
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="form-input"
                  :class="{ 'border-red-500': errors.phone }"
                  placeholder="Your phone number"
                />
                <Transition name="fade">
                  <span v-if="errors.phone" class="error-message">{{
                    errors.phone
                  }}</span>
                </Transition>
              </div>
            </div>

            <!-- Email Input -->
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <div class="relative">
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="form-input"
                  :class="{ 'border-red-500': errors.email }"
                  placeholder="your.email@example.com"
                />
                <Transition name="fade">
                  <span v-if="errors.email" class="error-message">{{
                    errors.email
                  }}</span>
                </Transition>
              </div>
            </div>
          </div>

          <!-- Message Input -->
          <div class="form-group">
            <label for="message" class="form-label">Message</label>
            <div class="relative">
              <textarea
                id="message"
                v-model="form.message"
                class="form-input min-h-[150px]"
                :class="{ 'border-red-500': errors.message }"
                placeholder="Your message here..."
                rows="4"
              ></textarea>
              <Transition name="fade">
                <span v-if="errors.message" class="error-message">{{
                  errors.message
                }}</span>
              </Transition>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end">
            <button
              type="submit"
              class="submit-button"
              :class="{ 'opacity-75 cursor-not-allowed': isSubmitting }"
              :disabled="isSubmitting"
            >
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else class="flex items-center">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const isSubmitting = ref(false);

const form = reactive({
  name: "",
  email: "",
  phone: "", // Added phone field
  message: "",
});

const errors = reactive({
  name: "",
  email: "",
  phone: "", // Added phone field
  message: "",
});

const validateForm = () => {
  let isValid = true;
  errors.name = "";
  errors.email = "";
  errors.phone = ""; // Added phone error reset
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

  if (form.phone.trim() && !/^\+?[\d\s-()]+$/.test(form.phone)) {
    errors.phone = "Please enter a valid phone number";
    isValid = false;
  }

  if (!form.message.trim()) {
    errors.message = "Message is required";
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  if (validateForm()) {
    isSubmitting.value = true;
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reset form
      form.name = "";
      form.email = "";
      form.phone = ""; // Added phone reset
      form.message = "";

      // Show success message (you can implement your own notification system)
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      isSubmitting.value = false;
    }
  }
};
</script>

<style scoped>
.form-group {
  @apply relative;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 mb-2;
}

.form-input {
  @apply w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200;
  @apply bg-white/50 backdrop-blur-sm;
}

.error-message {
  @apply absolute -bottom-5 left-0 text-xs text-red-500;
}

.submit-button {
  @apply px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium;
  @apply hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5;
  @apply transition-all duration-200 focus:ring-2 focus:ring-blue-500/20;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  @apply transition-all duration-200;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0 transform -translate-y-1;
}

/* Responsive adjustments */
@screen md {
  .form-input {
    @apply text-base;
  }
}
</style>
